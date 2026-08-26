import { Course, CourseStatus, CourseDifficulty } from './course';

export type ActivityType = 'course' | 'lesson' | 'quiz' | 'bookmark' | 'video';

export interface LearningActivity {
  id: string;
  type: ActivityType;
  title: string;
  timestamp: string;
  courseTitle?: string;
  score?: string;
}

export interface LearningStats {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  pausedCourses: number;
  savedCourses?: number;
  learningStreak: number;
  overallProgress: number;
  totalStudyHours?: number;
}

export interface LearningGoalTask {
  id: string;
  title: string;
  completed: boolean;
  category?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'alert' | 'streak';
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
  pausedAt?: string;
  startedAt?: string;
  completedAt?: string;
  enrolledAt?: string;
  completedLessonIds?: string[];
}

export type LearningTabType = 'all' | 'in-progress' | 'paused' | 'completed' | 'saved';

export type LearningSortOption =
  | 'recently-accessed'
  | 'recently-started'
  | 'highest-progress'
  | 'lowest-progress'
  | 'recently-completed'
  | 'title-asc';

export interface EnrolledCourseItem extends Course {
  userProgress: UserCourseProgress;
}
