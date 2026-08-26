import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Award } from 'lucide-react';

interface LessonNavigationProps {
  hasPrevious: boolean;
  hasNext: boolean;
  isCompleted: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onToggleComplete: () => void;
  isLastLesson: boolean;
}

export function LessonNavigation({
  hasPrevious,
  hasNext,
  isCompleted,
  onPrevious,
  onNext,
  onToggleComplete,
  isLastLesson,
}: LessonNavigationProps) {
  return (
    <div className="sticky bottom-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Previous Button */}
        <button
          type="button"
          id="lesson-nav-prev-btn"
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            hasPrevious
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
              : 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-50 dark:bg-slate-800/40'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Lesson</span>
        </button>

        {/* Center: Mark as Complete / Completed */}
        <button
          type="button"
          id="lesson-nav-complete-btn"
          onClick={onToggleComplete}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm ${
            isCompleted
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
              : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100'
          }`}
        >
          <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'fill-current' : ''}`} />
          <span>{isCompleted ? 'Lesson Completed ✓' : 'Mark as Complete'}</span>
        </button>

        {/* Next / Finish Button */}
        <button
          type="button"
          id="lesson-nav-next-btn"
          onClick={onNext}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            isLastLesson
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-600/25'
              : 'bg-brand hover:bg-brand-dark text-white shadow-md shadow-brand/25'
          }`}
        >
          <span>{isLastLesson ? 'Complete Course 🎉' : 'Next Lesson'}</span>
          {isLastLesson ? <Award className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
