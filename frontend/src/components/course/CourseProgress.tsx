import React from 'react';
import { Course, CourseStatus } from '../../types/course';
import { UserCourseProgress } from '../../types/learning';
import { Play, RotateCcw, CheckCircle2, Calendar, Clock, BookOpen, Sparkles } from 'lucide-react';

interface CourseProgressProps {
  course: Course;
  userProgress?: UserCourseProgress;
  onPrimaryAction: () => void;
}

export function CourseProgressCard({
  course,
  userProgress,
  onPrimaryAction,
}: CourseProgressProps) {
  const status: CourseStatus = userProgress?.status || course.status || 'not-started';
  const progressPercent = userProgress?.progress !== undefined ? userProgress.progress : course.progress || 0;
  const completedLessons = userProgress?.completedLessons !== undefined ? userProgress.completedLessons : course.completedLessons || 0;
  const totalLessons = course.totalLessons || 40;
  const remainingLessons = Math.max(0, totalLessons - completedLessons);

  const startedDate = userProgress?.startedAt || course.createdAt || 'Recent';
  const lastLessonTitle = userProgress?.lastLessonTitle || 'Introduction Lesson';

  const isStarted = status !== 'not-started';

  // Determine button state and label
  const getActionConfig = () => {
    switch (status) {
      case 'in-progress':
        return {
          btnText: 'Continue Learning',
          btnIcon: <Play className="w-5 h-5 fill-current" />,
          btnClass: 'bg-brand hover:bg-brand-dark text-white shadow-lg shadow-brand/25',
          badgeText: 'In Progress',
          badgeClass: 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border-brand-200 dark:border-blue-800',
        };
      case 'paused':
        return {
          btnText: 'Resume Course',
          btnIcon: <RotateCcw className="w-5 h-5" />,
          btnClass: 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-600/25',
          badgeText: 'Paused',
          badgeClass: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        };
      case 'completed':
        return {
          btnText: 'Review Course Material',
          btnIcon: <CheckCircle2 className="w-5 h-5" />,
          btnClass: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25',
          badgeText: 'Completed ✓',
          badgeClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        };
      case 'not-started':
      default:
        return {
          btnText: 'Start Course',
          btnIcon: <Play className="w-5 h-5 fill-current" />,
          btnClass: 'bg-brand hover:bg-brand-dark text-white shadow-lg shadow-brand/25',
          badgeText: 'Not Enrolled',
          badgeClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
        };
    }
  };

  const action = getActionConfig();

  return (
    <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display">
              {isStarted ? 'Your Progress' : 'Course Enrollment'}
            </h2>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${action.badgeClass}`}>
              {action.badgeText}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {isStarted
              ? `${completedLessons} of ${totalLessons} lessons completed (${remainingLessons} remaining)`
              : 'Join over 12,000 students mastering this course.'}
          </p>
        </div>

        {isStarted && (
          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-extrabold text-brand-600 dark:text-brand-400 font-display">
              {progressPercent}%
            </span>
            <span className="text-xs text-slate-400 block font-medium">Completed</span>
          </div>
        )}
      </div>

      {/* Progress Bar (if started) */}
      {isStarted && (
        <div className="space-y-2">
          <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden p-0.5 border border-slate-200/50 dark:border-slate-700">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                status === 'completed'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                  : status === 'paused'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                  : 'bg-gradient-to-r from-brand to-indigo-600'
              }`}
              style={{ width: `${Math.max(4, progressPercent)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>0% (Enrolled)</span>
            <span>50% (Milestone)</span>
            <span>100% (Certified)</span>
          </div>
        </div>
      )}

      {/* Additional Progress Metadata Cards */}
      {isStarted && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-[11px] text-slate-400 block font-medium">Started Date</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate block">
                {startedDate}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center gap-3 sm:col-span-2">
            <BookOpen className="w-4 h-4 text-brand-500 shrink-0" />
            <div className="min-w-0">
              <span className="text-[11px] text-slate-400 block font-medium">Last Accessed Lesson</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate block">
                {lastLessonTitle}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Action Button & Guarantee Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          id="course-primary-action-btn"
          onClick={onPrimaryAction}
          className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm sm:text-base font-bold transition-all cursor-pointer ${action.btnClass}`}
        >
          {action.btnIcon}
          <span>{action.btnText}</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Self-paced access • Interactive code exercises included</span>
        </div>
      </div>
    </div>
  );
}
