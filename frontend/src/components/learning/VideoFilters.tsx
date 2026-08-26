import React from 'react';

interface VideoFiltersProps {
  language: string;
  duration: string;
  sort: string;
  onChange: (filter: 'language' | 'duration' | 'sort', value: string) => void;
}

export function VideoFilters({ language, duration, sort, onChange }: VideoFiltersProps) {
  const selectClass = 'rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-red-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200';
  return (
    <div className="flex flex-wrap gap-2" aria-label="Video filters">
      <select className={selectClass} value={language} onChange={(event) => onChange('language', event.target.value)} aria-label="Language">
        <option value="">All languages</option>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="bn">Bengali</option>
      </select>
      <select className={selectClass} value={duration} onChange={(event) => onChange('duration', event.target.value)} aria-label="Duration">
        <option value="">Any duration</option>
        <option value="short">Under 4 minutes</option>
        <option value="medium">4 to 20 minutes</option>
        <option value="long">Over 20 minutes</option>
      </select>
      <select className={selectClass} value={sort} onChange={(event) => onChange('sort', event.target.value)} aria-label="Sort videos">
        <option value="relevance">Relevance</option>
        <option value="date">Upload date</option>
        <option value="viewCount">Popularity</option>
      </select>
    </div>
  );
}
