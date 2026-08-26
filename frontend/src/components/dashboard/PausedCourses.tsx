import React from 'react';
import { PauseCircle, Play, ArrowRight, Clock, FileText } from 'lucide-react';
import { CourseProgress } from '../../types/course';

interface PausedCoursesProps {
  courses: CourseProgress[];
  onResumeCourse: (course: CourseProgress) => void;
  onViewDetails: (course: CourseProgress) => void;
  onViewAll: () => void;
}

export function PausedCourses({
  courses,
  onResumeCourse,
  onViewDetails,
  onViewAll,
}: PausedCoursesProps) {
  const pausedCourses = courses.filter((c) => c.status === 'paused');

  return (
    <section id="paused-courses-section" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
            Paused Courses
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Resume when you are ready to study
          </p>
        </div>
        <button
          id="paused-courses-view-all-btn"
          onClick={onViewAll}
          className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pausedCourses.map((course) => (
          <div
            key={course.courseId}
            id={`paused-course-${course.courseId}`}
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                    <PauseCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display line-clamp-1">
                      {course.courseName}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {course.category} • {course.level}
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 shrink-0">
                  {course.progress}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-3">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Last studied: </span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {course.lastAccessed}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                id={`resume-btn-${course.courseId}`}
                onClick={() => onResumeCourse(course)}
                className="w-full py-2 px-3 rounded-xl bg-brand hover:bg-brand-dark active:bg-brand-dark text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current ml-0.5" />
                <span>Resume</span>
              </button>

              <button
                id={`details-btn-${course.courseId}`}
                onClick={() => onViewDetails(course)}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileText className="w-3 h-3" />
                <span>View Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
