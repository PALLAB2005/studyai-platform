import React, { useState } from 'react';
import { Lesson } from '../../types/lesson';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Check,
  Copy,
  Sparkles,
  Lightbulb,
  BookOpen,
  Code2,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface LessonContentProps {
  lesson: Lesson;
  courseTitle: string;
}

export function LessonContent({ lesson, courseTitle }: LessonContentProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<'1x' | '1.25x' | '1.5x' | '2x'>('1x');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Lesson Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{courseTitle}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
          {lesson.title}
        </h1>
        {lesson.description && (
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {lesson.description}
          </p>
        )}
      </div>

      {/* Video / Interactive Media Stage */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl aspect-video flex flex-col justify-between group">
        {/* Top bar inside player */}
        <div className="p-4 sm:p-6 flex items-center justify-between text-white/80 z-10 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-brand text-white">
              HD 1080p
            </span>
            <span className="text-xs font-medium text-white/90 truncate max-w-xs sm:max-w-md">
              {lesson.title}
            </span>
          </div>
          <span className="text-xs text-white/70 flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5" />
            {lesson.duration}
          </span>
        </div>

        {/* Center Play/Pause Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-5 rounded-full bg-blue-600/90 hover:bg-brand text-white shadow-2xl backdrop-blur-md transform transition-all group-hover:scale-110 pointer-events-auto cursor-pointer"
            aria-label={isPlaying ? 'Pause Lesson' : 'Play Lesson'}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-current" />
            ) : (
              <Play className="w-8 h-8 fill-current ml-1" />
            )}
          </button>
        </div>

        {/* Bottom Control Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10 space-y-2">
          {/* Progress scrubber */}
          <div className="w-full h-1.5 rounded-full bg-white/20 hover:h-2 transition-all cursor-pointer relative overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: isPlaying ? '45%' : '15%' }}
            />
          </div>

          <div className="flex items-center justify-between text-white text-xs pt-1">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:text-brand-400 transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="hover:text-brand-400 transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="font-mono text-[11px] text-white/70">
                {isPlaying ? '04:12' : '01:30'} / {lesson.duration}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Playback speed selector */}
              <div className="flex items-center bg-white/10 rounded-lg p-0.5 text-[10px] font-bold">
                {(['1x', '1.25x', '1.5x'] as const).map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => setPlaybackSpeed(speed)}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                      playbackSpeed === speed ? 'bg-brand text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {speed}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="p-1 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* What You Will Learn Card */}
      {lesson.whatYouWillLearn && lesson.whatYouWillLearn.length > 0 && (
        <div className="p-6 rounded-3xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-brand-900/50 space-y-4">
          <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200 font-bold text-base">
            <Sparkles className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <h3>What You Will Learn In This Lesson</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {lesson.whatYouWillLearn.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <div className="p-1 rounded-full bg-blue-200/60 dark:bg-blue-900/80 text-brand-700 dark:text-brand-300 shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Structured Sections & Explanations */}
      {lesson.sections && lesson.sections.length > 0 ? (
        <div className="space-y-8">
          {lesson.sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight font-display">
                {section.heading}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {section.body}
              </p>

              {/* Optional Callout */}
              {section.callout && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3 text-amber-900 dark:text-amber-200 text-xs sm:text-sm">
                  <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold mb-0.5">Key Tip:</strong>
                    <span>{section.callout.text}</span>
                  </div>
                </div>
              )}

              {/* Code Snippet */}
              {section.codeSnippet && (
                <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md">
                  <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-2 font-mono">
                      <Code2 className="w-4 h-4 text-brand-400" />
                      <span>{section.codeSnippet.filename || `${section.codeSnippet.language}.code`}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyCode(section.codeSnippet!.code, sIdx)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors cursor-pointer"
                    >
                      {copiedIndex === sIdx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed">
                    <code>{section.codeSnippet.code}</code>
                  </pre>

                  {section.codeSnippet.output && (
                    <div className="px-4 py-2 bg-slate-900/70 border-t border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
                      <span className="font-semibold text-emerald-400">Output:</span>
                      <span>{section.codeSnippet.output}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Fallback section if no custom sections */
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            Lesson Overview & Key Concepts
          </h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Follow along with the guided video above. Complete the practical code exercises and review key takeaways before progressing to the next lesson in the curriculum.
          </p>
        </div>
      )}

      {/* Key Takeaways Box */}
      {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
        <div className="p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-3">
          <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-bold text-base">
            <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
            <h3>Key Takeaways & Summary</h3>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {lesson.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
