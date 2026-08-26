import React from 'react';
import { Course } from '../../types/course';
import { CourseCard } from './CourseCard';
import { SearchX, RotateCcw } from 'lucide-react';

interface CourseGridProps {
  courses: Course[];
  onClearFilters: () => void;
  isLoading?: boolean;
}

export function CourseGrid({ courses, onClearFilters, isLoading = false }: CourseGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="h-80 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse border border-slate-200 dark:border-slate-700"
          />
        ))}
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div
        id="courses-empty-state"
        className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 my-6 space-y-4"
      >
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-700/60 text-slate-400 dark:text-slate-500">
          <SearchX className="w-10 h-10" />
        </div>
        <div className="space-y-1.5 max-w-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            No Courses Found
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Try changing your search or filters to find what you're looking for.
          </p>
        </div>
        <button
          type="button"
          id="clear-filters-empty-btn"
          onClick={onClearFilters}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-brand hover:bg-brand-dark text-white dark:bg-brand dark:hover:bg-brand transition-colors shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Clear Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          All Courses
        </h2>
        <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
          {courses.length} {courses.length === 1 ? 'Course' : 'Courses'} Available
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
