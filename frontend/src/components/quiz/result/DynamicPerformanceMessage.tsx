import React from 'react';
import { Sparkles, ArrowRight, BookOpen, RotateCcw, Target } from 'lucide-react';
import { QuizAnalysis } from '../../../types/quizAnalysis';

interface DynamicPerformanceMessageProps {
  analysis: QuizAnalysis;
  onTakeNextQuiz: (difficulty: string) => void;
  onScrollToRecommendations: () => void;
}

export function DynamicPerformanceMessage({
  analysis,
  onTakeNextQuiz,
  onScrollToRecommendations,
}: DynamicPerformanceMessageProps) {
  const {
    performanceHeading,
    performanceMessage,
    performanceGrade,
    nextDifficultyRecommendation,
    percentage,
  } = analysis;

  const bannerTheme = {
    excellent: {
      bg: 'bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/30',
      badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
      btn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
    great: {
      bg: 'bg-blue-500/5 dark:bg-blue-950/20 border-blue-500/30',
      badge: 'bg-blue-500/10 text-brand-700 dark:text-brand-300 border-brand-500/20',
      btn: 'bg-brand hover:bg-brand-dark text-white',
    },
    good: {
      bg: 'bg-amber-500/5 dark:bg-amber-950/20 border-amber-500/30',
      badge: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
      btn: 'bg-amber-600 hover:bg-amber-700 text-white',
    },
    'needs-practice': {
      bg: 'bg-rose-500/5 dark:bg-rose-950/20 border-rose-500/30',
      badge: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
      btn: 'bg-rose-600 hover:bg-rose-700 text-white',
    },
  }[performanceGrade];

  return (
    <div
      id="dynamic-performance-banner"
      className={`p-6 rounded-3xl border ${bannerTheme.bg} flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-all`}
    >
      <div className="space-y-1.5 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
            {performanceHeading}
          </h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {performanceMessage}
        </p>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          💡 Next Step: {nextDifficultyRecommendation.message}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        {percentage < 70 ? (
          <button
            type="button"
            id="btn-start-revision"
            onClick={onScrollToRecommendations}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Review Weak Topics</span>
          </button>
        ) : (
          <button
            type="button"
            id="btn-next-difficulty"
            onClick={() => onTakeNextQuiz(nextDifficultyRecommendation.level)}
            className={`flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl ${bannerTheme.btn} text-xs font-bold transition-all shadow-sm cursor-pointer`}
          >
            <span>{nextDifficultyRecommendation.actionLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
