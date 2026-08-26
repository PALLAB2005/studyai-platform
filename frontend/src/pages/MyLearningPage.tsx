import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLearning } from '../context/LearningContext';
import { AppRoute } from '../types/auth';
import { Course } from '../types/course';
import { LearningTabType, LearningSortOption, EnrolledCourseItem } from '../types/learning';
import { initialNotifications } from '../data/dashboard';

import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { MyLearningHeader } from '../components/learning/MyLearningHeader';
import { LearningStats } from '../components/learning/LearningStats';
import { LearningTabs } from '../components/learning/LearningTabs';
import { LearningSearch } from '../components/learning/LearningSearch';
import { LearningSort } from '../components/learning/LearningSort';
import { LearningCourseCard } from '../components/learning/LearningCourseCard';
import { EmptyLearningState } from '../components/learning/EmptyLearningState';
import { PauseCourseDialog } from '../components/learning/PauseCourseDialog';
import { RemoveCourseDialog } from '../components/learning/RemoveCourseDialog';
import { CertificateModal } from '../components/learning/CertificateModal';

export function MyLearningPage() {
  const { currentPath, navigate } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === 'dark';

  const {
    allCoursesWithProgress,
    stats,
    startCourse,
    pauseCourse,
    resumeCourse,
    removeCourse,
    continueCourse,
    resetAllLearning,
  } = useLearning();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState<LearningTabType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<LearningSortOption>('recently-accessed');

  // Dialog states
  const [courseToPause, setCourseToPause] = useState<Course | null>(null);
  const [courseToRemove, setCourseToRemove] = useState<Course | null>(null);
  const [certificateCourse, setCertificateCourse] = useState<Course | null>(null);

  const handleNavigate = (route: AppRoute) => {
    navigate(route);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      all: allCoursesWithProgress.length,
      inProgress: allCoursesWithProgress.filter((c) => c.status === 'in-progress').length,
      paused: allCoursesWithProgress.filter((c) => c.status === 'paused').length,
      completed: allCoursesWithProgress.filter((c) => c.status === 'completed').length,
      saved: allCoursesWithProgress.filter((c) => c.status === 'not-started').length,
    };
  }, [allCoursesWithProgress]);

  // Filter and sort items
  const filteredCourses = useMemo(() => {
    return allCoursesWithProgress
      .filter((item) => {
        // Tab filter
        if (activeTab === 'in-progress' && item.status !== 'in-progress') return false;
        if (activeTab === 'paused' && item.status !== 'paused') return false;
        if (activeTab === 'completed' && item.status !== 'completed') return false;
        if (activeTab === 'saved' && item.status !== 'not-started') return false;

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchCategory = item.category.toLowerCase().includes(q);
          const matchInstructor = item.instructor.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          return matchTitle || matchCategory || matchInstructor || matchDesc;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'recently-accessed') {
          return (b.userProgress.lastAccessedTimestamp || 0) - (a.userProgress.lastAccessedTimestamp || 0);
        }
        if (sortBy === 'highest-progress') {
          return (b.userProgress.progress || 0) - (a.userProgress.progress || 0);
        }
        if (sortBy === 'lowest-progress') {
          return (a.userProgress.progress || 0) - (b.userProgress.progress || 0);
        }
        if (sortBy === 'recently-completed') {
          if (a.status === 'completed' && b.status !== 'completed') return -1;
          if (b.status === 'completed' && a.status !== 'completed') return 1;
          return (b.userProgress.lastAccessedTimestamp || 0) - (a.userProgress.lastAccessedTimestamp || 0);
        }
        if (sortBy === 'title-asc') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [allCoursesWithProgress, activeTab, searchQuery, sortBy]);

  // Action Handlers
  const handleConfirmPause = () => {
    if (courseToPause) {
      pauseCourse(courseToPause.id);
      setCourseToPause(null);
    }
  };

  const handleConfirmRemove = () => {
    if (courseToRemove) {
      removeCourse(courseToRemove.id);
      setCourseToRemove(null);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors">
      {/* Sidebar */}
      <DashboardSidebar
        currentRoute={currentPath as AppRoute}
        onNavigate={handleNavigate}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Header */}
        <DashboardHeader
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
          notifications={notifications}
          onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
          searchQuery=""
          onSearchChange={() => { }}
          title="My Learning"
        />

        {/* My Learning Main Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Page Heading & Quick Actions */}
          <MyLearningHeader onResetProgress={resetAllLearning} />

          {/* Learning Summary Statistics (4 Cards) */}
          <LearningStats stats={stats} />

          {/* Controls Bar: Tabs, Search & Sort */}
          <div className="space-y-4 pt-2">
            <LearningTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              counts={tabCounts}
            />

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <LearningSearch
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search courses in your library..."
              />
              <LearningSort value={sortBy} onChange={setSortBy} />
            </div>
          </div>

          {/* Course Grid or Empty State */}
          {filteredCourses.length > 0 ? (
            <div
              id="my-learning-courses-grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCourses.map((item) => (
                <LearningCourseCard
                  key={item.id}
                  course={item}
                  userProgress={item.userProgress}
                  onContinue={continueCourse}
                  onStart={startCourse}
                  onResume={resumeCourse}
                  onPauseRequest={(c) => setCourseToPause(c)}
                  onRemoveRequest={(c) => setCourseToRemove(c)}
                  onViewCertificate={(c) => setCertificateCourse(c)}
                />
              ))}
            </div>
          ) : (
            <EmptyLearningState
              type={searchQuery ? 'search' : activeTab}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
            />
          )}
        </main>
      </div>

      {/* Confirmation Dialogs & Modals */}
      <PauseCourseDialog
        isOpen={!!courseToPause}
        course={courseToPause}
        onConfirm={handleConfirmPause}
        onCancel={() => setCourseToPause(null)}
      />

      <RemoveCourseDialog
        isOpen={!!courseToRemove}
        course={courseToRemove}
        onConfirm={handleConfirmRemove}
        onCancel={() => setCourseToRemove(null)}
      />

      <CertificateModal
        isOpen={!!certificateCourse}
        course={certificateCourse}
        onClose={() => setCertificateCourse(null)}
      />
    </div>
  );
}
