import { QuizAttempt, QuizStatsSummary } from '../types/quizAttempt';
import { QuizAnalysis } from '../types/quizAnalysis';

const STORAGE_KEY_ATTEMPTS = 'studyai_quiz_attempts_history';
const STORAGE_KEY_ANALYSIS_MAP = 'studyai_quiz_analyses_cache';

export class QuizAttemptService {
  /**
   * Retrieves all completed quiz attempts from localStorage.
   */
  public static getAllAttempts(): QuizAttempt[] {
    try {
      if (typeof window === 'undefined') return [];
      const data = localStorage.getItem(STORAGE_KEY_ATTEMPTS);
      if (!data) return this.getInitialSeedAttempts();
      const list: QuizAttempt[] = JSON.parse(data);
      return list;
    } catch {
      return this.getInitialSeedAttempts();
    }
  }

  /**
   * Saves a new quiz attempt.
   */
  public static saveAttempt(attempt: QuizAttempt): void {
    try {
      if (typeof window === 'undefined') return;
      const list = this.getAllAttempts();
      const filtered = list.filter((a) => a.id !== attempt.id);
      const updated = [attempt, ...filtered];
      localStorage.setItem(STORAGE_KEY_ATTEMPTS, JSON.stringify(updated.slice(0, 100)));
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Gets attempt by ID or Quiz ID.
   */
  public static getAttemptById(attemptOrQuizId: string): QuizAttempt | null {
    const list = this.getAllAttempts();
    return (
      list.find((a) => a.id === attemptOrQuizId || a.quizId === attemptOrQuizId) || null
    );
  }

  /**
   * Saves cached analysis for quick retrieval on refresh.
   */
  public static saveAnalysis(analysis: QuizAnalysis): void {
    try {
      if (typeof window === 'undefined') return;
      const data = localStorage.getItem(STORAGE_KEY_ANALYSIS_MAP);
      const map: Record<string, QuizAnalysis> = data ? JSON.parse(data) : {};
      map[analysis.quizId] = analysis;
      localStorage.setItem(STORAGE_KEY_ANALYSIS_MAP, JSON.stringify(map));
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Retrieves cached analysis for a quiz.
   */
  public static getAnalysis(quizId: string): QuizAnalysis | null {
    try {
      if (typeof window === 'undefined') return null;
      const data = localStorage.getItem(STORAGE_KEY_ANALYSIS_MAP);
      if (!data) return null;
      const map: Record<string, QuizAnalysis> = JSON.parse(data);
      return map[quizId] || null;
    } catch {
      return null;
    }
  }

  /**
   * Computes aggregate statistics across all completed attempts.
   */
  public static getStatsSummary(): QuizStatsSummary {
    const attempts = this.getAllAttempts();
    if (attempts.length === 0) {
      return {
        totalQuizzesCompleted: 0,
        totalQuestionsAnswered: 0,
        averageScore: 0,
        highestScore: 0,
        passedCount: 0,
        recentAttempts: [],
        topWeakTopics: [],
        topStrongTopics: [],
      };
    }

    const totalQuizzesCompleted = attempts.length;
    const totalQuestionsAnswered = attempts.reduce((acc, a) => acc + (a.totalQuestions || 0), 0);
    const totalScorePercentage = attempts.reduce((acc, a) => acc + (a.percentage || 0), 0);
    const averageScore = Math.round(totalScorePercentage / totalQuizzesCompleted);
    const highestScore = Math.max(...attempts.map((a) => a.percentage || 0));
    const passedCount = attempts.filter((a) => a.passed || a.percentage >= 60).length;

    // Track topic performance across attempts
    const topicStats: Record<string, { correct: number; total: number }> = {};
    attempts.forEach((a) => {
      if (a.analysis?.allTopics) {
        a.analysis.allTopics.forEach((t) => {
          if (!topicStats[t.topic]) {
            topicStats[t.topic] = { correct: 0, total: 0 };
          }
          topicStats[t.topic].correct += t.correctAnswers;
          topicStats[t.topic].total += t.totalQuestions;
        });
      } else {
        const top = a.topic || 'General';
        if (!topicStats[top]) {
          topicStats[top] = { correct: 0, total: 0 };
        }
        topicStats[top].correct += a.correctAnswers;
        topicStats[top].total += a.totalQuestions;
      }
    });

    const topicRankings = Object.entries(topicStats).map(([topic, stat]) => {
      const avgAccuracy = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
      return { topic, count: stat.total, avgAccuracy };
    });

    const topWeakTopics = topicRankings
      .filter((t) => t.avgAccuracy < 70)
      .sort((a, b) => a.avgAccuracy - b.avgAccuracy)
      .slice(0, 3);

    const topStrongTopics = topicRankings
      .filter((t) => t.avgAccuracy >= 70)
      .sort((a, b) => b.avgAccuracy - a.avgAccuracy)
      .slice(0, 3);

    return {
      totalQuizzesCompleted,
      totalQuestionsAnswered,
      averageScore,
      highestScore,
      passedCount,
      recentAttempts: attempts.slice(0, 5),
      topWeakTopics,
      topStrongTopics,
    };
  }

  /**
   * Seed history attempts for demonstration
   */
  private static getInitialSeedAttempts(): QuizAttempt[] {
    return [
      {
        id: 'attempt-init-1',
        quizId: 'quiz-js-functions-sample',
        quizTitle: 'JavaScript Functions & Closures Quiz',
        topic: 'JavaScript Functions',
        difficulty: 'intermediate',
        score: 8,
        totalQuestions: 10,
        percentage: 80,
        correctAnswers: 8,
        incorrectAnswers: 2,
        unansweredAnswers: 0,
        userAnswers: { 0: 1, 1: 2, 2: 1, 3: 1, 4: 1, 5: 0, 6: 0, 7: 0, 8: 1, 9: 2 },
        questions: [],
        completedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        timeTaken: 522, // 8m 42s
        passed: true,
      },
    ];
  }
}
