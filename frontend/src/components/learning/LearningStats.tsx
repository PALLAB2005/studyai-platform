import React from 'react';
import { PlayCircle, PauseCircle, CheckCircle2, Bookmark, Flame, TrendingUp } from 'lucide-react';
import { LearningStats as LearningStatsType } from '../../types/learning';

interface LearningStatsProps {
  stats: LearningStatsType;
}

export function LearningStats({ stats }: LearningStatsProps) {
  const cards = [
    {
      id: 'stat-in-progress',
      label: 'Courses In Progress',
      value: stats.inProgressCourses,
      icon: PlayCircle,
      badgeText: 'Active',
      color: 'blue',
      bgColor: 'bg-brand-50 dark:bg-brand-950/40 border-blue-100 dark:border-brand-900/40 text-brand-600 dark:text-brand-400',
      badgeColor: 'bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300',
    },
    {
      id: 'stat-paused',
      label: 'Paused Courses',
      value: stats.pausedCourses,
      icon: PauseCircle,
      badgeText: 'On Hold',
      color: 'amber',
      bgColor: 'bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900/40 text-amber-600 dark:text-amber-400',
      badgeColor: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300',
    },
    {
      id: 'stat-completed',
      label: 'Completed Courses',
      value: stats.completedCourses,
      icon: CheckCircle2,
      badgeText: 'Achieved',
      color: 'emerald',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/40 text-emerald-600 dark:text-emerald-400',
      badgeColor: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300',
    },
    {
      id: 'stat-saved',
      label: 'Saved Resources',
      value: stats.savedCourses || 0,
      icon: Bookmark,
      badgeText: 'Library',
      color: 'indigo',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-100 dark:border-indigo-900/40 text-indigo-600 dark:text-indigo-400',
      badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300',
    },
  ];

  return (
    <section id="learning-stats-section" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            id={card.id}
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${card.bgColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${card.badgeColor}`}>
                {card.badgeText}
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                  {card.value}
                </span>
                <span className="text-xs text-slate-500 font-medium">courses</span>
              </div>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">
                {card.label}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
