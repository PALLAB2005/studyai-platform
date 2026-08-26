import { Quiz, QuizQuestion, QuizDifficulty } from './quiz';

export type PerformanceLevel = 'strong' | 'needs-improvement' | 'weak';

export interface TopicPerformance {
  topic: string;
  subTopic?: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredAnswers: number;
  accuracy: number; // 0 to 100
  level: PerformanceLevel;
}

export interface StudyAIStudyResource {
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  moduleId: string;
  moduleTitle: string;
  lessonId: string;
  lessonTitle: string;
  duration?: string;
}

export interface TopicRecommendation {
  topic: string;
  level: PerformanceLevel;
  accuracy: number;
  message: string;
  suggestedDifficulty: QuizDifficulty;
  studyAILesson?: StudyAIStudyResource;
  recommendedSearchTerm: string;
}

export interface DifficultyRecommendation {
  level: QuizDifficulty;
  title: string;
  message: string;
  actionLabel: string;
}

export interface QuestionReviewItem {
  questionNumber: number;
  question: QuizQuestion;
  userAnswerIndex: number | undefined;
  userAnswerText: string | null;
  correctAnswerIndex: number;
  correctAnswerText: string;
  isCorrect: boolean;
  isUnanswered: boolean;
  status: 'correct' | 'incorrect' | 'unanswered';
  topic: string;
  subTopic?: string;
  explanation: string;
}

export interface QuizAnalysis {
  quizId: string;
  quizTitle: string;
  topic: string;
  difficulty: QuizDifficulty;
  score: number;
  totalQuestions: number;
  percentage: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  timeSpentSeconds: number;
  completedAt: string;
  performanceGrade: 'excellent' | 'great' | 'good' | 'needs-practice';
  performanceHeading: string;
  performanceMessage: string;
  isPerfectScore: boolean;
  strengths: TopicPerformance[];
  weakTopics: TopicPerformance[];
  allTopics: TopicPerformance[];
  recommendations: TopicRecommendation[];
  nextDifficultyRecommendation: DifficultyRecommendation;
  questionsReview: QuestionReviewItem[];
}
