import { Quiz, QuizQuestion, QuizDifficulty } from '../types/quiz';
import {
  QuizAnalysis,
  TopicPerformance,
  TopicRecommendation,
  QuestionReviewItem,
  StudyAIStudyResource,
  DifficultyRecommendation,
  PerformanceLevel,
} from '../types/quizAnalysis';
import { mockCoursesData } from '../data/courses';

export interface QuizAnalysisParams {
  quiz: Quiz;
  answers: Record<number, number>; // questionIndex -> optionIndex
  timeSpentSeconds?: number;
}

export class QuizAnalysisService {
  /**
   * Performs in-depth, structured performance and weak topic analysis.
   * Formatted to integrate with future AI API backends while calculating
   * accurate multi-metric local intelligence.
   */
  public static analyzeQuizPerformance(params: QuizAnalysisParams): QuizAnalysis {
    const { quiz, answers, timeSpentSeconds = 0 } = params;
    const questions = quiz.questions || [];
    const totalQuestions = questions.length;

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    // 1. Build Question-by-Question Review List
    const questionsReview: QuestionReviewItem[] = questions.map((q, index) => {
      const userAnswerIndex = answers[index];
      const isUnanswered = userAnswerIndex === undefined;
      const isCorrect = !isUnanswered && userAnswerIndex === q.correctAnswer;

      if (isUnanswered) {
        unansweredCount++;
      } else if (isCorrect) {
        correctCount++;
      } else {
        incorrectCount++;
      }

      const status: 'correct' | 'incorrect' | 'unanswered' = isUnanswered
        ? 'unanswered'
        : isCorrect
        ? 'correct'
        : 'incorrect';

      const userAnswerText = isUnanswered
        ? null
        : q.options[userAnswerIndex] || `Option ${userAnswerIndex + 1}`;

      const correctAnswerText = q.options[q.correctAnswer] || `Option ${q.correctAnswer + 1}`;

      // Derive specific topic
      const topicName = q.topic || quiz.topic || 'General Concepts';
      const subTopic = q.subTopic;

      return {
        questionNumber: index + 1,
        question: q,
        userAnswerIndex,
        userAnswerText,
        correctAnswerIndex: q.correctAnswer,
        correctAnswerText,
        isCorrect,
        isUnanswered,
        status,
        topic: topicName,
        subTopic,
        explanation: q.explanation || 'No additional explanation provided.',
      };
    });

    const score = correctCount;
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    const isPerfectScore = totalQuestions > 0 && correctCount === totalQuestions;

    // 2. Group by Topic to Calculate Topic Performance & Accuracy
    const topicMap: Record<
      string,
      {
        total: number;
        correct: number;
        incorrect: number;
        unanswered: number;
        subTopics: Set<string>;
      }
    > = {};

    questionsReview.forEach((item) => {
      const t = item.topic;
      if (!topicMap[t]) {
        topicMap[t] = {
          total: 0,
          correct: 0,
          incorrect: 0,
          unanswered: 0,
          subTopics: new Set(),
        };
      }
      topicMap[t].total += 1;
      if (item.isCorrect) topicMap[t].correct += 1;
      else if (item.isUnanswered) topicMap[t].unanswered += 1;
      else topicMap[t].incorrect += 1;

      if (item.subTopic) {
        topicMap[t].subTopics.add(item.subTopic);
      }
    });

    // If only one global topic exists and there are multiple questions,
    // generate subtopic groupings based on question keywords to provide meaningful weak-topic breakdown
    const rawTopics = Object.keys(topicMap);
    let allTopics: TopicPerformance[] = [];

    if (rawTopics.length === 1 && totalQuestions >= 4) {
      // Intelligently infer sub-categories if single broad topic
      const subGroupMap: Record<string, { total: number; correct: number; incorrect: number; unanswered: number }> = {};

      questionsReview.forEach((item) => {
        const sub = this.inferSubTopic(item.question.question, item.topic);
        if (!subGroupMap[sub]) {
          subGroupMap[sub] = { total: 0, correct: 0, incorrect: 0, unanswered: 0 };
        }
        subGroupMap[sub].total += 1;
        if (item.isCorrect) subGroupMap[sub].correct += 1;
        else if (item.isUnanswered) subGroupMap[sub].unanswered += 1;
        else subGroupMap[sub].incorrect += 1;
      });

      allTopics = Object.entries(subGroupMap).map(([topicName, stats]) => {
        const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
        const level: PerformanceLevel =
          accuracy >= 80 ? 'strong' : accuracy >= 50 ? 'needs-improvement' : 'weak';

        return {
          topic: topicName,
          totalQuestions: stats.total,
          correctAnswers: stats.correct,
          incorrectAnswers: stats.incorrect,
          unansweredAnswers: stats.unanswered,
          accuracy,
          level,
        };
      });
    } else {
      allTopics = Object.entries(topicMap).map(([topicName, stats]) => {
        const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
        const level: PerformanceLevel =
          accuracy >= 80 ? 'strong' : accuracy >= 50 ? 'needs-improvement' : 'weak';

        return {
          topic: topicName,
          totalQuestions: stats.total,
          correctAnswers: stats.correct,
          incorrectAnswers: stats.incorrect,
          unansweredAnswers: stats.unanswered,
          accuracy,
          level,
        };
      });
    }

    // Sort topics by accuracy ascending so weakest topics appear first
    allTopics.sort((a, b) => a.accuracy - b.accuracy);

    const strengths = allTopics.filter((t) => t.level === 'strong');
    const weakTopics = allTopics.filter((t) => t.level === 'weak' || t.level === 'needs-improvement');

    // 3. Dynamic Performance Message & Grade
    const { grade, heading, message } = this.calculatePerformanceMessage(percentage);

    // 4. Personalized Next Difficulty Recommendation
    const nextDifficultyRecommendation = this.calculateNextDifficulty(percentage, quiz.difficulty);

    // 5. Generate Tailored Recommendations for Weak & Needs-Improvement Topics
    const recommendations: TopicRecommendation[] = weakTopics.map((item) => {
      const studyAILesson = this.findStudyAILesson(item.topic, quiz.courseId);
      const recommendationText = this.generateRecommendationMessage(item.topic, item.accuracy);
      const suggestedDifficulty: QuizDifficulty =
        item.accuracy < 40 ? 'beginner' : 'intermediate';

      return {
        topic: item.topic,
        level: item.level,
        accuracy: item.accuracy,
        message: recommendationText,
        suggestedDifficulty,
        studyAILesson,
        recommendedSearchTerm: `${item.topic} tutorial crash course`,
      };
    });

    return {
      quizId: quiz.id,
      quizTitle: quiz.title,
      topic: quiz.topic,
      difficulty: quiz.difficulty,
      score,
      totalQuestions,
      percentage,
      correctCount,
      incorrectCount,
      unansweredCount,
      timeSpentSeconds,
      completedAt: new Date().toISOString(),
      performanceGrade: grade,
      performanceHeading: heading,
      performanceMessage: message,
      isPerfectScore,
      strengths,
      weakTopics,
      allTopics,
      recommendations,
      nextDifficultyRecommendation,
      questionsReview,
    };
  }

