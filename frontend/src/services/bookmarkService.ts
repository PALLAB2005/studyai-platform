import { Bookmark, BookmarkType, BookmarkItemData } from '../types/bookmark';

const BOOKMARKS_STORAGE_PREFIX = 'studyai_bookmarks_user_';

const defaultInitialBookmarks: Bookmark[] = [
  {
    id: 'course-web-dev-bootcamp',
    userId: 'default',
    type: 'course',
    itemId: 'web-dev-bootcamp',
    title: 'JavaScript Masterclass 2026: Modern ES6+ to Full-Stack',
    description: 'Master JavaScript with modern ES6+ concepts, asynchronous programming, DOM manipulation, and framework-ready patterns.',
    category: 'Web Development',
    difficulty: 'Intermediate',
    duration: '24 Hours',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: 'course-intro-ai-intelligence',
    userId: 'default',
    type: 'course',
    itemId: 'intro-ai-intelligence',
    title: 'Artificial Intelligence & Machine Learning Fundamentals',
    description: 'Explore neural networks, supervised learning, and AI model evaluation with real-world Python case studies.',
    category: 'Artificial Intelligence',
    difficulty: 'Beginner',
    duration: '18 Hours',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
  {
    id: 'course-python-data-science',
    userId: 'default',
    type: 'course',
    itemId: 'python-data-science',
    title: 'Python for Data Science & Pandas Analysis',
    description: 'Learn Pandas, NumPy, data visualization with Matplotlib, and statistical modeling in Jupyter Notebooks.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '15 Hours',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: 'lesson-javascript-functions',
    userId: 'default',
    type: 'lesson',
    itemId: 'javascript-functions',
    title: 'JavaScript Functions & Scope Mastery',
    courseId: 'web-dev-bootcamp',
    courseTitle: 'JavaScript Masterclass 2026',
    lessonId: 'javascript-functions',
    lessonTitle: 'JavaScript Functions & Scope Mastery',
    moduleTitle: 'JavaScript Fundamentals',
    description: 'Deep dive into function declarations, expressions, arrow syntax, closures, and lexical scope.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
  },
  {
    id: 'lesson-css-grid',
    userId: 'default',
    type: 'lesson',
    itemId: 'css-grid',
    title: 'Mastering CSS Grid & Flexbox Layouts',
    courseId: 'responsive-web-design',
    courseTitle: 'Responsive Web Design & Tailwind CSS',
    lessonId: 'css-grid',
    lessonTitle: 'Mastering CSS Grid & Flexbox Layouts',
    moduleTitle: 'Advanced CSS Layouts',
    description: 'Build complex grid systems, responsive breakpoints, auto-fit tracks, and modern flexible UI components.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
  {
    id: 'lesson-nn-overview',
    userId: 'default',
    type: 'lesson',
    itemId: 'nn-overview',
    title: 'Neural Networks & Activation Functions',
    courseId: 'intro-ai-intelligence',
    courseTitle: 'Artificial Intelligence & ML Fundamentals',
    lessonId: 'nn-overview',
    lessonTitle: 'Neural Networks & Activation Functions',
    moduleTitle: 'Deep Learning Basics',
    description: 'Understand perceptrons, forward propagation, loss functions, and activation curves (ReLU, Sigmoid).',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: 'lesson-async-javascript',
    userId: 'default',
    type: 'lesson',
    itemId: 'async-javascript',
    title: 'Async/Await & Event Loop Dynamics',
    courseId: 'web-dev-bootcamp',
    courseTitle: 'JavaScript Masterclass 2026',
    lessonId: 'async-javascript',
    lessonTitle: 'Async/Await & Event Loop Dynamics',
    moduleTitle: 'Asynchronous JavaScript',
    description: 'Understand the microtask queue, call stack, promises, and handling API requests cleanly with async/await.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  },
  {
    id: 'youtube-yt-webdev-1',
    userId: 'default',
    type: 'youtube',
    itemId: 'yt-webdev-1',
    title: 'Modern React 19 Crash Course & Best Practices',
    description: 'Learn Server Components, useActionState, optimistic updates, and clean component patterns.',
    channelTitle: 'Traversy Media',
    topic: 'React & Frontend',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
    url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: 'youtube-yt-python-1',
    userId: 'default',
    type: 'youtube',
    itemId: 'yt-python-1',
    title: 'Python Data Structures & Algorithm Cheatsheet',
    description: 'Lists, sets, dictionaries, heaps, trees, and time complexity tradeoffs visual walkthrough.',
    channelTitle: 'freeCodeCamp.org',
    topic: 'Python & Data Structures',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    url: 'https://www.youtube.com/watch?v=pkYVOmU3MgA',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: 'youtube-yt-ai-1',
    userId: 'default',
    type: 'youtube',
    itemId: 'yt-ai-1',
    title: 'But what is a Neural Network? | Chapter 1, Deep Learning',
    description: 'Visual mathematical intuitive breakdown of weights, biases, and matrix transformations in neural nets.',
    channelTitle: '3Blue1Brown',
    topic: 'Artificial Intelligence',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    url: 'https://www.youtube.com/watch?v=aircAruvnKk',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: 'note-js-1',
    userId: 'default',
    type: 'note',
    itemId: 'note-js-1',
    noteId: 'note-js-1',
    title: 'Arrow Functions vs Traditional Functions in JS',
    courseId: 'web-dev-bootcamp',
    courseTitle: 'JavaScript Masterclass 2026',
    lessonId: 'javascript-functions',
    lessonTitle: 'JavaScript Functions & Scope Mastery',
    notePreview: 'Key insight: Arrow functions do NOT bind their own "this". They inherit lexical "this" from parent scope.',
    description: 'Key insight: Arrow functions do NOT bind their own "this". They inherit lexical "this" from parent scope.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: 'note-css-1',
    userId: 'default',
    type: 'note',
    itemId: 'note-css-1',
    noteId: 'note-css-1',
    title: 'CSS Grid repeat() & minmax() Formula',
    courseId: 'responsive-web-design',
    courseTitle: 'Responsive Web Design & Tailwind CSS',
    lessonId: 'css-grid',
    lessonTitle: 'Mastering CSS Grid & Flexbox Layouts',
    notePreview: 'Use `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` for responsive cards without media queries!',
    description: 'Use `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` for responsive cards without media queries!',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
];

export class BookmarkService {
  /**
   * Returns localStorage key formatted for current user
   */
  private static getKey(userId: string): string {
    const safeUser = (userId || 'guest').trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    return `${BOOKMARKS_STORAGE_PREFIX}${safeUser}`;
  }

  /**
   * Retrieve all bookmarks for a specific user from localStorage
   */
  static getBookmarks(userId: string): Bookmark[] {
    if (typeof window === 'undefined') return [];
    try {
      const key = this.getKey(userId);
      const saved = localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved);
      }
      // If user has no custom bookmarks saved yet, populate default demo bookmarks for user
      const initialUserBookmarks = defaultInitialBookmarks.map((b) => ({
        ...b,
        userId: userId || 'guest',
      }));
      this.saveBookmarks(userId, initialUserBookmarks);
      return initialUserBookmarks;
    } catch (e) {
      console.warn('Failed to load bookmarks from localStorage:', e);
      return [];
    }
  }

  /**
   * Persist bookmarks array for user to localStorage
   */
  static saveBookmarks(userId: string, bookmarks: Bookmark[]): void {
    if (typeof window === 'undefined') return;
    try {
      const key = this.getKey(userId);
      localStorage.setItem(key, JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save bookmarks to localStorage:', e);
    }
  }

  /**
   * Add a new bookmark for user
   */
  static addBookmark(
    userId: string,
    type: BookmarkType,
    itemId: string,
    itemData: BookmarkItemData
  ): Bookmark {
    const current = this.getBookmarks(userId);
    const existing = current.find((b) => b.itemId === itemId && b.type === type);
    if (existing) {
      return existing;
    }

    const now = new Date().toISOString();
    const newBookmark: Bookmark = {
      id: `${type}-${itemId}-${Date.now()}`,
      userId: userId || 'guest',
      type,
      itemId,
      title: itemData.title || 'Saved Resource',
      description: itemData.description || '',
      courseId: itemData.courseId,
      courseTitle: itemData.courseTitle,
      lessonId: itemData.lessonId,
      lessonTitle: itemData.lessonTitle,
      moduleTitle: itemData.moduleTitle,
      channelTitle: itemData.channelTitle,
      topic: itemData.topic,
      thumbnail: itemData.thumbnail,
      url: itemData.url,
      category: itemData.category,
      difficulty: itemData.difficulty,
      duration: itemData.duration,
      noteId: itemData.noteId,
      notePreview: itemData.notePreview || itemData.description,
      createdAt: now,
      updatedAt: now,
    };

    const updated = [newBookmark, ...current];
    this.saveBookmarks(userId, updated);
    return newBookmark;
  }

  /**
   * Remove a bookmark by unique bookmark ID
   */
  static removeBookmark(userId: string, bookmarkId: string): Bookmark[] {
    const current = this.getBookmarks(userId);
    const updated = current.filter((b) => b.id !== bookmarkId);
    this.saveBookmarks(userId, updated);
    return updated;
  }

  /**
   * Remove a bookmark by item ID and type
   */
  static removeBookmarkByItem(
    userId: string,
    itemId: string,
    type: BookmarkType
  ): Bookmark[] {
    const current = this.getBookmarks(userId);
    const updated = current.filter((b) => !(b.itemId === itemId && b.type === type));
    this.saveBookmarks(userId, updated);
    return updated;
  }

  /**
   * Check if an item is bookmarked for user
   */
  static isBookmarked(userId: string, itemId: string, type: BookmarkType): boolean {
    const current = this.getBookmarks(userId);
    return current.some((b) => b.itemId === itemId && b.type === type);
  }
}
