import React from 'react';
import { LayoutGrid, PlayCircle, PauseCircle, CheckCircle2, Bookmark } from 'lucide-react';
import { LearningTabType } from '../../types/learning';

interface LearningTabsProps {
  activeTab: LearningTabType;
  onTabChange: (tab: LearningTabType) => void;
  counts: {
    all: number;
    inProgress: number;
    paused: number;
    completed: number;
    saved: number;
  };
}

export function LearningTabs({ activeTab, onTabChange, counts }: LearningTabsProps) {
  const tabs: { id: LearningTabType; label: string; count: number; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'all', label: 'All Courses', count: counts.all, icon: LayoutGrid },
    { id: 'in-progress', label: 'In Progress', count: counts.inProgress, icon: PlayCircle },
    { id: 'paused', label: 'Paused', count: counts.paused, icon: PauseCircle },
    { id: 'completed', label: 'Completed', count: counts.completed, icon: CheckCircle2 },
    { id: 'saved', label: 'Saved / Not Started', count: counts.saved, icon: Bookmark },
  ];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            id={`tab-btn-${tab.id}`}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              isActive
                ? 'bg-brand text-white shadow-sm shadow-brand/20 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                isActive
                  ? 'bg-blue-700/80 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
