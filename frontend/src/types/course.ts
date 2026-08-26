import { Module, Lesson } from './lesson';

export type CourseDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type CourseStatus = 'not-started' | 'in-progress' | 'paused' | 'completed';

export interface CourseSyllabusLesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'quiz' | 'reading' | 'code' | 'article' | 'youtube' | 'document';
  completed?: boolean;
}

export interface CourseSyllabusModule {
  id: string;
  title: string;
  duration: string;
  completed?: boolean;
  lessons: (CourseSyllabusLesson | Lesson)[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  instructor: string;
  instructorRole?: string;
  difficulty: CourseDifficulty;
  duration: string;
  durationHours: number;
  totalLessons: number;
  thumbnail?: string;
  featured: boolean;
  status: CourseStatus;
  progress: number;
  completedLessons: number;
  createdAt: string;
  rating?: number;
  studentsEnrolled?: number;
  colorScheme: 'blue' | 'purple' | 'amber' | 'emerald' | 'rose' | 'indigo' | 'cyan';
  lastAccessed?: string;
  completedDate?: string;
  whatYouWillLearn?: string[];
  requirements?: string[];
  syllabus?: (CourseSyllabusModule | Module)[];
  modules?: Module[];
}

// Backwards-compatibility alias for dashboard components
export interface CourseProgress extends Course {
  courseId: string;
  courseName: string;
  level: CourseDifficulty;
}

