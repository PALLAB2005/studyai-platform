import React from 'react';
import { AlertCircle, CheckCircle2, HelpCircle, X, Send, ArrowRight } from 'lucide-react';

interface SubmitQuizDialogProps {
  isOpen: boolean;
  totalQuestions: number;
  unansweredCount: number;
  onReview: () => void;
  onConfirmSubmit: () => void;
  onClose: () => void;
}

export function SubmitQuizDialog({
  isOpen,
  totalQuestions,
  unansweredCount,
  onReview,
  onConfirmSubmit,
  onClose,
}: SubmitQuizDialogProps) {
  if (!isOpen) return null;

  const hasUnanswered = unansweredCount > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-10 p-6 sm:p-7 space-y-6 text-center animate-in zoom-in-95 duration-200">
        {/* Close Icon */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Status Icon */}
        <div
          className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
            hasUnanswered
              ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 shadow-amber-500/10'
              : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 shadow-emerald-500/10'
          }`}
        >
          {hasUnanswered ? (
            <AlertCircle className="w-8 h-8" />
          ) : (
            <CheckCircle2 className="w-8 h-8" />
          )}
        </div>

        {/* Heading & Details */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            {hasUnanswered ? 'You Still Have Unanswered Questions' : 'Ready to Submit Your Quiz?'}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {hasUnanswered ? (
              <>
                <strong className="text-amber-600 dark:text-amber-400 font-bold">
                  {unansweredCount} {unansweredCount === 1 ? 'question has' : 'questions have'} not been answered
                </strong>{' '}
                out of {totalQuestions} total questions. You can review them now or submit anyway.
              </>
            ) : (
              <>
                You have answered all{' '}
                <strong className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {totalQuestions} questions
                </strong>
                . Once submitted, your score and answers will be finalized.
              </>
            )}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            id="modal-review-questions-btn"
            onClick={onReview}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
          >
            <span>Review Questions</span>
          </button>

          <button
            type="button"
            id="modal-confirm-submit-btn"
            onClick={onConfirmSubmit}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold text-white transition-all shadow-md cursor-pointer ${
              hasUnanswered
                ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
                : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{hasUnanswered ? 'Submit Anyway' : 'Submit Quiz'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
