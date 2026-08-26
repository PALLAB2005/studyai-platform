import React from 'react';
import { Bookmark } from '../../types/bookmark';
import { CourseBookmarkCard } from './CourseBookmarkCard';
import { LessonBookmarkCard } from './LessonBookmarkCard';
import { VideoBookmarkCard } from './VideoBookmarkCard';
import { NoteBookmarkCard } from './NoteBookmarkCard';

interface BookmarkCardProps {
  key?: React.Key;
  bookmark: Bookmark;
  onRemove: (bookmark: Bookmark) => void;
}

export function BookmarkCard({ bookmark, onRemove }: BookmarkCardProps) {
  switch (bookmark.type) {
    case 'course':
      return <CourseBookmarkCard bookmark={bookmark} onRemove={onRemove} />;
    case 'lesson':
      return <LessonBookmarkCard bookmark={bookmark} onRemove={onRemove} />;
    case 'youtube':
      return <VideoBookmarkCard bookmark={bookmark} onRemove={onRemove} />;
    case 'note':
      return <NoteBookmarkCard bookmark={bookmark} onRemove={onRemove} />;
    default:
      return <CourseBookmarkCard bookmark={bookmark} onRemove={onRemove} />;
  }
}
