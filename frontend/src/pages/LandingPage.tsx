import React from 'react';
import {
  Sparkles,
  BookOpen,
  Brain,
  GraduationCap,
  Youtube,
  Briefcase,
  Bookmark,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Award,
  Zap,
  Clock,
  Flame,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';

export function LandingPage() {
  const { navigate, isAuthenticated } = useAuth();

  const features = [
    {
      id: 'feature-courses',
      icon: BookOpen,
      iconColor: 'text-brand-600 dark:text-brand-400',
      bgColor: 'bg-brand-50 dark:bg-blue-950/50',
      badge: 'Structured Learning',
      title: 'Learn Courses',
      description: 'Access structured courses and track your learning progress.',
    },
    {
      id: 'feature-quiz',
      icon: Brain,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/50',
      badge: 'AI Powered',
      title: 'AI Quiz',
      description: 'Test your knowledge with intelligent quizzes based on your subjects and topics.',
    },
    {
      id: 'feature-exam',
      icon: GraduationCap,
      iconColor: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-50 dark:bg-rose-950/50',
      badge: 'Targeted Review',
      title: 'Exam Preparation',
      description: 'Get important topics and quick revision support before exams.',
    },
    {
      id: 'feature-videos',
      icon: Youtube,
      iconColor: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-950/50',
      badge: 'Visual Learning',
      title: 'Video Tutorials',
      description: 'Find useful YouTube tutorials for your selected learning topic.',
    },
    {
      id: 'feature-jobs',
      icon: Briefcase,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/50',
      badge: 'Career Ready',
      title: 'Job Preparation',
      description: 'Prepare for technical interviews, HR questions, and job-ready skills.',
    },
    {
      id: 'feature-bookmarks',
      icon: Bookmark,
      iconColor: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/50',
      badge: 'Personal Hub',
      title: 'Bookmarks',
      description: 'Save important courses, lessons, videos, and resources for later.',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Create Your Account',
      description: 'Join the platform and set your learning goals.',
      icon: Zap,
    },
    {
      step: '02',
      title: 'Choose a Course',
      description: 'Start learning from structured courses and lessons.',
      icon: BookOpen,
    },
    {
      step: '03',
      title: 'Track Your Progress',
      description: 'Continue where you stopped and complete your learning goals.',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section
        id="hero-section"
        className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-900"
      >
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-blue-800/80 text-brand-700 dark:text-brand-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                <span>Next-Generation AI Student Companion</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] font-display">
                Learn Smarter.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-indigo-600 dark:from-blue-400 dark:to-indigo-300">
                  Prepare Better.
                </span>{' '}
                Achieve More.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                StudyAI helps students learn courses, track progress, prepare for exams, test knowledge with AI quizzes, and build job-ready skills.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Button
                  id="hero-get-started-btn"
                  variant="primary"
                  size="lg"
                  onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
                  className="w-full sm:w-auto font-semibold shadow-md shadow-brand/20 bg-brand hover:bg-brand-dark dark:bg-brand dark:hover:bg-brand"
                >
                  <span>{isAuthenticated ? 'Go to Dashboard' : 'Get Started'}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>

                <Button
                  id="hero-explore-courses-btn"
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/courses')}
                  className="w-full sm:w-auto font-medium border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <BookOpen className="w-4 h-4 mr-1 text-slate-500" />
                  <span>Explore Courses</span>
                </Button>
              </div>

              {/* Key Trust Highlights */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Interactive AI Quizzes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Exam Revision Cheat Sheets</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Job & Interview Preparation</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Area (UI Mockup Cards & Elements) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Interactive Card */}
                <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xl shadow-slate-200/60 dark:shadow-2xl dark:shadow-black/40 space-y-4">
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-brand text-white flex items-center justify-center font-bold text-xs">
                        DSA
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          Data Structures & Algorithms
                        </h4>
                        <p className="text-[11px] text-slate-400">Module 4: Trees & Graphs</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                      In Progress
                    </span>
                  </div>

                  {/* Course Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-600 dark:text-slate-400">Completion</span>
                      <span className="text-brand-600 dark:text-brand-400 font-bold">78%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand to-indigo-500 rounded-full"
                        style={{ width: '78%' }}
                      />
                    </div>
                  </div>

                  {/* Micro AI Quiz Widget */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Brain className="w-3.5 h-3.5 text-indigo-500" />
                        AI Quick Assessment
                      </span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold">Score: 95%</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                      What is the time complexity of BFS traversal on a graph?
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>O(V + E) — Correct answer with AI explanation!</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-xs">
                        <Flame className="w-3.5 h-3.5" />
                        14
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">Day Streak</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-center gap-1 text-brand-500 font-bold text-xs">
                        <BookOpen className="w-3.5 h-3.5" />
                        8
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">Active Courses</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-center gap-1 text-emerald-500 font-bold text-xs">
                        <Award className="w-3.5 h-3.5" />
                        24
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">Quizzes Passed</p>
                    </div>
                  </div>
                </div>

                {/* Floating Exam Alert badge */}
                <div className="absolute -bottom-4 -left-4 sm:-left-6 p-2.5 px-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-xs">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Exam Sprint</p>
                    <p className="text-[10px] text-slate-500">Algorithms Midterm in 3 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PLATFORM FEATURES SECTION */}
      <section
        id="features-section"
        className="py-16 md:py-24 bg-white dark:bg-slate-950/40 border-b border-slate-200/80 dark:border-slate-800 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 md:mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 font-display">
              Platform Features
            </h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
              Everything You Need to Learn Better
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              StudyAI consolidates your entire academic workflow into one streamlined, distraction-free environment.
            </p>
          </div>

          {/* 6 Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.id}
                  id={item.id}
                  className="group hover:border-brand-300 dark:hover:border-blue-700/60 hover:shadow-md transition-all duration-200 bg-white dark:bg-slate-900"
                >
                  <CardHeader className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-11 h-11 rounded-xl ${item.bgColor} ${item.iconColor} flex items-center justify-center transition-transform group-hover:scale-105`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section
        id="how-it-works-section"
        className="py-16 md:py-24 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 md:mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 font-display">
              Simple Workflow
            </h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
              How It Works
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              Three simple steps to accelerate your learning and master any topic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  id={`how-it-works-step-${step.step}`}
                  className="relative p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 space-y-4 text-center md:text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold font-display text-brand-600 dark:text-brand-400">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION (CTA) SECTION */}
      <section
        id="cta-section"
        className="py-16 md:py-20 bg-white dark:bg-slate-950/70 relative overflow-hidden transition-colors"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            Start Your Learning Journey Today
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Join StudyAI and organize your learning in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Button
              id="cta-create-account-btn"
              variant="primary"
              size="lg"
              onClick={() => navigate('/signup')}
              className="w-full sm:w-auto font-semibold shadow-md shadow-brand/20 bg-brand hover:bg-brand-dark dark:bg-brand dark:hover:bg-brand"
            >
              Create Free Account
            </Button>
            <Button
              id="cta-login-btn"
              variant="outline"
              size="lg"
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto font-medium border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Login
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
