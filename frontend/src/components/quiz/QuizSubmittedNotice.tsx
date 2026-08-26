import React from 'react';
import { QuizAttemptResult } from '../../types/quiz';
import { Award, CheckCircle2, RotateCcw, ArrowRight, Sparkles, BarChart2, BookOpen, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface QuizSubmittedNoticeProps {
  result: QuizAttemptResult;
  onRetake: () => void;
  onGoToGenerator: () => void;
  onGoToDashboard: () => void;
}

export function QuizSubmittedNotice({
  result,
  onRetake,
  onGoToGenerator,
  onGoToDashboard,
}: QuizSubmittedNoticeProps) {
  const { navigate } = useAuth();

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remaining = sec % 60;
    return `${mins}m ${remaining}s`;
  };

  return (
    <div className="max-w-xl mx-auto w-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
      {/* Trophy Badge */}
      <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand to-indigo-600 text-white flex items-center justify-center shadow-xl shadow-brand/25 relative">
        <Award className="w-10 h-10" />
        <div className="absolute -top-1 -right-1 p-1.5 rounded-full bg-emerald-500 text-white shadow-sm">
          <CheckCircle2 className="w-4 h-4" />
        </div>
      </div>

      {/* Heading */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>Quiz Submitted Successfully</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
          {result.passed ? 'Great Job!' : 'Quiz Completed!'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          You finished <strong className="text-slate-900 dark:text-white">{result.quizTitle}</strong>
        </p>
      </div>

      {/* Score Summary Box */}
      <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-center">
        <div>
          <span className="text-[11px] text-slate-400 block font-medium">Score</span>
          <span className="text-lg font-extrabold text-brand-600 dark:text-brand-400 font-display">
            {result.score} / {result.totalQuestions}
          </span>
        </div>

        <div>
          <span className="text-[11px] text-slate-400 block font-medium">Accuracy</span>
          <span className="text-lg font-extrabold text-slate-900 dark:text-white font-display">
            {result.percentage}%
          </span>
        </div>

        <div>
          <span className="text-[11px] text-slate-400 block font-medium">Time Taken</span>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1 mt-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{formatSeconds(result.timeSpentSeconds)}</span>
          </span>
        </div>
      </div>

      {/* Primary Call to Action: View Result Page */}
      <div className="space-y-3 pt-1">
        <button
          type="button"
          onClick={() => navigate(`/quiz/${result.quizId}/result`)}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold bg-brand hover:bg-brand-dark text-white shadow-lg shadow-brand/25 transition-all cursor-pointer"
        >
          <BarChart2 className="w-4 h-4" />
          <span>View Performance & Weak Topic Analysis</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={onRetake}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Quiz</span>
          </button>

          <button
            type="button"
            onClick={onGoToGenerator}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>New Quiz</span>
          </button>
        </div>
      </div>
    </div>
  );
}
