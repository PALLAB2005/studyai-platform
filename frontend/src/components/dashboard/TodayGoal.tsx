import React, { useState } from 'react';
import { Target, CheckCircle2, Circle, Sparkles } from 'lucide-react';
import { LearningGoalTask } from '../../types/learning';

interface TodayGoalProps {
  initialTasks: LearningGoalTask[];
}

export function TodayGoal({ initialTasks }: TodayGoalProps) {
  const [tasks, setTasks] = useState<LearningGoalTask[]>(initialTasks);

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div
      id="today-goal-card"
      className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
              Today's Goal
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Daily study roadmap
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950 px-2.5 py-1 rounded-lg">
          {completedCount} / {totalCount} Completed
        </span>
      </div>

      {/* Goal Progress bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          <span>Daily Completion</span>
          <span>{percentage}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-brand rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Task Checklist */}
      <div className="space-y-2 pt-1">
        {tasks.map((task) => {
          return (
            <button
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`w-full p-2.5 rounded-xl border flex items-center gap-3 text-left transition-all cursor-pointer ${
                task.completed
                  ? 'bg-white dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 text-slate-400 dark:text-slate-500'
                  : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-brand-300 dark:hover:border-blue-700'
              }`}
            >
              {task.completed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />
              )}
              <span
                className={`text-xs font-semibold flex-1 truncate ${
                  task.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''
                }`}
              >
                {task.title}
              </span>
              {task.category && (
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                  {task.category}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
