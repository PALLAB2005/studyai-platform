import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface VideoProgressProps {
  completed: boolean;
  onToggle: () => void;
}

export function VideoProgress({ completed, onToggle }: VideoProgressProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${
        completed
          ? 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300'
          : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
      }`}
    >
      <CheckCircle2 className={`h-4 w-4 ${completed ? 'fill-current' : ''}`} />
      {completed ? 'Completed' : 'Mark complete'}
    </button>
  );
}
