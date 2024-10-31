import React from 'react';
import { useCommunicationStore } from '../../store/communicationStore';
import { Button } from '../ui/Button';
import { ArrowLeft, Paperclip, Send } from 'lucide-react';
import { formatDate } from '../../lib/utils';

interface MessageThreadProps {
  onBack: () => void;
}

export function MessageThread({ onBack }: MessageThreadProps) {
  const { selectedThreadId, threads } = useCommunicationStore();
  const [replyContent, setReplyContent] = React.useState('');

  const thread = threads.find((t) => t.id === selectedThreadId);
  if (!thread) return null;

  const handleSendReply = () => {
    // Handle sending reply
    console.log('Sending reply:', replyContent);
    setReplyContent('');
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="text-gray-400 hover:text-gray-500"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                {thread.subject}
              </h2>
              <p className="text-sm text-gray-500">
                {thread.participants.length} participants
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6">
          {thread.messages.map((message) => (
            <div key={message.id} className="flex space-x-3">
              <div className="flex-shrink-0">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
                  <span className="text-sm font-medium leading-none text-white">
                    {message.sender.name.charAt(0)}
                  </span>
                </span>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">{message.sender.name}</h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(message.createdAt)}
                  </p>
                </div>
                <div className="prose prose-sm max-w-none text-gray-500">
                  {message.content}
                </div>
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-xs font-medium text-gray-900">
                      Attachments
                    </h4>
                    <div className="mt-2 space-y-1">
                      {message.attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-500"
                        >
                          <Paperclip className="h-4 w-4" />
                          <a href={attachment.url} target="_blank" rel="noreferrer">
                            {attachment.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <textarea
              rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Write your reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-end">
            <Button onClick={handleSendReply}>
              <Send className="mr-2 h-4 w-4" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}