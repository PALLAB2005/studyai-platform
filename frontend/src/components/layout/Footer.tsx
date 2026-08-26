import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Footer() {
  const { navigate } = useAuth();

  return (
    <footer
      id="main-footer"
      className="border-t border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 text-slate-600 dark:text-slate-400 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-8 h-8 rounded-xl bg-brand text-white flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 font-display">
                Study<span className="text-brand-600 dark:text-brand-400">AI</span>
              </span>
            </button>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              AI-powered student learning platform designed to help students master subjects, ace exams, practice with intelligent quizzes, and build job-ready skills.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3 font-display">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/courses')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Explore Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/quiz')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  AI Quiz Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/exam-prep')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Exam Preparation
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/job-prep')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Job & Interview Prep
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3 font-display">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/my-learning')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  My Learning
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/bookmarks')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Saved Bookmarks
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/progress')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Progress Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/courses')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Video Tutorials
                </button>
              </li>
            </ul>
          </div>

          {/* Account & Get Started */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3 font-display">
              Get Started
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/signup')}
                  className="text-brand-600 dark:text-brand-400 font-medium hover:underline"
                >
                  Create Free Account
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/login')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Student Login
                </button>
              </li>
              <li>
                <span className="inline-block mt-2 px-2.5 py-1 text-xs rounded-lg bg-brand-100/70 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-medium border border-brand-200/60 dark:border-brand-800/40">
                  Version 1.0 Release
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-300">
          <p>© {new Date().getFullYear()} StudyAI. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered for high-performance student learning
          </p>
        </div>
      </div>
    </footer>
  );
}
