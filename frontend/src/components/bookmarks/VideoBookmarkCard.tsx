import React from 'react';
import { Bookmark } from '../../types/bookmark';
import { useAuth } from '../../context/AuthContext';
import { Youtube, Play, ExternalLink, Trash2 } from 'lucide-react';

interface VideoBookmarkCardProps {
  bookmark: Bookmark;
  onRemove: (bookmark: Bookmark) => void;
}

export function VideoBookmarkCard({ bookmark, onRemove }: VideoBookmarkCardProps) {
  const { navigate } = useAuth();
  const formattedDate = new Date(bookmark.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleWatch = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmark.url && typeof window !== 'undefined') {
      const videoId = new URL(bookmark.url).searchParams.get('v') || bookmark.itemId;
      const video = {
        id: bookmark.itemId,
        videoId,
        title: bookmark.title,
        channel: bookmark.channelTitle || 'YouTube Channel',
        duration: 'Video',
        thumbnail: defaultThumbnail,
        videoUrl: bookmark.url,
        description: bookmark.description || '',
        source: 'youtube' as const,
        topic: bookmark.topic,
      };
      sessionStorage.setItem(`studyai_video_${bookmark.itemId}`, JSON.stringify(video));
      navigate(`/videos/${encodeURIComponent(bookmark.itemId)}`);
    }
  };

  const defaultThumbnail =
    bookmark.thumbnail ||
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80';

  return (
    <div
      id={`video-bookmark-card-${bookmark.id}`}
      className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md hover:border-red-300 dark:hover:border-red-800 transition-all duration-200"
    >
      {/* Video Thumbnail Header */}
      <div className="relative h-36 w-full bg-slate-950 overflow-hidden">
        <img
          src={defaultThumbnail}
          alt={bookmark.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-sm">
            <Youtube className="w-3.5 h-3.5 fill-current" />
            <span>YouTube Resource</span>
          </span>

          <button
            type="button"
            onClick={() => onRemove(bookmark)}
            className="p-1.5 rounded-full bg-black/40 hover:bg-rose-600 text-white backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Remove Bookmark"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Play Icon overlay */}
        <div
          onClick={handleWatch}
          className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
        >
          <div className="w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-600 transition-all">
            <Play className="w-4 h-4 ml-0.5 fill-current" />
          </div>
        </div>

        {/* Date badge */}
        <div className="absolute bottom-2.5 right-3 z-10">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-black/70 text-white backdrop-blur-xs">
            Saved: {formattedDate}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
            <span className="truncate">{bookmark.channelTitle || 'YouTube Channel'}</span>
            {bookmark.topic && (
              <span className="px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50 text-[10px] shrink-0">
                {bookmark.topic}
              </span>
            )}
          </div>

          <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            {bookmark.title}
          </h3>

          {bookmark.description && (
            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {bookmark.description}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800/80">
          <button
            type="button"
            onClick={handleWatch}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Watch in StudyAI</span>
          </button>

          <button
            type="button"
            onClick={() => onRemove(bookmark)}
            className="px-3 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 text-xs font-bold transition-colors cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
