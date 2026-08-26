export type BookmarkType = 'course' | 'lesson' | 'youtube' | 'note';

export interface BookmarkItemData {
  title: string;
  description?: string;
  courseId?: string;
  courseTitle?: string;
  lessonId?: string;
  lessonTitle?: string;
  moduleTitle?: string;
  channelTitle?: string;
  topic?: string;
  thumbnail?: string;
  url?: string;
  noteId?: string;
  notePreview?: string;
  category?: string;
  difficulty?: string;
  duration?: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  type: BookmarkType;
  itemId: string;

  title: string;
  description?: string;

  courseId?: string;
  courseTitle?: string;
  lessonId?: string;
  lessonTitle?: string;
  moduleTitle?: string;

  channelTitle?: string;
  topic?: string;

  thumbnail?: string;
  url?: string;

  category?: string;
  difficulty?: string;
  duration?: string;

  noteId?: string;
  notePreview?: string;

  createdAt: string;
  updatedAt?: string;
}
