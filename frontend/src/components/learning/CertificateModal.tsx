import React from 'react';
import { Award, CheckCircle2, Download, Share2, X, Sparkles } from 'lucide-react';
import { Course } from '../../types/course';
import { useAuth } from '../../context/AuthContext';

interface CertificateModalProps {
  isOpen: boolean;
  course: Course | null;
  onClose: () => void;
}

export function CertificateModal({ isOpen, course, onClose }: CertificateModalProps) {
  const { user } = useAuth();
  if (!isOpen || !course) return null;

  const studentName = user?.name || 'Pallab Bag';
  const issueDate = course.completedDate || 'August 18, 2026';
  const certId = `SAI-CERT-${course.id.toUpperCase().replace(/[^A-Z0-9]/g, '')}-2026`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="certificate-modal"
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Official Certificate of Completion
              </h3>
              <p className="text-xs text-slate-500">Verified StudyAI Credential</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Card Canvas Frame */}
        <div className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white border-4 border-amber-400/40 shadow-inner flex flex-col items-center text-center space-y-5 overflow-hidden">
          {/* Subtle watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <Award className="w-96 h-96" />
          </div>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>StudyAI Academy of Computer Science</span>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-slate-300">This acknowledges that</p>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide font-display">
              {studentName}
            </h4>
            <p className="text-xs text-slate-300 pt-1">
              has successfully completed all required modules, projects, and assessments for
            </p>
            <h5 className="text-lg sm:text-xl font-bold text-amber-300 pt-1">
              {course.title}
            </h5>
          </div>

          <div className="w-full pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-left text-xs">
            <div>
              <p className="text-slate-400">Instructor</p>
              <p className="font-semibold text-white">{course.instructor}</p>
            </div>
            <div>
              <p className="text-slate-400">Issue Date</p>
              <p className="font-semibold text-white">{issueDate}</p>
            </div>
            <div>
              <p className="text-slate-400">Credential ID</p>
              <p className="font-mono font-semibold text-amber-300">{certId}</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Digitally verified credential</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert('Certificate downloaded as high-resolution PDF!')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-brand hover:bg-brand-dark text-white shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
