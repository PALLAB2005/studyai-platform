import React from 'react';
import { CheckCircle2, Award, Calendar, ExternalLink, ArrowRight } from 'lucide-react';
import { CourseProgress } from '../../types/course';

interface CompletedCoursesProps {
  courses: CourseProgress[];
  onViewCourse: (course: CourseProgress) => void;
  onViewAllCompleted?: () => void;
}

export function CompletedCourses({
  courses,
  onViewCourse,
  onViewAllCompleted,
}: CompletedCoursesProps) {
  const completedCourses = courses
    .filter((c) => c.status === 'completed')
    .slice(0, 2);

  return (
    <section id="completed-courses-section" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
            Recently Completed
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Celebrate your finished milestones
          </p>
        </div>
        {onViewAllCompleted && (
          <button
            onClick={onViewAllCompleted}
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {completedCourses.map((course) => (
          <div
            key={course.courseId}
            id={`completed-course-${course.courseId}`}
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display line-clamp-1">
                      {course.courseName}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {course.category} • {course.completedLessons} Lessons
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Completed</span>
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Completed on: </span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {course.completedDate || course.lastAccessed}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                id={`view-completed-${course.courseId}`}
                onClick={() => onViewCourse(course)}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>View Course</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
