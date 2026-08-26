export type LessonContentType = 'video' | 'article' | 'youtube' | 'document' | 'code' | 'quiz' | 'reading';

export type LessonStatus = 'completed' | 'current' | 'not-started' | 'locked';

export interface CodeSnippet {
  language: string;
  code: string;
  filename?: string;
  output?: string;
}

export interface LessonContentSection {
  heading: string;
  body: string;
  codeSnippet?: CodeSnippet;
  callout?: {
    type: 'tip' | 'warning' | 'info';
    text: string;
  };
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  duration: string;
  contentType: LessonContentType;
  content?: string;
  videoUrl?: string;
  order: number;
  completed?: boolean;
  whatYouWillLearn?: string[];
  sections?: LessonContentSection[];
  keyTakeaways?: string[];
  resources?: Array<{ title: string; url: string; type: string }>;
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  order: number;
  duration: string;
  completed?: boolean;
  lessons: Lesson[];
}

export interface LessonNote {
  id: string;
  courseId: string;
  lessonId: string;
  lessonTitle: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
