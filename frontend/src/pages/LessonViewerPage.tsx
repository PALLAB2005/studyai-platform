import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLearning } from '../context/LearningContext';
import { useBookmarks } from '../context/BookmarkContext';
import { mockCoursesData } from '../data/courses';
import { getCourseCurriculum, getLessonDetails } from '../data/courseCurriculums';
import { Lesson, Module } from '../types/lesson';
import { initialNotifications } from '../data/dashboard';

import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { CourseSidebar } from '../components/course/CourseSidebar';
import { LessonContent } from '../components/course/LessonContent';
import { LessonNavigation } from '../components/course/LessonNavigation';
import { LessonNotes } from '../components/course/LessonNotes';
import { CourseCompletionModal } from '../components/course/CourseCompletionModal';

import {
  ArrowLeft,
  Bookmark,
  FileText,
  Menu,
  Sparkles,
} from 'lucide-react';

interface LessonViewerPageProps {
  courseIdentifier: string;
  lessonId: string;
}

export function LessonViewerPage({ courseIdentifier, lessonId }: LessonViewerPageProps) {
  const { user, navigate } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { completeLesson, getCourseProgress } = useLearning();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const [isAppSidebarOpen, setIsAppSidebarOpen] = useState(false);
  const [isCourseNavDrawerOpen, setIsCourseNavDrawerOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const darkMode = theme === 'dark';

  // Find course
  const course =
    mockCoursesData.find(
      (c) => c.slug === courseIdentifier || c.id === courseIdentifier
    ) || mockCoursesData[0];

  const modules: Module[] = getCourseCurriculum(course.id);
  const lessonData = getLessonDetails(course.id, lessonId);

  const currentLesson: Lesson =
    lessonData?.lesson || modules[0]?.lessons[0] || {
      id: lessonId,
      title: 'Lesson Overview',
      duration: '20 min',
      contentType: 'video',
      order: 1,
    };

  const allLessons: Lesson[] =
    lessonData?.allLessons || modules.flatMap((m) => m.lessons);

  const activeLessonIndex = lessonData?.lessonIndex !== undefined && lessonData.lessonIndex >= 0
    ? lessonData.lessonIndex
    : allLessons.findIndex((l) => l.id === currentLesson.id);

  const prevLesson = activeLessonIndex > 0 ? allLessons[activeLessonIndex - 1] : null;
  const nextLesson = activeLessonIndex < allLessons.length - 1 ? allLessons[activeLessonIndex + 1] : null;
  const isLastLesson = activeLessonIndex === allLessons.length - 1;

  const userProgress = getCourseProgress(course.id);
  const completedLessonIds = new Set<string>(
    userProgress?.completedLessonIds ||
    (course.syllabus
      ? course.syllabus.flatMap((m) => m.lessons.filter((l) => l.completed).map((l) => l.id))
      : [])
  );

  const isCurrentCompleted = completedLessonIds.has(currentLesson.id);
  const bookmarked = isBookmarked(currentLesson.id, 'lesson');

  const handleToggleComplete = () => {
    completeLesson(course.id, currentLesson.id, currentLesson.title, allLessons.length);

    // If completing the last lesson or all lessons completed, open celebratory modal!
    if (isLastLesson || completedLessonIds.size + 1 >= allLessons.length) {
      setIsCompletionModalOpen(true);
    }
  };

  const handleNext = () => {
    // If not completed yet, complete automatically on next
    if (!isCurrentCompleted) {
      completeLesson(course.id, currentLesson.id, currentLesson.title, allLessons.length);
    }

    if (nextLesson) {
      navigate(`/courses/${course.slug || course.id}/lessons/${nextLesson.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsCompletionModalOpen(true);
    }
  };

  const handlePrevious = () => {
    if (prevLesson) {
      navigate(`/courses/${course.slug || course.id}/lessons/${prevLesson.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectLessonFromSidebar = (selected: Lesson) => {
    navigate(`/courses/${course.slug || course.id}/lessons/${selected.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCourse = () => {
    navigate(`/courses/${course.slug || course.id}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors">
      {/* Global App Sidebar */}
      <DashboardSidebar
        currentRoute="/my-learning"
        onNavigate={(r) => navigate(r)}
        isOpen={isAppSidebarOpen}
        onClose={() => setIsAppSidebarOpen(false)}
      />

      {/* Main Container */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header */}
        <DashboardHeader
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
          onOpenSidebar={() => setIsAppSidebarOpen(true)}
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

        {/* Lesson Learning Shell */}
        <div className="flex-1 flex overflow-hidden">
          {/* Persistent Course Curriculum Sidebar (Desktop & Mobile Drawer) */}
          <CourseSidebar
            course={course}
            modules={modules}
            currentLessonId={currentLesson.id}
            completedLessonIds={completedLessonIds}
            onSelectLesson={handleSelectLessonFromSidebar}
            onBackToCourse={handleBackToCourse}
            isOpenMobile={isCourseNavDrawerOpen}
            onCloseMobile={() => setIsCourseNavDrawerOpen(false)}
          />

          {/* Central Lesson Reading / Stage Area */}
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-[calc(100vh-4rem)]">
            {/* Top Sub-Bar for Controls & Quick Actions */}
            <div className="sticky top-0 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Mobile curriculum drawer toggle */}
                <button
                  type="button"
                  id="mobile-curriculum-toggle-btn"
                  onClick={() => setIsCourseNavDrawerOpen(true)}
                  className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                  aria-label="Open Curriculum Drawer"
                >
                  <Menu className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  id="lesson-back-to-course-btn"
                  onClick={handleBackToCourse}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Course Details</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium hidden md:inline">
                  Lesson {activeLessonIndex + 1} of {allLessons.length}
                </span>

                {/* Bookmark Lesson Button */}
                <button
                  type="button"
                  id="lesson-bookmark-action-btn"
                  onClick={() =>
                    toggleBookmark(currentLesson.id, 'lesson', {
                      title: currentLesson.title,
                      courseId: course.id,
                      courseTitle: course.title,
                      lessonId: currentLesson.id,
                      moduleTitle: lessonData?.module?.title || 'Curriculum Module',
                      description: `Lesson Duration: ${currentLesson.duration || '20 min'}`,
                    })
                  }
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${bookmarked
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60'
                    }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                  <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                </button>

                {/* Lesson Notes Drawer Toggle */}
                <button
                  type="button"
                  id="lesson-open-notes-btn"
                  onClick={() => setIsNotesOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 hover:bg-brand-100 transition-all cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Notes</span>
                </button>
              </div>
            </div>

            {/* Lesson Main Content Area */}
            <div className="p-4 sm:p-6 lg:p-8 flex-1">
              <LessonContent
                lesson={currentLesson}
                courseTitle={course.title}
              />
            </div>

            {/* Bottom Navigation Bar */}
            <LessonNavigation
              hasPrevious={Boolean(prevLesson)}
              hasNext={Boolean(nextLesson)}
              isCompleted={isCurrentCompleted}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onToggleComplete={handleToggleComplete}
              isLastLesson={isLastLesson}
            />
          </div>
        </div>
      </div>

      {/* Lesson Notes Slide-Over Drawer */}
      <LessonNotes
        courseId={course.id}
        lessonId={currentLesson.id}
        lessonTitle={currentLesson.title}
        userId={user?.id || 'default-student'}
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
      />

      {/* Course Completion Celebration Modal */}
      <CourseCompletionModal
        isOpen={isCompletionModalOpen}
        courseTitle={course.title}
        totalLessons={allLessons.length}
        onReviewCourse={() => {
          setIsCompletionModalOpen(false);
          navigate(`/courses/${course.slug || course.id}/lessons/${allLessons[0]?.id}`);
        }}
        onGoToDashboard={() => {
          setIsCompletionModalOpen(false);
          navigate('/my-learning');
        }}
        onClose={() => setIsCompletionModalOpen(false)}
      />
    </div>
  );
}
