import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { LearningSortOption } from '../../types/learning';

interface LearningSortProps {
  value: LearningSortOption;
  onChange: (value: LearningSortOption) => void;
}

export function LearningSort({ value, onChange }: LearningSortProps) {
  const options: { value: LearningSortOption; label: string }[] = [
    { value: 'recently-accessed', label: 'Recently Accessed' },
    { value: 'recently-started', label: 'Recently Started' },
    { value: 'highest-progress', label: 'Highest Progress' },
    { value: 'lowest-progress', label: 'Lowest Progress' },
    { value: 'recently-completed', label: 'Recently Completed' },
    { value: 'title-asc', label: 'Alphabetical (A - Z)' },
  ];

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="learning-sort-select" className="text-xs font-semibold text-slate-500 whitespace-nowrap hidden sm:inline flex items-center gap-1">
        <ArrowUpDown className="w-3.5 h-3.5" />
        <span>Sort by:</span>
      </label>
      <select
        id="learning-sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as LearningSortOption)}
        className="px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-blue-500 transition-all cursor-pointer shadow-xs"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
