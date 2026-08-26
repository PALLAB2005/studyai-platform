import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  TrendingUp,
  BarChart2,
  Layers,
} from 'lucide-react';
import { TopicPerformance, PerformanceLevel } from '../../../types/quizAnalysis';

interface TopicPerformanceBreakdownProps {
  topics: TopicPerformance[];
  isPerfectScore?: boolean;
}

export function TopicPerformanceBreakdown({
  topics,
  isPerfectScore,
}: TopicPerformanceBreakdownProps) {
  const getBadge = (level: PerformanceLevel, accuracy: number) => {
    switch (level) {
      case 'strong':
        return {
          label: 'Strong',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
          classes: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
          barColor: 'bg-emerald-500',
        };
      case 'needs-improvement':
        return {
          label: 'Needs Improvement',
          icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
          classes: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
          barColor: 'bg-amber-500',
        };
      case 'weak':
      default:
        return {
          label: 'Weak Topic',
          icon: <AlertCircle className="w-4 h-4 text-rose-500" />,
          classes: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
          barColor: 'bg-rose-500',
        };
    }
  };

  return (
    <section id="topic-performance-breakdown" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <BarChart2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
              Topic Performance Breakdown
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluated accuracy and mastery across conceptual areas
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
        {/* Responsive Table / Card View */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {topics.map((t, idx) => {
            const badge = getBadge(t.level, t.accuracy);
            return (
              <div
                key={`${t.topic}-${idx}`}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
              >
                {/* Topic Info & Accuracy Bar */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between pr-4">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {t.topic}
                    </span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 sm:hidden">
                      {t.accuracy}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden flex">
                    <div
                      className={`h-full ${badge.barColor} rounded-full transition-all duration-700`}
                      style={{ width: `${Math.max(4, t.accuracy)}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span>
                      Questions: <strong className="text-slate-700 dark:text-slate-200">{t.totalQuestions}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Correct: <strong className="text-emerald-600 dark:text-emerald-400">{t.correctAnswers}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Incorrect: <strong className="text-rose-600 dark:text-rose-400">{t.incorrectAnswers + t.unansweredAnswers}</strong>
                    </span>
                  </div>
                </div>

                {/* Score & Status Badge */}
                <div className="flex items-center justify-between sm:justify-end gap-4 min-w-[190px]">
                  <div className="hidden sm:block text-right">
                    <span className="text-base font-extrabold font-display text-slate-900 dark:text-white block">
                      {t.accuracy}%
                    </span>
                    <span className="text-[11px] text-slate-400">Accuracy</span>
                  </div>

                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${badge.classes}`}
                  >
                    {badge.icon}
                    <span>{badge.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
