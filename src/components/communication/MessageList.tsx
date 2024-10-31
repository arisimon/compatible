import React from 'react';
import { Search, Star, Archive, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Message } from '../../types/message';
import { Button } from '../ui/Button';

interface MessageListProps {
  messages: Message[];
  onMessageSelect: (messageId: number) => void;
}

export function MessageList({ messages, onMessageSelect }: MessageListProps) {
  return (
    <div className="flex h-full flex-col rounded-lg bg-white shadow">
      {/* Message List Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full rounded-md border-gray-300 pl-10 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Message Actions */}
      <div className="border-b border-gray-200 p-2">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Star className="mr-2 h-4 w-4" />
            Star
          </Button>
          <Button variant="outline" size="sm">
            <Archive className="mr-2 h-4 w-4" />
            Archive
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-auto">
        <div className="divide-y divide-gray-200">
          {messages.map((message) => (
            <div
              key={message.id}
              onClick={() => onMessageSelect(message.id)}
              className={cn(
                'cursor-pointer p-4 transition-colors hover:bg-gray-50',
                message.isUnread && 'bg-blue-50'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <span className="text-sm font-medium text-gray-600">
                        {message.sender.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p
                        className={cn(
                          'truncate text-sm',
                          message.isUnread ? 'font-semibold text-gray-900' : 'text-gray-700'
                        )}
                      >
                        {message.sender.name}
                      </p>
                      <p className="text-sm text-gray-500">{message.timestamp}</p>
                    </div>
                    <p
                      className={cn(
                        'mt-1 truncate text-sm',
                        message.isUnread ? 'font-semibold text-gray-900' : 'text-gray-700'
                      )}
                    >
                      {message.subject}
                    </p>
                    <p className="mt-1 truncate text-sm text-gray-500">
                      {message.preview}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}