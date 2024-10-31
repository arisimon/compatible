import { create } from 'zustand';
import { Note, NoteTemplate } from '../types/note';

interface NoteStore {
  notes: Note[];
  templates: NoteTemplate[];
  selectedNoteId: string | null;

  // Note actions
  addNote: (note: Note) => void;
  updateNote: (noteId: string, updates: Partial<Note>) => void;
  deleteNote: (noteId: string) => void;
  replyToNote: (parentNoteId: string, reply: Omit<Note, 'id' | 'parentId'>) => void;

  // Template actions
  addTemplate: (template: NoteTemplate) => void;
  updateTemplate: (templateId: string, updates: Partial<NoteTemplate>) => void;
  deleteTemplate: (templateId: string) => void;

  // Selection actions
  setSelectedNote: (noteId: string | null) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  templates: [
    {
      id: 'template-1',
      name: 'Strategy Meeting Notes',
      category: 'strategy',
      content: '## Meeting Objectives\n\n## Key Discussion Points\n\n## Action Items\n\n## Next Steps',
      tags: ['meeting', 'strategy'],
    },
    {
      id: 'template-2',
      name: 'Issue Report',
      category: 'issue',
      content: '## Issue Description\n\n## Impact\n\n## Proposed Solution\n\n## Timeline',
      tags: ['issue', 'support'],
    },
  ],
  selectedNoteId: null,

  addNote: (note) =>
    set((state) => ({ notes: [...state.notes, note] })),

  updateNote: (noteId, updates) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === noteId ? { ...note, ...updates, updatedAt: new Date() } : note
      ),
    })),

  deleteNote: (noteId) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== noteId && n.parentId !== noteId),
    })),

  replyToNote: (parentNoteId, reply) =>
    set((state) => ({
      notes: [
        ...state.notes,
        {
          ...reply,
          id: String(Date.now()),
          parentId: parentNoteId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })),

  addTemplate: (template) =>
    set((state) => ({ templates: [...state.templates, template] })),

  updateTemplate: (templateId, updates) =>
    set((state) => ({
      templates: state.templates.map((template) =>
        template.id === templateId ? { ...template, ...updates } : template
      ),
    })),

  deleteTemplate: (templateId) =>
    set((state) => ({
      templates: state.templates.filter((t) => t.id !== templateId),
    })),

  setSelectedNote: (noteId) =>
    set({ selectedNoteId: noteId }),
}));