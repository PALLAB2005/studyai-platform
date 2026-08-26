import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { QuizScoreCard } from '../components/quiz/result/QuizScoreCard';
import { PerformanceSummary } from '../components/quiz/result/PerformanceSummary';
import { DynamicPerformanceMessage } from '../components/quiz/result/DynamicPerformanceMessage';
import { TopicPerformanceBreakdown } from '../components/quiz/result/TopicPerformanceBreakdown';
import { PersonalizedRecommendations } from '../components/quiz/result/PersonalizedRecommendations';
import { AnswerReview } from '../components/quiz/result/AnswerReview';
import { QuizResultActions } from '../components/quiz/result/QuizResultActions';
import { QuizAnalysis } from '../types/quizAnalysis';
import {
  AlertCircle,
  ArrowLeft,
  Sparkles,
  Loader2,
  Share2,
  Check,
} from 'lucide-react';

interface QuizResultPageProps {
  quizId: string;
}

export function QuizResultPage({ quizId }: QuizResultPageProps) {
  const { navigate } = useAuth();
  const {
    getAnalysisForQuiz,
    resetSession,
    generatePracticeQuizForTopic,
    generateQuiz,
    isGenerating,
  } = useQuiz();

  const [analysis, setAnalysis] = useState<QuizAnalysis | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load or compute analysis
  useEffect(() => {
    setIsLoading(true);
    const data = getAnalysisForQuiz(quizId);
    setAnalysis(data);
    setIsLoading(false);
  }, [quizId]);

  const handleRetakeQuiz = () => {
    resetSession(quizId);
    navigate(`/quiz/${quizId}`);
  };

  const handleTakeNextDifficultyQuiz = async (nextDifficulty: string) => {
    if (!analysis) return;
    try {
      const newQuiz = await generateQuiz({
        sourceType: 'topic',
        topic: analysis.topic,
        difficulty: nextDifficulty as any,
        questionCount: analysis.totalQuestions || 5,
        questionType: 'multiple-choice',
        timerMinutes: 10,
      });
      navigate(`/quiz/${newQuiz.id}`);
    } catch {
      navigate('/quiz');
    }
  };

  const handleGeneratePracticeQuizForTopic = async (topic: string, difficulty: string) => {
    try {
      const practiceQuiz = await generatePracticeQuizForTopic(
        topic,
        (difficulty as any) || 'intermediate'
      );
      navigate(`/quiz/${practiceQuiz.id}`);
    } catch {
      navigate('/quiz');
    }
  };

  const handleScrollToRecommendations = () => {
    const el = document.getElementById('personalized-recommendations-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShareResult = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  if (isLoading || isGenerating) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-brand-600 animate-spin" />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            {isGenerating ? 'Generating practice quiz...' : 'Synthesizing performance analysis...'}
          </p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-xl">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
          <h2 className="text-xl font-bold font-display">Result Not Found</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            We could not find an evaluated attempt for this quiz session.
          </p>
          <div className="flex flex-col gap-2 pt-2">
            <button
              type="button"
              onClick={() => navigate('/quiz')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-dark text-white text-xs font-bold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Quiz Generator</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white py-1 cursor-pointer"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const hasWeakTopics = analysis.weakTopics.length > 0;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => navigate('/quiz')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors mb-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Quiz Generator</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
              Quiz Completed 🎉
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Here is your performance analysis.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              type="button"
              onClick={handleShareResult}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 text-xs font-semibold transition-all cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Result</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 1. Large Score Card */}
        <QuizScoreCard analysis={analysis} />

        {/* 2. Key Metrics Summary Grid */}
        <PerformanceSummary analysis={analysis} />

        {/* 3. Dynamic Performance Message Banner */}
        <DynamicPerformanceMessage
          analysis={analysis}
          onTakeNextQuiz={handleTakeNextDifficultyQuiz}
          onScrollToRecommendations={handleScrollToRecommendations}
        />

        {/* 4. Topic Performance Breakdown */}
        <TopicPerformanceBreakdown
          topics={analysis.allTopics}
          isPerfectScore={analysis.isPerfectScore}
        />

        {/* 5. Personalized Recommendations for Weak Topics */}
        <PersonalizedRecommendations
          recommendations={analysis.recommendations}
          isPerfectScore={analysis.isPerfectScore}
          onGeneratePracticeQuiz={handleGeneratePracticeQuizForTopic}
        />

        {/* 6. Step-by-Step Answer Review */}
        <AnswerReview questionsReview={analysis.questionsReview} />

        {/* 7. Action Footer Bar */}
        <QuizResultActions
          quizId={quizId}
          hasWeakTopics={hasWeakTopics}
          onRetakeQuiz={handleRetakeQuiz}
          onScrollToRecommendations={handleScrollToRecommendations}
        />
      </div>
    </div>
  );
}
