import React from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Layers,
  Clock,
  BookOpen,
  BarChart3,
} from 'lucide-react';
import { QuizAnalysis } from '../../../types/quizAnalysis';

interface PerformanceSummaryProps {
  analysis: QuizAnalysis;
}

export function PerformanceSummary({ analysis }: PerformanceSummaryProps) {
  const {
    correctCount,
    incorrectCount,
    unansweredCount,
    totalQuestions,
    timeSpentSeconds,
    topic,
    difficulty,
  } = analysis;

  // Format seconds to mm:ss or hh:mm:ss
  const formatTime = (seconds: number) => {
    if (!seconds || seconds <= 0) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m >= 60) {
      const h = Math.floor(m / 60);
      const remM = m % 60;
      return `${h}h ${remM.toString().padStart(2, '0')}m`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const difficultyColors = {
    beginner: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    intermediate: 'bg-blue-500/10 text-brand-600 dark:text-brand-400 border-brand-500/20',
    advanced: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  }[difficulty] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';

  const metrics = [
    {
      id: 'metric-correct',
      label: 'Correct Answers',
      value: correctCount,
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
      subtext: `${totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0}% of quiz`,
      accent: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 'metric-incorrect',
      label: 'Incorrect Answers',
      value: incorrectCount,
      icon: <XCircle className="w-4 h-4 text-rose-500" />,
      subtext: `${totalQuestions > 0 ? Math.round((incorrectCount / totalQuestions) * 100) : 0}% of quiz`,
      accent: 'text-rose-600 dark:text-rose-400',
    },
    {
      id: 'metric-unanswered',
      label: 'Unanswered',
      value: unansweredCount,
      icon: <HelpCircle className="w-4 h-4 text-amber-500" />,
      subtext: unansweredCount === 0 ? 'All attempted' : 'Skipped questions',
      accent: 'text-amber-600 dark:text-amber-400',
    },
    {
      id: 'metric-total',
      label: 'Total Questions',
      value: totalQuestions,
      icon: <Layers className="w-4 h-4 text-brand-500" />,
      subtext: 'Evaluated items',
      accent: 'text-slate-900 dark:text-white',
    },
    {
      id: 'metric-time',
      label: 'Time Taken',
      value: formatTime(timeSpentSeconds),
      icon: <Clock className="w-4 h-4 text-indigo-500" />,
      subtext: timeSpentSeconds > 0 ? `~${Math.max(1, Math.round(timeSpentSeconds / (totalQuestions || 1)))}s / question` : 'Untimed session',
      accent: 'text-indigo-600 dark:text-indigo-400',
    },
  ];

  return (
    <div id="quiz-performance-summary" className="space-y-4">
      {/* Header with Topic & Difficulty Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Assessed Topic
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {topic}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Difficulty:</span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border capitalize ${difficultyColors}`}>
            {difficulty}
          </span>
        </div>
      </div>

      {/* 5-Column Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {metrics.map((m) => (
          <div
            key={m.id}
            id={m.id}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-2 transition-all hover:border-slate-300 dark:hover:border-slate-700"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">{m.label}</span>
              {m.icon}
            </div>
            <div>
              <span className={`text-2xl font-extrabold font-display ${m.accent}`}>
                {m.value}
              </span>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                {m.subtext}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
