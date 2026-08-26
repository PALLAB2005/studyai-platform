import { LessonNote } from '../types/lesson';

const NOTES_STORAGE_KEY = 'studyai_lesson_notes_v1';

export class NotesService {
  /**
   * Retrieve all notes from localStorage
   */
  static getAllNotes(): LessonNote[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(NOTES_STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to load notes from localStorage:', e);
      return [];
    }
  }

  /**
   * Persist all notes to localStorage
   */
  static saveAllNotes(notes: LessonNote[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to save notes to localStorage:', e);
    }
  }

  /**
   * Get notes filtered by course and/or lesson and user
   */
  static getNotes(courseId: string, lessonId?: string, userId?: string): LessonNote[] {
    const all = this.getAllNotes();
    return all.filter((note) => {
      const matchCourse = note.courseId === courseId;
      const matchLesson = lessonId ? note.lessonId === lessonId : true;
      const matchUser = userId ? note.userId === userId : true;
      return matchCourse && matchLesson && matchUser;
    });
  }

  /**
   * Add a new note
   */
  static addNote(
    courseId: string,
    lessonId: string,
    lessonTitle: string,
    userId: string,
    content: string
  ): LessonNote {
    const all = this.getAllNotes();
    const now = new Date().toISOString();
    const newNote: LessonNote = {
      id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      courseId,
      lessonId,
      lessonTitle,
      userId,
      content,
      createdAt: now,
      updatedAt: now,
    };

    all.unshift(newNote);
    this.saveAllNotes(all);
    return newNote;
  }

  /**
   * Update an existing note
   */
  static updateNote(noteId: string, content: string): LessonNote | null {
    const all = this.getAllNotes();
    const index = all.findIndex((n) => n.id === noteId);
    if (index === -1) return null;

    all[index] = {
      ...all[index],
      content,
      updatedAt: new Date().toISOString(),
    };

    this.saveAllNotes(all);
    return all[index];
  }

  /**
   * Delete a note by ID
   */
  static deleteNote(noteId: string): boolean {
    const all = this.getAllNotes();
    const filtered = all.filter((n) => n.id !== noteId);
    if (filtered.length !== all.length) {
      this.saveAllNotes(filtered);
      return true;
    }
    return false;
  }
}
