import React from 'react';
import { Award, CheckCircle2, AlertTriangle, AlertCircle, Sparkles, TrendingUp } from 'lucide-react';
import { QuizAnalysis } from '../../../types/quizAnalysis';

interface QuizScoreCardProps {
  analysis: QuizAnalysis;
}

export function QuizScoreCard({ analysis }: QuizScoreCardProps) {
  const { percentage, score, totalQuestions, performanceGrade, isPerfectScore } = analysis;

  // Visual status config
  const statusConfig = {
    excellent: {
      badgeText: 'Mastery Level',
      badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      ringColor: '#10b981', // emerald-500
      glowColor: 'shadow-emerald-500/10',
      icon: <Award className="w-5 h-5 text-emerald-500" />,
    },
    great: {
      badgeText: 'Proficient Score',
      badgeBg: 'bg-blue-500/10 text-brand-600 dark:text-brand-400 border-brand-500/20',
      ringColor: '#3b82f6', // blue-500
      glowColor: 'shadow-brand/10',
      icon: <CheckCircle2 className="w-5 h-5 text-brand-500" />,
    },
    good: {
      badgeText: 'Passing Grade',
      badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      ringColor: '#f59e0b', // amber-500
      glowColor: 'shadow-amber-500/10',
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    },
    'needs-practice': {
      badgeText: 'Revision Needed',
      badgeBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      ringColor: '#f43f5e', // rose-500
      glowColor: 'shadow-rose-500/10',
      icon: <AlertCircle className="w-5 h-5 text-rose-500" />,
    },
  }[performanceGrade];

  // SVG Circular Gauge calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      id="quiz-score-card"
      className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
    >
      {/* Left Details */}
      <div className="flex-1 text-center md:text-left space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.badgeBg}">
          {statusConfig.icon}
          <span>{statusConfig.badgeText}</span>
          {isPerfectScore && (
            <span className="flex items-center gap-1 text-[11px] font-bold bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded-full ml-1">
              <Sparkles className="w-3 h-3" /> 100% Perfect
            </span>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
          Score: {score} <span className="text-slate-400 dark:text-slate-500 font-normal">/ {totalQuestions}</span>
        </h2>

        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
          {percentage >= 70
            ? `You passed the assessment with ${percentage}% accuracy across ${totalQuestions} questions.`
            : `You achieved ${percentage}% accuracy. Target your weak topics below for high-yield score improvement.`}
        </p>
      </div>

      {/* Right Circular Gauge */}
      <div className="relative flex items-center justify-center flex-shrink-0">
        <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 160 160">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-slate-100 dark:text-slate-800"
          />
          {/* Progress circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={statusConfig.ringColor}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            {percentage}%
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Accuracy
          </span>
        </div>
      </div>
    </div>
  );
}
