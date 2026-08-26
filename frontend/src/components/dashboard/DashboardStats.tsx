import React from 'react';
import { BookOpen, CheckCircle2, PauseCircle, Flame } from 'lucide-react';
import { LearningStats } from '../../types/learning';

interface DashboardStatsProps {
  stats: LearningStats;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      id: 'stat-in-progress',
      title: 'Courses in Progress',
      value: stats.inProgressCourses.toString(),
      subtitle: 'Courses currently active',
      icon: BookOpen,
      color: 'blue',
      badge: 'Active',
      badgeColor: 'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border-brand-200 dark:border-blue-800',
      iconBg: 'bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400',
    },
    {
      id: 'stat-completed',
      title: 'Completed Courses',
      value: stats.completedCourses.toString(),
      subtitle: 'Courses completed successfully',
      icon: CheckCircle2,
      color: 'emerald',
      badge: 'Achieved',
      badgeColor: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      iconBg: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 'stat-paused',
      title: 'Paused Courses',
      value: stats.pausedCourses.toString(),
      subtitle: 'Continue learning anytime',
      icon: PauseCircle,
      color: 'amber',
      badge: 'On Hold',
      badgeColor: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      iconBg: 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400',
    },
    {
      id: 'stat-streak',
      title: 'Learning Streak',
      value: `🔥 ${stats.learningStreak} Days`,
      subtitle: 'Keep your streak going',
      icon: Flame,
      color: 'rose',
      badge: 'Consistent',
      badgeColor: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
      iconBg: 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400',
    },
  ];

  return (
    <section id="dashboard-statistics-section" className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              id={card.id}
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${card.iconBg}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wider ${card.badgeColor}`}
                >
                  {card.badge}
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {card.title}
                </p>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
                  {card.value}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {card.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
