import React from 'react';
import { Client } from '../../types/client';
import { cn } from '../../lib/utils';

interface ClientOverviewProps {
  clients: Client[];
}

export function ClientOverview({ clients }: ClientOverviewProps) {
  const activeClients = clients.filter((client) => client.status === 'active');
  const recentClients = activeClients.slice(0, 5);

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Active Clients</h2>
        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800">
          {activeClients.length} total
        </span>
      </div>
      <div className="mt-6 flow-root">
        <ul className="-my-5 divide-y divide-gray-200">
          {recentClients.map((client) => (
            <li key={client.id} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <span className="text-lg font-medium leading-none text-blue-700">
                      {client.name.charAt(0)}
                    </span>
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {client.name}
                  </p>
                  <p className="truncate text-sm text-gray-500">{client.industry}</p>
                </div>
                <div>
                  <span
                    className={cn(
                      'inline-flex rounded-full px-2 text-xs font-semibold leading-5',
                      {
                        'bg-green-100 text-green-800': client.metrics.riskLevel === 'low',
                        'bg-yellow-100 text-yellow-800':
                          client.metrics.riskLevel === 'medium',
                        'bg-red-100 text-red-800': client.metrics.riskLevel === 'high',
                      }
                    )}
                  >
                    {client.metrics.riskLevel}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}