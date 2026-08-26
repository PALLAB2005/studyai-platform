import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { UserCourseProgress, LearningStats, EnrolledCourseItem } from '../types/learning';
import { Course } from '../types/course';
import { mockCoursesData } from '../data/courses';
import { LearningProgressService } from '../services/learningProgressService';
import { useAuth } from './AuthContext';

interface ToastData {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface LearningContextType {
  progressMap: Record<string, UserCourseProgress>;
  allCoursesWithProgress: EnrolledCourseItem[];
  stats: LearningStats;
  startCourse: (course: Course, firstLessonId?: string, firstLessonTitle?: string) => void;
  pauseCourse: (courseId: string) => void;
  resumeCourse: (courseId: string) => void;
  completeLesson: (courseId: string, lessonId: string, lessonTitle: string, totalLessons?: number) => void;
  removeCourse: (courseId: string) => void;
  continueCourse: (courseId: string) => void;
  getCourseProgress: (courseId: string) => UserCourseProgress | undefined;
  toasts: ToastData[];
  dismissToast: (id: string) => void;
  showToast: (message: string, type?: ToastData['type']) => void;
  resetAllLearning: () => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const { navigate } = useAuth();
  const [progressMap, setProgressMap] = useState<Record<string, UserCourseProgress>>(() => {
    return LearningProgressService.getAllProgress();
  });
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((message: string, type: ToastData['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Merge full course catalog with the real-time progress map
  const allCoursesWithProgress = useMemo<EnrolledCourseItem[]>(() => {
    return mockCoursesData.map((course) => {
      const userProgress = progressMap[course.id] || {
        courseId: course.id,
        status: 'not-started',
        progress: 0,
        completedLessons: 0,
        totalLessons: course.totalLessons,
        lastAccessed: 'Not started yet',
      };

      return {
        ...course,
        status: userProgress.status,
        progress: userProgress.progress,
        completedLessons: userProgress.completedLessons,
        lastAccessed: userProgress.lastAccessed,
        completedDate: userProgress.completedAt || course.completedDate,
        userProgress,
      };
    });
  }, [progressMap]);

  // Real-time calculated overall statistics
  const stats = useMemo<LearningStats>(() => {
    return LearningProgressService.calculateStats(progressMap);
  }, [progressMap]);

  const startCourse = useCallback((course: Course, firstLessonId?: string, firstLessonTitle?: string) => {
    const updated = LearningProgressService.startCourse(course, firstLessonId, firstLessonTitle);
    setProgressMap((prev) => ({ ...prev, [course.id]: updated }));
    showToast(`Started course: "${course.title}". Happy learning!`, 'success');
    
    // Navigate to course or lesson
    const targetSlug = course.slug || course.id;
    const lessonSlug = updated.lastLessonId || 'l-101';
    navigate(`/courses/${targetSlug}/lessons/${lessonSlug}`);
  }, [navigate, showToast]);

  const pauseCourse = useCallback((courseId: string) => {
    const updated = LearningProgressService.pauseCourse(courseId);
    if (updated) {
      setProgressMap((prev) => ({ ...prev, [courseId]: updated }));
      showToast('Course paused successfully', 'info');
    }
  }, [showToast]);

  const resumeCourse = useCallback((courseId: string) => {
    const updated = LearningProgressService.resumeCourse(courseId);
    if (updated) {
      setProgressMap((prev) => ({ ...prev, [courseId]: updated }));
      showToast('Welcome back! Continue where you left off.', 'success');

      // Navigate to course
      const course = mockCoursesData.find((c) => c.id === courseId);
      if (course) {
        const targetSlug = course.slug || course.id;
        const lessonSlug = updated.lastLessonId || 'l-101';
        navigate(`/courses/${targetSlug}/lessons/${lessonSlug}`);
      }
    }
  }, [navigate, showToast]);

  const completeLesson = useCallback((
    courseId: string,
    lessonId: string,
    lessonTitle: string,
    totalLessons?: number
  ) => {
    const updated = LearningProgressService.completeLesson(courseId, lessonId, lessonTitle, totalLessons);
    setProgressMap((prev) => ({ ...prev, [courseId]: updated }));

    if (updated.status === 'completed') {
      showToast(`🎉 Congratulations! You completed this course!`, 'success');
    } else {
      showToast(`Lesson completed! Progress: ${updated.progress}%`, 'success');
    }
  }, [showToast]);

  const removeCourse = useCallback((courseId: string) => {
    LearningProgressService.removeCourseProgress(courseId);
    setProgressMap((prev) => {
      const next = { ...prev };
      delete next[courseId];
      return next;
    });
    showToast('Course removed from My Learning', 'info');
  }, [showToast]);

  const continueCourse = useCallback((courseId: string) => {
    const progress = progressMap[courseId];
    const course = mockCoursesData.find((c) => c.id === courseId);
    if (!course) return;

    const targetSlug = course.slug || course.id;
    const lessonId = progress?.lastLessonId || 'l-101';

    // If course was paused, resume it on continue
    if (progress?.status === 'paused') {
      LearningProgressService.resumeCourse(courseId);
      setProgressMap((prev) => ({
        ...prev,
        [courseId]: { ...prev[courseId], status: 'in-progress' },
      }));
    }

    navigate(`/courses/${targetSlug}/lessons/${lessonId}`);
  }, [progressMap, navigate]);

  const getCourseProgress = useCallback((courseId: string) => {
    return progressMap[courseId];
  }, [progressMap]);

  const resetAllLearning = useCallback(() => {
    const reset = LearningProgressService.resetToDefault();
    setProgressMap(reset);
    showToast('Learning progress reset to initial seed values', 'info');
  }, [showToast]);

  return (
    <LearningContext.Provider
      value={{
        progressMap,
        allCoursesWithProgress,
        stats,
        startCourse,
        pauseCourse,
        resumeCourse,
        completeLesson,
        removeCourse,
        continueCourse,
        getCourseProgress,
        toasts,
        dismissToast,
        showToast,
        resetAllLearning,
      }}
    >
      {children}

      {/* Global Learning Toast Notifications Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            id={`learning-toast-${toast.id}`}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5 ${
              toast.type === 'success'
                ? 'bg-slate-900/95 text-white border-emerald-500/40 shadow-emerald-900/20'
                : toast.type === 'error'
                ? 'bg-slate-900/95 text-white border-rose-500/40 shadow-rose-900/20'
                : 'bg-slate-900/95 text-white border-blue-500/40 shadow-blue-900/20'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className={`w-2 h-2 rounded-full shrink-0 ${
                toast.type === 'success' ? 'bg-emerald-400' : toast.type === 'error' ? 'bg-rose-400' : 'bg-blue-400'
              }`} />
              <p className="text-xs sm:text-sm font-medium leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-white text-xs font-bold p-1 rounded-md transition-colors"
              aria-label="Dismiss toast"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
}
