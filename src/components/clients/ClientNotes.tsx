import React from 'react';
import { useNoteStore } from '../../store/noteStore';
import { useTeamStore } from '../../store/teamStore';
import { Button } from '../ui/Button';
import { StickyNote, Plus, Search, Filter } from 'lucide-react';
import { formatDate } from '../../lib/utils';
import { AddNoteModal } from './AddNoteModal';
import { NoteThread } from './NoteThread';

interface ClientNotesProps {
  clientId: string;
}

export function ClientNotes({ clientId }: ClientNotesProps) {
  const [showAddNote, setShowAddNote] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedNote, setSelectedNote] = React.useState<string | null>(null);

  const notes = useNoteStore((state) =>
    state.notes.filter((note) => note.clientId === clientId && !note.parentId)
  );

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Internal Notes</h2>
        <Button onClick={() => setShowAddNote(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Note
        </Button>
      </div>

      <div className="mt-4 flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border-gray-300 pl-10 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-md border-gray-300 text-sm"
        >
          <option value="all">All Categories</option>
          <option value="strategy">Strategy</option>
          <option value="issue">Issues</option>
          <option value="request">Requests</option>
          <option value="general">General</option>
        </select>
      </div>

      <div className="mt-6 space-y-6">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-sm font-medium text-blue-600">
                    {note.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {note.author.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(note.createdAt)}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                {note.category}
              </span>
            </div>

            <div className="mt-4">
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: note.content }}
              />
            </div>

            {note.attachments.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-900">Attachments</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {note.attachments.map((attachment) => (
                    <a
                      key={attachment.id}
                      href={attachment.url}
                      className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800 hover:bg-gray-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {attachment.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {note.mentions.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-900">Mentions</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {note.mentions.map((memberId) => (
                    <span
                      key={memberId}
                      className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                    >
                      @{memberId}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center justify-end space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedNote(note.id)}
              >
                View Thread
              </Button>
            </div>
          </div>
        ))}

        {filteredNotes.length === 0 && (
          <div className="text-center">
            <StickyNote className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No notes</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start by adding a note to track important information.
            </p>
          </div>
        )}
      </div>

      {showAddNote && (
        <AddNoteModal
          clientId={clientId}
          onClose={() => setShowAddNote(false)}
        />
      )}

      {selectedNote && (
        <NoteThread
          noteId={selectedNote}
          onClose={() => setSelectedNote(null)}
        />
      )}
    </div>
  );
}