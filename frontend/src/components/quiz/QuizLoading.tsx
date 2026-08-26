import React from 'react';
import { Sparkles, Brain, Loader2, Shield, Zap, Flame, Clock } from 'lucide-react';
import { QuizGenerationParams } from '../../types/quiz';

interface QuizLoadingProps {
  params: QuizGenerationParams | null;
}

export function QuizLoading({ params }: QuizLoadingProps) {
  const topicTitle =
    params?.sourceType === 'course'
      ? params.scope === 'lesson' && params.lessonTitle
        ? params.lessonTitle
        : params.scope === 'module' && params.moduleTitle
        ? params.moduleTitle
        : params.courseTitle || 'Selected Course'
      : params?.topic || 'Custom Subject';

  const difficulty = params?.difficulty || 'intermediate';
  const questionCount = params?.questionCount || 10;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center animate-in zoom-in-95 duration-200">
        {/* Animated AI Engine Icon */}
        <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-blue-600/20 dark:bg-blue-500/20 animate-ping" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand to-indigo-600 text-white flex items-center justify-center shadow-xl shadow-blue-600/30">
            <Sparkles className="w-8 h-8 animate-spin duration-1000" />
          </div>
        </div>

        {/* Headings */}
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">
            Creating Your Quiz ✨
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            Analyzing your selected topic and preparing personalized questions...
          </p>
        </div>

        {/* Configuration summary badge strip */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2 text-left">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Target Topic</span>
            <span className="font-bold text-slate-900 dark:text-white truncate max-w-[220px]">
              {topicTitle}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Difficulty Level</span>
            <span className="font-bold capitalize text-brand-600 dark:text-brand-400">
              {difficulty}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Question Pool</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {questionCount} Questions
            </span>
          </div>
        </div>

        {/* Pulsing Skeleton Preview */}
        <div className="space-y-3 pt-2 text-left">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-3/4 animate-pulse" />
          <div className="space-y-2">
            <div className="h-10 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800 animate-pulse" />
            <div className="h-10 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800 animate-pulse" />
          </div>
        </div>

        {/* Subtle loading spinner text */}
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Validating quiz format & generating options...</span>
        </div>
      </div>
    </div>
  );
}