  /**
   * Formats performance headings and messages based on explicit percentage brackets.
   */
  private static calculatePerformanceMessage(percentage: number): {
    grade: 'excellent' | 'great' | 'good' | 'needs-practice';
    heading: string;
    message: string;
  } {
    if (percentage >= 90) {
      return {
        grade: 'excellent',
        heading: 'Excellent Work! 🚀',
        message: 'You have a strong understanding of this topic.',
      };
    } else if (percentage >= 70) {
      return {
        grade: 'great',
        heading: 'Great Job! 👏',
        message: 'You understand most concepts, but there are a few areas you can improve.',
      };
    } else if (percentage >= 50) {
      return {
        grade: 'good',
        heading: 'Good Attempt! 📚',
        message: 'You have a basic understanding, but reviewing some topics will help you improve.',
      };
    } else {
      return {
        grade: 'needs-practice',
        heading: 'Keep Practicing 💪',
        message: "Don't worry. Focus on your weak topics and try again.",
      };
    }
  }

  /**
   * Calculates next difficulty advice based on score
   */
  private static calculateNextDifficulty(
    percentage: number,
    currentDifficulty: QuizDifficulty
  ): DifficultyRecommendation {
    if (percentage >= 90) {
      return {
        level: 'advanced',
        title: 'Ready for Next Level',
        message: 'You are ready to try an Advanced Quiz.',
        actionLabel: 'Try Advanced Quiz',
      };
    } else if (percentage >= 70) {
      return {
        level: 'intermediate',
        title: 'Solid Progress',
        message: 'Try an Intermediate Quiz to strengthen your understanding.',
        actionLabel: 'Practice Again',
      };
    } else {
      return {
        level: 'beginner',
        title: 'Revision Recommended',
        message: 'We recommend reviewing your weak topics before taking another quiz.',
        actionLabel: 'Start Revision',
      };
    }
  }

