import React from 'react';
import { HelpCircle } from 'lucide-react';

interface QuestionCountSelectorProps {
  count: number;
  onSelectCount: (count: number) => void;
}

const COUNTS = [5, 10, 15, 20];

export function QuestionCountSelector({ count, onSelectCount }: QuestionCountSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
          Number of Questions
        </label>
        <span className="text-xs text-slate-400 font-medium">Default: 10 Questions</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {COUNTS.map((cnt) => {
          const isSelected = count === cnt;
          return (
            <button
              key={cnt}
              type="button"
              id={`question-count-btn-${cnt}`}
              onClick={() => onSelectCount(cnt)}
              className={`py-3 px-4 rounded-xl border text-center font-bold text-sm transition-all cursor-pointer ${
                isSelected
                  ? 'border-blue-600 bg-brand text-white shadow-md shadow-brand/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <span>{cnt} Questions</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
