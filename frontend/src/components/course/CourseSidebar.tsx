import React, { useState } from 'react';
import { Course } from '../../types/course';
import { Module, Lesson, LessonStatus } from '../../types/lesson';
import { LessonItem } from './LessonItem';
import {
  X,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  BookOpen,
  Search,
  CheckCircle2,
  Layers,
} from 'lucide-react';

interface CourseSidebarProps {
  course: Course;
  modules: Module[];
  currentLessonId: string;
  completedLessonIds: Set<string>;
  onSelectLesson: (lesson: Lesson) => void;
  onBackToCourse: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export function CourseSidebar({
  course,
  modules,
  currentLessonId,
  completedLessonIds,
  onSelectLesson,
  onBackToCourse,
  isOpenMobile,
  onCloseMobile,
}: CourseSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    modules.forEach((m) => {
      map[m.id] = true;
    });
    return map;
  });

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = completedLessonIds.size;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const filteredModules = modules.map((mod) => ({
    ...mod,
    lessons: mod.lessons.filter((l) =>
      searchQuery ? l.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
    ),
  })).filter((mod) => mod.lessons.length > 0);

  const content = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      {/* Header with back button */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            id="sidebar-back-btn"
            onClick={onBackToCourse}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Course Details</span>
          </button>

          {/* Close for mobile */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white line-clamp-1 font-display">
            {course.title}
          </h2>
          <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
            <span>{completedCount} / {totalLessons} Lessons Finished</span>
            <span className="font-bold text-brand-600 dark:text-brand-400">{progressPercent}%</span>
          </div>
          {/* Mini progress bar */}
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mt-1.5">
            <div
              className="h-full bg-brand rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Quick Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            id="sidebar-lesson-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lessons..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-brand"
          />
        </div>
      </div>

      {/* Curriculum modules scroll area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {filteredModules.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400">
            No lessons match "{searchQuery}"
          </div>
        ) : (
          filteredModules.map((module) => {
            const isExpanded = expandedModules[module.id] ?? true;
            const modCompleted = module.lessons.filter((l) => completedLessonIds.has(l.id)).length;
            const isAllModDone = module.lessons.length > 0 && modCompleted === module.lessons.length;

            return (
              <div
                key={module.id}
                className="rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-800/20 overflow-hidden"
              >
                {/* Module Header in Sidebar */}
                <button
                  type="button"
                  id={`sidebar-mod-toggle-${module.id}`}
                  onClick={() => toggleModule(module.id)}
                  className="w-full p-2.5 text-left flex items-center justify-between gap-2 hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`p-1 rounded-md text-xs ${
                      isAllModDone
                        ? 'text-emerald-600 bg-emerald-100 dark:bg-emerald-950'
                        : 'text-brand-600 bg-brand-100 dark:bg-blue-950'
                    }`}>
                      {isAllModDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {module.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 text-slate-400">
                    <span className="text-[10px] font-medium">
                      {modCompleted}/{module.lessons.length}
                    </span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {/* Module Lessons */}
                {isExpanded && (
                  <div className="p-1.5 space-y-1 border-t border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900">
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
                          onSelectLesson={(l) => {
                            onSelectLesson(l);
                            onCloseMobile();
                          }}
                          compact={true}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-80 h-[calc(100vh-4rem)] sticky top-16 shrink-0">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-80 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
