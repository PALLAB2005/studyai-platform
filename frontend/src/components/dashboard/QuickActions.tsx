import React from 'react';
import {
  BookOpen,
  PlayCircle,
  Sparkles,
  Video,
  Bookmark,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { AppRoute } from '../../types/auth';
import { useBookmarks } from '../../context/BookmarkContext';

interface QuickActionsProps {
  onNavigate: (route: AppRoute) => void;
  onContinueRecent: () => void;
}

export function QuickActions({ onNavigate, onContinueRecent }: QuickActionsProps) {
  const { totalCount } = useBookmarks();

  const actions = [
    {
      id: 'quick-browse-courses',
      title: 'Browse Courses',
      description: 'Explore available courses',
      icon: BookOpen,
      color: 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border-brand-200 dark:border-blue-800',
      action: () => onNavigate('/courses'),
      badge: null,
    },
    {
      id: 'quick-continue-learning',
      title: 'Continue Learning',
      description: 'Continue from your last lesson',
      icon: PlayCircle,
      color: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
      action: onContinueRecent,
      badge: null,
    },
    {
      id: 'quick-ai-quiz',
      title: 'AI Quiz',
      description: 'Test your knowledge',
      icon: Sparkles,
      color: 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
      action: () => onNavigate('/quiz'),
      badge: null,
    },
    {
      id: 'quick-video-tutorials',
      title: 'Video Tutorials',
      description: 'Find useful video tutorials',
      icon: Video,
      color: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
      action: () => onNavigate('/tutorials'),
      badge: null,
    },
    {
      id: 'quick-bookmarks',
      title: 'Bookmarks',
      description: 'Access saved learning resources',
      icon: Bookmark,
      color: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
      action: () => onNavigate('/bookmarks'),
      badge: totalCount,
    },
  ];

  return (
    <div
      id="quick-actions-section"
      className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
              Quick Actions
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Instant shortcuts
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {actions.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              id={item.id}
              onClick={item.action}
              className="w-full p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between group transition-all cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${item.color} group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {item.title}
                    </p>
                    {item.badge !== null && (
                      <span className="px-1.5 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 font-extrabold text-[10px] border border-amber-300/60 dark:border-amber-700/60">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
