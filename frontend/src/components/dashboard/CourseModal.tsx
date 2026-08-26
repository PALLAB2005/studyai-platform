import React from 'react';
import {
  X,
  Play,
  CheckCircle2,
  Lock,
  Clock,
  User,
  BookOpen,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { CourseProgress } from '../../types/course';

interface CourseModalProps {
  course: CourseProgress | null;
  isOpen: boolean;
  onClose: () => void;
  onStartLesson?: (lessonTitle: string) => void;
}

export function CourseModal({
  course,
  isOpen,
  onClose,
  onStartLesson,
}: CourseModalProps) {
  if (!isOpen || !course) return null;

  // Generate mock syllabus lessons based on course
  const lessons = [
    {
      id: 'l-1',
      title: 'Module 1: Orientation & Core Fundamentals',
      duration: '45 mins',
      completed: course.completedLessons >= 5,
      active: course.completedLessons < 5,
    },
    {
      id: 'l-2',
      title: 'Module 2: Practical Syntax & Core Architecture',
      duration: '1 hr 15 mins',
      completed: course.completedLessons >= 12,
      active: course.completedLessons >= 5 && course.completedLessons < 12,
    },
    {
      id: 'l-3',
      title: 'Module 3: Advanced Patterns & Real-world Exercises',
      duration: '2 hrs 10 mins',
      completed: course.completedLessons >= 20,
      active: course.completedLessons >= 12 && course.completedLessons < 20,
    },
    {
      id: 'l-4',
      title: 'Module 4: Performance Optimization & Best Practices',
      duration: '1 hr 45 mins',
      completed: course.completedLessons >= 30,
      active: course.completedLessons >= 20 && course.completedLessons < 30,
    },
    {
      id: 'l-5',
      title: 'Module 5: Final Capstone Project & Certification Exam',
      duration: '3 hrs 30 mins',
      completed: course.status === 'completed',
      active: course.status !== 'completed' && course.completedLessons >= 30,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        id="course-details-modal"
        className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-950/20 z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                {course.category}
              </span>
              <span className="text-xs text-slate-400">
                Level: {course.level} • {course.duration}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
              {course.courseName}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <User className="w-3.5 h-3.5" />
              <span>{course.instructor}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          {/* Progress Banner */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
              <span>Course Progress</span>
              <span>
                {course.progress}% ({course.completedLessons} / {course.totalLessons} Lessons)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-brand rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              About this course
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Syllabus Roadmap */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Course Modules
            </h4>
            <div className="space-y-2">
              {lessons.map((lesson, idx) => (
                <div
                  key={lesson.id}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    lesson.completed
                      ? 'bg-white dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800/80 text-slate-500'
                      : lesson.active
                      ? 'bg-blue-50/50 dark:bg-blue-950/30 border-brand-200 dark:border-brand-800 text-slate-900 dark:text-white'
                      : 'bg-white dark:bg-slate-800/20 border-slate-100 dark:border-slate-800/60 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {lesson.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : lesson.active ? (
                      <div className="w-4 h-4 rounded-full bg-brand flex items-center justify-center text-white text-[10px] font-bold">
                        ▶
                      </div>
                    ) : (
                      <Lock className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />
                    )}
                    <span className="text-xs font-semibold">{lesson.title}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 shrink-0">
                    {lesson.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              if (onStartLesson) {
                onStartLesson(course.courseName);
              }
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-dark text-white text-xs font-bold shadow-md shadow-brand/20 transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            <span>
              {course.status === 'completed'
                ? 'Review Course'
                : course.status === 'paused'
                ? 'Resume Learning'
                : 'Start Next Lesson'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
