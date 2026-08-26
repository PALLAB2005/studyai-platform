import React from 'react';
import { Clock, AlertTriangle, ArrowLeft, Shield, Zap, Flame } from 'lucide-react';
import { QuizDifficulty } from '../../types/quiz';

interface QuizProgressProps {
  currentIndex: number;
  totalQuestions: number;
  topicTitle: string;
  difficulty: QuizDifficulty;
  timeRemainingSeconds: number | null;
  onExit: () => void;
}

export function QuizProgress({
  currentIndex,
  totalQuestions,
  topicTitle,
  difficulty,
  timeRemainingSeconds,
  onExit,
}: QuizProgressProps) {
  const currentNum = currentIndex + 1;
  const progressPercent = Math.round((currentNum / totalQuestions) * 100);

  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeRemainingSeconds !== null && timeRemainingSeconds <= 60 && timeRemainingSeconds > 0;

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 space-y-3">
        {/* Top Strip */}
        <div className="flex items-center justify-between gap-3">
          {/* Back / Exit */}
          <button
            type="button"
            onClick={onExit}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit Quiz</span>
          </button>

          {/* Topic Title & Difficulty Pill */}
          <div className="flex items-center gap-2 max-w-[200px] sm:max-w-md truncate">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
              {topicTitle}
            </span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {difficulty}
            </span>
          </div>

          {/* Timer Badge (if timed) */}
          {timeRemainingSeconds !== null ? (
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold font-mono transition-colors ${
                isLowTime
                  ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 animate-pulse'
                  : 'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-blue-800'
              }`}
            >
              {isLowTime ? (
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              ) : (
                <Clock className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              )}
              <span>{formatTime(timeRemainingSeconds)}</span>
            </div>
          ) : (
            <div className="text-xs text-slate-400 font-medium">Self-Paced</div>
          )}
        </div>

        {/* Progress Bar & Question Counter */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-brand-600 dark:text-brand-400 font-bold">
              Question {currentNum} of {totalQuestions}
            </span>
            <span className="text-slate-400">{progressPercent}% complete</span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand to-indigo-600 transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
