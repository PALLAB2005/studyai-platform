import { QuizDifficulty, QuizQuestion } from './quiz';
import { QuizAnalysis } from './quizAnalysis';

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  topic: string;
  courseId?: string;
  difficulty: QuizDifficulty;
  score: number;
  totalQuestions: number;
  percentage: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredAnswers: number;
  userAnswers: Record<number, number>;
  questions: QuizQuestion[];
  completedAt: string;
  timeTaken: number; // in seconds
  passed: boolean;
  analysis?: QuizAnalysis;
}

export interface QuizStatsSummary {
  totalQuizzesCompleted: number;
  totalQuestionsAnswered: number;
  averageScore: number;
  highestScore: number;
  passedCount: number;
  recentAttempts: QuizAttempt[];
  topWeakTopics: { topic: string; count: number; avgAccuracy: number }[];
  topStrongTopics: { topic: string; count: number; avgAccuracy: number }[];
}
