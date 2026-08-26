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
  Layers
} from 'lucide-react';

interface CourseCardProps {
  key?: React.Key;
  course: Course;
  featured?: boolean;
}

export function CourseCard({ course, featured = false }: CourseCardProps) {
  const { navigate } = useAuth();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const bookmarked = isBookmarked(course.id);
  const targetRoute = `/courses/${course.slug || course.id}`;

  const handleCardClick = () => {
    navigate(targetRoute);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(course.id, 'course', course.title);
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
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/40';
      case 'Intermediate':
        return 'bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300 border-brand-200/60 dark:border-brand-800/40';
      case 'Advanced':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/40';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  // Visual header gradient/color
  const getThumbnailBg = (scheme: string) => {
    switch (scheme) {
      case 'blue':
        return 'from-brand to-brand-dark dark:from-brand-dark dark:to-indigo-900';
      case 'purple':
        return 'from-purple-600 to-brand-dark dark:from-purple-700 dark:to-indigo-900';
      case 'emerald':
        return 'from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-900';
      case 'amber':
        return 'from-amber-600 to-orange-700 dark:from-amber-700 dark:to-orange-900';
      case 'rose':
        return 'from-rose-600 to-pink-700 dark:from-rose-700 dark:to-pink-900';
      case 'cyan':
        return 'from-cyan-600 to-blue-700 dark:from-cyan-700 dark:to-blue-900';
      case 'indigo':
      default:
        return 'from-indigo-600 to-slate-800 dark:from-indigo-700 dark:to-slate-900';
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
          progressBarColor: 'bg-brand dark:bg-blue-500',
          btnText: 'Continue',
          btnIcon: <Play className="w-4 h-4 fill-current" />,
          btnClass: 'bg-brand hover:bg-brand-dark text-white dark:bg-brand dark:hover:bg-brand shadow-sm shadow-brand/20',
        };
      case 'paused':
        return {
          statusBadge: (
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">
              Paused ({progress}%)
            </span>
          ),
          progressBarColor: 'bg-amber-500 dark:bg-amber-400',
          btnText: 'Resume',
          btnIcon: <RotateCcw className="w-4 h-4" />,
          btnClass: 'bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:hover:bg-amber-600 shadow-sm shadow-amber-500/20',
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
      id={`course-card-${course.id}`}
      onClick={handleCardClick}
      className={`group relative flex flex-col bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 cursor-pointer ${
        featured ? 'h-full' : ''
      }`}
    >
      {/* Visual Thumbnail Header */}
      <div className={`relative h-40 w-full bg-gradient-to-br ${getThumbnailBg(course.colorScheme)} p-4 flex flex-col justify-between overflow-hidden`}>
        {/* Subtle decorative geometric overlay */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute top-0 right-0 p-8 opacity-15 text-white pointer-events-none">
          {getCategoryIcon(course.category)}
        </div>

        {/* Top Badges Row */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 backdrop-blur-md shadow-xs">
            {getCategoryIcon(course.category)}
            <span>{course.category}</span>
          </span>

          <button
            type="button"
            id={`bookmark-btn-${course.id}`}
            onClick={handleBookmarkClick}
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark course'}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              bookmarked
                ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-sm'
                : 'bg-black/20 text-white/90 hover:bg-black/40 hover:text-white'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Thumbnail Metadata */}
        <div className="relative z-10 flex items-center justify-between text-white/90 text-xs">
          <span className={`px-2 py-0.5 rounded-md font-medium border text-xs ${getDifficultyBadge(course.difficulty)}`}>
            {course.difficulty}
          </span>
          {course.featured && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-400/90 text-slate-950 font-semibold text-[11px] shadow-xs">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Title */}
          <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-slate-100 leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Instructor & Stats */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700/60 pt-3">
            <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[150px]">
              {course.instructor}
            </span>
            <div className="flex items-center gap-3 shrink-0">
              <span className="inline-flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                {course.totalLessons} Lessons
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {course.duration}
              </span>
            </div>
          </div>

          {/* Progress Bar (If started) */}
          {course.status !== 'not-started' && (
            <div className="space-y-1.5 pt-0.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Progress</span>
                {statusConfig.statusBadge}
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
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
            className={`flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${statusConfig.btnClass}`}
          >
            {statusConfig.btnIcon}
            <span>{statusConfig.btnText}</span>
          </button>

          <button
            type="button"
            onClick={handleCardClick}
            className="px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/60 dark:hover:bg-slate-700 dark:text-slate-200 transition-colors shrink-0"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
