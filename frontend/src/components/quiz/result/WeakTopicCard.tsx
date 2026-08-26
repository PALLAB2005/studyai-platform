import React, { useState, useEffect } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  BookOpen,
  Youtube,
  Play,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { TopicRecommendation } from '../../../types/quizAnalysis';
import { getRecommendedVideos } from '../../../services/youtubeService';
import { YouTubeVideo } from '../../../types/youtube';
import { useAuth } from '../../../context/AuthContext';

interface WeakTopicCardProps {
  key?: React.Key;
  recommendation: TopicRecommendation;
  onGeneratePracticeQuiz: (topic: string, difficulty: string) => void;
}

export function WeakTopicCard({
  recommendation,
  onGeneratePracticeQuiz,
}: WeakTopicCardProps) {
  const { navigate } = useAuth();
  const { topic, accuracy, level, message, suggestedDifficulty, studyAILesson, recommendedSearchTerm } =
    recommendation;

  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  // Fetch YouTube tutorials matching this specific weak topic
  useEffect(() => {
    let isMounted = true;
    async function loadVideos() {
      try {
        setLoadingVideos(true);
        const results = await getRecommendedVideos(
          recommendedSearchTerm || `${topic} tutorial`,
          2
        );
        if (isMounted) {
          setVideos(results);
        }
      } catch {
        // Handled silently by fallback
      } finally {
        if (isMounted) setLoadingVideos(false);
      }
    }
    loadVideos();
    return () => {
      isMounted = false;
    };
  }, [recommendedSearchTerm, topic]);

  const levelBadge =
    level === 'weak'
      ? {
          label: 'Weak Topic',
          icon: <AlertCircle className="w-3.5 h-3.5 text-rose-500" />,
          classes: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
        }
      : {
          label: 'Needs Practice',
          icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />,
          classes: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        };

  return (
    <div
      id={`weak-topic-card-${topic.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
      className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5 transition-all hover:border-slate-300 dark:hover:border-slate-700"
    >
      {/* Header: Topic Name, Accuracy & Level Badge */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${levelBadge.classes}`}
            >
              {levelBadge.icon}
              <span>{levelBadge.label}</span>
            </span>
            <span className="text-xs font-bold text-slate-500">
              {accuracy}% accuracy
            </span>
          </div>
          <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white">
            {topic}
          </h4>
        </div>

        {/* Practice Quiz Button */}
        <button
          type="button"
          onClick={() => onGeneratePracticeQuiz(topic, suggestedDifficulty)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-blue-900/60 border border-brand-200 dark:border-blue-800/60 text-xs font-bold transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generate Practice Quiz</span>
        </button>
      </div>

      {/* Tailored Recommendation Guidance */}
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80">
        <strong className="text-slate-900 dark:text-slate-100 block mb-0.5">
          Revision Goal:
        </strong>
        {message}
      </p>

      {/* Integrated Study Resources: StudyAI Course Lesson & YouTube Tutorials */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 1. StudyAI Course Lesson Link */}
        {studyAILesson ? (
          <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-slate-800/40 border border-blue-100 dark:border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Found in StudyAI Course</span>
              </div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                {studyAILesson.lessonTitle}
              </h5>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                {studyAILesson.courseTitle} • {studyAILesson.duration || '30 min'}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/courses/${studyAILesson.courseSlug || studyAILesson.courseId}/lessons/${studyAILesson.lessonId}`
                )
              }
              className="inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-brand hover:bg-brand-dark text-white text-xs font-bold transition-all shadow-sm cursor-pointer w-full"
            >
              <span>Open Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>StudyAI Curriculum</span>
              </div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Interactive Concept Notes
              </h5>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Review interactive documentation and code sandbox exercises.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/courses')}
              className="inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-bold transition-all cursor-pointer w-full"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 2. YouTube Video Tutorial Recommendation */}
        {videos.length > 0 ? (
          <div className="p-4 rounded-2xl bg-red-50/40 dark:bg-slate-800/40 border border-red-100 dark:border-slate-800 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400">
                <Youtube className="w-3.5 h-3.5" />
                <span>Recommended Video Tutorial</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 font-semibold">
                YouTube
              </span>
            </div>

            <div className="flex items-center gap-3">
              {videos[0].thumbnail && (
                <img
                  src={videos[0].thumbnail}
                  alt={videos[0].title}
                  className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="min-w-0 flex-1">
                <h5 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                  {videos[0].title}
                </h5>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {videos[0].channel} • {videos[0].duration}
                </p>
              </div>
            </div>

            <a
              href={videos[0].videoUrl || `https://www.youtube.com/watch?v=${videos[0].videoId || videos[0].id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer w-full text-center"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
            </a>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 mb-1">
                <Youtube className="w-3.5 h-3.5" />
                <span>Video Walkthrough</span>
              </div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {topic} Crash Course
              </h5>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Watch top educational tutorials on YouTube.
              </p>
            </div>
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                recommendedSearchTerm
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-bold transition-all cursor-pointer w-full"
            >
              <span>Search YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
