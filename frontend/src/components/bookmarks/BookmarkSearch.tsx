import React from 'react';
import { Search, X } from 'lucide-react';

interface BookmarkSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function BookmarkSearch({ value, onChange }: BookmarkSearchProps) {
  return (
    <div className="relative flex-1 min-w-[240px]">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        id="bookmark-search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search your bookmarks..."
        className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-brand/50 transition-all shadow-xs"
      />
      {value && (
        <button
          type="button"
          id="clear-bookmark-search-btn"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
