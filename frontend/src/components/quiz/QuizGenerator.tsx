import React, { useState } from 'react';
import { Course } from '../../types/course';
import { QuizGenerationParams, QuizDifficulty, QuestionType } from '../../types/quiz';
import { getCourseCurriculum } from '../../data/courseCurriculums';
import { QuizTopicSelector } from './QuizTopicSelector';
import { DifficultySelector } from './DifficultySelector';
import { QuestionCountSelector } from './QuestionCountSelector';
import { QuestionTypeSelector } from './QuestionTypeSelector';
import { TimerSelector } from './TimerSelector';
import { Sparkles, AlertCircle, RefreshCw, Zap } from 'lucide-react';

interface QuizGeneratorProps {
  courses: Course[];
  onGenerate: (params: QuizGenerationParams) => void;
  isGenerating: boolean;
}

export function QuizGenerator({
  courses,
  onGenerate,
  isGenerating,
}: QuizGeneratorProps) {
  const [sourceType, setSourceType] = useState<'course' | 'topic'>('course');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [scope, setScope] = useState<'entire-course' | 'module' | 'lesson'>('entire-course');
  
  // Curriculum data for selected course
  const modules = selectedCourseId ? getCourseCurriculum(selectedCourseId) : [];
  const [selectedModuleId, setSelectedModuleId] = useState<string>(modules[0]?.id || '');
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    modules[0]?.lessons[0]?.id || ''
  );

  const [customTopic, setCustomTopic] = useState<string>('');
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('intermediate');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [questionType, setQuestionType] = useState<QuestionType>('multiple-choice');
  const [timerMinutes, setTimerMinutes] = useState<number>(10);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // When course changes, update module & lesson defaults
  const handleCourseChange = (courseId: string) => {
    setSelectedCourseId(courseId);
    const newMods = getCourseCurriculum(courseId);
    if (newMods.length > 0) {
      setSelectedModuleId(newMods[0].id);
      setSelectedLessonId(newMods[0].lessons[0]?.id || '');
    }
  };

  const handleModuleChange = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    const mod = modules.find((m) => m.id === moduleId);
    if (mod && mod.lessons.length > 0) {
      setSelectedLessonId(mod.lessons[0].id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (sourceType === 'course') {
      if (!selectedCourseId) {
        setErrorMessage('Please select a course to generate the quiz.');
        return;
      }
    } else {
      if (!customTopic.trim()) {
        setErrorMessage('Please enter a subject or topic (e.g., "JavaScript Functions" or "DBMS Normalization").');
        return;
      }
    }

    const currentCourse = courses.find((c) => c.id === selectedCourseId);
    const currentMod = modules.find((m) => m.id === selectedModuleId);
    const currentLesson = currentMod?.lessons.find((l) => l.id === selectedLessonId);

    const params: QuizGenerationParams = {
      sourceType,
      courseId: sourceType === 'course' ? selectedCourseId : undefined,
      courseTitle: sourceType === 'course' ? currentCourse?.title : undefined,
      scope: sourceType === 'course' ? scope : undefined,
      moduleId: sourceType === 'course' && (scope === 'module' || scope === 'lesson') ? selectedModuleId : undefined,
      moduleTitle: sourceType === 'course' && (scope === 'module' || scope === 'lesson') ? currentMod?.title : undefined,
      lessonId: sourceType === 'course' && scope === 'lesson' ? selectedLessonId : undefined,
      lessonTitle: sourceType === 'course' && scope === 'lesson' ? currentLesson?.title : undefined,
      topic: sourceType === 'topic' ? customTopic.trim() : undefined,
      difficulty,
      questionCount,
      questionType,
      timerMinutes,
    };

    onGenerate(params);
  };

  const handleResetForm = () => {
    setSourceType('course');
    setSelectedCourseId(courses[0]?.id || '');
    setScope('entire-course');
    setCustomTopic('');
    setDifficulty('intermediate');
    setQuestionCount(10);
    setQuestionType('multiple-choice');
    setTimerMinutes(10);
    setErrorMessage(null);
  };

  return (
    <div className="max-w-3xl mx-auto w-full space-y-8">
      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-8"
      >
        {/* Step 1: Select Topic / Course */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand text-white text-xs font-bold font-display">
              1
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Target Knowledge Area
            </h3>
          </div>

          <QuizTopicSelector
            sourceType={sourceType}
            onSourceTypeChange={setSourceType}
            courses={courses}
            selectedCourseId={selectedCourseId}
            onCourseChange={handleCourseChange}
            scope={scope}
            onScopeChange={setScope}
            modules={modules}
            selectedModuleId={selectedModuleId}
            onModuleChange={handleModuleChange}
            selectedLessonId={selectedLessonId}
            onLessonChange={setSelectedLessonId}
            customTopic={customTopic}
            onCustomTopicChange={setCustomTopic}
          />
        </section>

        {/* Step 2: Difficulty Selection */}
        <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand text-white text-xs font-bold font-display">
              2
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Difficulty Tier
            </h3>
          </div>

          <DifficultySelector
            difficulty={difficulty}
            onSelectDifficulty={setDifficulty}
          />
        </section>

        {/* Step 3: Question Count & Format */}
        <section className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand text-white text-xs font-bold font-display">
              3
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Quiz Structure & Rules
            </h3>
          </div>

          <QuestionCountSelector
            count={questionCount}
            onSelectCount={setQuestionCount}
          />

          <QuestionTypeSelector
            questionType={questionType}
            onSelectType={setQuestionType}
          />

          <TimerSelector
            timerMinutes={timerMinutes}
            onSelectTimer={setTimerMinutes}
          />
        </section>

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-medium flex items-center gap-2.5 animate-in shake duration-200">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleResetForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Settings</span>
          </button>

          <button
            type="submit"
            id="generate-ai-quiz-btn"
            disabled={isGenerating}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 py-4 px-8 rounded-2xl font-extrabold text-sm sm:text-base text-white bg-gradient-to-r from-brand via-indigo-600 to-blue-700 hover:from-brand-dark hover:to-brand-dark shadow-xl shadow-brand/25 hover:shadow-blue-600/40 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span>✨ Generate AI Quiz</span>
          </button>
        </div>
      </form>
    </div>
  );
}
