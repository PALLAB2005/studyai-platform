import React, { useState } from 'react';
import { Module, Lesson } from '../../types/lesson';
import { ModuleAccordion } from './ModuleAccordion';
import { Layers, ChevronDown, ChevronUp } from 'lucide-react';

interface CourseCurriculumProps {
  modules: Module[];
  completedLessonIds: Set<string>;
  currentLessonId?: string;
  onSelectLesson: (lesson: Lesson) => void;
}

export function CourseCurriculum({
  modules,
  completedLessonIds,
  currentLessonId,
  onSelectLesson,
}: CourseCurriculumProps) {
  const [expandAll, setExpandAll] = useState(true);

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalCompleted = Array.from(completedLessonIds).length;

  return (
    <div className="space-y-4">
      {/* Top section heading and controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
            Course Curriculum
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {modules.length} Modules • {totalLessons} Lessons • {totalCompleted} of {totalLessons} Completed
          </p>
        </div>

        <button
          type="button"
          id="curriculum-toggle-expand-all"
          onClick={() => setExpandAll((prev) => !prev)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
        >
          {expandAll ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Collapse All Modules</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Expand All Modules</span>
            </>
          )}
        </button>
      </div>

      {/* Modules List */}
      <div className="space-y-3">
        {modules.map((module, idx) => (
          <ModuleAccordion
            key={module.id}
            module={module}
            completedLessonIds={completedLessonIds}
            currentLessonId={currentLessonId}
            onSelectLesson={onSelectLesson}
            defaultExpanded={expandAll}
          />
        ))}
      </div>
    </div>
  );
}
