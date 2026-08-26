import {
  Quiz,
  QuizGenerationParams,
  QuizSessionState,
  QuizAttemptResult,
} from '../types/quiz';
import { AIQuizService } from './aiQuizService';
import { QuizAnalysisService } from './quizAnalysisService';
import { QuizAttemptService } from './quizAttemptService';
import { QuizAttempt } from '../types/quizAttempt';
import { QuizAnalysis } from '../types/quizAnalysis';

const STORAGE_KEY_QUIZZES = 'studyai_saved_quizzes';
const STORAGE_KEY_SESSIONS = 'studyai_quiz_active_sessions';

export class QuizService {
  /**
   * Generates a new quiz and persists it to local storage.
   */
  public static async createQuiz(params: QuizGenerationParams): Promise<Quiz> {
    const quiz = await AIQuizService.generateQuiz(params);
    this.saveQuiz(quiz);
    return quiz;
  }

  /**
   * Retrieves a saved quiz by ID.
   */
  public static getQuizById(quizId: string): Quiz | null {
    try {
      if (typeof window === 'undefined') return null;
      const data = localStorage.getItem(STORAGE_KEY_QUIZZES);
      if (!data) return null;
      const list: Quiz[] = JSON.parse(data);
      return list.find((q) => q.id === quizId) || null;
    } catch {
      return null;
    }
  }

  /**
   * Saves a newly created quiz into localStorage.
   */
  public static saveQuiz(quiz: Quiz): void {
    try {
      if (typeof window === 'undefined') return;
      const data = localStorage.getItem(STORAGE_KEY_QUIZZES);
      const list: Quiz[] = data ? JSON.parse(data) : [];
      const updated = [quiz, ...list.filter((q) => q.id !== quiz.id)];
      localStorage.setItem(STORAGE_KEY_QUIZZES, JSON.stringify(updated.slice(0, 50)));
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Retrieves or initializes active session state for a quiz.
   */
  public static getSessionState(quiz: Quiz): QuizSessionState {
    try {
      if (typeof window !== 'undefined') {
        const data = localStorage.getItem(STORAGE_KEY_SESSIONS);
        if (data) {
          const sessions: Record<string, QuizSessionState> = JSON.parse(data);
          if (sessions[quiz.id]) {
            return sessions[quiz.id];
          }
        }
      }
    } catch {
      // fallback to initial
    }

    const initialTimeLimit =
      quiz.timeLimitMinutes && quiz.timeLimitMinutes > 0
        ? quiz.timeLimitMinutes * 60
        : null;

    const newSession: QuizSessionState = {
      quiz,
      answers: {},
      currentQuestionIndex: 0,
      timeRemainingSeconds: initialTimeLimit,
      startedAt: new Date().toISOString(),
      isSubmitted: false,
    };

    this.saveSessionState(newSession);
    return newSession;
  }

  /**
   * Persists active session state for a quiz.
   */
  public static saveSessionState(session: QuizSessionState): void {
    try {
      if (typeof window === 'undefined') return;
      const data = localStorage.getItem(STORAGE_KEY_SESSIONS);
      const sessions: Record<string, QuizSessionState> = data ? JSON.parse(data) : {};
      sessions[session.quiz.id] = session;
      localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions));
    } catch {
      // ignore
    }
  }

