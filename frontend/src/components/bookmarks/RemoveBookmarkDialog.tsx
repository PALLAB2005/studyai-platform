import React from 'react';
import { Bookmark } from '../../types/bookmark';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

interface RemoveBookmarkDialogProps {
  isOpen: boolean;
  bookmark: Bookmark | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function RemoveBookmarkDialog({
  isOpen,
  bookmark,
  onClose,
  onConfirm,
}: RemoveBookmarkDialogProps) {
  if (!isOpen || !bookmark) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div
        id="remove-bookmark-dialog-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="remove-dialog-title"
        className="relative max-w-md w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl z-10 space-y-5 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-100 dark:border-rose-900/50">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <button
            type="button"
            id="close-remove-dialog-btn"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <h2
            id="remove-dialog-title"
            className="text-xl font-bold font-display text-slate-900 dark:text-white"
          >
            Remove Bookmark?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Are you sure you want to remove <strong className="text-slate-900 dark:text-slate-100">"{bookmark.title}"</strong> from your bookmarks?
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            id="cancel-remove-bookmark-btn"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            id="confirm-remove-bookmark-btn"
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold shadow-sm shadow-rose-600/20 transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}
