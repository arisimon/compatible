import React from 'react';
import { useSalesStore } from '../../store/salesStore';
import { Button } from '../ui/Button';
import { formatDate } from '../../lib/utils';
import { Plus, Phone, Mail, Calendar, CheckCircle, Clock } from 'lucide-react';

interface DealActivitiesProps {
  dealId: string;
}

export function DealActivities({ dealId }: DealActivitiesProps) {
  const [showAddActivity, setShowAddActivity] = React.useState(false);
  const [newActivity, setNewActivity] = React.useState({
    type: 'call' as const,
    description: '',
    scheduledAt: '',
  });

  const activities = useSalesStore((state) =>
    state.activities.filter((a) => a.dealId === dealId)
  );

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    useSalesStore.getState().addActivity({
      id: String(Date.now()),
      dealId,
      ...newActivity,
      scheduledAt: new Date(newActivity.scheduledAt),
      assignedTo: 'current-user', // Replace with actual user ID
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setShowAddActivity(false);
    setNewActivity({ type: 'call', description: '', scheduledAt: '' });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone className="h-5 w-5 text-blue-500" />;
      case 'email':
        return <Mail className="h-5 w-5 text-green-500" />;
      case 'meeting':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Activities</h3>
        <Button onClick={() => setShowAddActivity(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Activity
        </Button>
      </div>

      {showAddActivity && (
        <form onSubmit={handleAddActivity} className="space-y-4 rounded-lg border border-gray-200 p-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              value={newActivity.type}
              onChange={(e) =>
                setNewActivity({ ...newActivity, type: e.target.value as any })
              }
              className="mt-1"
              required
            >
              <option value="call">Call</option>
              <option value="email">Email</option>
              <option value="meeting">Meeting</option>
              <option value="task">Task</option>
              <option value="note">Note</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={newActivity.description}
              onChange={(e) =>
                setNewActivity({ ...newActivity, description: e.target.value })
              }
              rows={3}
              className="mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Scheduled For
            </label>
            <input
              type="datetime-local"
              value={newActivity.scheduledAt}
              onChange={(e) =>
                setNewActivity({ ...newActivity, scheduledAt: e.target.value })
              }
              className="mt-1"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddActivity(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Activity</Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex space-x-4 rounded-lg border border-gray-200 p-4"
          >
            <div className="flex-shrink-0">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900">
                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                </h4>
                {activity.completedAt ? (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Completed
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    <Clock className="mr-1 h-3 w-3" />
                    Scheduled
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">{activity.description}</p>
              <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                <span>Scheduled: {formatDate(activity.scheduledAt)}</span>
                {activity.completedAt && (
                  <span>Completed: {formatDate(activity.completedAt)}</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {activities.length === 0 && (
          <div className="text-center">
            <Clock className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No activities</h3>
            <p className="mt-1 text-sm text-gray-500">
              Add activities to track your interactions with this deal.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}