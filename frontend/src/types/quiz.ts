export type QuizDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type QuestionType = 'multiple-choice' | 'true-false' | 'mixed';

export type QuizScope = 'entire-course' | 'module' | 'lesson' | 'topic';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic?: string;
  subTopic?: string;
  difficulty?: QuizDifficulty;
}

export interface Quiz {
  id: string;
  title: string;
  topic: string;
  courseId?: string;
  courseTitle?: string;
  moduleId?: string;
  moduleTitle?: string;
  lessonId?: string;
  lessonTitle?: string;
  scope?: QuizScope;
  difficulty: QuizDifficulty;
  questionType: QuestionType;
  questions: QuizQuestion[];
  createdAt: string;
  timeLimitMinutes?: number; // 0 means no timer
  totalQuestions: number;
}

export interface QuizGenerationParams {
  sourceType: 'course' | 'topic';
  courseId?: string;
  courseTitle?: string;
  scope?: 'entire-course' | 'module' | 'lesson';
  moduleId?: string;
  moduleTitle?: string;
  lessonId?: string;
  lessonTitle?: string;
  topic?: string;
  difficulty: QuizDifficulty;
  questionCount: number; // 5, 10, 15, 20
  questionType: QuestionType; // 'multiple-choice' | 'true-false' | 'mixed'
  timerMinutes: number; // 0 (No Timer), 10, 20, 30
}

export interface QuizSessionState {
  quiz: Quiz;
  answers: Record<number, number>; // questionIndex -> selectedOptionIndex (0-based)
  currentQuestionIndex: number;
  timeRemainingSeconds: number | null;
  startedAt: string;
  isSubmitted: boolean;
}

export interface QuizAttemptResult {
  id: string;
  quizId: string;
  quizTitle: string;
  topic: string;
  courseId?: string;
  difficulty: QuizDifficulty;
  score: number;
  totalQuestions: number;
  percentage: number;
  userAnswers: Record<number, number>;
  questions: QuizQuestion[];
  completedAt: string;
  timeSpentSeconds: number;
  passed: boolean;
}
