import React from 'react';
import { Bookmark as BookmarkIcon } from 'lucide-react';
import { useBookmarks } from '../../context/BookmarkContext';
import { BookmarkType, BookmarkItemData } from '../../types/bookmark';

interface BookmarkButtonProps {
  itemId: string;
  type: BookmarkType;
  itemData?: BookmarkItemData;
  variant?: 'icon' | 'button' | 'badge' | 'card-icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export function BookmarkButton({
  itemId,
  type,
  itemData,
  variant = 'icon',
  size = 'md',
  className = '',
  showText = false,
}: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(itemId, type);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleBookmark(itemId, type, itemData);
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size];

  if (variant === 'button') {
    return (
      <button
        type="button"
        id={`bookmark-btn-${type}-${itemId}`}
        onClick={handleClick}
        aria-label={bookmarked ? `Remove bookmark for ${type}` : `Bookmark ${type}`}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
          bookmarked
            ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-xs hover:bg-amber-300'
            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60'
        } ${className}`}
      >
        <BookmarkIcon className={`${iconSizes} ${bookmarked ? 'fill-current' : ''}`} />
        <span>{bookmarked ? 'Saved' : 'Save'}</span>
      </button>
    );
  }

  if (variant === 'card-icon') {
    return (
      <button
        type="button"
        id={`bookmark-card-icon-${type}-${itemId}`}
        onClick={handleClick}
        aria-label={bookmarked ? `Remove bookmark for ${type}` : `Bookmark ${type}`}
        className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
          bookmarked
            ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-sm'
            : 'bg-black/30 text-white/90 hover:bg-black/50 hover:text-white'
        } ${className}`}
      >
        <BookmarkIcon className={`${iconSizes} ${bookmarked ? 'fill-current' : ''}`} />
      </button>
    );
  }

  return (
    <button
      type="button"
      id={`bookmark-icon-btn-${type}-${itemId}`}
      onClick={handleClick}
      aria-label={bookmarked ? `Remove bookmark for ${type}` : `Bookmark ${type}`}
      className={`p-2 rounded-xl transition-all cursor-pointer border ${
        bookmarked
          ? 'bg-amber-400/20 text-amber-600 dark:text-amber-400 border-amber-400/40'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
      } ${className}`}
    >
      <BookmarkIcon className={`${iconSizes} ${bookmarked ? 'fill-current' : ''}`} />
      {showText && (
        <span className="text-xs font-bold ml-1.5">
          {bookmarked ? 'Bookmarked' : 'Bookmark'}
        </span>
      )}
    </button>
  );
}
