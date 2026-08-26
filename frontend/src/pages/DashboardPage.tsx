import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLearning } from '../context/LearningContext';
import { AppRoute } from '../types/auth';
import { CourseProgress } from '../types/course';
import {
  initialRecentActivities,
  initialGoalTasks,
  initialNotifications,
} from '../data/dashboard';

import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { WelcomeBanner } from '../components/dashboard/WelcomeBanner';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { ContinueLearning } from '../components/dashboard/ContinueLearning';
import { PausedCourses } from '../components/dashboard/PausedCourses';
import { CompletedCourses } from '../components/dashboard/CompletedCourses';
import { LearningProgress } from '../components/dashboard/LearningProgress';
import { TodayGoal } from '../components/dashboard/TodayGoal';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { QuickActions } from '../components/dashboard/QuickActions';
import { QuizPerformanceWidget } from '../components/dashboard/QuizPerformanceWidget';
import { CourseModal } from '../components/dashboard/CourseModal';

export function DashboardPage() {
  const { user, navigate, currentPath } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { allCoursesWithProgress, stats, continueCourse } = useLearning();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selectedCourse, setSelectedCourse] = useState<CourseProgress | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const darkMode = theme === 'dark';

  // Map enrolled courses to CourseProgress compatibility format
  const courses: CourseProgress[] = allCoursesWithProgress.map((c) => ({
    ...c,
    courseId: c.id,
    courseName: c.title,
    level: c.difficulty,
  }));

  const handleNavigate = (route: AppRoute) => {
    navigate(route);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleOpenCourseModal = (course: CourseProgress) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  // Find the primary most recent course (e.g. first in-progress course)
  const primaryCourse = courses.find((c) => c.status === 'in-progress') || courses[0];

  const handleContinueLearningPrimary = () => {
    if (primaryCourse) {
      handleOpenCourseModal(primaryCourse);
    }
  };

  const handleStartLesson = (lessonTitle: string) => {
    // Feedback notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'Lesson Started',
      message: `Now studying: ${lessonTitle}. Great work continuing your curriculum!`,
      timestamp: 'Just now',
      read: false,
      type: 'info' as const,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Filter courses if search query is active
  const filteredCourses = searchQuery.trim()
    ? courses.filter(
      (c) =>
        c.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : courses;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors">
      {/* Sidebar Navigation */}
      <DashboardSidebar
        currentRoute={currentPath as AppRoute}
        onNavigate={handleNavigate}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header */}
        <DashboardHeader
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
          notifications={notifications}
          onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          title="Dashboard"
        />

        {/* Dashboard Main Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Welcome Section */}
          <WelcomeBanner
            onContinueLearning={handleContinueLearningPrimary}
            recentCourseTitle={primaryCourse?.courseName}
          />

          {/* Learning Statistics (4 Cards) */}
          <DashboardStats stats={stats} />

          {/* Search filter results feedback if user searched */}
          {searchQuery && (
            <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 flex items-center justify-between">
              <p className="text-xs text-brand-700 dark:text-brand-300">
                Showing search results for:{' '}
                <span className="font-bold">"{searchQuery}"</span> ({filteredCourses.length} matches found)
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Main Grid: Left Wide Column & Right Sidebar Column */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left 2 Columns: Course Progress Tracks */}
            <div className="xl:col-span-2 space-y-8">
              {/* Continue Learning */}
              <ContinueLearning
                courses={filteredCourses}
                onSelectCourse={handleOpenCourseModal}
              />

              {/* Paused Courses */}
              <PausedCourses
                courses={filteredCourses}
                onResumeCourse={handleOpenCourseModal}
                onViewDetails={handleOpenCourseModal}
                onViewAll={() => handleNavigate('/my-learning')}
              />

              {/* Recently Completed */}
              <CompletedCourses
                courses={filteredCourses}
                onViewCourse={handleOpenCourseModal}
                onViewAllCompleted={() => handleNavigate('/my-learning')}
              />
            </div>

            {/* Right 1 Column: Stats, Goals, Activity & Quick Actions */}
            <div className="space-y-6">
              {/* Overall Progress Gauge */}
              <LearningProgress stats={stats} />

              {/* AI Quiz Performance & Weak Topics Spotlight */}
              <QuizPerformanceWidget />

              {/* Today's Learning Goal */}
              <TodayGoal initialTasks={initialGoalTasks} />

              {/* Quick Actions */}
              <QuickActions
                onNavigate={handleNavigate}
                onContinueRecent={handleContinueLearningPrimary}
              />

              {/* Recent Activity Stream */}
              <RecentActivity activities={initialRecentActivities} />
            </div>
          </div>
        </main>
      </div>

      {/* Course Lesson / Syllabus Modal */}
      <CourseModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStartLesson={handleStartLesson}
      />
    </div>
  );
}
