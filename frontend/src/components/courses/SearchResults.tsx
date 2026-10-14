import React, { useState } from 'react';
import { YouTubePlaylist, YouTubeVideo } from '../../types/youtube';
import { YouTubeCourseCard } from './YouTubeCourseCard';
import {
  Youtube,
  AlertCircle,
  RotateCcw,
  Search,
  ChevronDown,
  ChevronUp,
  ListVideo,
  Play
} from 'lucide-react';

interface SearchResultsProps {
  query: string;
  youTubeCourses: YouTubeVideo[];
  youTubePlaylists: YouTubePlaylist[];
  isLoadingYouTube: boolean;
  youTubeError: string | null;
  onRetryYouTube: () => void;
  onClearSearch: () => void;
}

export function SearchResults({
  query,
  youTubeCourses,
  youTubePlaylists,
  isLoadingYouTube,
  youTubeError,
  onRetryYouTube,
  onClearSearch,
}: SearchResultsProps) {
  const [showAllYouTube, setShowAllYouTube] = useState(false);

  const initialYouTubeLimit = 4;

  const visibleYouTubeCourses = showAllYouTube
    ? youTubeCourses
    : youTubeCourses.slice(0, initialYouTubeLimit);

  const hasYouTubeCourses = youTubeCourses.length > 0;

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Search Query Context Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-brand-50/70 dark:bg-slate-900/90 border border-blue-100 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400">
            <Search className="w-3.5 h-3.5" />
            <span>Search Results</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            Showing results for <span className="text-brand-600 dark:text-brand-400">"{query}"</span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClearSearch}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors shadow-2xs cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      </div>

      <section className="space-y-5" aria-label="YouTube Learning Resources">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-xs">
              <Youtube className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
                <span>Recommended from YouTube</span>
                {hasYouTubeCourses && !isLoadingYouTube && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-300">
                    {youTubeCourses.length} Found
                  </span>
                )}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Top-rated masterclasses, tutorials, and deep-dives from global YouTube educators
              </p>
            </div>
          </div>

          {hasYouTubeCourses && youTubeCourses.length > initialYouTubeLimit && !isLoadingYouTube && (
            <button
              type="button"
              id="toggle-all-youtube-courses-btn"
              onClick={() => setShowAllYouTube(!showAllYouTube)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors cursor-pointer"
            >
              <span>{showAllYouTube ? 'Show Less' : `View More YouTube Results (${youTubeCourses.length})`}</span>
              {showAllYouTube ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* YouTube Loading State Skeleton */}
        {isLoadingYouTube && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 animate-pulse">
              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin shrink-0" />
              <span>Finding the best learning resources...</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-5 space-y-4 animate-pulse"
                >
                  <div className="h-44 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-full" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-2/3" />
                  </div>
                  <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* YouTube Error State */}
        {!isLoadingYouTube && youTubeError && (
          <div
            id="youtube-error-notice"
            className="p-6 rounded-3xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-3"
          >
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <h4 className="text-base font-bold">Unable to Load YouTube Resources</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {youTubeError}
            </p>
            <div>
              <button
                type="button"
                onClick={onRetryYouTube}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        )}

        {/* YouTube Video Results Grid */}
        {!isLoadingYouTube && !youTubeError && hasYouTubeCourses && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {visibleYouTubeCourses.map((video) => (
              <YouTubeCourseCard key={video.id} video={video} />
            ))}
          </div>
        )}

        {/* No YouTube Results Found Fallback */}
        {!isLoadingYouTube && !youTubeError && !hasYouTubeCourses && youTubePlaylists.length === 0 && (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center space-y-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              No YouTube videos or playlists found matching "{query}". Try another search.
            </p>
          </div>
        )}
      </section>

      {!isLoadingYouTube && !youTubeError && youTubePlaylists.length > 0 && (
        <section className="space-y-5" aria-label="YouTube Playlists">
          <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">
            <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center">
              <ListVideo className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                YouTube Playlists
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Learning playlists related to {query}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {youTubePlaylists.map((playlist) => (
              <a
                key={playlist.id}
                href={playlist.playlistUrl}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="relative aspect-video bg-slate-200 dark:bg-slate-800">
                  {playlist.thumbnail && (
                    <img
                      src={playlist.thumbnail}
                      alt=""
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg">
                      <Play className="ml-0.5 h-5 w-5 fill-current" />
                    </span>
                  </div>
                  <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-xs font-semibold text-white">
                    {playlist.videoCount ? `${playlist.videoCount} videos` : 'Playlist'}
                  </span>
                </div>
                <div className="space-y-2 p-5">
                  <h4 className="line-clamp-2 font-bold text-slate-900 transition-colors group-hover:text-red-600 dark:text-slate-100 dark:group-hover:text-red-400">
                    {playlist.title}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{playlist.channel}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
