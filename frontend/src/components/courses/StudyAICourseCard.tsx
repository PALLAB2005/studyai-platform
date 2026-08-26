import React from 'react';
import { Course, CourseStatus } from '../../types/course';
import { useAuth } from '../../context/AuthContext';
import { useBookmarks } from '../../context/BookmarkContext';
import {
  Clock,
  BookOpen,
  Bookmark,
  ArrowRight,
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Code,
  Database,
  Brain,
  Shield,
  Briefcase,
  Terminal,
  Cpu,
  Layers,
  GraduationCap
} from 'lucide-react';

interface StudyAICourseCardProps {
  key?: React.Key;
  course: Course;
  featured?: boolean;
}

export function StudyAICourseCard({ course, featured = false }: StudyAICourseCardProps) {
  const { navigate } = useAuth();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const bookmarked = isBookmarked(course.id, 'course');
  const targetRoute = `/courses/${course.slug || course.id}`;

  const handleCardClick = () => {
    navigate(targetRoute);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(course.id, 'course', {
      title: course.title,
      description: course.description,
      category: course.category,
      difficulty: course.difficulty,
      duration: course.duration,
      courseId: course.id,
    });
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(targetRoute);
  };

  // Category Icon helper
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'web development':
        return <Code className="w-4 h-4" />;
      case 'programming':
        return <Terminal className="w-4 h-4" />;
      case 'data science':
        return <Cpu className="w-4 h-4" />;
      case 'artificial intelligence':
        return <Brain className="w-4 h-4" />;
      case 'database':
      case 'databases':
        return <Database className="w-4 h-4" />;
      case 'cyber security':
        return <Shield className="w-4 h-4" />;
      case 'software engineering':
        return <Layers className="w-4 h-4" />;
      case 'career skills':
        return <Briefcase className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  // Difficulty badge styling
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/40';
      case 'Intermediate':
        return 'bg-brand-50 text-brand-700 dark:bg-blue-950/50 dark:text-brand-300 border-brand-200/60 dark:border-brand-800/40';
      case 'Advanced':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/40';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  // Visual header gradient/color
  const getThumbnailBg = (scheme: string) => {
    switch (scheme) {
      case 'blue':
        return 'from-brand via-brand-dark to-indigo-800';
      case 'purple':
        return 'from-purple-600 via-indigo-600 to-purple-800';
      case 'emerald':
        return 'from-emerald-600 via-teal-600 to-teal-800';
      case 'amber':
        return 'from-amber-600 via-orange-600 to-orange-800';
      case 'rose':
        return 'from-rose-600 via-pink-600 to-rose-800';
      case 'cyan':
        return 'from-cyan-600 via-blue-600 to-indigo-800';
      case 'indigo':
      default:
        return 'from-indigo-600 via-indigo-700 to-slate-900';
    }
  };

  // Status Action config
  const renderStatusUI = (status: CourseStatus, progress: number) => {
    switch (status) {
      case 'in-progress':
        return {
          statusBadge: (
            <span className="text-xs font-semibold text-brand-700 dark:text-brand-300">
              {progress}% Complete
            </span>
          ),
          progressBarColor: 'bg-brand dark:bg-blue-400',
          btnText: 'Continue Learning',
          btnIcon: <Play className="w-4 h-4 fill-current" />,
          btnClass: 'bg-brand hover:bg-brand-dark text-white dark:bg-brand dark:hover:bg-brand shadow-sm shadow-blue-500/25',
        };
      case 'paused':
        return {
          statusBadge: (
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">
              Paused ({progress}%)
            </span>
          ),
          progressBarColor: 'bg-amber-500 dark:bg-amber-400',
          btnText: 'Resume Course',
          btnIcon: <RotateCcw className="w-4 h-4" />,
          btnClass: 'bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:hover:bg-amber-600 shadow-sm shadow-amber-500/25',
        };
      case 'completed':
        return {
          statusBadge: (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" /> Completed
            </span>
          ),
          progressBarColor: 'bg-emerald-500 dark:bg-emerald-400',
          btnText: 'Review Course',
          btnIcon: <CheckCircle2 className="w-4 h-4" />,
          btnClass: 'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 border border-slate-200 dark:border-slate-700',
        };
      case 'not-started':
      default:
        return {
          statusBadge: null,
          progressBarColor: '',
          btnText: 'Start Course',
          btnIcon: <ArrowRight className="w-4 h-4" />,
          btnClass: 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-brand dark:hover:bg-brand shadow-sm',
        };
    }
  };

  const statusConfig = renderStatusUI(course.status, course.progress);

  return (
    <div
      id={`studyai-course-card-${course.id}`}
      onClick={handleCardClick}
      className={`group relative flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-lg hover:border-brand-300 dark:hover:border-blue-700/60 transition-all duration-300 cursor-pointer ${
        featured ? 'h-full' : ''
      }`}
    >
      {/* Visual Thumbnail Header */}
      <div className={`relative h-44 w-full bg-gradient-to-br ${getThumbnailBg(course.colorScheme)} p-4 flex flex-col justify-between overflow-hidden`}>
        {/* Decorative backdrop elements */}
        <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute top-2 right-2 p-4 opacity-10 text-white pointer-events-none transform rotate-12">
          {getCategoryIcon(course.category)}
        </div>

        {/* Top Badges Row */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 backdrop-blur-md shadow-xs">
              <GraduationCap className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>StudyAI Course</span>
            </span>
          </div>

          <button
            type="button"
            id={`studyai-bookmark-btn-${course.id}`}
            onClick={handleBookmarkClick}
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark course'}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              bookmarked
                ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-sm'
                : 'bg-black/25 text-white/90 hover:bg-black/40 hover:text-white'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Thumbnail Row */}
        <div className="relative z-10 flex items-center justify-between text-white/90 text-xs">
          <span className={`px-2.5 py-1 rounded-lg font-semibold border text-xs shadow-2xs ${getDifficultyBadge(course.difficulty)}`}>
            {course.difficulty}
          </span>
          {course.featured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-bold text-[11px] shadow-sm">
              <Sparkles className="w-3 h-3 fill-current" /> Featured
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400">
            {getCategoryIcon(course.category)}
            <span>{course.category}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Instructor & Meta details */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
            <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[140px]">
              {course.instructor}
            </span>
            <div className="flex items-center gap-3 shrink-0">
              <span className="inline-flex items-center gap-1 font-medium">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                {course.totalLessons} Lessons
              </span>
              <span className="inline-flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {course.duration}
              </span>
            </div>
          </div>

          {/* Progress Bar (If started) */}
          {course.status !== 'not-started' && (
            <div className="space-y-1.5 pt-0.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Progress</span>
                {statusConfig.statusBadge}
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${statusConfig.progressBarColor}`}
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={handleActionClick}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${statusConfig.btnClass}`}
          >
            {statusConfig.btnIcon}
            <span>{statusConfig.btnText}</span>
          </button>

          <button
            type="button"
            onClick={handleCardClick}
            className="px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 transition-colors shrink-0"
          >
            View Course
          </button>
        </div>
      </div>
    </div>
  );
}
