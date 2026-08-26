import React, { useState, useEffect } from 'react';
import {
  Brain,
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  RotateCcw,
  BarChart2,
} from 'lucide-react';
import { QuizAttemptService } from '../../services/quizAttemptService';
import { QuizStatsSummary, QuizAttempt } from '../../types/quizAttempt';
import { useAuth } from '../../context/AuthContext';
import { useQuiz } from '../../context/QuizContext';

export function QuizPerformanceWidget() {
  const { navigate } = useAuth();
  const { generatePracticeQuizForTopic } = useQuiz();
  const [stats, setStats] = useState<QuizStatsSummary>(() =>
    QuizAttemptService.getStatsSummary()
  );
  const [isGenerating, setIsGenerating] = useState(false);

  // Sync on mount and storage updates
  useEffect(() => {
    const handleUpdate = () => {
      setStats(QuizAttemptService.getStatsSummary());
    };
    window.addEventListener('studyai_activity_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('studyai_activity_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleStartPractice = async (topic: string) => {
    try {
      setIsGenerating(true);
      const quiz = await generatePracticeQuizForTopic(topic, 'intermediate');
      navigate(`/quiz/${quiz.id}`);
    } catch {
      navigate('/quiz');
    } finally {
      setIsGenerating(false);
    }
  };

  const {
    totalQuizzesCompleted,
    averageScore,
    recentAttempts,
    topWeakTopics,
  } = stats;

  return (
    <div
      id="dashboard-quiz-performance-widget"
      className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
              AI Quiz Performance
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Personalized knowledge testing & weak area focus
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/quiz')}
          className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 transition-colors cursor-pointer"
        >
          <span>Generator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center flex-shrink-0">
            <BarChart2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">Completed</span>
            <span className="text-lg font-bold font-display text-slate-900 dark:text-white">
              {totalQuizzesCompleted} {totalQuizzesCompleted === 1 ? 'Quiz' : 'Quizzes'}
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">Avg Accuracy</span>
            <span className="text-lg font-bold font-display text-emerald-600 dark:text-emerald-400">
              {averageScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Weak Topics Spotlight */}
      {topWeakTopics.length > 0 && (
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
              <span>Recommended Focus Topics</span>
            </span>
            <span className="text-[10px] text-slate-400">Low Accuracy Areas</span>
          </div>

          <div className="space-y-2">
            {topWeakTopics.map((wt) => (
              <div
                key={wt.topic}
                className="p-3 rounded-xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                    {wt.topic}
                  </span>
                  <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">
                    {wt.avgAccuracy}% mastery
                  </span>
                </div>

                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={() => handleStartPractice(wt.topic)}
                  className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Practice</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Quiz Scores */}
      {recentAttempts.length > 0 ? (
        <div className="space-y-2 pt-1">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            Recent Scores
          </span>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentAttempts.slice(0, 3).map((attempt) => (
              <div
                key={attempt.id}
                onClick={() => navigate(`/quiz/${attempt.quizId}/result`)}
                className="py-2.5 flex items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 rounded-xl px-2 transition-colors cursor-pointer"
              >
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                    {attempt.quizTitle || attempt.topic}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {attempt.score}/{attempt.totalQuestions} correct • {attempt.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className={`text-xs font-extrabold font-display ${
                      attempt.percentage >= 80
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : attempt.percentage >= 60
                        ? 'text-brand-600 dark:text-brand-400'
                        : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {attempt.percentage}%
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-center space-y-2">
          <p className="text-xs text-slate-500">
            No quizzes completed yet. Test your knowledge with custom AI quizzes.
          </p>
          <button
            type="button"
            onClick={() => navigate('/quiz')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand hover:bg-brand-dark text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate First Quiz</span>
          </button>
        </div>
      )}
    </div>
  );
}
