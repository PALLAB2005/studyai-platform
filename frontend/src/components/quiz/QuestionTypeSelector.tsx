import React from 'react';
import { QuestionType } from '../../types/quiz';
import { CheckSquare, ToggleLeft, Shuffle } from 'lucide-react';

interface QuestionTypeSelectorProps {
  questionType: QuestionType;
  onSelectType: (type: QuestionType) => void;
}

const TYPES: {
  id: QuestionType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'multiple-choice',
    label: 'Multiple Choice',
    description: '4 structured options per question',
    icon: CheckSquare,
  },
  {
    id: 'true-false',
    label: 'True / False',
    description: 'Rapid binary conceptual statements',
    icon: ToggleLeft,
  },
  {
    id: 'mixed',
    label: 'Mixed Quiz',
    description: 'Balanced mix of both question formats',
    icon: Shuffle,
  },
];

export function QuestionTypeSelector({
  questionType,
  onSelectType,
}: QuestionTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
        Question Format
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {TYPES.map((item) => {
          const isSelected = questionType === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              id={`question-type-btn-${item.id}`}
              onClick={() => onSelectType(item.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                isSelected
                  ? 'border-blue-600 bg-brand-50/70 dark:bg-brand-950/40 ring-2 ring-brand/20 text-blue-900 dark:text-blue-200'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div
                className={`p-2 rounded-xl shrink-0 ${
                  isSelected
                    ? 'bg-brand text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div>
                <span className="text-xs font-bold block">{item.label}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                  {item.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
