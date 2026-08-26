import React from 'react';
import { YouTubeVideo } from '../../types/youtube';
import { useBookmarks } from '../../context/BookmarkContext';
import { useAuth } from '../../context/AuthContext';
import {
  Play,
  Bookmark,
  Clock,
  Calendar,
  Eye,
  CheckCircle,
  Youtube
} from 'lucide-react';

interface YouTubeCourseCardProps {
  key?: React.Key;
  video: YouTubeVideo;
}

export function YouTubeCourseCard({ video }: YouTubeCourseCardProps) {
  const { navigate } = useAuth();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(video.id, 'youtube');

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleBookmark(video.id, 'youtube', {
      title: video.title,
      channelTitle: video.channel,
      url: video.videoUrl,
      thumbnail: video.thumbnail,
      topic: video.topic || video.difficulty || 'YouTube Tutorial',
      description: video.description,
    });
  };

  const handleWatchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`studyai_video_${video.id}`, JSON.stringify(video));
      navigate(`/videos/${encodeURIComponent(video.id)}`);
    }
  };

  return (
    <div
      id={`youtube-course-card-${video.id}`}
      className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-lg hover:border-red-300 dark:hover:border-red-900/50 transition-all duration-300"
    >
      {/* Video Thumbnail Header */}
      <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

        {/* Top Badges Row */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-sm">
            <Youtube className="w-3.5 h-3.5 fill-current" />
            <span>YouTube Resource</span>
          </span>

          <button
            type="button"
            id={`youtube-bookmark-btn-${video.id}`}
            onClick={handleBookmarkClick}
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark video'}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              bookmarked
                ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-sm'
                : 'bg-black/40 text-white/90 hover:bg-black/60 hover:text-white'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Play Icon Overlay on Hover */}
        <div
          onClick={handleWatchClick}
          className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
        >
          <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-600 transition-all">
            <Play className="w-5 h-5 ml-0.5 fill-current" />
          </div>
        </div>

        {/* Duration Badge Bottom-Right */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-black/80 text-white backdrop-blur-md border border-white/10">
            <Clock className="w-3 h-3" />
            {video.duration}
          </span>
        </div>

        {/* Difficulty or Topic Pill Bottom-Left */}
        {video.difficulty && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-white/20 text-white backdrop-blur-md border border-white/10">
              {video.difficulty}
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Channel Name */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <div className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
              <Youtube className="w-3 h-3 fill-current" />
            </div>
            <span className="truncate">{video.channel}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 leading-snug group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">
            {video.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {video.description}
          </p>
        </div>

        {/* Video Metadata Footer */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {video.publishedDate || 'Recently added'}
            </span>
            {video.views && (
              <span className="inline-flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                {video.views}
              </span>
            )}
          </div>

          {/* Watch inside StudyAI */}
          <div className="pt-1">
            <button
              id={`watch-youtube-btn-${video.id}`}
              onClick={handleWatchClick}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-500 shadow-sm shadow-red-600/20 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Watch in StudyAI</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
