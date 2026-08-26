import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Quiz,
  QuizGenerationParams,
  QuizSessionState,
  QuizDifficulty,
  QuizAttemptResult,
} from '../types/quiz';
import { QuizAnalysis } from '../types/quizAnalysis';
import { QuizAttempt } from '../types/quizAttempt';
import { QuizService } from '../services/quizService';
import { QuizAnalysisService } from '../services/quizAnalysisService';
import { QuizAttemptService } from '../services/quizAttemptService';

interface QuizContextType {
  // Generation
  isGenerating: boolean;
  activeGenerationParams: QuizGenerationParams | null;
  generateQuiz: (params: QuizGenerationParams) => Promise<Quiz>;
  generatePracticeQuizForTopic: (topic: string, difficulty?: QuizDifficulty) => Promise<Quiz>;

  // Taking session
  activeSession: QuizSessionState | null;
  loadQuizSession: (quizId: string) => Quiz | null;
  selectAnswer: (questionIndex: number, optionIndex: number) => void;
  goToQuestion: (index: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitQuiz: () => { result: QuizAttemptResult; analysis: QuizAnalysis } | null;
  lastCompletedResult: QuizAttemptResult | null;
  lastAnalysis: QuizAnalysis | null;
  resetSession: (quizId: string) => void;
  getAnalysisForQuiz: (quizId: string) => QuizAnalysis | null;

  // History & Attempts
  history: QuizAttemptResult[];
  refreshHistory: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeGenerationParams, setActiveGenerationParams] = useState<QuizGenerationParams | null>(null);
  const [activeSession, setActiveSession] = useState<QuizSessionState | null>(null);
  const [lastCompletedResult, setLastCompletedResult] = useState<QuizAttemptResult | null>(null);
  const [lastAnalysis, setLastAnalysis] = useState<QuizAnalysis | null>(null);
  const [history, setHistory] = useState<QuizAttemptResult[]>(() => QuizService.getAttemptHistory());

  const refreshHistory = useCallback(() => {
    setHistory(QuizService.getAttemptHistory());
  }, []);

