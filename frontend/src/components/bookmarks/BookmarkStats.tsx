import React from 'react';
import { Bookmark, BookOpen, GraduationCap, Youtube, FileText } from 'lucide-react';
import { useBookmarks } from '../../context/BookmarkContext';

export function BookmarkStats() {
  const { totalCount, courseCount, lessonCount, videoCount, noteCount } = useBookmarks();

  const stats = [
    {
      id: 'stat-total-bookmarks',
      label: 'Total Bookmarks',
      value: totalCount,
      icon: Bookmark,
      color: 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border-brand-200 dark:border-blue-800',
    },
    {
      id: 'stat-courses',
      label: 'Courses',
      value: courseCount,
      icon: GraduationCap,
      color: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
    },
    {
      id: 'stat-lessons',
      label: 'Lessons',
      value: lessonCount,
      icon: BookOpen,
      color: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    },
    {
      id: 'stat-videos',
      label: 'Videos',
      value: videoCount,
      icon: Youtube,
      color: 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800',
    },
    {
      id: 'stat-notes',
      label: 'Notes',
      value: noteCount,
      icon: FileText,
      color: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    },
  ];

  return (
    <div id="bookmark-stats-summary" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            id={stat.id}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center gap-3 transition-all hover:border-slate-300 dark:hover:border-slate-700"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${stat.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 truncate">
                {stat.label}
              </p>
              <p className="text-xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
                {stat.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