  /**
   * Intelligently creates tailored revision recommendation text for a topic
   */
  private static generateRecommendationMessage(topic: string, accuracy: number): string {
    const lower = topic.toLowerCase();

    if (lower.includes('dom') || lower.includes('manipulation')) {
      return 'Review DOM selection (querySelector), element manipulation, attribute modification, and event handling before taking another quiz.';
    }
    if (lower.includes('event') || lower.includes('listener')) {
      return 'Practice event listeners, event delegation, bubbling/capturing, and event object handling concepts.';
    }
    if (lower.includes('function') || lower.includes('closure')) {
      return 'Review function declarations vs. expressions, closures, arrow function lexical binding, and higher-order callbacks.';
    }
    if (lower.includes('async') || lower.includes('promise') || lower.includes('await')) {
      return 'Deepen understanding of asynchronous JavaScript, Promise chaining, try/catch with async/await, and the Microtask event loop.';
    }
    if (lower.includes('hook') || lower.includes('react state') || lower.includes('usestate')) {
      return 'Review React useState mechanics, batching, useEffect dependency rules, and cleanup functions.';
    }
    if (lower.includes('component') || lower.includes('jsx') || lower.includes('props')) {
      return 'Practice React component decomposition, unidirectional props passing, and key props in list rendering.';
    }
    if (lower.includes('sql') || lower.includes('join') || lower.includes('query')) {
      return 'Practice SQL JOIN variations (INNER, LEFT, RIGHT), GROUP BY with HAVING, and subqueries with index optimization.';
    }
    if (lower.includes('acid') || lower.includes('normalization') || lower.includes('dbms')) {
      return 'Review database transaction ACID properties (Atomicity, Consistency, Isolation, Durability) and 1NF/2NF/3NF/BCNF normalization rules.';
    }
    if (lower.includes('tree') || lower.includes('graph') || lower.includes('dsa')) {
      return 'Practice tree traversals (In-order, Pre-order, Level-order BFS), recursion stacks, and shortest-path graph algorithms.';
    }
    if (lower.includes('sort') || lower.includes('search') || lower.includes('complexity')) {
      return 'Review Big-O time and space complexity models for QuickSort, MergeSort, and Binary Search boundary conditions.';
    }
    if (lower.includes('python') || lower.includes('decorator') || lower.includes('generator')) {
      return 'Review Python iterable generators with yield, decorator wrappers, and mutable vs. immutable sequence data types.';
    }
    if (lower.includes('memory') || lower.includes('paging') || lower.includes('os')) {
      return 'Review virtual memory page tables, page faults, TLB caching, and multi-threaded semaphore synchronization.';
    }
    if (lower.includes('flexbox') || lower.includes('grid') || lower.includes('css') || lower.includes('box model')) {
      return 'Review CSS Box Model (margin/border/padding/content) and 2D layout alignments with Flexbox and CSS Grid.';
    }

    if (accuracy < 35) {
      return `Spend extra time revisiting the fundamental concepts and core syntax of ${topic} before attempting another assessment.`;
    }
    return `Practice additional example problems and review reference documentation for ${topic} to master edge cases.`;
  }

