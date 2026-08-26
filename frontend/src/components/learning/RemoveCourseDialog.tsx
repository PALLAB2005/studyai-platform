import React from 'react';
import { Trash2, X } from 'lucide-react';
import { Course } from '../../types/course';

interface RemoveCourseDialogProps {
  isOpen: boolean;
  course: Course | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function RemoveCourseDialog({
  isOpen,
  course,
  onConfirm,
  onCancel,
}: RemoveCourseDialogProps) {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="remove-course-dialog"
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200"
      >
        {/* Header Icon and Close */}
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-xs border border-rose-200/60 dark:border-rose-800/40">
            <Trash2 className="w-6 h-6" />
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-display">
            Remove Course?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Your saved learning progress for{' '}
            <strong className="text-slate-900 dark:text-slate-100 font-semibold">"{course.title}"</strong>{' '}
            will be removed from My Learning. The course will still remain accessible in the public catalog.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            id="remove-dialog-cancel-btn"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            id="remove-dialog-confirm-btn"
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-600/25 transition-all cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
