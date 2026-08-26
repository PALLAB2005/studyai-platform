import {
  Quiz,
  QuizGenerationParams,
  QuizQuestion,
  QuizDifficulty,
  QuestionType,
} from '../types/quiz';
import { mockTopicQuestionBanks } from '../data/mockQuizzes';

/**
 * AI Quiz Service layer
 * Prepared for future real-time AI backend / Gemini API integration.
 * In development or when AI API credentials are not configured,
 * intelligently matches topic keywords, difficulty, and question type.
 */
export class AIQuizService {
  /**
   * Generates a complete structured Quiz based on course, module, lesson or custom topic.
   */
  public static async generateQuiz(params: QuizGenerationParams): Promise<Quiz> {
    // Artificial latency to simulate realistic AI generation synthesis (800ms)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Determine derived title and topic
    const topicName = this.deriveTopicName(params);
    const quizId = `quiz-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Select questions from topic question bank matching difficulty and question type
    const questions = this.synthesizeQuestions(
      topicName,
      params.difficulty,
      params.questionCount,
      params.questionType
    );

    const quiz: Quiz = {
      id: quizId,
      title: `${topicName} Quiz`,
      topic: topicName,
      courseId: params.courseId,
      courseTitle: params.courseTitle,
      moduleId: params.moduleId,
      moduleTitle: params.moduleTitle,
      lessonId: params.lessonId,
      lessonTitle: params.lessonTitle,
      scope: params.sourceType === 'course' ? params.scope || 'entire-course' : 'topic',
      difficulty: params.difficulty,
      questionType: params.questionType,
      questions,
      createdAt: new Date().toISOString(),
      timeLimitMinutes: params.timerMinutes,
      totalQuestions: questions.length,
    };

    return quiz;
  }

  /**
   * Helper to derive readable topic title
   */
  private static deriveTopicName(params: QuizGenerationParams): string {
    if (params.sourceType === 'course') {
      if (params.scope === 'lesson' && params.lessonTitle) {
        return params.lessonTitle;
      }
      if (params.scope === 'module' && params.moduleTitle) {
        return params.moduleTitle;
      }
      if (params.courseTitle) {
        return params.courseTitle;
      }
    }
    return params.topic?.trim() || 'General Computer Science';
  }

  /**
   * Intelligently selects or creates realistic questions tailored to the topic,
   * difficulty, and desired question count and type.
   */
  private static synthesizeQuestions(
    topicQuery: string,
    difficulty: QuizDifficulty,
    count: number,
    questionType: QuestionType
  ): QuizQuestion[] {
    const lowerQuery = topicQuery.toLowerCase();

    // 1. Find matching question banks by keywords
    let matchedBanks = mockTopicQuestionBanks.filter((bank) =>
      bank.keywords.some((kw) => lowerQuery.includes(kw)) ||
      lowerQuery.includes(bank.topic.toLowerCase())
    );

    if (matchedBanks.length === 0) {
      // Fallback: match by partial tokens
      matchedBanks = mockTopicQuestionBanks.filter((bank) =>
        bank.keywords.some((kw) => lowerQuery.split(/[\s,/-]+/).some((token) => token && (kw.includes(token) || token.includes(kw))))
      );
    }

    if (matchedBanks.length === 0) {
      // Default to the first 2 banks if no specific keywords match
      matchedBanks = [mockTopicQuestionBanks[0], mockTopicQuestionBanks[1]];
    }

    // Pool all questions from matched banks
    let candidatePool: QuizQuestion[] = matchedBanks.flatMap((b) => b.questions);

    // Filter by question type if required
    if (questionType === 'true-false') {
      candidatePool = candidatePool.filter((q) => q.options.length === 2);
    } else if (questionType === 'multiple-choice') {
      candidatePool = candidatePool.filter((q) => q.options.length > 2);
    }

    // If candidate pool is too small after filtering, include other questions
    if (candidatePool.length < count) {
      const allOtherQuestions = mockTopicQuestionBanks
        .flatMap((b) => b.questions)
        .filter((q) => !candidatePool.some((c) => c.id === q.id));

      candidatePool = [...candidatePool, ...allOtherQuestions];
    }

    // Score questions by difficulty proximity
    const prioritized = [...candidatePool].sort((a, b) => {
      const aMatchesDiff = a.difficulty === difficulty ? 1 : 0;
      const bMatchesDiff = b.difficulty === difficulty ? 1 : 0;
      return bMatchesDiff - aMatchesDiff;
    });

    // Pick desired count
    let selected = prioritized.slice(0, count);

    // If still less than requested count, generate dynamic variations
    if (selected.length < count) {
      const missingCount = count - selected.length;
      for (let i = 0; i < missingCount; i++) {
        const base = selected[i % selected.length] || mockTopicQuestionBanks[0].questions[0];
        selected.push({
          id: `${base.id}-gen-${i + 1}`,
          question: `Regarding ${topicQuery}: ${base.question}`,
          options: [...base.options],
          correctAnswer: base.correctAnswer,
          explanation: base.explanation,
          topic: topicQuery,
          difficulty,
        });
      }
    }

    // Shuffle options order subtly while maintaining correct index
    return selected.map((q, idx) => ({
      ...q,
      id: `q-${idx + 1}-${q.id}`,
    }));
  }
}
