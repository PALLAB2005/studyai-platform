import React from 'react';
import { Bookmark } from '../../types/bookmark';
import { GraduationCap, Clock, BookOpen, Trash2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface CourseBookmarkCardProps {
  bookmark: Bookmark;
  onRemove: (bookmark: Bookmark) => void;
}

export function CourseBookmarkCard({ bookmark, onRemove }: CourseBookmarkCardProps) {
  const { navigate } = useAuth();

  const formattedDate = new Date(bookmark.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const courseId = bookmark.courseId || bookmark.itemId;

  return (
    <div
      id={`course-bookmark-card-${bookmark.id}`}
      className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all duration-200"
    >
      {/* Header Banner */}
      <div className="h-32 w-full bg-gradient-to-r from-indigo-600 via-blue-600 to-slate-900 p-4 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-indigo-900 backdrop-blur-md shadow-xs">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
            <span>StudyAI Course</span>
          </span>
          <button
            type="button"
            id={`remove-course-bm-${bookmark.id}`}
            onClick={() => onRemove(bookmark)}
            className="p-1.5 rounded-full bg-black/25 hover:bg-rose-600 text-white transition-colors cursor-pointer"
            aria-label="Remove Bookmark"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="relative z-10 flex items-center justify-between text-white/90 text-xs font-medium">
          <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-sm text-[11px]">
            {bookmark.difficulty || 'Intermediate'}
          </span>
          <span>Saved: {formattedDate}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {bookmark.category && (
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              {bookmark.category}
            </span>
          )}
          <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {bookmark.title}
          </h3>
          {bookmark.description && (
            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {bookmark.description}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="pt-2 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800/80">
          <button
            type="button"
            onClick={() => navigate(`/courses/${courseId}`)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <span>View Course</span>
            <ArrowRight className="w-3.5 h-3.5" />
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
    </div>
  );
}
