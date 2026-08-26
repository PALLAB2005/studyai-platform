import React from 'react';
import { QuizDifficulty } from '../../types/quiz';
import { Sparkles, Zap, Flame, Shield } from 'lucide-react';

interface DifficultySelectorProps {
  difficulty: QuizDifficulty;
  onSelectDifficulty: (difficulty: QuizDifficulty) => void;
}

const DIFFICULTIES: {
  id: QuizDifficulty;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  selectedBorder: string;
  selectedBg: string;
  badgeBg: string;
}[] = [
  {
    id: 'beginner',
    label: 'Beginner',
    description: 'Foundational concepts, core definitions, and basic logic syntax',
    icon: Shield,
    accentColor: 'text-emerald-500',
    selectedBorder: 'border-emerald-500 ring-2 ring-emerald-500/20',
    selectedBg: 'bg-emerald-50/60 dark:bg-emerald-950/40',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300',
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    description: 'Practical application, code output evaluation, and architectural principles',
    icon: Zap,
    accentColor: 'text-brand-500',
    selectedBorder: 'border-blue-500 ring-2 ring-brand/20',
    selectedBg: 'bg-blue-50/60 dark:bg-brand-950/40',
    badgeBg: 'bg-brand-100 dark:bg-blue-900/60 text-brand-700 dark:text-brand-300',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    description: 'Edge cases, concurrency, deep time/space complexity, and systems internals',
    icon: Flame,
    accentColor: 'text-purple-500',
    selectedBorder: 'border-purple-500 ring-2 ring-purple-500/20',
    selectedBg: 'bg-purple-50/60 dark:bg-purple-950/40',
    badgeBg: 'bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300',
  },
];

export function DifficultySelector({
  difficulty,
  onSelectDifficulty,
}: DifficultySelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
        Select Difficulty Level
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {DIFFICULTIES.map((item) => {
          const isSelected = difficulty === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              id={`difficulty-btn-${item.id}`}
              onClick={() => onSelectDifficulty(item.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 relative overflow-hidden ${
                isSelected
                  ? `${item.selectedBorder} ${item.selectedBg} shadow-sm`
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-xl ${item.badgeBg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white font-display">
                    {item.label}
                  </span>
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-brand dark:bg-blue-400 animate-pulse" />
                )}
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
