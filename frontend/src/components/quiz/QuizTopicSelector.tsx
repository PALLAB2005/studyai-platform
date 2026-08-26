import React from 'react';
import { Course } from '../../types/course';
import { Module } from '../../types/lesson';
import { BookOpen, Search, Sparkles, Layers, FileText, Check } from 'lucide-react';

interface QuizTopicSelectorProps {
  sourceType: 'course' | 'topic';
  onSourceTypeChange: (type: 'course' | 'topic') => void;
  // Courses
  courses: Course[];
  selectedCourseId: string;
  onCourseChange: (courseId: string) => void;
  // Course Scopes
  scope: 'entire-course' | 'module' | 'lesson';
  onScopeChange: (scope: 'entire-course' | 'module' | 'lesson') => void;
  modules: Module[];
  selectedModuleId: string;
  onModuleChange: (moduleId: string) => void;
  selectedLessonId: string;
  onLessonChange: (lessonId: string) => void;
  // Custom Topic
  customTopic: string;
  onCustomTopicChange: (topic: string) => void;
}

const POPULAR_TOPIC_SUGGESTIONS = [
  'JavaScript Functions',
  'React Hooks & State',
  'DBMS Normalization',
  'Python Data Structures',
  'CSS Grid & Flexbox',
  'Operating System Deadlocks',
  'Machine Learning Basics',
  'Binary Search Trees',
];

export function QuizTopicSelector({
  sourceType,
  onSourceTypeChange,
  courses,
  selectedCourseId,
  onCourseChange,
  scope,
  onScopeChange,
  modules,
  selectedModuleId,
  onModuleChange,
  selectedLessonId,
  onLessonChange,
  customTopic,
  onCustomTopicChange,
}: QuizTopicSelectorProps) {
  const currentModule = modules.find((m) => m.id === selectedModuleId) || modules[0];
  const availableLessons = currentModule ? currentModule.lessons : [];

  return (
    <div className="space-y-5">
      {/* Tab Switcher: Course vs Custom Topic */}
      <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-800/80 p-1.5 border border-slate-200/80 dark:border-slate-700/60">
        <button
          type="button"
          id="quiz-source-course-tab"
          onClick={() => onSourceTypeChange('course')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            sourceType === 'course'
              ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Select From My Courses</span>
        </button>

        <button
          type="button"
          id="quiz-source-topic-tab"
          onClick={() => onSourceTypeChange('topic')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            sourceType === 'topic'
              ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Search Any Subject / Topic</span>
        </button>
      </div>

      {/* Option 1: Select From My Courses */}
      {sourceType === 'course' && (
        <div className="space-y-4 p-5 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60">
          <div className="space-y-1.5">
            <label
              htmlFor="quiz-course-select"
              className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block"
            >
              Select Course
            </label>
            <select
              id="quiz-course-select"
              value={selectedCourseId}
              onChange={(e) => onCourseChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand cursor-pointer shadow-xs"
            >
              <option value="" disabled>
                -- Choose a StudyAI Course --
              </option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.difficulty} · {c.category})
                </option>
              ))}
            </select>
          </div>

          {/* Sub-scope selection once course is chosen */}
          {selectedCourseId && (
            <div className="space-y-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                Quiz Coverage Scope
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'entire-course', label: 'Entire Course', icon: BookOpen },
                  { id: 'module', label: 'Specific Module', icon: Layers },
                  { id: 'lesson', label: 'Specific Lesson', icon: FileText },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onScopeChange(item.id as any)}
                    className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      scope === item.id
                        ? 'border-blue-600 bg-brand-50/80 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Specific Module dropdown */}
              {(scope === 'module' || scope === 'lesson') && modules.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <label htmlFor="quiz-module-select" className="text-xs font-medium text-slate-500">
                    Select Module
                  </label>
                  <select
                    id="quiz-module-select"
                    value={selectedModuleId}
                    onChange={(e) => onModuleChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-brand cursor-pointer"
                  >
                    {modules.map((mod) => (
                      <option key={mod.id} value={mod.id}>
                        {mod.title} ({mod.lessons.length} lessons)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Specific Lesson dropdown */}
              {scope === 'lesson' && availableLessons.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <label htmlFor="quiz-lesson-select" className="text-xs font-medium text-slate-500">
                    Select Lesson
                  </label>
                  <select
                    id="quiz-lesson-select"
                    value={selectedLessonId}
                    onChange={(e) => onLessonChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-brand cursor-pointer"
                  >
                    {availableLessons.map((les) => (
                      <option key={les.id} value={les.id}>
                        {les.order}. {les.title} ({les.duration})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Option 2: Search Any Subject or Topic */}
      {sourceType === 'topic' && (
        <div className="space-y-4 p-5 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60">
          <div className="space-y-2">
            <label
              htmlFor="custom-topic-input"
              className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block"
            >
              Enter Subject or Custom Topic
            </label>

            <div className="relative">
              <input
                type="text"
                id="custom-topic-input"
                value={customTopic}
                onChange={(e) => onCustomTopicChange(e.target.value)}
                placeholder="Example: JavaScript Functions, DBMS Normalization, Python Loops"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand shadow-xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Quick Click Topic Suggestions */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-semibold text-slate-400 block">
              Suggested High-Yield Topics:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_TOPIC_SUGGESTIONS.map((sugg) => (
                <button
                  key={sugg}
                  type="button"
                  onClick={() => onCustomTopicChange(sugg)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    customTopic.toLowerCase() === sugg.toLowerCase()
                      ? 'bg-brand text-white border-blue-600'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                  }`}
                >
                  {sugg}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
