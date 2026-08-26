import { UserCourseProgress, LearningStats } from '../types/learning';
import { Course, CourseStatus } from '../types/course';
import { mockCoursesData } from '../data/courses';

const STORAGE_KEY = 'studyai_learning_progress_v1';

// Format relative date helper
export function formatRelativeDate(timestamp: number): string {
  const diffMs = Date.now() - timestamp;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 5) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes} mins ago`;
  if (diffHours < 24) return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 30) return `${diffDays} days ago`;
  
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// Generate default initial progress map from seed catalog
function getInitialDefaultProgressMap(): Record<string, UserCourseProgress> {
  const map: Record<string, UserCourseProgress> = {};
  const now = Date.now();

  mockCoursesData.forEach((course) => {
    // Determine default syllabus lesson references
    let lastLessonId: string | undefined = undefined;
    let lastLessonTitle: string | undefined = undefined;
    const completedLessonIds: string[] = [];

    if (course.syllabus && course.syllabus.length > 0) {
      const allLessons = course.syllabus.flatMap((m) => m.lessons);
      const completedList = allLessons.filter((l) => l.completed);
      completedList.forEach((l) => completedLessonIds.push(l.id));

      const nextUncompleted = allLessons.find((l) => !l.completed);
      if (nextUncompleted) {
        lastLessonId = nextUncompleted.id;
        lastLessonTitle = nextUncompleted.title;
      } else if (allLessons.length > 0) {
        lastLessonId = allLessons[allLessons.length - 1].id;
        lastLessonTitle = allLessons[allLessons.length - 1].title;
      }
    }

    if (!lastLessonId) {
      if (course.id === 'web-dev-bootcamp') {
        lastLessonId = 'l-303';
        lastLessonTitle = 'Complex State & Context API';
      } else if (course.id === 'js-masterclass') {
        lastLessonId = 'l-202';
        lastLessonTitle = 'JavaScript Closures & Scope';
      } else if (course.id === 'python-beginners') {
        lastLessonId = 'l-104';
        lastLessonTitle = 'Loops and Comprehensions';
      } else if (course.id === 'dsa-fundamentals') {
        lastLessonId = 'l-201';
        lastLessonTitle = 'Binary Search Trees & AVL Trees';
      } else if (course.id === 'dbms-core') {
        lastLessonId = 'l-105';
        lastLessonTitle = 'Relational Algebra & Normalization';
      } else {
        lastLessonId = 'l-101';
        lastLessonTitle = 'Introduction & Overview';
      }
    }

    // Determine timestamp approximations for mock data
    let lastAccessedTimestamp = now - 1000 * 60 * 60 * 2; // 2 hours ago
    if (course.lastAccessed?.includes('Yesterday')) {
      lastAccessedTimestamp = now - 1000 * 60 * 60 * 24;
    } else if (course.lastAccessed?.includes('3 days ago')) {
      lastAccessedTimestamp = now - 1000 * 60 * 60 * 24 * 3;
    } else if (course.lastAccessed?.includes('8 days ago')) {
      lastAccessedTimestamp = now - 1000 * 60 * 60 * 24 * 8;
    } else if (course.lastAccessed?.includes('12 days ago')) {
      lastAccessedTimestamp = now - 1000 * 60 * 60 * 24 * 12;
    } else if (course.completedDate) {
      lastAccessedTimestamp = now - 1000 * 60 * 60 * 24 * 6;
    }

    map[course.id] = {
      courseId: course.id,
      status: course.status,
      progress: course.progress,
      completedLessons: course.completedLessons,
      totalLessons: course.totalLessons,
      lastLessonId,
      lastLessonTitle,
      lastAccessed: course.lastAccessed || 'Recently',
      lastAccessedTimestamp,
      pausedAt: course.status === 'paused' ? course.lastAccessed || '12 days ago' : undefined,
      startedAt: course.createdAt,
      completedAt: course.completedDate,
      enrolledAt: course.createdAt,
      completedLessonIds,
    };
  });

  return map;
}

export class LearningProgressService {
  /**
   * Fetch all user course progress records from localStorage (or defaults)
   */
  static getAllProgress(): Record<string, UserCourseProgress> {
    if (typeof window === 'undefined') {
      return getInitialDefaultProgressMap();
    }

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        const initialMap = getInitialDefaultProgressMap();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMap));
        return initialMap;
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to load learning progress from localStorage, using defaults:', e);
      return getInitialDefaultProgressMap();
    }
  }

  /**
   * Persist full progress record map to localStorage
   */
  static saveAllProgress(progressMap: Record<string, UserCourseProgress>): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progressMap));
    } catch (e) {
      console.error('Failed to save learning progress to localStorage:', e);
    }
  }

  /**
   * Get progress for a single course
   */
  static getCourseProgress(courseId: string): UserCourseProgress | null {
    const all = this.getAllProgress();
    return all[courseId] || null;
  }

  /**
   * Start a course (moves status to in-progress)
   */
  static startCourse(course: Course, firstLessonId?: string, firstLessonTitle?: string): UserCourseProgress {
    const all = this.getAllProgress();
    const now = Date.now();
    const current = all[course.id];

    const updated: UserCourseProgress = {
      courseId: course.id,
      status: 'in-progress',
      progress: current?.progress && current.progress > 0 ? current.progress : Math.max(5, Math.round((1 / course.totalLessons) * 100)),
      completedLessons: current?.completedLessons && current.completedLessons > 0 ? current.completedLessons : 1,
      totalLessons: course.totalLessons,
      lastLessonId: firstLessonId || current?.lastLessonId || 'l-101',
      lastLessonTitle: firstLessonTitle || current?.lastLessonTitle || 'Introduction Lesson',
      lastAccessed: 'Just now',
      lastAccessedTimestamp: now,
      startedAt: current?.startedAt || new Date(now).toISOString().split('T')[0],
      enrolledAt: current?.enrolledAt || new Date(now).toISOString().split('T')[0],
      completedLessonIds: current?.completedLessonIds || ['l-101'],
    };

    all[course.id] = updated;
    this.saveAllProgress(all);
    return updated;
  }

  /**
   * Pause a course (preserves progress, changes status to paused)
   */
  static pauseCourse(courseId: string): UserCourseProgress | null {
    const all = this.getAllProgress();
    const current = all[courseId];
    if (!current) return null;

    const now = Date.now();
    const updated: UserCourseProgress = {
      ...current,
      status: 'paused',
      pausedAt: 'Just now',
      lastAccessed: 'Just now',
      lastAccessedTimestamp: now,
    };

    all[courseId] = updated;
    this.saveAllProgress(all);
    return updated;
  }

  /**
   * Resume a paused course
   */
  static resumeCourse(courseId: string): UserCourseProgress | null {
    const all = this.getAllProgress();
    const current = all[courseId];
    if (!current) return null;

    const now = Date.now();
    const updated: UserCourseProgress = {
      ...current,
      status: 'in-progress',
      pausedAt: undefined,
      lastAccessed: 'Just now',
      lastAccessedTimestamp: now,
    };

    all[courseId] = updated;
    this.saveAllProgress(all);
    return updated;
  }

  /**
   * Complete a lesson inside a course and update calculated progress %
   */
  static completeLesson(
    courseId: string,
    lessonId: string,
    lessonTitle: string,
    totalLessonsCount?: number
  ): UserCourseProgress {
    const all = this.getAllProgress();
    const current = all[courseId];
    const now = Date.now();

    const completedLessonIds = new Set(current?.completedLessonIds || []);
    completedLessonIds.add(lessonId);

    const totalLessons = totalLessonsCount || current?.totalLessons || 40;
    const completedCount = completedLessonIds.size;
    const progress = Math.min(100, Math.round((completedCount / totalLessons) * 100));
    const isCompleted = progress === 100 || completedCount >= totalLessons;

    const updated: UserCourseProgress = {
      courseId,
      status: isCompleted ? 'completed' : 'in-progress',
      progress,
      completedLessons: completedCount,
      totalLessons,
      lastLessonId: lessonId,
      lastLessonTitle: lessonTitle,
      lastAccessed: 'Just now',
      lastAccessedTimestamp: now,
      startedAt: current?.startedAt || new Date(now).toISOString().split('T')[0],
      completedAt: isCompleted ? new Date(now).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : current?.completedAt,
      completedLessonIds: Array.from(completedLessonIds),
    };

    all[courseId] = updated;
    this.saveAllProgress(all);
    return updated;
  }

  /**
   * Remove course progress from My Learning
   */
  static removeCourseProgress(courseId: string): void {
    const all = this.getAllProgress();
    if (all[courseId]) {
      delete all[courseId];
      this.saveAllProgress(all);
    }
  }

  /**
   * Reset all progress back to mock default state
   */
  static resetToDefault(): Record<string, UserCourseProgress> {
    const initial = getInitialDefaultProgressMap();
    this.saveAllProgress(initial);
    return initial;
  }

  /**
   * Calculate real-time overall learning stats
   */
  static calculateStats(progressMap: Record<string, UserCourseProgress>): LearningStats {
    const items = Object.values(progressMap);

    const inProgressCourses = items.filter((c) => c.status === 'in-progress').length;
    const pausedCourses = items.filter((c) => c.status === 'paused').length;
    const completedCourses = items.filter((c) => c.status === 'completed').length;
    const savedCourses = items.filter((c) => c.status === 'not-started').length;
    const totalCourses = items.length;

    // Calculate weighted average progress across active/completed courses
    const activeAndCompleted = items.filter((c) => c.status !== 'not-started');
    const overallProgress = activeAndCompleted.length > 0
      ? Math.round(
          activeAndCompleted.reduce((acc, curr) => acc + curr.progress, 0) / activeAndCompleted.length
        )
      : 0;

    return {
      totalCourses,
      inProgressCourses,
      pausedCourses,
      completedCourses,
      savedCourses,
      learningStreak: 7,
      overallProgress,
      totalStudyHours: 42,
    };
  }
}