  /**
   * Helper to infer fine-grained subtopics when analyzing a single broad topic quiz
   */
  private static inferSubTopic(questionText: string, broadTopic: string): string {
    const q = questionText.toLowerCase();

    if (q.includes('closure') || q.includes('lexical') || q.includes('scope')) {
      return 'JavaScript Closures & Scope';
    }
    if (q.includes('arrow') || q.includes('this') || q.includes('bind') || q.includes('call')) {
      return 'Function Context & "this"';
    }
    if (q.includes('dom') || q.includes('element') || q.includes('queryselector') || q.includes('html')) {
      return 'DOM Manipulation';
    }
    if (q.includes('event') || q.includes('listener') || q.includes('click') || q.includes('delegation')) {
      return 'JavaScript Events';
    }
    if (q.includes('async') || q.includes('promise') || q.includes('await') || q.includes('fetch')) {
      return 'Asynchronous Programming';
    }
    if (q.includes('hook') || q.includes('useeffect') || q.includes('usestate') || q.includes('usememo')) {
      return 'React Hooks';
    }
    if (q.includes('component') || q.includes('jsx') || q.includes('virtual dom') || q.includes('key')) {
      return 'React Components & Architecture';
    }
    if (q.includes('acid') || q.includes('transaction') || q.includes('deadlock')) {
      return 'Transactions & ACID';
    }
    if (q.includes('join') || q.includes('group by') || q.includes('having') || q.includes('select')) {
      return 'SQL Queries & Joins';
    }
    if (q.includes('tree') || q.includes('bst') || q.includes('graph') || q.includes('dijkstra')) {
      return 'Trees & Graphs';
    }
    if (q.includes('sort') || q.includes('stack') || q.includes('queue') || q.includes('hash')) {
      return 'Basic Data Structures';
    }
    if (q.includes('process') || q.includes('thread') || q.includes('semaphore') || q.includes('paging')) {
      return 'Operating Systems & Concurrency';
    }
    if (q.includes('list') || q.includes('tuple') || q.includes('yield') || q.includes('decorator')) {
      return 'Python Syntax & Data Structures';
    }

    return broadTopic;
  }

