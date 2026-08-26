import { CourseStatus } from './course';

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  lastPosition?: number;
}

export interface UserCourseProgress {
  courseId: string;
  status: CourseStatus;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  lastLessonId?: string;
  lastLessonTitle?: string;
  lastAccessed?: string;
  lastAccessedTimestamp?: number;
  startedAt?: string;
  pausedAt?: string;
  completedAt?: string;
  enrolledAt?: string;
  completedLessonIds?: string[];
  lessonProgress?: Record<string, LessonProgress>;
}
