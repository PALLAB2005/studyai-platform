import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ListFilter,
  ChevronDown,
  ChevronUp,
  Info,
  Tag,
  Check,
  X,
} from 'lucide-react';
import { QuestionReviewItem } from '../../../types/quizAnalysis';

interface AnswerReviewProps {
  questionsReview: QuestionReviewItem[];
}

type FilterTab = 'all' | 'correct' | 'incorrect' | 'unanswered';

export function AnswerReview({ questionsReview }: AnswerReviewProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [expandedIndex, setExpandedIndex] = useState<Record<number, boolean>>(() => {
    // By default expand all incorrect and unanswered questions
    const init: Record<number, boolean> = {};
    questionsReview.forEach((item, idx) => {
      init[idx] = !item.isCorrect; // open incorrect/unanswered
    });
    return init;
  });

  const correctCount = questionsReview.filter((q) => q.status === 'correct').length;
  const incorrectCount = questionsReview.filter((q) => q.status === 'incorrect').length;
  const unansweredCount = questionsReview.filter((q) => q.status === 'unanswered').length;

  const filteredQuestions = questionsReview.filter((q) => {
    if (activeFilter === 'correct') return q.status === 'correct';
    if (activeFilter === 'incorrect') return q.status === 'incorrect';
    if (activeFilter === 'unanswered') return q.status === 'unanswered';
    return true;
  });

  const toggleExpand = (idx: number) => {
    setExpandedIndex((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const expandAll = () => {
    const allOpen: Record<number, boolean> = {};
    questionsReview.forEach((_, idx) => {
      allOpen[idx] = true;
    });
    setExpandedIndex(allOpen);
  };

  const collapseAll = () => {
    setExpandedIndex({});
  };

  return (
    <section id="answer-review-section" className="space-y-4">
      {/* Header with Title & Expand/Collapse All */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <ListFilter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
              Review Your Answers
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Detailed step-by-step breakdown with explanations and concept tags
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={expandAll}
            className="px-2.5 py-1 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium cursor-pointer"
          >
            Expand All
          </button>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <button
            type="button"
            onClick={collapseAll}
            className="px-2.5 py-1 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeFilter === 'all'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
          }`}
        >
          <span>All Questions</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeFilter === 'all'
                ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            {questionsReview.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('correct')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeFilter === 'correct'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-800'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Correct</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
            {correctCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('incorrect')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeFilter === 'incorrect'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-slate-200/80 dark:border-slate-800'
          }`}
        >
          <XCircle className="w-3.5 h-3.5 text-rose-500" />
          <span>Incorrect</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500/20 text-rose-700 dark:text-rose-300 font-bold">
            {incorrectCount}
          </span>
        </button>

        {unansweredCount > 0 && (
          <button
            type="button"
            onClick={() => setActiveFilter('unanswered')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFilter === 'unanswered'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-slate-200/80 dark:border-slate-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>Unanswered</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold">
              {unansweredCount}
            </span>
          </button>
        )}
      </div>

      {/* Question Review Cards List */}
      <div className="space-y-3">
        {filteredQuestions.map((item, idx) => {
          const isOpen = expandedIndex[idx] !== false;

          const statusConfig = {
            correct: {
              label: 'Correct',
              icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
              badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
              border: 'border-emerald-500/30 dark:border-emerald-500/20',
            },
            incorrect: {
              label: 'Incorrect',
              icon: <XCircle className="w-4 h-4 text-rose-500" />,
              badge: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
              border: 'border-rose-500/30 dark:border-rose-500/20',
            },
            unanswered: {
              label: 'Unanswered',
              icon: <HelpCircle className="w-4 h-4 text-amber-500" />,
              badge: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
              border: 'border-amber-500/30 dark:border-amber-500/20',
            },
          }[item.status];

          return (
            <div
              key={`review-q-${item.questionNumber}`}
              className={`rounded-2xl bg-white dark:bg-slate-900 border transition-all shadow-sm ${
                item.isCorrect ? 'border-slate-200/80 dark:border-slate-800' : statusConfig.border
              }`}
            >
              {/* Question Header Accordion Trigger */}
              <button
                type="button"
                onClick={() => toggleExpand(idx)}
                className="w-full p-4 sm:p-5 flex items-start justify-between gap-4 text-left cursor-pointer"
              >
                <div className="flex items-start gap-3 flex-1">
                  <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.questionNumber}
                  </span>
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${statusConfig.badge}`}>
                        {statusConfig.icon}
                        <span>{statusConfig.label}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md font-medium">
                        <Tag className="w-3 h-3" />
                        {item.topic}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                      {item.question.question}
                    </p>
                  </div>
                </div>

                <div className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-1 space-y-4">
                  {/* Options Comparison */}
                  <div className="space-y-2 pt-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                      Options & Evaluation
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {item.question.options.map((optionText, optIdx) => {
                        const isCorrectOption = optIdx === item.correctAnswerIndex;
                        const isUserSelected = optIdx === item.userAnswerIndex;

                        let optClasses = 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-400';
                        let badgeIcon = null;

                        if (isCorrectOption) {
                          optClasses = 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-500/40 text-emerald-900 dark:text-emerald-200 font-medium';
                          badgeIcon = (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" /> Correct Answer
                            </span>
                          );
                        } else if (isUserSelected && !item.isCorrect) {
                          optClasses = 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-500/40 text-rose-900 dark:text-rose-200 font-medium';
                          badgeIcon = (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400">
                              <X className="w-3.5 h-3.5 stroke-[2.5]" /> Your Choice
                            </span>
                          );
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs leading-relaxed ${optClasses}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-5 h-5 rounded-md bg-black/5 dark:bg-white/5 flex items-center justify-center font-bold text-[11px]">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{optionText}</span>
                            </div>
                            {badgeIcon}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Explanation Box */}
                  <div className="p-3.5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-brand-900/30 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <Info className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-blue-900 dark:text-brand-300 block mb-0.5">
                        Explanation:
                      </strong>
                      <p className="leading-relaxed">{item.explanation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