  // Generate a new quiz
  const generateQuiz = async (params: QuizGenerationParams): Promise<Quiz> => {
    setIsGenerating(true);
    setActiveGenerationParams(params);

    try {
      const quiz = await QuizService.createQuiz(params);
      const session = QuizService.getSessionState(quiz);
      setActiveSession(session);
      return quiz;
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate a practice drill for a weak topic
  const generatePracticeQuizForTopic = async (
    topic: string,
    difficulty: QuizDifficulty = 'intermediate'
  ): Promise<Quiz> => {
    return generateQuiz({
      sourceType: 'topic',
      topic,
      difficulty,
      questionCount: 5,
      questionType: 'multiple-choice',
      timerMinutes: 10,
    });
  };

  // Load an existing or created quiz by ID
  const loadQuizSession = (quizId: string): Quiz | null => {
    const quiz = QuizService.getQuizById(quizId);
    if (!quiz) return null;

    const session = QuizService.getSessionState(quiz);
    setActiveSession(session);
    return quiz;
  };

  // Update selected answer
  const selectAnswer = (questionIndex: number, optionIndex: number) => {
    if (!activeSession || activeSession.isSubmitted) return;

    const updatedAnswers = {
      ...activeSession.answers,
      [questionIndex]: optionIndex,
    };

    const updatedSession: QuizSessionState = {
      ...activeSession,
      answers: updatedAnswers,
    };

    setActiveSession(updatedSession);
    QuizService.saveSessionState(updatedSession);
  };

  // Navigate directly to question
  const goToQuestion = (index: number) => {
    if (!activeSession) return;
    if (index < 0 || index >= activeSession.quiz.questions.length) return;

    const updatedSession: QuizSessionState = {
      ...activeSession,
      currentQuestionIndex: index,
    };
    setActiveSession(updatedSession);
    QuizService.saveSessionState(updatedSession);
  };

  // Next question
  const nextQuestion = () => {
    if (!activeSession) return;
    if (activeSession.currentQuestionIndex < activeSession.quiz.questions.length - 1) {
      goToQuestion(activeSession.currentQuestionIndex + 1);
    }
  };

  // Previous question
  const previousQuestion = () => {
    if (!activeSession) return;
    if (activeSession.currentQuestionIndex > 0) {
      goToQuestion(activeSession.currentQuestionIndex - 1);
    }
  };

  // Submit quiz
  const submitQuiz = (): { result: QuizAttemptResult; analysis: QuizAnalysis } | null => {
    if (!activeSession) return null;

    const startedTime = new Date(activeSession.startedAt).getTime();
    const now = Date.now();
    const timeSpentSeconds = Math.max(1, Math.floor((now - startedTime) / 1000));

    const { result, analysis } = QuizService.submitQuizAttempt(activeSession, timeSpentSeconds);
    setLastCompletedResult(result);
    setLastAnalysis(analysis);
    refreshHistory();

    setActiveSession((prev) => (prev ? { ...prev, isSubmitted: true } : null));
    return { result, analysis };
  };

  // Get or compute analysis for a given quiz ID
  const getAnalysisForQuiz = (quizId: string): QuizAnalysis | null => {
    // 1. Check in-memory last analysis
    if (lastAnalysis && lastAnalysis.quizId === quizId) {
      return lastAnalysis;
    }

    // 2. Check cached analysis in QuizAttemptService
    const cached = QuizAttemptService.getAnalysis(quizId);
    if (cached) return cached;

    // 3. Check attempt in history and extract/re-analyze
    const attempt = QuizAttemptService.getAttemptById(quizId);
    if (attempt?.analysis) {
      return attempt.analysis;
    }

    // 4. If we have the quiz and attempt answers, re-compute
    const quiz = QuizService.getQuizById(quizId);
    if (quiz && attempt) {
      const computed = QuizAnalysisService.analyzeQuizPerformance({
        quiz,
        answers: attempt.userAnswers || {},
        timeSpentSeconds: attempt.timeTaken || 0,
      });
      QuizAttemptService.saveAnalysis(computed);
      return computed;
    }

    // 5. If we only have active session
    if (activeSession && activeSession.quiz.id === quizId) {
      const computed = QuizAnalysisService.analyzeQuizPerformance({
        quiz: activeSession.quiz,
        answers: activeSession.answers,
        timeSpentSeconds: 0,
      });
      return computed;
    }

    return null;
  };

  // Reset a session to retake
  const resetSession = (quizId: string) => {
    QuizService.clearSessionState(quizId);
    const quiz = QuizService.getQuizById(quizId);
    if (quiz) {
      const freshSession = QuizService.getSessionState(quiz);
      setActiveSession(freshSession);
    }
  };

  // Timer countdown loop
  useEffect(() => {
    if (!activeSession || activeSession.isSubmitted || activeSession.timeRemainingSeconds === null) {
      return;
    }

    if (activeSession.timeRemainingSeconds <= 0) {
      // Auto-submit
      submitQuiz();
      return;
    }

    const timer = setInterval(() => {
      setActiveSession((prev) => {
        if (!prev || prev.isSubmitted || prev.timeRemainingSeconds === null) {
          return prev;
        }

        const nextSeconds = prev.timeRemainingSeconds - 1;
        const updated: QuizSessionState = {
          ...prev,
          timeRemainingSeconds: Math.max(0, nextSeconds),
        };
        QuizService.saveSessionState(updated);
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeSession?.quiz?.id, activeSession?.isSubmitted, activeSession?.timeRemainingSeconds]);

  return (
    <QuizContext.Provider
      value={{
        isGenerating,
        activeGenerationParams,
        generateQuiz,
        generatePracticeQuizForTopic,
        activeSession,
        loadQuizSession,
        selectAnswer,
        goToQuestion,
        nextQuestion,
        previousQuestion,
        submitQuiz,
        lastCompletedResult,
        lastAnalysis,
        resetSession,
        getAnalysisForQuiz,
        history,
        refreshHistory,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
