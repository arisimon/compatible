import React from 'react';
import { ArrowLeft, Star, Trash2, Reply, Forward } from 'lucide-react';
import { Button } from '../ui/Button';
import { Message } from '../../types/message';

interface MessageDetailProps {
  message: Message;
  onBack: () => void;
}

export function MessageDetail({ message, onBack }: MessageDetailProps) {
  return (
    <div className="flex h-full flex-col rounded-lg bg-white shadow">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center text-sm font-medium text-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Inbox
          </button>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Star className="mr-2 h-4 w-4" />
              Star
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">{message.subject}</h1>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{message.sender.name}</p>
              <p className="text-sm text-gray-500">{message.sender.email}</p>
            </div>
            <p className="text-sm text-gray-500">{message.timestamp}</p>
          </div>
        </div>

        <div className="prose max-w-none">
          <p>{message.content}</p>
        </div>

        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-medium text-gray-900">Attachments</h2>
            <ul className="mt-2 divide-y divide-gray-200">
              {message.attachments.map((attachment) => (
                <li key={attachment.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">{attachment.name}</span>
                    <span className="ml-2 text-sm text-gray-500">({attachment.size})</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-4">
          <Button className="flex-1">
            <Reply className="mr-2 h-4 w-4" />
            Reply
          </Button>
          <Button variant="outline">
            <Forward className="mr-2 h-4 w-4" />
            Forward
          </Button>
        </div>
      </div>
    </div>
  );
}