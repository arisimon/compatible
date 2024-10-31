import React from 'react';
import { Button } from '../ui/Button';

export function NotificationSettings() {
  const [notifications, setNotifications] = React.useState({
    email: {
      marketing: true,
      updates: true,
      clientMessages: true,
    },
    push: {
      newClients: true,
      campaignUpdates: false,
      taskReminders: true,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Notification settings updated:', notifications);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Notification Preferences</h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose how you want to be notified about updates and activities.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
          <div className="mt-4 space-y-4">
            {Object.entries(notifications.email).map(([key, value]) => (
              <div key={key} className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id={`email-${key}`}
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        email: { ...notifications.email, [key]: e.target.checked },
                      })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor={`email-${key}`} className="text-sm font-medium text-gray-700">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900">Push Notifications</h3>
          <div className="mt-4 space-y-4">
            {Object.entries(notifications.push).map(([key, value]) => (
              <div key={key} className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id={`push-${key}`}
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        push: { ...notifications.push, [key]: e.target.checked },
                      })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor={`push-${key}`} className="text-sm font-medium text-gray-700">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline">Reset</Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}