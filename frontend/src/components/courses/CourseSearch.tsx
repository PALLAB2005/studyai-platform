import React, { useState, useEffect } from 'react';
import { Search, X, Sparkles } from 'lucide-react';

interface CourseSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
  onClear: () => void;
  isSearching?: boolean;
}

export function CourseSearch({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onClear,
  isSearching = false,
}: CourseSearchProps) {
  const [localInput, setLocalInput] = useState(searchQuery);

  useEffect(() => {
    setLocalInput(searchQuery);
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(localInput);
    if (onSearchSubmit) {
      onSearchSubmit(localInput);
    }
  };

  const handleClear = () => {
    setLocalInput('');
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative flex items-center shadow-sm rounded-3xl group">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500 group-focus-within:text-brand-600 dark:group-focus-within:text-brand-400 transition-colors">
          <Search className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        {/* Search Input */}
        <input
          type="text"
          id="courses-main-search-input"
          value={localInput}
          onChange={(e) => {
            setLocalInput(e.target.value);
            onSearchChange(e.target.value);
          }}
          placeholder="What do you want to learn today?"
          className="w-full pl-12 sm:pl-14 pr-28 sm:pr-36 py-4 sm:py-4.5 rounded-3xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200/90 dark:border-slate-800 focus:outline-none focus:ring-4 focus:ring-brand/15 focus:border-blue-600 dark:focus:border-blue-500 transition-all text-sm sm:text-base md:text-lg font-medium"
        />

        {/* Clear & Search Actions inside input */}
        <div className="absolute inset-y-0 right-0 pr-2 sm:pr-2.5 flex items-center gap-1.5 sm:gap-2">
          {localInput && (
            <button
              type="button"
              id="clear-course-search-btn"
              onClick={handleClear}
              className="p-1.5 sm:p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>
          )}

          <button
            type="submit"
            id="course-search-submit-btn"
            disabled={isSearching}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-brand hover:bg-brand-dark text-white dark:bg-brand dark:hover:bg-brand shadow-sm shadow-brand/20 transition-all cursor-pointer disabled:opacity-70"
          >
            {isSearching ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span className="hidden xs:inline">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}
