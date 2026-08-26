import React, { useState, useEffect } from 'react';
import { LessonNote } from '../../types/lesson';
import { NotesService } from '../../services/notesService';
import { BookmarkButton } from '../bookmarks/BookmarkButton';
import {
  FileText,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Clock,
  BookOpen,
  Sparkles,
} from 'lucide-react';

interface LessonNotesProps {
  courseId: string;
  lessonId: string;
  lessonTitle: string;
  userId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function LessonNotes({
  courseId,
  lessonId,
  lessonTitle,
  userId = 'default-student',
  isOpen,
  onClose,
}: LessonNotesProps) {
  const [notes, setNotes] = useState<LessonNote[]>([]);
  const [viewScope, setViewScope] = useState<'current' | 'all'>('current');
  const [newContent, setNewContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const loadNotes = () => {
    const list = NotesService.getNotes(
      courseId,
      viewScope === 'current' ? lessonId : undefined,
      userId
    );
    setNotes(list);
  };

  useEffect(() => {
    loadNotes();
  }, [courseId, lessonId, viewScope, userId]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    NotesService.addNote(courseId, lessonId, lessonTitle, userId, newContent.trim());
    setNewContent('');
    loadNotes();
  };

  const handleStartEdit = (note: LessonNote) => {
    setEditingNoteId(note.id);
    setEditContent(note.content);
  };

  const handleSaveEdit = (noteId: string) => {
    if (!editContent.trim()) return;
    NotesService.updateNote(noteId, editContent.trim());
    setEditingNoteId(null);
    setEditContent('');
    loadNotes();
  };

  const handleDelete = (noteId: string) => {
    NotesService.deleteNote(noteId);
    loadNotes();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-in Notes Drawer */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-10 flex flex-col animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
                Lesson Notes
              </h2>
              <p className="text-xs text-slate-500 truncate max-w-[220px]">
                {lessonTitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            id="close-notes-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Filter Tabs */}
        <div className="px-5 pt-3 flex gap-2 border-b border-slate-100 dark:border-slate-800/60 text-xs">
          <button
            type="button"
            onClick={() => setViewScope('current')}
            className={`pb-2.5 px-2 font-semibold transition-colors border-b-2 cursor-pointer ${
              viewScope === 'current'
                ? 'border-blue-600 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            This Lesson ({notes.length})
          </button>
          <button
            type="button"
            onClick={() => setViewScope('all')}
            className={`pb-2.5 px-2 font-semibold transition-colors border-b-2 cursor-pointer ${
              viewScope === 'all'
                ? 'border-blue-600 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            All Course Notes
          </button>
        </div>

        {/* Notes Feed */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* New Note Form */}
          <form onSubmit={handleAddNote} className="space-y-2">
            <label htmlFor="new-note-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>Capture Quick Takeaway or Code Note</span>
            </label>
            <textarea
              id="new-note-input"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Write your personal notes for this lesson..."
              rows={3}
              className="w-full p-3 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand resize-none leading-relaxed"
            />
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{newContent.length} characters</span>
              <button
                type="submit"
                id="save-new-note-btn"
                disabled={!newContent.trim()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-brand hover:bg-brand-dark disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save Note</span>
              </button>
            </div>
          </form>

          {/* List of Notes */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Saved Notes ({notes.length})
            </h3>

            {notes.length === 0 ? (
              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-2">
                <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  No notes saved yet for this lesson.
                </p>
                <p className="text-[11px] text-slate-400">
                  Write key insights above to quickly review later.
                </p>
              </div>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2.5"
                >
                  {/* Note header */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[180px]">
                      {note.lessonTitle}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(note.updatedAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Note Content / Edit Form */}
                  {editingNoteId === note.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={3}
                        className="w-full p-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-blue-400 text-slate-900 dark:text-white focus:outline-hidden"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingNoteId(null)}
                          className="px-2 py-1 text-[11px] text-slate-500 hover:text-slate-700 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(note.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold bg-emerald-600 text-white rounded cursor-pointer"
                        >
                          <Check className="w-3 h-3" />
                          <span>Save</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                      {note.content}
                    </p>
                  )}

                  {/* Note actions footer */}
                  {editingNoteId !== note.id && (
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-slate-400">
                      <BookmarkButton
                        itemId={note.id}
                        type="note"
                        itemData={{
                          title: `Note: ${note.lessonTitle}`,
                          courseId,
                          lessonId,
                          lessonTitle: note.lessonTitle,
                          noteId: note.id,
                          notePreview: note.content,
                          description: note.content,
                        }}
                        variant="button"
                        size="sm"
                      />

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(note)}
                          className="p-1.5 hover:text-brand-600 dark:hover:text-brand-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                          aria-label="Edit Note"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(note.id)}
                          className="p-1.5 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                          aria-label="Delete Note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
