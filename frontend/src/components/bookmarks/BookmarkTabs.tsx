import React from 'react';
import { BookmarkType } from '../../types/bookmark';
import { useBookmarks } from '../../context/BookmarkContext';

export type CategoryFilter = 'all' | BookmarkType;

interface BookmarkTabsProps {
  activeTab: CategoryFilter;
  onTabChange: (tab: CategoryFilter) => void;
}

export function BookmarkTabs({ activeTab, onTabChange }: BookmarkTabsProps) {
  const { totalCount, courseCount, lessonCount, videoCount, noteCount } = useBookmarks();

  const tabs: { id: CategoryFilter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: totalCount },
    { id: 'course', label: 'Courses', count: courseCount },
    { id: 'lesson', label: 'Lessons', count: lessonCount },
    { id: 'youtube', label: 'Videos', count: videoCount },
    { id: 'note', label: 'Notes', count: noteCount },
  ];

  return (
    <div id="bookmark-category-tabs" className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            id={`bookmark-tab-${tab.id}`}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap border ${
              isActive
                ? 'bg-brand text-white border-blue-600 shadow-sm shadow-brand/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
