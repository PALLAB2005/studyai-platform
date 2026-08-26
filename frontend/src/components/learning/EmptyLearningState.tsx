import React from 'react';
import { BookOpen, PauseCircle, CheckCircle2, Bookmark, Search, ArrowRight, Sparkles } from 'lucide-react';
import { LearningTabType } from '../../types/learning';
import { useAuth } from '../../context/AuthContext';

interface EmptyLearningStateProps {
  type: LearningTabType | 'search';
  searchQuery?: string;
  onClearSearch?: () => void;
}

export function EmptyLearningState({ type, searchQuery, onClearSearch }: EmptyLearningStateProps) {
  const { navigate } = useAuth();

  const getEmptyConfig = () => {
    switch (type) {
      case 'in-progress':
        return {
          icon: <BookOpen className="w-8 h-8 text-brand-600 dark:text-brand-400" />,
          badge: 'No Active Courses',
          title: "You haven't started any courses yet.",
          description: 'Browse our catalog of expert-led courses and begin your learning journey today.',
          actionText: 'Explore Courses',
          onAction: () => navigate('/courses'),
        };
      case 'paused':
        return {
          icon: <PauseCircle className="w-8 h-8 text-amber-500 dark:text-amber-400" />,
          badge: 'All Caught Up',
          title: "Great! You don't have any paused courses.",
          description: 'Keep the momentum going by continuing your active courses or exploring new skills.',
          actionText: 'Browse Courses',
          onAction: () => navigate('/courses'),
        };
      case 'completed':
        return {
          icon: <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
          badge: 'Milestone Goal',
          title: 'Complete your first course to see it here.',
          description: 'Finishing courses unlocks verified achievement certificates and skills badges.',
          actionText: 'View In-Progress Courses',
          onAction: () => navigate('/courses'),
        };
      case 'saved':
        return {
          icon: <Bookmark className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
          badge: 'Saved Library',
          title: "You don't have any saved or not-started courses.",
          description: 'Save courses from Browse Courses to build your custom learning roadmap.',
          actionText: 'Find Courses to Save',
          onAction: () => navigate('/courses'),
        };
      case 'search':
        return {
          icon: <Search className="w-8 h-8 text-slate-400" />,
          badge: 'Search Results',
          title: `No courses found matching "${searchQuery || ''}"`,
          description: 'Try searching with different keywords, subject titles, or resetting your filter options.',
          actionText: 'Clear Search',
          onAction: onClearSearch || (() => {}),
        };
      case 'all':
      default:
        return {
          icon: <Sparkles className="w-8 h-8 text-brand-600 dark:text-brand-400" />,
          badge: 'My Learning Library',
          title: 'Your learning library is currently empty.',
          description: 'Enroll in courses from our catalog to track your progress, lessons, and certificates.',
          actionText: 'Explore Courses Catalog',
          onAction: () => navigate('/courses'),
        };
    }
  };

  const config = getEmptyConfig();

  return (
    <div
      id={`empty-learning-state-${type}`}
      className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col items-center text-center max-w-xl mx-auto space-y-4 animate-in fade-in duration-300"
    >
      <div className="w-16 h-16 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center shadow-xs">
        {config.icon}
      </div>

      <div className="space-y-1.5">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase tracking-wider">
          {config.badge}
        </span>
        <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 font-display pt-2">
          {config.title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
          {config.description}
        </p>
      </div>

      {config.actionText && (
        <div className="pt-2">
          <button
            type="button"
            onClick={config.onAction}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-brand hover:bg-brand-dark text-white shadow-sm shadow-brand/20 transition-all cursor-pointer"
          >
            <span>{config.actionText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