  /**
   * Clears an active session state when completed or reset.
   */
  public static clearSessionState(quizId: string): void {
    try {
      if (typeof window === 'undefined') return;
      const data = localStorage.getItem(STORAGE_KEY_SESSIONS);
      if (data) {
        const sessions: Record<string, QuizSessionState> = JSON.parse(data);
        delete sessions[quizId];
        localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions));
      }
    } catch {
      // ignore
    }
  }

  /**
   * Evaluates user answers against correct answers, computes weak topic analysis,
   * saves the attempt to history, and records activity.
   */
  public static submitQuizAttempt(
    session: QuizSessionState,
    timeSpentSeconds: number
  ): { result: QuizAttemptResult; analysis: QuizAnalysis } {
    const { quiz, answers } = session;

    // Run performance and weak topic analysis
    const analysis = QuizAnalysisService.analyzeQuizPerformance({
      quiz,
      answers,
      timeSpentSeconds,
    });

    const passed = analysis.percentage >= 60;
    const attemptId = `attempt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    const result: QuizAttemptResult = {
      id: attemptId,
      quizId: quiz.id,
      quizTitle: quiz.title,
      topic: quiz.topic,
      courseId: quiz.courseId,
      difficulty: quiz.difficulty,
      score: analysis.score,
      totalQuestions: analysis.totalQuestions,
      percentage: analysis.percentage,
      userAnswers: answers,
      questions: quiz.questions,
      completedAt: analysis.completedAt,
      timeSpentSeconds,
      passed,
    };

    const fullAttempt: QuizAttempt = {
      id: attemptId,
      quizId: quiz.id,
      quizTitle: quiz.title,
      topic: quiz.topic,
      courseId: quiz.courseId,
      difficulty: quiz.difficulty,
      score: analysis.score,
      totalQuestions: analysis.totalQuestions,
      percentage: analysis.percentage,
      correctAnswers: analysis.correctCount,
      incorrectAnswers: analysis.incorrectCount,
      unansweredAnswers: analysis.unansweredCount,
      userAnswers: answers,
      questions: quiz.questions,
      completedAt: analysis.completedAt,
      timeTaken: timeSpentSeconds,
      passed,
      analysis,
    };

    // Save to Attempt Service & Analysis cache
    QuizAttemptService.saveAttempt(fullAttempt);
    QuizAttemptService.saveAnalysis(analysis);

    // Save active session status as submitted
    this.saveSessionState({
      ...session,
      isSubmitted: true,
    });

    // Record learning activity for Dashboard
    this.recordDashboardQuizActivity(fullAttempt);

    return { result, analysis };
  }

  /**
   * Retrieves attempt history
   */
  public static getAttemptHistory(): QuizAttemptResult[] {
    const attempts = QuizAttemptService.getAllAttempts();
    return attempts.map((a) => ({
      id: a.id,
      quizId: a.quizId,
      quizTitle: a.quizTitle,
      topic: a.topic,
      courseId: a.courseId,
      difficulty: a.difficulty,
      score: a.score,
      totalQuestions: a.totalQuestions,
      percentage: a.percentage,
      userAnswers: a.userAnswers,
      questions: a.questions,
      completedAt: a.completedAt,
      timeSpentSeconds: a.timeTaken,
      passed: a.passed,
    }));
  }

  /**
   * Saves dynamic quiz activity into localStorage so Dashboard displays the latest quiz achievements
   */
  private static recordDashboardQuizActivity(attempt: QuizAttempt): void {
    try {
      if (typeof window === 'undefined') return;
      const key = 'studyai_dashboard_custom_activities';
      const existingStr = localStorage.getItem(key);
      const list = existingStr ? JSON.parse(existingStr) : [];
      
      const newActivity = {
        id: `quiz-act-${Date.now()}`,
        type: 'quiz' as const,
        title: `Scored ${attempt.score}/${attempt.totalQuestions} in ${attempt.quizTitle || attempt.topic}`,
        timestamp: 'Just now',
        courseTitle: attempt.topic || 'AI Quiz Engine',
        score: `${attempt.score}/${attempt.totalQuestions} (${attempt.percentage}%)`,
      };

      const updated = [newActivity, ...list.filter((x: any) => x.id !== newActivity.id)].slice(0, 15);
      localStorage.setItem(key, JSON.stringify(updated));

      // Dispatch window event so any open listeners update immediately
      window.dispatchEvent(new CustomEvent('studyai_activity_updated'));
    } catch {
      // ignore
    }
  }
}
