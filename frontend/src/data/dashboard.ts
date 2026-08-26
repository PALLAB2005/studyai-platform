import { LearningStats, LearningActivity, LearningGoalTask, NotificationItem } from '../types/learning';

export const initialLearningStats: LearningStats = {
  totalCourses: 10,
  completedCourses: 5,
  inProgressCourses: 3,
  pausedCourses: 2,
  learningStreak: 7,
  overallProgress: 68,
};

export const initialRecentActivities: LearningActivity[] = [
  {
    id: 'act-1',
    type: 'lesson',
    title: 'Completed JavaScript Functions',
    timestamp: '2 hours ago',
    courseTitle: 'JavaScript Masterclass',
  },
  {
    id: 'act-2',
    type: 'video',
    title: 'Watched React Hooks tutorial',
    timestamp: '5 hours ago',
    courseTitle: 'Complete Web Development Bootcamp',
  },
  {
    id: 'act-3',
    type: 'quiz',
    title: 'Scored 8/10 in JavaScript Quiz',
    timestamp: 'Yesterday',
    courseTitle: 'AI Quiz Engine',
    score: '8/10',
  },
  {
    id: 'act-4',
    type: 'bookmark',
    title: 'Bookmarked CSS Flexbox Cheatsheet',
    timestamp: '2 days ago',
    courseTitle: 'Web Development Resources',
  },
  {
    id: 'act-5',
    type: 'course',
    title: 'Started Python Basics: Variables & Control Flow',
    timestamp: '3 days ago',
    courseTitle: 'Python for Beginners',
  },
  {
    id: 'act-6',
    type: 'lesson',
    title: 'Reviewed Graph Traversal (BFS & DFS)',
    timestamp: '4 days ago',
    courseTitle: 'Data Structures & Algorithms',
  },
];

export const initialGoalTasks: LearningGoalTask[] = [
  {
    id: 'goal-1',
    title: 'Complete JavaScript Functions',
    completed: true,
    category: 'Lesson',
  },
  {
    id: 'goal-2',
    title: 'Watch Flexbox Tutorial',
    completed: true,
    category: 'Video',
  },
  {
    id: 'goal-3',
    title: 'Take JavaScript Quiz',
    completed: false,
    category: 'AI Quiz',
  },
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '🔥 7-Day Streak Active!',
    message: 'Awesome consistency! You have logged study sessions for 7 consecutive days.',
    timestamp: '1 hour ago',
    read: false,
    type: 'streak',
  },
  {
    id: 'notif-2',
    title: 'New AI Quiz Ready',
    message: 'A personalized quiz on JavaScript Promises & Async/Await has been generated.',
    timestamp: '4 hours ago',
    read: false,
    type: 'info',
  },
  {
    id: 'notif-3',
    title: 'Milestone Achieved',
    message: 'You reached 65% in Complete Web Development Bootcamp. Great progress!',
    timestamp: '1 day ago',
    read: true,
    type: 'success',
  },
  {
    id: 'notif-4',
    title: 'Upcoming Exam Revision',
    message: 'Your Data Structures midterm exam review cheat sheet is ready in Exam Prep.',
    timestamp: '2 days ago',
    read: true,
    type: 'alert',
  },
];
