import React from 'react';
import { Bookmark } from '../../types/bookmark';
import { FileText, Clock, ExternalLink, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NoteBookmarkCardProps {
  bookmark: Bookmark;
  onRemove: (bookmark: Bookmark) => void;
}

export function NoteBookmarkCard({ bookmark, onRemove }: NoteBookmarkCardProps) {
  const { navigate } = useAuth();

  const formattedDate = new Date(bookmark.updatedAt || bookmark.createdAt).toLocaleDateString(
    undefined,
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }
  );

  const courseId = bookmark.courseId || 'web-dev-bootcamp';
  const lessonId = bookmark.lessonId || 'javascript-functions';

  const handleOpenNote = () => {
    navigate(`/courses/${courseId}/lessons/${lessonId}`);
  };

  const previewText = bookmark.notePreview || bookmark.description || bookmark.title;

  return (
    <div
      id={`note-bookmark-card-${bookmark.id}`}
      className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs hover:shadow-md hover:border-amber-300 dark:hover:border-amber-800 transition-all duration-200 justify-between space-y-4"
    >
      <div className="space-y-3">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <FileText className="w-3.5 h-3.5" />
            <span>Personal Note</span>
          </span>
          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>Updated: {formattedDate}</span>
          </span>
        </div>

        {/* Note Title */}
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {bookmark.title}
          </h3>

          {/* Related Course & Lesson */}
          <div className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 space-y-0.5">
            {bookmark.courseTitle && (
              <p className="truncate">
                Course: <strong className="font-bold text-slate-700 dark:text-slate-300">{bookmark.courseTitle}</strong>
              </p>
            )}
            {bookmark.lessonTitle && (
              <p className="truncate">
                Lesson: <span className="font-medium text-slate-600 dark:text-slate-400">{bookmark.lessonTitle}</span>
              </p>
            )}
          </div>
        </div>

        {/* Short Preview */}
        <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-slate-800/50 border border-amber-100 dark:border-slate-800/80">
          <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-3 leading-relaxed italic">
            "{previewText}"
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800/80">
        <button
          type="button"
          onClick={handleOpenNote}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Open Note</span>
          <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
        </button>

        <button
          type="button"
          onClick={() => onRemove(bookmark)}
          className="px-3 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 text-xs font-bold transition-colors cursor-pointer"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
