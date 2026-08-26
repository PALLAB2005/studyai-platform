import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Video,
  Sparkles,
  Bookmark,
  BookOpen,
  History,
} from 'lucide-react';
import { LearningActivity, ActivityType } from '../../types/learning';

interface RecentActivityProps {
  activities: LearningActivity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const [allActivities, setAllActivities] = useState<LearningActivity[]>(activities);

  useEffect(() => {
    const loadDynamic = () => {
      try {
        const key = 'studyai_dashboard_custom_activities';
        const str = localStorage.getItem(key);
        if (str) {
          const dynamicActs: LearningActivity[] = JSON.parse(str);
          // Merge dynamic with base activities avoiding duplicates
          const seen = new Set<string>();
          const merged: LearningActivity[] = [];
          
          [...dynamicActs, ...activities].forEach((item) => {
            if (!seen.has(item.id) && !seen.has(item.title)) {
              seen.add(item.id);
              seen.add(item.title);
              merged.push(item);
            }
          });
          setAllActivities(merged.slice(0, 6));
          return;
        }
      } catch {
        // ignore
      }
      setAllActivities(activities);
    };

    loadDynamic();
    window.addEventListener('studyai_activity_updated', loadDynamic);
    return () => {
      window.removeEventListener('studyai_activity_updated', loadDynamic);
    };
  }, [activities]);

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'lesson':
        return {
          icon: CheckCircle2,
          color: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
        };
      case 'video':
        return {
          icon: Video,
          color: 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400',
        };
      case 'quiz':
        return {
          icon: Sparkles,
          color: 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400',
        };
      case 'bookmark':
        return {
          icon: Bookmark,
          color: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
        };
      case 'course':
      default:
        return {
          icon: BookOpen,
          color: 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400',
        };
    }
  };

  return (
    <div
      id="recent-activity-card"
      className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
              Recent Activity
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your latest study actions
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold text-slate-400">
          Live Log
        </span>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
        {allActivities.map((act) => {
          const { icon: Icon, color } = getActivityIcon(act.type);
          return (
            <div
              key={act.id}
              className="py-3 flex items-start gap-3 first:pt-1 last:pb-1"
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${color}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                  {act.title}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                  <span>{act.timestamp}</span>
                  {act.score && (
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      • Score {act.score}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
