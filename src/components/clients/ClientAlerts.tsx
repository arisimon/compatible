import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { cn, formatDate } from '../../lib/utils';

interface ClientAlertsProps {
  clientId: string;
}

export function ClientAlerts({ clientId }: ClientAlertsProps) {
  const alerts = [
    {
      id: '1',
      type: 'warning',
      message: 'Campaign budget threshold reached',
      date: new Date('2024-03-01'),
      status: 'active',
    },
    {
      id: '2',
      type: 'success',
      message: 'Monthly report generated successfully',
      date: new Date('2024-02-29'),
      status: 'resolved',
    },
    {
      id: '3',
      type: 'info',
      message: 'Contract renewal due in 30 days',
      date: new Date('2024-02-28'),
      status: 'active',
    },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Alerts & Notifications</h2>
        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
          {alerts.filter((a) => a.status === 'active').length} Active
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              'rounded-lg border p-4',
              {
                'border-yellow-200 bg-yellow-50': alert.type === 'warning',
                'border-green-200 bg-green-50': alert.type === 'success',
                'border-blue-200 bg-blue-50': alert.type === 'info',
              }
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {alert.type === 'warning' && (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                )}
                {alert.type === 'success' && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {alert.type === 'info' && (
                  <Bell className="h-5 w-5 text-blue-500" />
                )}
                <p className={cn(
                  'ml-3 text-sm font-medium',
                  {
                    'text-yellow-800': alert.type === 'warning',
                    'text-green-800': alert.type === 'success',
                    'text-blue-800': alert.type === 'info',
                  }
                )}>
                  {alert.message}
                </p>
              </div>
              <div className="ml-4 flex flex-shrink-0">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-1 h-4 w-4" />
                  {formatDate(alert.date)}
                </div>
              </div>
            </div>
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="text-center">
            <Bell className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No alerts</h3>
            <p className="mt-1 text-sm text-gray-500">
              You're all caught up! No active alerts or notifications.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}