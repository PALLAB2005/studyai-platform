import React, { useState } from 'react';
import {
  Play,
  PauseCircle,
  CheckCircle2,
  Clock,
  User,
  Award,
  MoreVertical,
  Trash2,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Course } from '../../types/course';
import { UserCourseProgress } from '../../types/learning';
import { CourseProgressBar } from './CourseProgressBar';
import { useAuth } from '../../context/AuthContext';

interface LearningCourseCardProps {
  key?: React.Key;
  course: Course;
  userProgress: UserCourseProgress;
  onContinue: (courseId: string) => void;
  onStart: (course: Course) => void;
  onResume: (courseId: string) => void;
  onPauseRequest: (course: Course) => void;
  onRemoveRequest: (course: Course) => void;
  onViewCertificate: (course: Course) => void;
  onViewDetails?: (course: Course) => void;
}

export function LearningCourseCard({
  course,
  userProgress,
  onContinue,
  onStart,
  onResume,
  onPauseRequest,
  onRemoveRequest,
  onViewCertificate,
  onViewDetails,
}: LearningCourseCardProps) {
  const { navigate } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const status = userProgress.status;
  const progress = userProgress.progress;
  const completedLessons = userProgress.completedLessons;
  const totalLessons = userProgress.totalLessons || course.totalLessons;
  const lastLessonTitle = userProgress.lastLessonTitle;

  const getGradientByScheme = (scheme?: string) => {
    switch (scheme) {
      case 'purple':
        return 'from-purple-600/15 via-indigo-500/10 to-transparent border-purple-200/80 dark:border-purple-900/40 text-purple-600 dark:text-purple-400';
      case 'emerald':
        return 'from-emerald-600/15 via-teal-500/10 to-transparent border-emerald-200/80 dark:border-emerald-900/40 text-emerald-600 dark:text-emerald-400';
      case 'amber':
        return 'from-amber-600/15 via-orange-500/10 to-transparent border-amber-200/80 dark:border-amber-900/40 text-amber-600 dark:text-amber-400';
      case 'rose':
        return 'from-rose-600/15 via-pink-500/10 to-transparent border-rose-200/80 dark:border-rose-900/40 text-rose-600 dark:text-rose-400';
      case 'indigo':
        return 'from-indigo-600/15 via-blue-500/10 to-transparent border-indigo-200/80 dark:border-indigo-900/40 text-indigo-600 dark:text-indigo-400';
      case 'blue':
      default:
        return 'from-blue-600/15 via-cyan-500/10 to-transparent border-blue-200/80 dark:border-brand-900/40 text-brand-600 dark:text-brand-400';
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-blue-200/80 dark:border-blue-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            <span>In Progress</span>
          </span>
        );
      case 'paused':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60">
            <PauseCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Paused</span>
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Completed</span>
          </span>
        );
      case 'not-started':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
            <span>Not Started</span>
          </span>
        );
    }
  };

  const handleOpenCourseDetail = () => {
    if (onViewDetails) {
      onViewDetails(course);
    } else {
      const target = course.slug || course.id;
      navigate(`/courses/${target}`);
    }
  };

  return (
    <div
      id={`my-learning-card-${course.id}`}
      className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 relative"
    >
      {/* Top Banner Graphic & Badges */}
      <div className="space-y-4">
        <div
          className={`h-36 rounded-2xl bg-gradient-to-br ${getGradientByScheme(
            course.colorScheme
          )} border p-4 flex flex-col justify-between relative overflow-hidden`}
        >
          {/* Subtle decoration background badge */}
          <div className="flex items-center justify-between gap-2 z-10">
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-white/90 dark:bg-slate-900/90 shadow-xs backdrop-blur-xs text-slate-900 dark:text-white">
              {course.category}
            </span>
            <div className="flex items-center gap-2">
              {getStatusBadge()}
            </div>
          </div>

          {/* Bottom of Banner graphic */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-xs">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{course.duration}</span>
              <span>•</span>
              <span>{course.difficulty}</span>
            </div>

            {/* Top right quick menu trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="w-8 h-8 rounded-lg bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center shadow-xs transition-colors"
                aria-label="Course options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {/* Context Dropdown Menu */}
              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setShowMenu(false)}
                  />
                  <div className="absolute right-0 top-10 z-30 w-48 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl py-1 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setShowMenu(false);
                        handleOpenCourseDetail();
                      }}
                      className="w-full px-3.5 py-2 text-left text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 font-medium flex items-center gap-2"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span>Course Syllabus</span>
                    </button>

                    {status === 'in-progress' && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowMenu(false);
                          onPauseRequest(course);
                        }}
                        className="w-full px-3.5 py-2 text-left text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 font-medium flex items-center gap-2"
                      >
                        <PauseCircle className="w-3.5 h-3.5" />
                        <span>Pause Course</span>
                      </button>
                    )}

                    {status === 'completed' && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowMenu(false);
                          onViewCertificate(course);
                        }}
                        className="w-full px-3.5 py-2 text-left text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 font-medium flex items-center gap-2"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>View Certificate</span>
                      </button>
                    )}

                    <div className="my-1 border-t border-slate-100 dark:border-slate-700" />

                    <button
                      type="button"
                      onClick={() => {
                        setShowMenu(false);
                        onRemoveRequest(course);
                      }}
                      className="w-full px-3.5 py-2 text-left text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-medium flex items-center gap-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove from Library</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Title and Instructor info */}
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={handleOpenCourseDetail}
            className="text-left w-full group/title cursor-pointer"
          >
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display line-clamp-1 group-hover/title:text-brand-600 dark:group-hover/title:text-brand-400 transition-colors">
              {course.title}
            </h3>
          </button>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {course.description}
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium truncate">{course.instructor}</span>
          </div>
        </div>

        {/* Dynamic Status / Progress Section */}
        {status === 'in-progress' && (
          <div className="space-y-2 pt-2">
            <CourseProgressBar
              progress={progress}
              completedLessons={completedLessons}
              totalLessons={totalLessons}
              colorScheme={course.colorScheme}
              status="in-progress"
            />
            {lastLessonTitle && (
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 truncate">
                  Next up: <strong className="text-slate-700 dark:text-slate-200 font-semibold">{lastLessonTitle}</strong>
                </span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <Clock className="w-3 h-3" />
              <span>Last accessed: {userProgress.lastAccessed || 'Today'}</span>
            </div>
          </div>
        )}

        {status === 'paused' && (
          <div className="space-y-2 pt-2">
            <CourseProgressBar
              progress={progress}
              completedLessons={completedLessons}
              totalLessons={totalLessons}
              status="paused"
            />
            <div className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/40 flex items-center justify-between text-xs text-amber-800 dark:text-amber-300">
              <span>Paused with {progress}% completed</span>
              <span className="font-semibold">{userProgress.pausedAt || 'Recently'}</span>
            </div>
          </div>
        )}

        {status === 'completed' && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Completed</span>
              </span>
              <span className="text-slate-500 font-medium">
                {totalLessons} / {totalLessons} Lessons
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-emerald-500" />
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Completed on: <strong className="text-slate-700 dark:text-slate-200 font-semibold">{userProgress.completedAt || course.completedDate || 'August 18, 2026'}</strong></span>
            </div>
          </div>
        )}

        {status === 'not-started' && (
          <div className="space-y-2 pt-2 text-xs text-slate-500 dark:text-slate-400">
            <p>Ready to start? Total curriculum: <strong>{totalLessons} lessons</strong> ({course.duration}).</p>
          </div>
        )}
      </div>

      {/* Action Footer Buttons based on Status */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
        {status === 'in-progress' && (
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              id={`continue-learning-btn-${course.id}`}
              onClick={() => onContinue(course.id)}
              className="py-2.5 px-4 rounded-xl bg-brand hover:bg-brand-dark active:bg-brand-dark text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-brand/20 transition-all cursor-pointer"
            >
              <span>Continue</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              id={`pause-course-btn-${course.id}`}
              onClick={() => onPauseRequest(course)}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <PauseCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>Pause</span>
            </button>
          </div>
        )}

        {status === 'paused' && (
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              id={`resume-course-btn-${course.id}`}
              onClick={() => onResume(course.id)}
              className="py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-amber-600/20 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              <span>Resume</span>
            </button>

            <button
              type="button"
              id={`view-details-paused-btn-${course.id}`}
              onClick={handleOpenCourseDetail}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>
          </div>
        )}

        {status === 'completed' && (
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              id={`review-course-btn-${course.id}`}
              onClick={handleOpenCourseDetail}
              className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Review</span>
            </button>

            <button
              type="button"
              id={`view-certificate-btn-${course.id}`}
              onClick={() => onViewCertificate(course)}
              className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Certificate</span>
            </button>
          </div>
        )}

        {status === 'not-started' && (
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              id={`start-course-btn-${course.id}`}
              onClick={() => onStart(course)}
              className="py-2.5 px-4 rounded-xl bg-brand hover:bg-brand-dark active:bg-brand-dark text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-brand/20 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              <span>Start Course</span>
            </button>

            <button
              type="button"
              id={`view-curriculum-btn-${course.id}`}
              onClick={handleOpenCourseDetail}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Curriculum</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
