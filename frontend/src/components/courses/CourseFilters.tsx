import React, { useState } from 'react';
import {
  SlidersHorizontal,
  ArrowUpDown,
  X,
  RotateCcw,
  Check
} from 'lucide-react';
import { CourseDifficulty, CourseStatus } from '../../types/course';

export type DurationFilter = 'all' | 'under-5' | '5-10' | '10-20' | '20-plus';
export type SortOption = 'popular' | 'recent' | 'duration-asc' | 'duration-desc' | 'beginner-friendly';

export interface FilterState {
  difficulty: 'all' | CourseDifficulty;
  status: 'all' | CourseStatus;
  duration: DurationFilter;
  sortBy: SortOption;
}

interface CourseFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export function CourseFilters({
  filters,
  onFilterChange,
  onResetFilters,
  totalResultsCount,
}: CourseFiltersProps) {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Active filter counter (excluding sort and 'all')
  const activeFiltersCount = [
    filters.difficulty !== 'all' ? 1 : 0,
    filters.status !== 'all' ? 1 : 0,
    filters.duration !== 'all' ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'recent', label: 'Recently Added' },
    { value: 'duration-asc', label: 'Shortest Duration' },
    { value: 'duration-desc', label: 'Longest Duration' },
    { value: 'beginner-friendly', label: 'Beginner Friendly' },
  ];

  const difficultyOptions: { value: 'all' | CourseDifficulty; label: string }[] = [
    { value: 'all', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
  ];

  const statusOptions: { value: 'all' | CourseStatus; label: string }[] = [
    { value: 'all', label: 'All Statuses' },
    { value: 'not-started', label: 'Not Started' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'paused', label: 'Paused' },
    { value: 'completed', label: 'Completed' },
  ];

  const durationOptions: { value: DurationFilter; label: string }[] = [
    { value: 'all', label: 'Any Duration' },
    { value: 'under-5', label: 'Under 5 Hours' },
    { value: '5-10', label: '5–10 Hours' },
    { value: '10-20', label: '10–20 Hours' },
    { value: '20-plus', label: '20+ Hours' },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Top Filter & Sort Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Left Side: Filter Trigger and Quick Counters */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            id="filter-toggle-btn"
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-colors ${
              isFilterPanelOpen || activeFiltersCount > 0
                ? 'bg-brand-50 border-brand-200 text-brand-700 dark:bg-brand-950/40 dark:border-brand-800 dark:text-brand-300 font-semibold'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700/70'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="ml-1 w-5 h-5 rounded-full bg-brand text-white dark:bg-brand text-xs flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Quick Clear Button (when filters are active) */}
          {activeFiltersCount > 0 && (
            <button
              type="button"
              id="clear-filters-quick-btn"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <div className="hidden md:block text-xs text-slate-500 dark:text-slate-400">
            Showing <strong className="text-slate-900 dark:text-slate-100 font-semibold">{totalResultsCount}</strong> courses
          </div>
        </div>

        {/* Right Side: Sort Dropdown */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <ArrowUpDown className="w-3.5 h-3.5 hidden sm:block" />
            <span className="hidden sm:inline">Sort by:</span>
          </div>

          <div className="relative">
            <select
              id="course-sort-select"
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as SortOption })}
              className="pl-3 pr-8 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-blue-600 cursor-pointer shadow-2xs"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Expandable Filter Drawer/Panel */}
      {isFilterPanelOpen && (
        <div
          id="course-filter-panel"
          className="p-5 rounded-2xl bg-white dark:bg-slate-800/95 border border-slate-200/90 dark:border-slate-700/90 shadow-sm space-y-5 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              Filter Options
            </h4>
            <button
              type="button"
              onClick={() => setIsFilterPanelOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1. Difficulty Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Difficulty Level
              </label>
              <div className="flex flex-wrap gap-1.5">
                {difficultyOptions.map((opt) => {
                  const isSelected = filters.difficulty === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => onFilterChange({ difficulty: opt.value })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-brand text-white dark:bg-brand shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700/70 dark:text-slate-300 dark:hover:bg-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Course Status Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Course Status
              </label>
              <div className="flex flex-wrap gap-1.5">
                {statusOptions.map((opt) => {
                  const isSelected = filters.status === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => onFilterChange({ status: opt.value })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-brand text-white dark:bg-brand shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700/70 dark:text-slate-300 dark:hover:bg-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Duration Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Duration
              </label>
              <div className="flex flex-wrap gap-1.5">
                {durationOptions.map((opt) => {
                  const isSelected = filters.duration === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => onFilterChange({ duration: opt.value })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-brand text-white dark:bg-brand shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700/70 dark:text-slate-300 dark:hover:bg-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Filter Summary Footer */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              {activeFiltersCount === 0
                ? 'No active filters applied'
                : `${activeFiltersCount} active filter${activeFiltersCount > 1 ? 's' : ''} applied`}
            </span>
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400"
                >
                  Reset all
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsFilterPanelOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-brand dark:hover:bg-brand font-medium transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
