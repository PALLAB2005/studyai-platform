import React, { useEffect, useState } from 'react';
import { ArrowLeft, Bookmark, BookOpen, CheckCircle2, Youtube } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useBookmarks } from '../context/BookmarkContext';
import { YouTubeVideo } from '../types/youtube';
import { searchYouTubeCourses } from '../services/youtubeService';
import { VideoPlayer } from '../components/learning/VideoPlayer';
import { VideoProgress } from '../components/learning/VideoProgress';
import { YouTubeCourseCard } from '../components/courses/YouTubeCourseCard';

const progressKey = (userId: string, id: string) => `studyai_video_progress_${userId}_${id}`;
const noteKey = (userId: string, id: string) => `studyai_video_note_${userId}_${id}`;
const historyKey = (userId: string) => `studyai_video_history_${userId}`;

export function VideoLearningPage({ videoIdentifier }: { videoIdentifier: string }) {
  const { navigate, user } = useAuth();
  const { theme } = useTheme();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [video, setVideo] = useState<YouTubeVideo | null>(null);
  const [related, setRelated] = useState<YouTubeVideo[]>([]);
  const [note, setNote] = useState('');
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const userId = user?.id || 'guest';

  useEffect(() => {
    const stored = sessionStorage.getItem(`studyai_video_${videoIdentifier}`);
    const cached = stored ? JSON.parse(stored) as YouTubeVideo : null;
    setNote(localStorage.getItem(noteKey(userId, videoIdentifier)) || '');
    setCompleted(localStorage.getItem(progressKey(userId, videoIdentifier)) === 'complete');
    const history = JSON.parse(localStorage.getItem(historyKey(userId)) || '[]') as string[];
    localStorage.setItem(historyKey(userId), JSON.stringify([videoIdentifier, ...history.filter((id) => id !== videoIdentifier)].slice(0, 50)));

    if (cached) {
      setVideo(cached);
      searchYouTubeCourses(cached.topic || cached.title, { limit: 5 }).then((result) => {
        setRelated(result.items.filter((item) => item.id !== cached.id));
      }).catch(() => setRelated([])).finally(() => setLoading(false));
      return;
    }

    searchYouTubeCourses(decodeURIComponent(videoIdentifier), { limit: 1 }).then((result) => {
      const found = result.items[0] || null;
      setVideo(found);
      if (found) sessionStorage.setItem(`studyai_video_${found.id}`, JSON.stringify(found));
    }).catch(() => setVideo(null)).finally(() => setLoading(false));
  }, [userId, videoIdentifier]);

  const handleComplete = () => {
    const next = !completed;
    setCompleted(next);
    localStorage.setItem(progressKey(userId, videoIdentifier), next ? 'complete' : 'in-progress');
  };

  const handleSaveNote = (value: string) => {
    setNote(value);
    localStorage.setItem(noteKey(userId, videoIdentifier), value);
  };

  if (loading) return <div className="min-h-screen p-8 text-slate-600 dark:text-slate-300">Loading video...</div>;
  if (!video) return <div className="min-h-screen p-8 text-slate-600 dark:text-slate-300">Video unavailable. <button className="text-red-600" onClick={() => navigate('/courses')}>Back to discovery</button></div>;

  const bookmarked = isBookmarked(video.id, 'youtube');
  return (
    <div className="min-h-screen bg-white px-4 py-5 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <button type="button" onClick={() => navigate('/courses')} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600 dark:text-slate-400">
          <ArrowLeft className="h-4 w-4" /> Back to video discovery
        </button>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <main className="space-y-5">
            <VideoPlayer video={video} />
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-red-600"><Youtube className="h-4 w-4 fill-current" /> {video.channel}</div>
                <div className="flex flex-wrap gap-2">
                  <VideoProgress completed={completed} onToggle={handleComplete} />
                  <button type="button" onClick={() => toggleBookmark(video.id, 'youtube', { title: video.title, channelTitle: video.channel, url: video.videoUrl, thumbnail: video.thumbnail, topic: video.topic, description: video.description })} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold dark:border-slate-700">
                    <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current text-amber-500' : ''}`} /> {bookmarked ? 'Saved' : 'Save video'}
                  </button>
                </div>
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{video.title}</h1>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{video.description}</p>
              <p className="text-xs text-slate-500">{video.duration} · {video.publishedDate || 'Recently published'}{video.views ? ` · ${video.views}` : ''}</p>
            </div>
            <section className="space-y-3 border-t border-slate-200 pt-5 dark:border-slate-800">
              <h2 className="flex items-center gap-2 text-lg font-bold"><BookOpen className="h-5 w-5 text-red-600" /> Learning notes</h2>
              <textarea value={note} onChange={(event) => handleSaveNote(event.target.value)} placeholder="Capture the key ideas, questions, or timestamps..." className="min-h-32 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-red-400 dark:border-slate-700 dark:bg-slate-900" />
              <span className="text-xs text-slate-500">Notes save automatically for this video.</span>
            </section>
          </main>
          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Your progress</div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"><div className={`h-full bg-emerald-500 transition-all ${completed ? 'w-full' : 'w-1/4'}`} /></div>
              <p className="mt-2 text-xs text-slate-500">{completed ? 'Finished' : 'In progress'}</p>
            </div>
            {related.length > 0 && <section className="space-y-3"><h2 className="text-lg font-bold">Recommended next</h2>{related.slice(0, 3).map((item) => <YouTubeCourseCard key={item.id} video={item} />)}</section>}
          </aside>
        </div>
      </div>
    </div>
  );
}
