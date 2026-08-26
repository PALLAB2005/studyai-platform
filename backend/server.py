"""Small server-side proxy for public YouTube search results.

The frontend only calls this service. yt-dlp extracts public search metadata;
no YouTube API key is required and no video is downloaded.
"""

from __future__ import annotations

import json
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs, urlparse

import yt_dlp


ROOT = Path(__file__).resolve().parents[1]
PORT = int(os.getenv("PORT", "8787"))


def load_env_file(path: Path) -> None:
    if not path.exists():
        return
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        name, value = line.split("=", 1)
        value = value.strip().strip('"').strip("'")
        os.environ.setdefault(name.strip(), value)


load_env_file(ROOT / ".env.local")
load_env_file(ROOT / "dist" / ".env.example")


def format_duration(seconds: int | float | None) -> str:
    if not seconds:
        return "Video"
    total_seconds = int(seconds)
    hours, remainder = divmod(total_seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    parts = []
    if hours:
        parts.append(f"{hours}h")
    if minutes or hours:
        parts.append(f"{minutes}m")
    if seconds or not parts:
        parts.append(f"{seconds}s")
    return " ".join(parts)


def search_videos(query: str, options: dict[str, str]) -> dict[str, Any]:
    limit = min(max(int(options.get("limit", "6")), 1), 50)
    language = options.get("language", "")
    language_names = {"en": "English", "hi": "Hindi", "bn": "Bengali"}
    search_query = f"{query} {language_names.get(language, '')}".strip()
    ydl_options = {
        "quiet": True,
        "no_warnings": True,
        "skip_download": True,
        "extract_flat": True,
    }
    with yt_dlp.YoutubeDL(ydl_options) as ydl:
        search_data = ydl.extract_info(f"ytsearch{limit}:{search_query}", download=False)

    entries = [entry for entry in (search_data or {}).get("entries", []) if entry.get("id")]
    duration_filter = options.get("duration", "")
    duration_limits = {"short": (0, 240), "medium": (240, 1200), "long": (1200, None)}
    if duration_filter in duration_limits:
        minimum, maximum = duration_limits[duration_filter]
        entries = [
            entry for entry in entries
            if entry.get("duration") is not None
            and entry["duration"] >= minimum
            and (maximum is None or entry["duration"] < maximum)
        ]
    if options.get("sort") == "viewCount":
        entries.sort(key=lambda entry: entry.get("view_count") or 0, reverse=True)
    elif options.get("sort") == "date":
        entries.sort(key=lambda entry: entry.get("upload_date") or "", reverse=True)

    items = []
    for entry in entries[:limit]:
        video_id = entry["id"]
        items.append(
            {
                "id": video_id,
                "videoId": video_id,
                "title": entry.get("title", "Untitled video"),
                "channel": entry.get("channel", entry.get("uploader", "YouTube Channel")),
                "channelUrl": entry.get("channel_url", entry.get("uploader_url")),
                "duration": format_duration(entry.get("duration")),
                "thumbnail": entry.get("thumbnail") or f"https://i.ytimg.com/vi/{video_id}/hqdefault.jpg",
                "videoUrl": f"https://www.youtube.com/watch?v={video_id}",
                "description": entry.get("description", ""),
                "publishedDate": entry.get("upload_date"),
                "views": entry.get("view_count"),
                "source": "youtube",
                "topic": query,
            }
        )
    return {"items": items, "totalResults": len(items), "query": query}


class Handler(BaseHTTPRequestHandler):
    def send_json(self, status: int, payload: dict[str, Any]) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:  # noqa: N802
        parsed = urlparse(self.path)
        query = parse_qs(parsed.query)
        if parsed.path == "/api/config":
            self.send_json(
                200,
                {
                    "appUrl": os.getenv("APP_URL"),
                    "geminiConfigured": bool(os.getenv("GEMINI_API_KEY")),
                    "youtubeConfigured": True,
                    "aiConfigured": bool(os.getenv("AI_API_KEY")),
                },
            )
            return
        if parsed.path != "/api/youtube/search":
            self.send_json(404, {"error": "Not found"})
            return

        text = query.get("q", [""])[0].strip()
        if not text:
            self.send_json(200, {"items": [], "totalResults": 0, "query": text})
            return
        options = {key: values[0] for key, values in query.items() if values}
        try:
            self.send_json(200, search_videos(text, options))
        except (RuntimeError, ValueError) as error:
            self.send_json(502, {"error": str(error)})

    def log_message(self, format: str, *args: Any) -> None:
        print(f"[backend] {format % args}")


if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    print(f"StudyAI Python YouTube API listening on http://localhost:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()