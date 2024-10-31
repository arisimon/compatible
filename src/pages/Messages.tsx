import React from 'react';
import { Button } from '../components/ui/Button';
import { Plus } from 'lucide-react';
import { ComposeMessage } from '../components/communication/ComposeMessage';

export function Messages() {
  const [showCompose, setShowCompose] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
        <Button onClick={() => setShowCompose(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Compose
        </Button>
      </div>

      <div className="text-center text-gray-500">
        <p>Messages functionality has been removed in favor of client-specific communication.</p>
        <p>Please use the communication section in each client's profile.</p>
      </div>

      {showCompose && <ComposeMessage onClose={() => setShowCompose(false)} />}
    </div>
  );
}