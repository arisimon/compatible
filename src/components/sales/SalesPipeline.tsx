import React from 'react';
import { useSalesStore } from '../../store/salesStore';
import { DealStage } from '../../types/sales';
import { cn } from '../../lib/utils';

const stages: { id: DealStage; name: string }[] = [
  { id: 'lead', name: 'Lead' },
  { id: 'qualified', name: 'Qualified' },
  { id: 'proposal', name: 'Proposal' },
  { id: 'negotiation', name: 'Negotiation' },
  { id: 'closed_won', name: 'Won' },
  { id: 'closed_lost', name: 'Lost' },
];

export function SalesPipeline() {
  const deals = useSalesStore((state) => state.deals);
  const getDealsByStage = useSalesStore((state) => state.getDealsByStage);

  const calculateStageValue = (stage: DealStage) => {
    return getDealsByStage(stage).reduce((sum, deal) => sum + deal.value, 0);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-lg font-medium text-gray-900">Pipeline Overview</h2>
      
      <div className="mt-4 space-y-4">
        {stages.map((stage) => {
          const stageDeals = getDealsByStage(stage.id);
          const stageValue = calculateStageValue(stage.id);
          const progress = (stageDeals.length / deals.length) * 100 || 0;

          return (
            <div key={stage.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                  {stage.name}
                </span>
                <span className="text-sm text-gray-500">
                  {stageDeals.length} deals · ${stageValue.toLocaleString()}
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className={cn('h-full rounded-full', {
                    'bg-green-500': stage.id === 'closed_won',
                    'bg-red-500': stage.id === 'closed_lost',
                    'bg-blue-500': !['closed_won', 'closed_lost'].includes(stage.id),
                  })}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-sm font-medium text-gray-500">Total Pipeline Value</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              ${deals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-sm font-medium text-gray-500">Win Rate</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {Math.round(
                (getDealsByStage('closed_won').length /
                  (getDealsByStage('closed_won').length +
                    getDealsByStage('closed_lost').length)) *
                  100 || 0
              )}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}