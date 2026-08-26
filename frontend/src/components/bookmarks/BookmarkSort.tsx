import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export type BookmarkSortOption = 'recent' | 'oldest' | 'alphabetical';

interface BookmarkSortProps {
  value: BookmarkSortOption;
  onChange: (value: BookmarkSortOption) => void;
}

export function BookmarkSort({ value, onChange }: BookmarkSortProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative inline-flex items-center">
        <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <select
          id="bookmark-sort-select"
          value={value}
          onChange={(e) => onChange(e.target.value as BookmarkSortOption)}
          className="pl-10 pr-8 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-bold focus:outline-hidden focus:ring-2 focus:ring-brand/50 cursor-pointer shadow-xs appearance-none"
        >
          <option value="recent">Recently Added</option>
          <option value="oldest">Oldest First</option>
          <option value="alphabetical">A–Z Title</option>
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
          ▼
        </div>
      </div>
    </div>
  );
}
