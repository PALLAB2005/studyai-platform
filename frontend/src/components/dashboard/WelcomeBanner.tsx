import React from 'react';
import { Play, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface WelcomeBannerProps {
  onContinueLearning: () => void;
  recentCourseTitle?: string;
}

export function WelcomeBanner({
  onContinueLearning,
  recentCourseTitle = 'Complete Web Development Bootcamp',
}: WelcomeBannerProps) {
  const { user } = useAuth();

  // Format formatted date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const studentName = user?.name ? user.name.split(' ')[0] : 'Student';

  return (
    <div
      id="dashboard-welcome-banner"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand via-brand-dark to-brand-dark text-white p-6 sm:p-8 shadow-lg shadow-brand/10 border border-brand-500/20"
    >
      {/* Background Subtle Geometric Pattern */}
      <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute right-1/4 -bottom-16 w-48 h-48 rounded-full bg-indigo-400/20 blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-100/90 tracking-wide uppercase">
            <Calendar className="w-3.5 h-3.5" />
            <span>{currentDate}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-white">
            Welcome back, {studentName} 👋
          </h2>

          <p className="text-sm sm:text-base text-brand-100/90 font-medium leading-relaxed">
            Ready to continue your learning journey? Jump right back into{' '}
            <span className="font-semibold text-white underline decoration-brand-300 decoration-2 underline-offset-4">
              {recentCourseTitle}
            </span>
            .
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            id="welcome-banner-continue-btn"
            onClick={onContinueLearning}
            className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white text-brand-700 hover:bg-brand-50 active:bg-brand-100 font-bold text-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer group"
          >
            <div className="w-6 h-6 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <span>Continue Learning</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
