import React, { useState } from 'react';
import { Module, Lesson, LessonStatus } from '../../types/lesson';
import { LessonItem } from './LessonItem';
import { ChevronDown, ChevronUp, Layers, CheckCircle2, Clock } from 'lucide-react';

interface ModuleAccordionProps {
  key?: React.Key;
  module: Module;
  completedLessonIds: Set<string>;
  currentLessonId?: string;
  onSelectLesson: (lesson: Lesson) => void;
  defaultExpanded?: boolean;
}

export function ModuleAccordion({
  module,
  completedLessonIds,
  currentLessonId,
  onSelectLesson,
  defaultExpanded = true,
}: ModuleAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const totalLessons = module.lessons.length;
  const completedInModule = module.lessons.filter((l) => completedLessonIds.has(l.id)).length;
  const isModuleFullyComplete = totalLessons > 0 && completedInModule === totalLessons;

  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden shadow-xs transition-all">
      {/* Accordion Header */}
      <button
        type="button"
        id={`module-accordion-header-${module.id}`}
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full p-4 sm:p-5 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
      >
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 sm:mt-0 ${
            isModuleFullyComplete
              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
              : 'bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400'
          }`}>
            {isModuleFullyComplete ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <Layers className="w-5 h-5" />
            )}
          </div>

          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                {module.title}
              </h3>
              {isModuleFullyComplete && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Completed
                </span>
              )}
            </div>

            {module.description && (
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                {module.description}
              </p>
            )}

            <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {module.duration}
              </span>
              <span>•</span>
              <span>{totalLessons} Lessons</span>
              <span>•</span>
              <span className={completedInModule > 0 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}>
                {completedInModule} / {totalLessons} Finished
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-center">
          <div className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </button>

      {/* Expanded Lessons List */}
      {isExpanded && (
        <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 dark:border-slate-800 space-y-2.5 bg-slate-50/40 dark:bg-slate-900/30">
          <div className="pt-3 space-y-2.5">
            {module.lessons.map((lesson) => {
              const isCompleted = completedLessonIds.has(lesson.id);
              const isCurrent = currentLessonId === lesson.id;
              
              let status: LessonStatus = 'not-started';
              if (isCompleted) status = 'completed';
              else if (isCurrent) status = 'current';

              return (
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  status={status}
                  isCurrent={isCurrent}
                  onSelectLesson={onSelectLesson}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
