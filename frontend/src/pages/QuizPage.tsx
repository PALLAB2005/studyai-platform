import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useQuiz } from '../context/QuizContext';
import { mockCoursesData } from '../data/courses';
import { QuizGenerationParams } from '../types/quiz';
import { initialNotifications } from '../data/dashboard';

import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { QuizGenerator } from '../components/quiz/QuizGenerator';
import { QuizLoading } from '../components/quiz/QuizLoading';

import { Sparkles, Brain, Award, Clock, ArrowRight, History } from 'lucide-react';

export function QuizPage() {
  const { user, navigate } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { generateQuiz, isGenerating, activeGenerationParams, history } = useQuiz();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const darkMode = theme === 'dark';

  const handleGenerate = async (params: QuizGenerationParams) => {
    try {
      const newQuiz = await generateQuiz(params);
      if (newQuiz) {
        navigate(`/quiz/${newQuiz.id}`);
      }
    } catch (err) {
      console.error('Quiz generation failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors">
      {/* Global Sidebar Navigation */}
      <DashboardSidebar
        currentRoute="/quiz"
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
          onOpenSidebar={() => setIsSidebarOpen(true)}
          userName={user?.name || 'Alex Morgan'}
          userEmail={user?.email || 'alex.morgan@studyai.edu'}
          avatarUrl={user?.avatar}
          notifications={notifications}
          onNotificationClick={(id) => {
            setNotifications((prev) =>
              prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
            );
          }}
          onMarkAllNotificationsRead={() => {
            setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
          }}
          onClearAllNotifications={() => setNotifications([])}
        />

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-8">
          {/* Header Banner */}
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 dark:bg-blue-950/80 text-brand-700 dark:text-brand-300">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>StudyAI Intelligent Assessment</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
              AI Quiz Generator
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Test your knowledge with personalized quizzes based on your course, subject, or topic.
            </p>
          </div>

          {/* Quiz Generator Configuration Form */}
          <QuizGenerator
            courses={mockCoursesData}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />

          {/* Recent Quiz History (if any) */}
          {history.length > 0 && (
            <div className="max-w-3xl mx-auto w-full space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-slate-400" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Recent Quiz Attempts
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {history.length} completed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {history.slice(0, 4).map((att) => (
                  <div
                    key={att.id}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between gap-3"
                  >
                    <div className="space-y-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {att.quizTitle}
                      </h4>
                      <p className="text-[11px] text-slate-400 capitalize">
                        {att.difficulty} · {att.score}/{att.totalQuestions} ({att.percentage}%)
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => navigate(`/quiz/${att.quizId}/result`)}
                        className="px-2.5 py-1.5 rounded-xl bg-brand-50 dark:bg-blue-950/50 text-brand-600 dark:text-brand-400 hover:bg-brand-100 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Analysis
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate(`/quiz/${att.quizId}`)}
                        className="p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 text-xs font-bold flex items-center gap-1 cursor-pointer"
                        title="Retake Quiz"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Generating Modal Overlay */}
      {isGenerating && <QuizLoading params={activeGenerationParams} />}
    </div>
  );
}
