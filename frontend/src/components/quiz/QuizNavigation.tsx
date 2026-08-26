import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Send } from 'lucide-react';

interface QuizNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  answers: Record<number, number>;
  onPrevious: () => void;
  onNext: () => void;
  onGoToQuestion: (index: number) => void;
  onSubmitClick: () => void;
  isSubmitting?: boolean;
}

export function QuizNavigation({
  currentIndex,
  totalQuestions,
  answers,
  onPrevious,
  onNext,
  onGoToQuestion,
  onSubmitClick,
  isSubmitting = false,
}: QuizNavigationProps) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="space-y-4">
      {/* 1. Direct Question Jump Indicator Strip */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700 dark:text-slate-300">
            Question Overview
          </span>
          <span className="text-slate-500 font-medium">
            {answeredCount} of {totalQuestions} answered
          </span>
        </div>

        {/* Numbered Dots / Buttons */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {Array.from({ length: totalQuestions }).map((_, idx) => {
            const isCurrent = idx === currentIndex;
            const isAnswered = answers[idx] !== undefined;

            return (
              <button
                key={idx}
                type="button"
                id={`jump-question-btn-${idx + 1}`}
                onClick={() => onGoToQuestion(idx)}
                className={`min-w-[34px] h-8 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  isCurrent
                    ? 'bg-brand text-white ring-2 ring-brand/30 shadow-xs'
                    : isAnswered
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={`Question ${idx + 1}: ${isAnswered ? 'Answered' : 'Unanswered'}`}
              >
                <span>{idx + 1}</span>
                {isAnswered && !isCurrent && (
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400">✓</span>
                )}
                {isCurrent && (
                  <span className="text-[10px]">●</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Navigation Controls */}
      <div className="flex items-center justify-between gap-3 pt-2">
        {/* Previous Button */}
        <button
          type="button"
          id="quiz-nav-prev-btn"
          disabled={isFirst}
          onClick={onPrevious}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {/* Right action: Next or Submit */}
        <div className="flex items-center gap-2">
          {!isLast ? (
            <button
              type="button"
              id="quiz-nav-next-btn"
              onClick={onNext}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-brand hover:bg-brand-dark text-white shadow-lg shadow-brand/20 active:scale-98 transition-all cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              id="quiz-nav-submit-btn"
              disabled={isSubmitting}
              onClick={onSubmitClick}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl text-xs sm:text-sm font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25 active:scale-98 transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>Submit Quiz</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
