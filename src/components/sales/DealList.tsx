import React from 'react';
import { useSalesStore } from '../../store/salesStore';
import { Button } from '../ui/Button';
import { DealDetail } from './DealDetail';
import { formatDate, cn } from '../../lib/utils';
import { DollarSign, Calendar, User, Tag } from 'lucide-react';

export function DealList() {
  const [selectedDeal, setSelectedDeal] = React.useState<string | null>(null);
  const deals = useSalesStore((state) => state.deals);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'lead':
        return 'bg-gray-100 text-gray-800';
      case 'qualified':
        return 'bg-blue-100 text-blue-800';
      case 'proposal':
        return 'bg-yellow-100 text-yellow-800';
      case 'negotiation':
        return 'bg-purple-100 text-purple-800';
      case 'closed_won':
        return 'bg-green-100 text-green-800';
      case 'closed_lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="rounded-lg bg-white shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Deal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Stage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Probability
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Expected Close
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Owner
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {deals.map((deal) => (
              <tr key={deal.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {deal.name}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        {deal.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                          >
                            <Tag className="mr-1 h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={cn(
                      'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
                      getStageColor(deal.stage)
                    )}
                  >
                    {deal.stage.replace('_', ' ').toUpperCase()}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center text-sm text-gray-900">
                    <DollarSign className="mr-1 h-4 w-4 text-gray-400" />
                    {deal.value.toLocaleString()} {deal.currency}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-900">{deal.probability}%</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center text-sm text-gray-900">
                    <Calendar className="mr-1 h-4 w-4 text-gray-400" />
                    {formatDate(deal.expectedCloseDate)}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center text-sm text-gray-900">
                    <User className="mr-1 h-4 w-4 text-gray-400" />
                    {deal.assignedTo}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDeal(deal.id)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedDeal && (
        <DealDetail
          dealId={selectedDeal}
          onClose={() => setSelectedDeal(null)}
        />
      )}
    </div>
  );
}