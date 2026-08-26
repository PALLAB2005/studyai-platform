import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Check, X } from 'lucide-react';
import { Bookmark, BookmarkType, BookmarkItemData } from '../types/bookmark';
import { BookmarkService } from '../services/bookmarkService';
import { useAuth } from './AuthContext';

interface BookmarkContextType {
  bookmarks: Bookmark[];
  addBookmark: (type: BookmarkType, itemId: string, itemData: BookmarkItemData) => Bookmark;
  removeBookmark: (bookmarkId: string) => void;
  removeBookmarkByItem: (itemId: string, type: BookmarkType) => void;
  isBookmarked: (itemId: string, type?: BookmarkType) => boolean;
  toggleBookmark: (
    itemId: string,
    type?: BookmarkType,
    itemDataOrTitle?: string | BookmarkItemData
  ) => void;
  getBookmarks: () => Bookmark[];
  getBookmarksByType: (type: BookmarkType | 'all') => Bookmark[];
  showToast: (message: string, isError?: boolean) => void;

  // Counts
  totalCount: number;
  courseCount: number;
  lessonCount: number;
  videoCount: number;
  noteCount: number;

  // Backward compatibility arrays
  bookmarkedCourseIds: string[];
  bookmarkedYouTubeIds: string[];
  bookmarkedLessonIds: string[];
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const userId = user?.id || 'guest';

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastIsError, setToastIsError] = useState(false);

  // Load user-specific bookmarks on mount & whenever user changes
  useEffect(() => {
    const list = BookmarkService.getBookmarks(userId);
    setBookmarks(list);
  }, [userId]);

  const showToast = (message: string, isError = false) => {
    setToastMessage(message);
    setToastIsError(isError);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
    return () => clearTimeout(timer);
  };

  const isBookmarked = (itemId: string, type: BookmarkType = 'course') => {
    return bookmarks.some((b) => b.itemId === itemId && b.type === type);
  };

  const addBookmark = (type: BookmarkType, itemId: string, itemData: BookmarkItemData) => {
    const newBm = BookmarkService.addBookmark(userId, type, itemId, itemData);
    setBookmarks(BookmarkService.getBookmarks(userId));
    showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} added to bookmarks`);
    return newBm;
  };

  const removeBookmark = (bookmarkId: string) => {
    const updated = BookmarkService.removeBookmark(userId, bookmarkId);
    setBookmarks(updated);
    showToast('Bookmark removed');
  };

  const removeBookmarkByItem = (itemId: string, type: BookmarkType) => {
    const updated = BookmarkService.removeBookmarkByItem(userId, itemId, type);
    setBookmarks(updated);
    showToast('Bookmark removed');
  };

  const toggleBookmark = (
    itemId: string,
    type: BookmarkType = 'course',
    itemDataOrTitle?: string | BookmarkItemData
  ) => {
    const exists = isBookmarked(itemId, type);

    if (exists) {
      removeBookmarkByItem(itemId, type);
    } else {
      let itemData: BookmarkItemData;
      if (typeof itemDataOrTitle === 'string') {
        itemData = { title: itemDataOrTitle };
      } else if (itemDataOrTitle) {
        itemData = itemDataOrTitle;
      } else {
        itemData = { title: `${type.toUpperCase()} Item (${itemId})` };
      }

      addBookmark(type, itemId, itemData);
    }
  };

  const getBookmarks = () => bookmarks;

  const getBookmarksByType = (type: BookmarkType | 'all') => {
    if (type === 'all') return bookmarks;
    return bookmarks.filter((b) => b.type === type);
  };

  // Dynamic counts
  const totalCount = bookmarks.length;
  const courseCount = useMemo(() => bookmarks.filter((b) => b.type === 'course').length, [bookmarks]);
  const lessonCount = useMemo(() => bookmarks.filter((b) => b.type === 'lesson').length, [bookmarks]);
  const videoCount = useMemo(() => bookmarks.filter((b) => b.type === 'youtube').length, [bookmarks]);
  const noteCount = useMemo(() => bookmarks.filter((b) => b.type === 'note').length, [bookmarks]);

  // Backward compatibility arrays
  const bookmarkedCourseIds = useMemo(
    () => bookmarks.filter((b) => b.type === 'course').map((b) => b.itemId),
    [bookmarks]
  );
  const bookmarkedYouTubeIds = useMemo(
    () => bookmarks.filter((b) => b.type === 'youtube').map((b) => b.itemId),
    [bookmarks]
  );
  const bookmarkedLessonIds = useMemo(
    () => bookmarks.filter((b) => b.type === 'lesson').map((b) => b.itemId),
    [bookmarks]
  );

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        removeBookmarkByItem,
        isBookmarked,
        toggleBookmark,
        getBookmarks,
        getBookmarksByType,
        showToast,
        totalCount,
        courseCount,
        lessonCount,
        videoCount,
        noteCount,
        bookmarkedCourseIds,
        bookmarkedYouTubeIds,
        bookmarkedLessonIds,
      }}
    >
      {children}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          id="studyai-toast-notification"
          role="status"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/95 dark:bg-slate-100/95 text-white dark:text-slate-900 shadow-xl backdrop-blur-sm border border-slate-700/60 dark:border-slate-300 animate-in fade-in slide-in-from-bottom-5 duration-200 text-sm font-medium"
        >
          <div
            className={`p-1 rounded-full ${
              toastIsError
                ? 'bg-rose-500/20 text-rose-400'
                : 'bg-emerald-500/20 text-emerald-400 dark:text-emerald-600'
            }`}
          >
            {toastIsError ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
          </div>
          <span className="max-w-xs truncate">{toastMessage}</span>
        </div>
      )}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}
