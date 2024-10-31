import React from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { Client } from '../../types/client';
import { cn } from '../../lib/utils';

interface ClientHealthProps {
  client: Client;
}

export function ClientHealth({ client }: ClientHealthProps) {
  const metrics = [
    {
      name: 'Engagement Score',
      value: client.metrics.engagementScore,
      target: 80,
      format: (v: number) => `${v}%`,
    },
    {
      name: 'Response Rate',
      value: client.metrics.responseRate,
      target: 90,
      format: (v: number) => `${v}%`,
    },
    {
      name: 'Project Success',
      value: client.metrics.projectSuccessRate,
      target: 85,
      format: (v: number) => `${v}%`,
    },
    {
      name: 'Retention Probability',
      value: client.metrics.retentionProbability,
      target: 90,
      format: (v: number) => `${v}%`,
    },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Client Health</h2>
        <span
          className={cn(
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
            {
              'bg-green-100 text-green-800': client.metrics.riskLevel === 'low',
              'bg-yellow-100 text-yellow-800': client.metrics.riskLevel === 'medium',
              'bg-red-100 text-red-800': client.metrics.riskLevel === 'high',
            }
          )}
        >
          {client.metrics.riskLevel === 'low' ? (
            <TrendingUp className="mr-1 h-3 w-3" />
          ) : (
            <AlertTriangle className="mr-1 h-3 w-3" />
          )}
          {client.metrics.riskLevel.toUpperCase()} RISK
        </span>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {metrics.map((metric) => (
          <div key={metric.name}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">{metric.name}</p>
              <p className="text-sm font-medium text-gray-900">
                {metric.format(metric.value)}
              </p>
            </div>
            <div className="mt-2">
              <div className="relative h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className={cn('absolute h-full rounded-full', {
                    'bg-green-500': metric.value >= metric.target,
                    'bg-yellow-500':
                      metric.value >= metric.target * 0.8 &&
                      metric.value < metric.target,
                    'bg-red-500': metric.value < metric.target * 0.8,
                  })}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}