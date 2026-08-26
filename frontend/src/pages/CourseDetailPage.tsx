import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useBookmarks } from '../context/BookmarkContext';
import { useLearning } from '../context/LearningContext';
import { AppRoute } from '../types/auth';
import { Course } from '../types/course';
import { Lesson } from '../types/lesson';
import { mockCoursesData } from '../data/courses';
import { getCourseCurriculum } from '../data/courseCurriculums';
import { initialNotifications } from '../data/dashboard';

import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { CourseHeader } from '../components/course/CourseHeader';
import { CourseProgressCard } from '../components/course/CourseProgress';
import { CourseCurriculum } from '../components/course/CourseCurriculum';

import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  BookOpen,
  User,
  ShieldCheck,
  Award,
  HelpCircle,
} from 'lucide-react';

interface CourseDetailPageProps {
  courseIdentifier: string;
}

export function CourseDetailPage({ courseIdentifier }: CourseDetailPageProps) {
  const { user, navigate } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { startCourse, continueCourse, resumeCourse, getCourseProgress } = useLearning();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [copiedLink, setCopiedLink] = useState(false);

  const darkMode = theme === 'dark';

  // Find course by slug or id
  const rawCourse: Course =
    mockCoursesData.find(
      (c) => c.slug === courseIdentifier || c.id === courseIdentifier
    ) || mockCoursesData[0];

  const userProgress = getCourseProgress(rawCourse.id);
  const courseStatus = userProgress?.status || rawCourse.status;
  const courseProgressVal = userProgress?.progress !== undefined ? userProgress.progress : rawCourse.progress;
  const courseCompletedLessons = userProgress?.completedLessons !== undefined ? userProgress.completedLessons : rawCourse.completedLessons;

  const course: Course = {
    ...rawCourse,
    status: courseStatus,
    progress: courseProgressVal,
    completedLessons: courseCompletedLessons,
  };

  const bookmarked = isBookmarked(course.id);
  const modules = getCourseCurriculum(course.id);

  // Set of completed lesson IDs
  const completedLessonIds = new Set<string>(
    userProgress?.completedLessonIds ||
    (course.syllabus
      ? course.syllabus.flatMap((m) => m.lessons.filter((l) => l.completed).map((l) => l.id))
      : [])
  );

  const currentLessonId = userProgress?.lastLessonId || modules[0]?.lessons[0]?.id;

  const handleBackToCourses = () => {
    navigate('/courses');
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handlePrimaryAction = () => {
    if (course.status === 'in-progress') {
      continueCourse(course.id);
    } else if (course.status === 'paused') {
      resumeCourse(course.id);
    } else if (course.status === 'completed') {
      const firstLesson = modules[0]?.lessons[0]?.id || 'html-intro';
      navigate(`/courses/${course.slug || course.id}/lessons/${firstLesson}`);
    } else {
      startCourse(course, modules[0]?.lessons[0]?.id, modules[0]?.lessons[0]?.title);
    }
  };

  const handleSelectLesson = (lesson: Lesson) => {
    if (course.status === 'not-started') {
      startCourse(course, lesson.id, lesson.title);
    } else {
      navigate(`/courses/${course.slug || course.id}/lessons/${lesson.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors">
      {/* Sidebar Navigation */}
      <DashboardSidebar
        currentRoute="/courses"
        onNavigate={(r) => navigate(r)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header */}
        <DashboardHeader
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          userName={user?.name || 'Alex Morgan'}
          userEmail={user?.email || 'alex.morgan@studyai.edu'}
          avatarUrl={user?.avatar}
          notifications={notifications}
          onNotificationClick={(id) => {
            setNotifications((prev) =>
              prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
            );
          }}
          onMarkAllNotificationsRead={() => {
            setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
          }}
          onClearAllNotifications={() => setNotifications([])}
        />

        {/* Course Detail Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
            <button
              type="button"
              id="back-to-all-courses-btn"
              onClick={handleBackToCourses}
              className="inline-flex items-center gap-2 font-bold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Browse Courses</span>
            </button>

            <span className="text-slate-400 font-medium hidden sm:inline-block">
              Course Reference: {course.slug || course.id}
            </span>
          </div>

          {/* 1. Course Header Card */}
          <CourseHeader
            course={course}
            isBookmarked={bookmarked}
            onToggleBookmark={() =>
              toggleBookmark(course.id, 'course', {
                title: course.title,
                description: course.description,
                category: course.category,
                difficulty: course.difficulty,
                duration: course.duration,
                courseId: course.id,
              })
            }
            onShare={handleShare}
            copiedLink={copiedLink}
          />

          {/* 2. Course Progress Card */}
          <CourseProgressCard
            course={course}
            userProgress={userProgress || undefined}
            onPrimaryAction={handlePrimaryAction}
          />

          {/* 3. Grid for Syllabus & Extra Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left 2 Columns: Full Interactive Course Curriculum */}
            <div className="lg:col-span-2 space-y-6">
              <CourseCurriculum
                modules={modules}
                completedLessonIds={completedLessonIds}
                currentLessonId={currentLessonId}
                onSelectLesson={handleSelectLesson}
              />
            </div>

            {/* Right Column: What You Will Learn & Instructor Card */}
            <div className="space-y-6">
              {/* What You Will Learn */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
                  <Sparkles className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  <h3>What You Will Master</h3>
                </div>

                <div className="space-y-3">
                  {(course.whatYouWillLearn || [
                    'Master industry-standard software engineering architectures',
                    'Build real-world full-stack and front-end applications',
                    'Understand core principles with clean code best practices',
                    'Prepare for technical interviews and professional projects',
                  ]).map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <div className="p-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements & Target Audience */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h3>Requirements</h3>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 list-disc list-inside">
                  {(course.requirements || [
                    'Basic computer literacy and a modern web browser',
                    'No prior specialized experience required for beginner track',
                    'Desire to build hands-on software applications',
                  ]).map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Instructor Bio */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
                  <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h3>About Your Instructor</h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    {course.instructor.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {course.instructor}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {course.instructorRole || 'Lead Instructor & Curriculum Specialist'}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Passionate educator with years of production software development and mentorship experience.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
