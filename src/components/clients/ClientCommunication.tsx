import React from 'react';
import { MessageSquare, Phone, Video, Mail } from 'lucide-react';
import { useCommunicationStore } from '../../store/communicationStore';
import { Button } from '../ui/Button';
import { formatDate } from '../../lib/utils';

interface ClientCommunicationProps {
  clientId: string;
}

export function ClientCommunication({ clientId }: ClientCommunicationProps) {
  const communications = useCommunicationStore((state) => 
    state.getCommunicationsByClient(clientId)
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'chat':
        return <MessageSquare className="h-4 w-4" />;
      case 'call':
        return <Phone className="h-4 w-4" />;
      case 'meeting':
        return <Video className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Communication History</h2>
        <Button size="sm">
          <MessageSquare className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>

      <div className="space-y-4">
        {communications.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No communications yet</p>
        ) : (
          communications.map((comm) => (
            <div
              key={comm.id}
              className="flex items-start space-x-3 rounded-md border border-gray-200 p-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
                {getIcon(comm.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{comm.subject}</p>
                  <span className="text-xs text-gray-500">
                    {formatDate(comm.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{comm.content}</p>
                {comm.attachments.length > 0 && (
                  <div className="flex items-center space-x-2">
                    {comm.attachments.map((attachment, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                      >
                        {attachment}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}