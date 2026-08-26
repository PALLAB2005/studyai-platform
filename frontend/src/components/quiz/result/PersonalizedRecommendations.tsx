import React from 'react';
import { Sparkles, Trophy, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { TopicRecommendation } from '../../../types/quizAnalysis';
import { WeakTopicCard } from './WeakTopicCard';
import { useAuth } from '../../../context/AuthContext';

interface PersonalizedRecommendationsProps {
  recommendations: TopicRecommendation[];
  isPerfectScore?: boolean;
  onGeneratePracticeQuiz: (topic: string, difficulty: string) => void;
}

export function PersonalizedRecommendations({
  recommendations,
  isPerfectScore,
  onGeneratePracticeQuiz,
}: PersonalizedRecommendationsProps) {
  const { navigate } = useAuth();

  return (
    <section id="personalized-recommendations-section" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
              Personalized Study Recommendations
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Targeted revision resources based on your incorrect and skipped questions
            </p>
          </div>
        </div>
      </div>

      {recommendations.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {recommendations.map((rec) => (
            <WeakTopicCard
              key={rec.topic}
              recommendation={rec}
              onGeneratePracticeQuiz={onGeneratePracticeQuiz}
            />
          ))}
        </div>
      ) : isPerfectScore ? (
        /* Empty State: Perfect Score */
        <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="w-8 h-8" />
          </div>
          <div className="space-y-1.5 max-w-md mx-auto">
            <h4 className="text-xl font-bold font-display text-slate-900 dark:text-white">
              Perfect Score! 🎉
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Amazing work! You answered every question correctly and demonstrated complete mastery over all tested topics.
            </p>
          </div>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/quiz')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <span>Explore Advanced Quizzes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Empty State: No Weak Topics (All >= 80%) */
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white">
              Solid Topic Mastery!
            </h4>
            <p className="text-xs sm:text-sm text-slate-500">
              You scored consistently well across all concepts. No major weak areas were identified in this quiz attempt.
            </p>
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate('/courses')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-xs font-bold transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Browse Next Course</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
