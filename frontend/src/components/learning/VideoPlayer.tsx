import React from 'react';
import { YouTubeVideo } from '../../types/youtube';

interface VideoPlayerProps {
  video: YouTubeVideo;
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-xl">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.videoId)}?rel=0&modestbranding=1`}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
