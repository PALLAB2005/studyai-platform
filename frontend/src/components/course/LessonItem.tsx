import React from 'react';
import { Lesson, LessonStatus } from '../../types/lesson';
import {
  CheckCircle2,
  Play,
  Circle,
  Lock,
  FileText,
  Code2,
  Youtube,
  Clock,
  ChevronRight,
} from 'lucide-react';

interface LessonItemProps {
  key?: React.Key;
  lesson: Lesson;
  status: LessonStatus;
  isCurrent?: boolean;
  onSelectLesson: (lesson: Lesson) => void;
  compact?: boolean;
}

export function LessonItem({
  lesson,
  status,
  isCurrent = false,
  onSelectLesson,
  compact = false,
}: LessonItemProps) {
  // Select content type icon
  const renderTypeIcon = () => {
    switch (lesson.contentType) {
      case 'code':
        return <Code2 className="w-3.5 h-3.5 text-indigo-500" />;
      case 'article':
      case 'reading':
      case 'document':
        return <FileText className="w-3.5 h-3.5 text-purple-500" />;
      case 'youtube':
        return <Youtube className="w-3.5 h-3.5 text-rose-500" />;
      case 'video':
      default:
        return <Play className="w-3.5 h-3.5 text-brand-500 fill-current" />;
    }
  };

  // Render status badge / indicator
  const renderStatusBadge = () => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-500 text-white dark:text-slate-900" />
            <span>Completed</span>
          </div>
        );
      case 'current':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 text-[11px] font-bold animate-pulse">
            <Play className="w-3 h-3 fill-current" />
            <span>Current Lesson</span>
          </div>
        );
      case 'locked':
        return (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 text-[11px] font-medium">
            <Lock className="w-3 h-3" />
            <span>Locked</span>
          </div>
        );
      case 'not-started':
      default:
        return (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-50 dark:bg-slate-800/40 text-slate-400 text-[11px] font-medium border border-slate-200/50 dark:border-slate-700/50">
            <Circle className="w-2.5 h-2.5" />
            <span>Not Started</span>
          </div>
        );
    }
  };

  const isClickable = status !== 'locked';

  if (compact) {
    return (
      <button
        type="button"
        id={`sidebar-lesson-${lesson.id}`}
        onClick={() => isClickable && onSelectLesson(lesson)}
        disabled={!isClickable}
        className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
          isCurrent
            ? 'bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 shadow-xs'
            : status === 'completed'
            ? 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
            : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400'
        } ${!isClickable ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {status === 'completed' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : isCurrent ? (
            <div className="w-4 h-4 rounded-full bg-brand text-white flex items-center justify-center shrink-0">
              <Play className="w-2.5 h-2.5 fill-current" />
            </div>
          ) : status === 'locked' ? (
            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          ) : (
            <Circle className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 shrink-0" />
          )}

          <div className="min-w-0">
            <p className={`text-xs font-semibold truncate ${isCurrent ? 'text-brand-700 dark:text-brand-300' : 'text-slate-800 dark:text-slate-200'}`}>
              {lesson.title}
            </p>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
              <span>{lesson.duration}</span>
              <span>•</span>
              <span className="capitalize">{lesson.contentType}</span>
            </div>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div
      id={`lesson-item-${lesson.id}`}
      onClick={() => isClickable && onSelectLesson(lesson)}
      className={`group p-4 sm:p-5 rounded-2xl transition-all border ${
        isCurrent
          ? 'bg-brand-50/70 dark:bg-brand-950/40 border-brand-300 dark:border-blue-700 shadow-xs'
          : status === 'completed'
          ? 'bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-900/40 hover:border-emerald-300'
          : 'bg-white dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
      } ${isClickable ? 'cursor-pointer hover:shadow-sm' : 'opacity-60 cursor-not-allowed'}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left info */}
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 sm:mt-0 ${
            status === 'completed'
              ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300'
              : isCurrent
              ? 'bg-brand text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}>
            {status === 'completed' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : isCurrent ? (
              <Play className="w-4 h-4 fill-current" />
            ) : (
              renderTypeIcon()
            )}
          </div>

          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className={`text-sm sm:text-base font-bold ${
                isCurrent
                  ? 'text-blue-900 dark:text-blue-200'
                  : status === 'completed'
                  ? 'text-slate-800 dark:text-slate-200'
                  : 'text-slate-800 dark:text-slate-200'
              }`}>
                {lesson.title}
              </h4>
            </div>

            {lesson.description && (
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                {lesson.description}
              </p>
            )}

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {lesson.duration}
              </span>
              <span>•</span>
              <span className="capitalize font-medium text-slate-500 dark:text-slate-400">
                {lesson.contentType} Lesson
              </span>
            </div>
          </div>
        </div>

        {/* Right status & action */}
        <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center shrink-0">
          {renderStatusBadge()}

          {isClickable && (
            <div className="p-1.5 rounded-lg text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all">
              <ChevronRight className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
