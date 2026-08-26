import React from 'react';

interface CourseProgressBarProps {
  progress: number;
  completedLessons?: number;
  totalLessons?: number;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'purple' | 'amber' | 'emerald' | 'rose' | 'indigo' | 'cyan';
  status?: 'in-progress' | 'paused' | 'completed' | 'not-started';
}

export function CourseProgressBar({
  progress,
  completedLessons,
  totalLessons,
  showLabels = true,
  size = 'md',
  colorScheme = 'blue',
  status = 'in-progress',
}: CourseProgressBarProps) {
  const getBarColor = () => {
    if (status === 'completed' || progress === 100) return 'bg-emerald-500 dark:bg-emerald-400';
    if (status === 'paused') return 'bg-amber-500 dark:bg-amber-400';

    switch (colorScheme) {
      case 'purple':
        return 'bg-purple-600 dark:bg-purple-500';
      case 'emerald':
        return 'bg-emerald-600 dark:bg-emerald-500';
      case 'amber':
        return 'bg-amber-500 dark:bg-amber-400';
      case 'rose':
        return 'bg-rose-600 dark:bg-rose-500';
      case 'cyan':
        return 'bg-cyan-600 dark:bg-cyan-400';
      case 'indigo':
        return 'bg-indigo-600 dark:bg-indigo-400';
      case 'blue':
      default:
        return 'bg-brand dark:bg-blue-500';
    }
  };

  const getHeightClass = () => {
    switch (size) {
      case 'sm':
        return 'h-1.5';
      case 'lg':
        return 'h-3';
      case 'md':
      default:
        return 'h-2';
    }
  };

  return (
    <div className="w-full space-y-1.5">
      {showLabels && (
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {progress}% Complete
          </span>
          {completedLessons !== undefined && totalLessons !== undefined && (
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              {completedLessons} / {totalLessons} Lessons
            </span>
          )}
        </div>
      )}

      {/* Bar container */}
      <div className={`w-full ${getHeightClass()} rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${getBarColor()}`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}
