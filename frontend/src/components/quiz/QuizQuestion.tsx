import React from 'react';
import { QuizQuestion as QuizQuestionType } from '../../types/quiz';
import { Check, Sparkles, HelpCircle } from 'lucide-react';

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionIndex: number;
  selectedOptionIndex: number | undefined;
  onSelectOption: (optionIndex: number) => void;
  disabled?: boolean;
}

const OPTION_PREFIXES = ['A', 'B', 'C', 'D', 'E', 'F'];

export function QuizQuestion({
  question,
  questionIndex,
  selectedOptionIndex,
  onSelectOption,
  disabled = false,
}: QuizQuestionProps) {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6 animate-in fade-in duration-200">
      {/* Question Header Meta */}
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold bg-brand-50 dark:bg-blue-950/80 text-brand-700 dark:text-brand-300">
          <Sparkles className="w-3 h-3" />
          <span>Question {questionIndex + 1}</span>
        </span>

        {question.topic && (
          <span className="text-slate-400 font-medium truncate max-w-[200px]">
            {question.topic}
          </span>
        )}
      </div>

      {/* Question Text */}
      <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug font-display">
        {question.question}
      </h2>

      {/* Answer Options Grid */}
      <div className="space-y-3 pt-2">
        {question.options.map((optionText, optIdx) => {
          const isSelected = selectedOptionIndex === optIdx;
          const prefix = OPTION_PREFIXES[optIdx] || `${optIdx + 1}`;

          return (
            <button
              key={optIdx}
              type="button"
              id={`option-btn-${questionIndex}-${optIdx}`}
              disabled={disabled}
              onClick={() => onSelectOption(optIdx)}
              className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 group relative ${
                isSelected
                  ? 'border-blue-600 bg-brand-50/80 dark:bg-blue-950/50 ring-2 ring-brand/20 text-blue-950 dark:text-brand-100 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/30 hover:bg-slate-100/80 dark:hover:bg-slate-800/70 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200'
              }`}
            >
              {/* Option Alphabet Badge */}
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                  isSelected
                    ? 'bg-brand text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 group-hover:border-blue-400'
                }`}
              >
                {prefix}
              </div>

              {/* Option Text */}
              <span className="flex-1 text-xs sm:text-sm font-medium leading-relaxed pt-0.5">
                {optionText}
              </span>

              {/* Selection Checkmark */}
              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-brand text-white flex items-center justify-center shrink-0 mt-0.5 animate-in zoom-in-50">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
