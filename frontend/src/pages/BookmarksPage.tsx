import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useBookmarks } from '../context/BookmarkContext';
import { Bookmark, BookmarkType } from '../types/bookmark';

import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { BookmarkStats } from '../components/bookmarks/BookmarkStats';
import { BookmarkTabs, CategoryFilter } from '../components/bookmarks/BookmarkTabs';
import { BookmarkSearch } from '../components/bookmarks/BookmarkSearch';
import { BookmarkSort, BookmarkSortOption } from '../components/bookmarks/BookmarkSort';
import { BookmarkCard } from '../components/bookmarks/BookmarkCard';
import { RemoveBookmarkDialog } from '../components/bookmarks/RemoveBookmarkDialog';
import { EmptyBookmarks } from '../components/bookmarks/EmptyBookmarks';
import { initialNotifications } from '../data/dashboard';

export function BookmarksPage() {
  const { user, navigate, currentPath } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { bookmarks, removeBookmark } = useBookmarks();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<BookmarkSortOption>('recent');
  const [selectedForRemove, setSelectedForRemove] = useState<Bookmark | null>(null);
  const [notifications, setNotifications] = useState(initialNotifications);

  const darkMode = theme === 'dark';

  // Filter & Search Logic
  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter((bm) => {
      // 1. Category filter
      if (activeTab !== 'all' && bm.type !== activeTab) {
        return false;
      }

      // 2. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = bm.title.toLowerCase().includes(q);
        const descMatch = bm.description?.toLowerCase().includes(q) || false;
        const courseMatch = bm.courseTitle?.toLowerCase().includes(q) || false;
        const lessonMatch = bm.lessonTitle?.toLowerCase().includes(q) || false;
        const channelMatch = bm.channelTitle?.toLowerCase().includes(q) || false;
        const noteMatch = bm.notePreview?.toLowerCase().includes(q) || false;

        return titleMatch || descMatch || courseMatch || lessonMatch || channelMatch || noteMatch;
      }

      return true;
    });
  }, [bookmarks, activeTab, searchQuery]);

  // Sorting Logic
  const sortedBookmarks = useMemo(() => {
    const copy = [...filteredBookmarks];
    if (sortOption === 'recent') {
      return copy.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    if (sortOption === 'oldest') {
      return copy.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
    if (sortOption === 'alphabetical') {
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    }
    return copy;
  }, [filteredBookmarks, sortOption]);

  const handleConfirmRemove = () => {
    if (selectedForRemove) {
      removeBookmark(selectedForRemove.id);
      setSelectedForRemove(null);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors">
      {/* Student Portal Sidebar */}
      <DashboardSidebar
        currentRoute="/bookmarks"
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
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
          notifications={notifications}
          onMarkAllNotificationsRead={() =>
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
          }
          title="Bookmarks"
        />

        {/* Bookmarks Main Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Page Heading & Subtitle */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
              My Bookmarks
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              Keep all your important learning resources in one place.
            </p>
          </div>

          {/* 1. Summary Cards */}
          <BookmarkStats />

          {/* 2. Controls Row: Category Tabs & Search/Sort */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Filter Tabs */}
              <BookmarkTabs activeTab={activeTab} onTabChange={setActiveTab} />

              {/* Search & Sort */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <BookmarkSearch value={searchQuery} onChange={setSearchQuery} />
                <BookmarkSort value={sortOption} onChange={setSortOption} />
              </div>
            </div>
          </div>

          {/* 3. Bookmarks Display Grid or Empty State */}
          {sortedBookmarks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {sortedBookmarks.map((bookmark) => (
                <BookmarkCard
                  key={bookmark.id}
                  bookmark={bookmark}
                  onRemove={(bm) => setSelectedForRemove(bm)}
                />
              ))}
            </div>
          ) : (
            <EmptyBookmarks />
          )}
        </main>
      </div>

      {/* Confirmation Dialog on Remove */}
      <RemoveBookmarkDialog
        isOpen={Boolean(selectedForRemove)}
        bookmark={selectedForRemove}
        onClose={() => setSelectedForRemove(null)}
        onConfirm={handleConfirmRemove}
      />
    </div>
  );
}
