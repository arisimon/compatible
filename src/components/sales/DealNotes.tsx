import React from 'react';
import { useSalesStore } from '../../store/salesStore';
import { Button } from '../ui/Button';
import { formatDate } from '../../lib/utils';
import { Plus, MessageSquare } from 'lucide-react';

interface DealNotesProps {
  dealId: string;
}

export function DealNotes({ dealId }: DealNotesProps) {
  const [showAddNote, setShowAddNote] = React.useState(false);
  const [newNote, setNewNote] = React.useState('');
  const deal = useSalesStore((state) => 
    state.deals.find((d) => d.id === dealId)
  );

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deal) return;

    useSalesStore.getState().updateDeal(dealId, {
      notes: deal.notes + (deal.notes ? '\n\n' : '') + newNote,
    });
    setShowAddNote(false);
    setNewNote('');
  };

  if (!deal) return null;

  const notes = deal.notes.split('\n\n').filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Notes</h3>
        <Button onClick={() => setShowAddNote(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Note
        </Button>
      </div>

      {showAddNote && (
        <form onSubmit={handleAddNote} className="space-y-4 rounded-lg border border-gray-200 p-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Note
            </label>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={4}
              className="mt-1"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddNote(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Note</Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {notes.map((note, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">
                Added on {formatDate(new Date())}
              </span>
            </div>
            <p className="mt-2 whitespace-pre-wrap text-sm text-gray-900">
              {note}
            </p>
          </div>
        ))}

        {notes.length === 0 && (
          <div className="text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No notes</h3>
            <p className="mt-1 text-sm text-gray-500">
              Add notes to keep track of important information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}