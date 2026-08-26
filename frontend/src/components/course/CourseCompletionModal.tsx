import React from 'react';
import { Award, CheckCircle2, Sparkles, BookOpen, ArrowRight, X } from 'lucide-react';

interface CourseCompletionModalProps {
  isOpen: boolean;
  courseTitle: string;
  totalLessons: number;
  onReviewCourse: () => void;
  onGoToDashboard: () => void;
  onClose: () => void;
}

export function CourseCompletionModal({
  isOpen,
  courseTitle,
  totalLessons,
  onReviewCourse,
  onGoToDashboard,
  onClose,
}: CourseCompletionModalProps) {
  if (!isOpen) return null;

  const todayStr = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-10 overflow-hidden text-center p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Trophy Icon */}
        <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-200 text-amber-950 flex items-center justify-center shadow-xl shadow-amber-500/20 relative">
          <Award className="w-10 h-10" />
          <div className="absolute -top-1 -right-1 p-1.5 rounded-full bg-emerald-500 text-white shadow-sm">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        {/* Heading & Details */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Course Completed!</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            Outstanding Achievement!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
            You have successfully completed every lesson and exercise in:
          </p>
          <p className="text-base font-bold text-brand-600 dark:text-brand-400 font-display">
            {courseTitle}
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-left">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Lessons Finished</span>
            <span className="text-base font-bold text-slate-800 dark:text-slate-200">
              {totalLessons} / {totalLessons} (100%)
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Completed Date</span>
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {todayStr}
            </span>
          </div>
        </div>

        {/* Certificate Badge Placeholder */}
        <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 text-purple-700 dark:text-purple-300 text-xs font-semibold flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>Official Verified Certificate Coming Soon</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            id="modal-review-course-btn"
            onClick={onReviewCourse}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Review Course</span>
          </button>

          <button
            type="button"
            id="modal-dashboard-btn"
            onClick={onGoToDashboard}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-brand hover:bg-brand-dark text-white shadow-lg shadow-brand/25 transition-all cursor-pointer"
          >
            <span>My Learning</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
