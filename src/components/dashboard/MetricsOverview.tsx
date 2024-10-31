import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Metric {
  name: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  description: string;
}

interface MetricsOverviewProps {
  metrics: Metric[];
}

export function MetricsOverview({ metrics }: MetricsOverviewProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.name}
          className="relative overflow-hidden rounded-lg bg-white p-6 shadow"
        >
          <div>
            <p className="text-sm font-medium text-gray-500">{metric.name}</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{metric.value}</p>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              {metric.changeType === 'positive' ? (
                <ArrowUp className="h-4 w-4 text-green-500" />
              ) : metric.changeType === 'negative' ? (
                <ArrowDown className="h-4 w-4 text-red-500" />
              ) : null}
              <span
                className={cn('ml-2 text-sm font-medium', {
                  'text-green-500': metric.changeType === 'positive',
                  'text-red-500': metric.changeType === 'negative',
                  'text-gray-500': metric.changeType === 'neutral',
                })}
              >
                {metric.change}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">{metric.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}