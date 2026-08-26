import React from 'react';
import { Course } from '../../types/course';
import { useAuth } from '../../context/AuthContext';
import { useBookmarks } from '../../context/BookmarkContext';
import {
  Sparkles,
  Clock,
  BookOpen,
  Bookmark,
  ArrowRight,
  Play,
  RotateCcw,
  CheckCircle2,
  Users,
  Star
} from 'lucide-react';

interface FeaturedCoursesProps {
  courses: Course[];
}

export function FeaturedCourses({ courses }: FeaturedCoursesProps) {
  const { navigate } = useAuth();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  if (!courses || courses.length === 0) return null;

  return (
    <section className="space-y-4" aria-labelledby="featured-courses-heading">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 id="featured-courses-heading" className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Featured Courses
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Top rated, industry-aligned curriculums recommended for your learning track
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {courses.slice(0, 4).map((course) => {
          const bookmarked = isBookmarked(course.id);
          const targetRoute = `/courses/${course.slug || course.id}`;

          const getStatusDetails = () => {
            switch (course.status) {
              case 'in-progress':
                return {
                  text: 'Continue',
                  icon: <Play className="w-4 h-4 fill-current" />,
                  btnClass: 'bg-brand hover:bg-brand-dark text-white dark:bg-brand dark:hover:bg-brand shadow-sm shadow-brand/20',
                  badge: `${course.progress}% Complete`,
                  badgeClass: 'text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/40 border-brand-200/60 dark:border-brand-800/40',
                };
              case 'paused':
                return {
                  text: 'Resume',
                  icon: <RotateCcw className="w-4 h-4" />,
                  btnClass: 'bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:hover:bg-amber-600',
                  badge: `Paused (${course.progress}%)`,
                  badgeClass: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-200/60 dark:border-amber-800/40',
                };
              case 'completed':
                return {
                  text: 'Review',
                  icon: <CheckCircle2 className="w-4 h-4" />,
                  btnClass: 'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200',
                  badge: 'Completed',
                  badgeClass: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200/60 dark:border-emerald-800/40',
                };
              case 'not-started':
              default:
                return {
                  text: 'Start Course',
                  icon: <ArrowRight className="w-4 h-4" />,
                  btnClass: 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-brand dark:hover:bg-brand shadow-sm',
                  badge: course.difficulty,
                  badgeClass: 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
                };
            }
          };

          const status = getStatusDetails();

          return (
            <div
              key={course.id}
              id={`featured-course-${course.id}`}
              onClick={() => navigate(targetRoute)}
              className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/90 shadow-sm hover:shadow-md hover:border-brand-300 dark:hover:border-blue-500/50 transition-all duration-200 cursor-pointer"
            >
              {/* Top Row: Category & Bookmark */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-md bg-brand-50 text-brand-700 dark:bg-blue-950/50 dark:text-brand-300 border border-blue-200/50 dark:border-brand-800/40">
                    {course.category}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(course.id);
                    }}
                    aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark course'}
                    className={`p-1.5 rounded-lg transition-colors ${
                      bookmarked
                        ? 'text-amber-500 hover:text-amber-600 bg-amber-50 dark:bg-amber-950/40'
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>
              </div>

              {/* Middle: Details & Metrics */}
              <div className="space-y-3 pt-4 mt-2 border-t border-slate-100 dark:border-slate-700/60">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className={`px-2 py-0.5 rounded-md font-medium border text-[11px] ${status.badgeClass}`}>
                    {status.badge}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {course.duration}
                  </span>
                </div>

                {course.status !== 'not-started' && (
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand dark:bg-brand rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                )}

                {/* Bottom Action Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(targetRoute);
                  }}
                  className={`w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${status.btnClass}`}
                >
                  {status.icon}
                  <span>{status.text}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
