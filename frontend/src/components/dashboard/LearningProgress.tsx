import React from 'react';
import { TrendingUp, BookOpen, CheckCircle2, PauseCircle, Layers } from 'lucide-react';
import { LearningStats } from '../../types/learning';

interface LearningProgressProps {
  stats: LearningStats;
}

export function LearningProgress({ stats }: LearningProgressProps) {
  // SVG circular progress calculation
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (stats.overallProgress / 100) * circumference;

  return (
    <div
      id="learning-progress-overview"
      className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
            Overall Progress
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Your learning journey
          </p>
        </div>
        <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
          <TrendingUp className="w-4 h-4" />
        </div>
      </div>

      {/* Circular Progress Gauge */}
      <div className="flex items-center gap-6 justify-center py-2">
        <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="text-slate-100 dark:text-slate-800"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Progress ring */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="text-brand-600 transition-all duration-1000 ease-out"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">
              {stats.overallProgress}%
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Completed
            </span>
          </div>
        </div>

        <div className="space-y-1.5 text-left">
          <p className="text-xs font-bold text-slate-900 dark:text-white">
            Curriculum Status
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            You have finished <span className="font-semibold text-slate-800 dark:text-slate-200">{stats.completedCourses}</span> of{' '}
            <span className="font-semibold text-slate-800 dark:text-slate-200">{stats.totalCourses}</span> total courses.
          </p>
        </div>
      </div>

      {/* Breakdown Metrics */}
      <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-600 dark:text-slate-400">Total</span>
          </div>
          <span className="text-xs font-bold text-slate-900 dark:text-white">
            {stats.totalCourses}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100/60 dark:border-emerald-900/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs text-emerald-800 dark:text-emerald-300">Completed</span>
          </div>
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
            {stats.completedCourses}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/60 dark:border-brand-900/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-brand-500" />
            <span className="text-xs text-brand-700 dark:text-brand-300">In Progress</span>
          </div>
          <span className="text-xs font-bold text-brand-700 dark:text-brand-300">
            {stats.inProgressCourses}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100/60 dark:border-amber-900/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PauseCircle className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs text-amber-800 dark:text-amber-300">Paused</span>
          </div>
          <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
            {stats.pausedCourses}
          </span>
        </div>
      </div>
    </div>
  );
}
