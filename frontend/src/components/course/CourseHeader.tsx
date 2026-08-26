import React from 'react';
import { Course } from '../../types/course';
import {
  Clock,
  BookOpen,
  Bookmark,
  Share2,
  Check,
  Star,
  Users,
  Layers,
  Sparkles,
  Award,
} from 'lucide-react';

interface CourseHeaderProps {
  course: Course;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onShare: () => void;
  copiedLink: boolean;
}

export function CourseHeader({
  course,
  isBookmarked,
  onToggleBookmark,
  onShare,
  copiedLink,
}: CourseHeaderProps) {
  const moduleCount = course.syllabus?.length || 5;

  const colorStyles = {
    blue: 'from-brand to-brand-dark text-brand-500 bg-brand-50 dark:bg-brand-950/60 border-brand-200 dark:border-blue-800',
    purple: 'from-purple-600 to-violet-700 text-purple-500 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800',
    emerald: 'from-emerald-600 to-teal-700 text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
    amber: 'from-amber-500 to-orange-600 text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800',
    rose: 'from-rose-500 to-pink-600 text-rose-500 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800',
    indigo: 'from-indigo-600 to-blue-700 text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800',
    cyan: 'from-cyan-600 to-blue-600 text-cyan-500 bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-800',
  }[course.colorScheme || 'blue'];

  return (
    <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
      {/* Visual Accent Banner */}
      <div className={`h-36 sm:h-44 bg-gradient-to-r ${colorStyles.split(' ')[0]} ${colorStyles.split(' ')[1]} relative overflow-hidden flex items-end p-6 sm:p-8`}>
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Floating Category Tag */}
        <div className="relative z-10 flex flex-wrap items-center justify-between w-full gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/30">
              {course.category}
            </span>
            {course.featured && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/90 text-slate-950 flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3 fill-current" />
                <span>Featured</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="course-share-btn"
              onClick={onShare}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors cursor-pointer border border-white/20"
              aria-label="Share Course"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              id="course-header-bookmark-btn"
              onClick={onToggleBookmark}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer backdrop-blur-md border ${
                isBookmarked
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                  : 'bg-white/20 hover:bg-white/30 text-white border-white/20'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              <span>{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="p-6 sm:p-8 space-y-6">
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            {course.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
            {course.description}
          </p>
        </div>

        {/* Instructor & Meta row */}
        <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 font-medium text-slate-800 dark:text-slate-200">
            <div className="w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center font-bold text-xs">
              {course.instructor.charAt(0)}
            </div>
            <span>Instructor: <strong>{course.instructor}</strong></span>
          </div>

          <div className="flex items-center gap-1.5 text-amber-500 font-semibold">
            <Star className="w-4 h-4 fill-current" />
            <span>{course.rating || 4.9}</span>
            <span className="text-slate-400 font-normal">
              ({course.studentsEnrolled?.toLocaleString() || '12,400'} students)
            </span>
          </div>
        </div>

        {/* Course Statistics Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Difficulty Level</p>
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                {course.difficulty} {course.difficulty === 'Beginner' ? '→ Intermediate' : ''}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Total Duration</p>
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                {course.duration}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Curriculum Modules</p>
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                {moduleCount} Modules
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Total Lessons</p>
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                {course.totalLessons} Lessons
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
