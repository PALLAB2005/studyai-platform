import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BookmarkProvider } from './context/BookmarkContext';
import { LearningProvider } from './context/LearningContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { DashboardPage } from './pages/DashboardPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { MyLearningPage } from './pages/MyLearningPage';
import { LessonViewerPage } from './pages/LessonViewerPage';
import { QuizPage } from './pages/QuizPage';
import { QuizSessionPage } from './pages/QuizSessionPage';
import { QuizResultPage } from './pages/QuizResultPage';
import { QuizProvider } from './context/QuizContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { BookmarksPage } from './pages/BookmarksPage';
import { PlaceholderRoutePage } from './pages/PlaceholderRoutePage';
import { VideoLearningPage } from './pages/VideoLearningPage';
import { BookOpen, Brain, GraduationCap, Briefcase, Bookmark, TrendingUp, Sparkles } from 'lucide-react';

function AppContent() {
  const { currentPath } = useAuth();

  const renderRoute = () => {
    // Normalise path (remove trailing slash unless root)
    const path = currentPath === '/' ? '/' : currentPath.replace(/\/$/, '');

    // Dynamic lesson viewer route: /courses/:courseId/lessons/:lessonId
    const lessonMatch = path.match(/^\/courses\/([^/]+)\/lessons\/([^/]+)$/);
    if (lessonMatch) {
      const courseId = lessonMatch[1];
      const lessonId = lessonMatch[2];
      return (
        <ProtectedRoute>
          <LessonViewerPage courseIdentifier={courseId} lessonId={lessonId} />
        </ProtectedRoute>
      );
    }

    const videoMatch = path.match(/^\/videos\/([^/]+)$/);
    if (videoMatch) {
      return (
        <ProtectedRoute>
          <VideoLearningPage videoIdentifier={decodeURIComponent(videoMatch[1])} />
        </ProtectedRoute>
      );
    }

    // Dynamic quiz result route: /quiz/:quizId/result
    const quizResultMatch = path.match(/^\/quiz\/([^/]+)\/result$/);
    if (quizResultMatch) {
      const quizId = quizResultMatch[1];
      return (
        <ProtectedRoute>
          <QuizResultPage quizId={quizId} />
        </ProtectedRoute>
      );
    }

    // Dynamic quiz session route: /quiz/:quizId
    const quizMatch = path.match(/^\/quiz\/([^/]+)$/);
    if (quizMatch) {
      const quizId = quizMatch[1];
      return (
        <ProtectedRoute>
          <QuizSessionPage quizId={quizId} />
        </ProtectedRoute>
      );
    }

    // Dynamic course details route: /courses/:courseId
    if (path.startsWith('/courses/')) {
      const courseId = path.replace('/courses/', '');
      return (
        <ProtectedRoute>
          <CourseDetailPage courseIdentifier={courseId} />
        </ProtectedRoute>
      );
    }

    switch (path) {
      case '/':
        return <LandingPage />;

      case '/login':
        return <LoginPage />;

      case '/signup':
        return <SignUpPage />;

      case '/dashboard':
        return (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        );

      case '/courses':
        return (
          <ProtectedRoute>
            <CoursesPage />
          </ProtectedRoute>
        );

      case '/my-learning':
      case '/progress':
        return (
          <ProtectedRoute>
            <MyLearningPage />
          </ProtectedRoute>
        );

      case '/quiz':
        return (
          <ProtectedRoute>
            <QuizPage />
          </ProtectedRoute>
        );

      case '/exam-prep':
        return (
          <ProtectedRoute>
            <PlaceholderRoutePage
              title="Exam Preparation"
              description="High-yield revision notes, past year problems, and countdown study planners."
              icon={<GraduationCap className="w-7 h-7" />}
            />
          </ProtectedRoute>
        );

      case '/job-prep':
        return (
          <ProtectedRoute>
            <PlaceholderRoutePage
              title="Job Preparation"
              description="Technical interview question banks, HR behavioral drills, and resume prep."
              icon={<Briefcase className="w-7 h-7" />}
            />
          </ProtectedRoute>
        );

      case '/bookmarks':
        return (
          <ProtectedRoute>
            <BookmarksPage />
          </ProtectedRoute>
        );

      case '/tutorials':
        return (
          <ProtectedRoute>
            <PlaceholderRoutePage
              title="Video Tutorials"
              description="Curated high-quality video walkthroughs and lectures synchronized with your curriculum."
              icon={<BookOpen className="w-7 h-7" />}
            />
          </ProtectedRoute>
        );

      case '/settings':
        return (
          <ProtectedRoute>
            <PlaceholderRoutePage
              title="Account & Learning Settings"
              description="Manage your student profile, notification preferences, learning goals, and password."
              icon={<Sparkles className="w-7 h-7" />}
            />
          </ProtectedRoute>
        );

      default:
        // Default to Landing Page if unknown route
        return <LandingPage />;
    }
  };

  const isPortalRoute =
    currentPath === '/dashboard' ||
    currentPath === '/my-learning' ||
    currentPath === '/bookmarks' ||
    currentPath === '/progress' ||
    currentPath.startsWith('/courses') ||
    currentPath.startsWith('/videos') ||
    currentPath.startsWith('/quiz');

  if (isPortalRoute) {
    return <main className="min-h-screen">{renderRoute()}</main>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />
      <main className="flex-1">{renderRoute()}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BookmarkProvider>
          <LearningProvider>
            <QuizProvider>
              <AppContent />
            </QuizProvider>
          </LearningProvider>
        </BookmarkProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