  /**
   * Scans StudyAI course catalog and curriculum syllabi for a direct matching lesson.
   */
  public static findStudyAILesson(
    topic: string,
    preferredCourseId?: string
  ): StudyAIStudyResource | undefined {
    const cleanTopic = topic.toLowerCase();
    const topicWords = cleanTopic.split(/[\s,/-]+/).filter((w) => w.length > 2);

    // 1. Search syllabus in mockCoursesData
    for (const course of mockCoursesData) {
      if (preferredCourseId && course.id !== preferredCourseId && course.slug !== preferredCourseId) {
        // give priority to preferred course if provided, else check all
      }

      if (!course.syllabus) continue;

      for (const mod of course.syllabus) {
        for (const lesson of mod.lessons) {
          const lTitle = lesson.title.toLowerCase();
          const mTitle = mod.title.toLowerCase();
          const cTitle = course.title.toLowerCase();

          // Check for exact phrase matches
          if (lTitle.includes(cleanTopic) || cleanTopic.includes(lTitle)) {
            return {
              courseId: course.id,
              courseTitle: course.title,
              courseSlug: course.slug || course.id,
              moduleId: mod.id,
              moduleTitle: mod.title,
              lessonId: lesson.id,
              lessonTitle: lesson.title,
              duration: lesson.duration,
            };
          }

          // Check for high-relevance word overlap
          const matchCount = topicWords.filter(
            (w) => lTitle.includes(w) || mTitle.includes(w) || cTitle.includes(w)
          ).length;

          if (matchCount >= 2 || (topicWords.length === 1 && matchCount === 1)) {
            return {
              courseId: course.id,
              courseTitle: course.title,
              courseSlug: course.slug || course.id,
              moduleId: mod.id,
              moduleTitle: mod.title,
              lessonId: lesson.id,
              lessonTitle: lesson.title,
              duration: lesson.duration,
            };
          }
        }
      }
    }

    // 2. Keyword alias mappings for standard CS topics
    if (cleanTopic.includes('dom') || cleanTopic.includes('event')) {
      return {
        courseId: 'web-dev-bootcamp',
        courseTitle: 'Complete Web Development Bootcamp',
        courseSlug: 'web-development-bootcamp',
        moduleId: 'mod-3',
        moduleTitle: 'Module 3 — JavaScript Fundamentals',
        lessonId: 'js-dom',
        lessonTitle: 'DOM Querying & Manipulation',
        duration: '40 min',
      };
    }

    if (cleanTopic.includes('function') || cleanTopic.includes('closure') || cleanTopic.includes('scope')) {
      return {
        courseId: 'web-dev-bootcamp',
        courseTitle: 'Complete Web Development Bootcamp',
        courseSlug: 'web-development-bootcamp',
        moduleId: 'mod-3',
        moduleTitle: 'Module 3 — JavaScript Fundamentals',
        lessonId: 'javascript-functions',
        lessonTitle: 'JavaScript Functions',
        duration: '35 min',
      };
    }

    if (cleanTopic.includes('hook') || cleanTopic.includes('state') || cleanTopic.includes('react')) {
      return {
        courseId: 'web-dev-bootcamp',
        courseTitle: 'Complete Web Development Bootcamp',
        courseSlug: 'web-development-bootcamp',
        moduleId: 'mod-5',
        moduleTitle: 'Module 5 — React Fundamentals',
        lessonId: 'react-hooks',
        lessonTitle: 'Mastering useEffect & Custom Hooks',
        duration: '45 min',
      };
    }

    if (cleanTopic.includes('sql') || cleanTopic.includes('dbms') || cleanTopic.includes('database')) {
      return {
        courseId: 'web-dev-bootcamp',
        courseTitle: 'Complete Web Development Bootcamp',
        courseSlug: 'web-development-bootcamp',
        moduleId: 'mod-3',
        moduleTitle: 'Module 3 — Relational Databases & SQL',
        lessonId: 'sql-joins',
        lessonTitle: 'Relational Database Queries & Schema Modeling',
        duration: '30 min',
      };
    }

    if (cleanTopic.includes('tree') || cleanTopic.includes('graph') || cleanTopic.includes('algorithm') || cleanTopic.includes('dsa')) {
      return {
        courseId: 'dsa-fundamentals',
        courseTitle: 'Data Structures & Algorithms Masterclass',
        courseSlug: 'data-structures-and-algorithms',
        moduleId: 'mod-2',
        moduleTitle: 'Module 2 — Advanced Trees and Graph Traversals',
        lessonId: 'trees-bfs-dfs',
        lessonTitle: 'Binary Search Trees & Graph Search',
        duration: '45 min',
      };
    }

    if (cleanTopic.includes('python')) {
      return {
        courseId: 'python-beginners',
        courseTitle: 'Python for Beginners & Data Automation',
        courseSlug: 'python-beginners',
        moduleId: 'mod-1',
        moduleTitle: 'Module 1 — Python Fundamentals',
        lessonId: 'py-intro',
        lessonTitle: 'Python Data Structures & Control Flow',
        duration: '35 min',
      };
    }

    return undefined;
  }
}
