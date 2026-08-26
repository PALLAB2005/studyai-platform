import React from 'react';
import { Bookmark } from '../../types/bookmark';
import { BookOpen, Layers, PlayCircle, Trash2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface LessonBookmarkCardProps {
  bookmark: Bookmark;
  onRemove: (bookmark: Bookmark) => void;
}

export function LessonBookmarkCard({ bookmark, onRemove }: LessonBookmarkCardProps) {
  const { navigate } = useAuth();

  const formattedDate = new Date(bookmark.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const courseId = bookmark.courseId || 'web-dev-bootcamp';
  const lessonId = bookmark.lessonId || bookmark.itemId;

  const handleContinue = () => {
    navigate(`/courses/${courseId}/lessons/${lessonId}`);
  };

  return (
    <div
      id={`lesson-bookmark-card-${bookmark.id}`}
      className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-800 transition-all duration-200 justify-between space-y-4"
    >
      <div className="space-y-3">
        {/* Top Meta */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Lesson Bookmark</span>
          </span>
          <span className="text-[11px] text-slate-400 font-medium">{formattedDate}</span>
        </div>

        {/* Title */}
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {bookmark.title}
          </h3>

          {/* Module & Course info */}
          <div className="mt-1.5 space-y-0.5 text-xs text-slate-500 dark:text-slate-400">
            {bookmark.courseTitle && (
              <p className="font-medium text-slate-700 dark:text-slate-300 truncate">
                Course: <strong className="font-bold">{bookmark.courseTitle}</strong>
              </p>
            )}
            {bookmark.moduleTitle && (
              <p className="truncate flex items-center gap-1 text-slate-400">
                <Layers className="w-3 h-3 text-slate-400 inline" />
                <span>Module: {bookmark.moduleTitle}</span>
              </p>
            )}
          </div>
        </div>

        {/* Short description */}
        {bookmark.description && (
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
            {bookmark.description}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800/80">
        <button
          type="button"
          onClick={handleContinue}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          <PlayCircle className="w-4 h-4 fill-current" />
          <span>Continue Lesson</span>
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
