import React from 'react';
import { useNoteStore } from '../../store/noteStore';
import { Button } from '../ui/Button';
import { formatDate } from '../../lib/utils';
import { AddNoteModal } from './AddNoteModal';

interface NoteThreadProps {
  noteId: string;
  onClose: () => void;
}

export function NoteThread({ noteId, onClose }: NoteThreadProps) {
  const [showReply, setShowReply] = React.useState(false);
  
  const mainNote = useNoteStore((state) =>
    state.notes.find((note) => note.id === noteId)
  );
  
  const replies = useNoteStore((state) =>
    state.notes.filter((note) => note.parentId === noteId)
  );

  if (!mainNote) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
            <div className="space-y-4">
              {/* Main note */}
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                      <span className="text-sm font-medium text-blue-600">
                        {mainNote.author.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {mainNote.author.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(mainNote.createdAt)}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {mainNote.category}
                  </span>
                </div>

                <div className="mt-4">
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: mainNote.content }}
                  />
                </div>

                {mainNote.attachments.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-900">
                      Attachments
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {mainNote.attachments.map((attachment) => (
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
              </div>

              {/* Replies */}
              <div className="space-y-4 pl-8">
                {replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                        <span className="text-sm font-medium text-gray-600">
                          {reply.author.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {reply.author.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(reply.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: reply.content }}
                      />
                    </div>

                    {reply.attachments.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-900">
                          Attachments
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {reply.attachments.map((attachment) => (
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
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <Button onClick={() => setShowReply(true)} className="sm:ml-3">
              Reply
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>

      {showReply && (
        <AddNoteModal
          clientId={mainNote.clientId}
          parentId={noteId}
          onClose={() => setShowReply(false)}
        />
      )}
    </div>
  );
}