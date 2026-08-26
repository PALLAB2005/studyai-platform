import React from 'react';
import { BookOpen, Sparkles, RotateCcw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface MyLearningHeaderProps {
  onResetProgress?: () => void;
}

export function MyLearningHeader({ onResetProgress }: MyLearningHeaderProps) {
  const { navigate } = useAuth();

  return (
    <header className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="p-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
              Student Dashboard
            </span>
          </div>

          <h1
            id="my-learning-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight"
          >
            My Learning
          </h1>
          <p
            id="my-learning-subtitle"
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1"
          >
            Track your courses and continue learning where you left off.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5">
          {onResetProgress && (
            <button
              type="button"
              onClick={onResetProgress}
              title="Reset progress to default seed data"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          )}

          <button
            type="button"
            id="explore-more-courses-btn"
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-brand hover:bg-brand-dark active:bg-brand-dark text-white shadow-sm shadow-brand/20 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse Courses</span>
          </button>
        </div>
      </div>
    </header>
  );
}
