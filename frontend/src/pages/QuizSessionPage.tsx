import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useQuiz } from '../context/QuizContext';
import { QuizProgress } from '../components/quiz/QuizProgress';
import { QuizQuestion } from '../components/quiz/QuizQuestion';
import { QuizNavigation } from '../components/quiz/QuizNavigation';
import { SubmitQuizDialog } from '../components/quiz/SubmitQuizDialog';
import { QuizSubmittedNotice } from '../components/quiz/QuizSubmittedNotice';
import { Quiz, QuizAttemptResult } from '../types/quiz';
import { AlertCircle, BookOpen, ArrowLeft, RefreshCw } from 'lucide-react';

interface QuizSessionPageProps {
  quizId: string;
}

export function QuizSessionPage({ quizId }: QuizSessionPageProps) {
  const { navigate } = useAuth();
  const {
    activeSession,
    loadQuizSession,
    selectAnswer,
    goToQuestion,
    nextQuestion,
    previousQuestion,
    submitQuiz,
    resetSession,
    lastCompletedResult,
  } = useQuiz();

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<QuizAttemptResult | null>(null);

  // Load active quiz on mount or when quizId changes
  useEffect(() => {
    loadQuizSession(quizId);
  }, [quizId]);

  const quiz: Quiz | undefined = activeSession?.quiz;

  if (!quiz) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-xl">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold font-display">Quiz Not Found</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            The requested quiz could not be loaded or may have expired.
          </p>
          <button
            type="button"
            onClick={() => navigate('/quiz')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-dark text-white text-xs font-bold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Quiz Generator</span>
          </button>
        </div>
      </div>
    );
  }

  const currentIndex = activeSession.currentQuestionIndex;
  const currentQuestion = quiz.questions[currentIndex] || quiz.questions[0];
  const selectedOption = activeSession.answers[currentIndex];
  const totalQuestions = quiz.questions.length;
  const answeredCount = Object.keys(activeSession.answers).length;
  const unansweredCount = Math.max(0, totalQuestions - answeredCount);

  // Submit trigger
  const handleOpenSubmitDialog = () => {
    setIsSubmitModalOpen(true);
  };

  const handleConfirmSubmit = () => {
    setIsSubmitModalOpen(false);
    const submission = submitQuiz();
    if (submission) {
      setSubmissionResult(submission.result);
      navigate(`/quiz/${quiz.id}/result`);
    }
  };

  const handleReviewUnanswered = () => {
    setIsSubmitModalOpen(false);
    // Jump to first unanswered question
    for (let i = 0; i < totalQuestions; i++) {
      if (activeSession.answers[i] === undefined) {
        goToQuestion(i);
        break;
      }
    }
  };

  const handleRetake = () => {
    resetSession(quiz.id);
    setSubmissionResult(null);
  };

  // If already submitted in active state
  if (submissionResult || (activeSession.isSubmitted && lastCompletedResult)) {
    const resultToShow = submissionResult || lastCompletedResult!;
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 transition-colors">
        <QuizSubmittedNotice
          result={resultToShow}
          onRetake={handleRetake}
          onGoToGenerator={() => navigate('/quiz')}
          onGoToDashboard={() => navigate('/dashboard')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      {/* Top Sticky Progress & Timer Bar */}
      <QuizProgress
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        topicTitle={quiz.title}
        difficulty={quiz.difficulty}
        timeRemainingSeconds={activeSession.timeRemainingSeconds}
        onExit={() => navigate('/quiz')}
      />

      {/* Main Question Body */}
      <main className="flex-1 max-w-3xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex flex-col justify-between space-y-6">
        {/* Single Question View */}
        <QuizQuestion
          question={currentQuestion}
          questionIndex={currentIndex}
          selectedOptionIndex={selectedOption}
          onSelectOption={(optIdx) => selectAnswer(currentIndex, optIdx)}
          disabled={activeSession.isSubmitted}
        />

        {/* Navigation, Progress Indicator and Submit Button */}
        <QuizNavigation
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          answers={activeSession.answers}
          onPrevious={previousQuestion}
          onNext={nextQuestion}
          onGoToQuestion={goToQuestion}
          onSubmitClick={handleOpenSubmitDialog}
          isSubmitting={activeSession.isSubmitted}
        />
      </main>

      {/* Submit Confirmation Dialog */}
      <SubmitQuizDialog
        isOpen={isSubmitModalOpen}
        totalQuestions={totalQuestions}
        unansweredCount={unansweredCount}
        onReview={handleReviewUnanswered}
        onConfirmSubmit={handleConfirmSubmit}
        onClose={() => setIsSubmitModalOpen(false)}
      />
    </div>
  );
}
