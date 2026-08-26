import React from 'react';
import { Play, BookOpen, Clock, User, CheckCircle, ArrowUpRight } from 'lucide-react';
import { CourseProgress } from '../../types/course';

interface ContinueLearningProps {
  courses: CourseProgress[];
  onSelectCourse: (course: CourseProgress) => void;
}

export function ContinueLearning({ courses, onSelectCourse }: ContinueLearningProps) {
  // Only in-progress courses
  const inProgressCourses = courses.filter((c) => c.status === 'in-progress');

  const getGradientByScheme = (scheme: string) => {
    switch (scheme) {
      case 'purple':
        return 'from-purple-500/10 via-brand/5 to-transparent border-purple-200 dark:border-purple-900/50';
      case 'emerald':
        return 'from-emerald-500/10 via-teal-500/5 to-transparent border-emerald-200 dark:border-emerald-900/50';
      case 'amber':
        return 'from-amber-500/10 via-orange-500/5 to-transparent border-amber-200 dark:border-amber-900/50';
      case 'rose':
        return 'from-rose-500/10 via-pink-500/5 to-transparent border-rose-200 dark:border-rose-900/50';
      case 'blue':
      default:
        return 'from-brand/10 via-brand/5 to-transparent border-brand-200 dark:border-brand-900/50';
    }
  };

  const getBadgeColor = (scheme: string) => {
    switch (scheme) {
      case 'purple':
        return 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300';
      case 'emerald':
        return 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300';
      case 'amber':
        return 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300';
      case 'rose':
        return 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300';
      case 'blue':
      default:
        return 'bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300';
    }
  };

  const getProgressBarColor = (scheme: string) => {
    switch (scheme) {
      case 'purple':
        return 'bg-purple-600';
      case 'emerald':
        return 'bg-emerald-600';
      case 'amber':
        return 'bg-amber-600';
      case 'rose':
        return 'bg-rose-600';
      case 'blue':
      default:
        return 'bg-blue-600';
    }
  };

  return (
    <section id="continue-learning-section" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
            Continue Learning
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pick up right where you left off
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
          {inProgressCourses.length} active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {inProgressCourses.map((course) => {
          return (
            <div
              key={course.courseId}
              id={`course-card-${course.courseId}`}
              className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-5 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200"
            >
              {/* Thumbnail / Header Graphic */}
              <div className="space-y-3.5">
                <div
                  className={`h-28 rounded-xl bg-gradient-to-br ${getGradientByScheme(
                    course.colorScheme
                  )} border p-3 flex flex-col justify-between relative overflow-hidden`}
                >
                  <div className="flex items-center justify-between gap-2 z-10">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${getBadgeColor(
                        course.colorScheme
                      )}`}
                    >
                      {course.category}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {course.level}
                    </span>
                  </div>

                  <div className="flex items-center justify-between z-10">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 text-xs font-semibold">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-brand-600 dark:text-brand-400" />
                    </div>
                  </div>
                </div>

                {/* Course Metadata */}
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white font-display line-clamp-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {course.courseName}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{course.instructor}</span>
                </div>
              </div>

              {/* Progress Section */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-900 dark:text-white font-bold">
                    {course.progress}% Complete
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {course.completedLessons} / {course.totalLessons} Lessons
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getProgressBarColor(
                      course.colorScheme
                    )}`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                {/* Action Button */}
                <button
                  id={`continue-btn-${course.courseId}`}
                  onClick={() => onSelectCourse(course)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-black dark:bg-brand dark:hover:bg-brand text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs group-hover:shadow-sm"
                >
                  <span>Continue</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
