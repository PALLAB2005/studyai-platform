import React from 'react';
import { Clock, Check } from 'lucide-react';

interface TimerSelectorProps {
  timerMinutes: number;
  onSelectTimer: (minutes: number) => void;
}

const TIMER_OPTIONS = [
  { minutes: 0, label: 'No Timer', description: 'Self-paced practice' },
  { minutes: 10, label: '10 Minutes', description: 'Quick sprint' },
  { minutes: 20, label: '20 Minutes', description: 'Standard exam pace' },
  { minutes: 30, label: '30 Minutes', description: 'Comprehensive timed drill' },
];

export function TimerSelector({ timerMinutes, onSelectTimer }: TimerSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
          Quiz Time Limit
        </label>
        <span className="text-xs text-slate-400 font-medium">Optional Exam Mode</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {TIMER_OPTIONS.map((opt) => {
          const isSelected = timerMinutes === opt.minutes;

          return (
            <button
              key={opt.minutes}
              type="button"
              id={`timer-option-${opt.minutes}`}
              onClick={() => onSelectTimer(opt.minutes)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-blue-600 bg-brand-50/70 dark:bg-brand-950/40 ring-2 ring-brand/20 text-blue-950 dark:text-blue-200 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold">{opt.label}</span>
                <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {opt.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
