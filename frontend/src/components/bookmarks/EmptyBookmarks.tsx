import React from 'react';
import { BookmarkX, Compass, Video } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function EmptyBookmarks() {
  const { navigate } = useAuth();

  return (
    <div
      id="empty-bookmarks-container"
      className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-5 max-w-lg mx-auto my-8 shadow-xs"
    >
      <div className="w-16 h-16 rounded-3xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto border border-blue-100 dark:border-brand-900/50 shadow-inner">
        <BookmarkX className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
          No Bookmarks Yet
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Save important courses, lessons, videos, and notes so you can easily find them later.
        </p>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          id="empty-browse-courses-btn"
          onClick={() => navigate('/courses')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand hover:bg-brand-dark text-white text-xs sm:text-sm font-bold shadow-sm shadow-brand/20 transition-all cursor-pointer"
        >
          <Compass className="w-4 h-4" />
          <span>Browse Courses</span>
        </button>

        <button
          type="button"
          id="empty-explore-tutorials-btn"
          onClick={() => navigate('/tutorials')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold transition-all cursor-pointer"
        >
          <Video className="w-4 h-4" />
          <span>Explore Tutorials</span>
        </button>
      </div>
    </div>
  );
}
