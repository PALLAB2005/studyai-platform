import React from 'react';
import { RotateCcw, Sparkles, LayoutDashboard, BookOpen, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

interface QuizResultActionsProps {
  quizId: string;
  hasWeakTopics: boolean;
  onRetakeQuiz: () => void;
  onScrollToRecommendations: () => void;
}

export function QuizResultActions({
  quizId,
  hasWeakTopics,
  onRetakeQuiz,
  onScrollToRecommendations,
}: QuizResultActionsProps) {
  const { navigate } = useAuth();

  return (
    <div
      id="quiz-result-actions-footer"
      className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        {/* Retake / Try Again */}
        <button
          type="button"
          id="btn-retry-quiz"
          onClick={onRetakeQuiz}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-dark text-white text-xs font-bold transition-all shadow-sm cursor-pointer flex-1 sm:flex-initial"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retry Quiz</span>
        </button>

        {/* Generate New Quiz */}
        <button
          type="button"
          id="btn-new-quiz"
          onClick={() => navigate('/quiz')}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-bold transition-all cursor-pointer flex-1 sm:flex-initial"
        >
          <Sparkles className="w-4 h-4 text-brand-500" />
          <span>Generate New Quiz</span>
        </button>

        {/* Jump to Weak Topics if any */}
        {hasWeakTopics && (
          <button
            type="button"
            id="btn-view-weak-topics"
            onClick={onScrollToRecommendations}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-all cursor-pointer hidden md:inline-flex"
          >
            <BookOpen className="w-4 h-4" />
            <span>Focus Areas</span>
          </button>
        )}
      </div>

      {/* Return to Dashboard */}
      <button
        type="button"
        id="btn-back-dashboard"
        onClick={() => navigate('/dashboard')}
        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer w-full sm:w-auto"
      >
        <LayoutDashboard className="w-4 h-4" />
        <span>Return to Dashboard</span>
      </button>
    </div>
  );
}
