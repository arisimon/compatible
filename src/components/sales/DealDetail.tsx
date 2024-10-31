import React from 'react';
import { useSalesStore } from '../../store/salesStore';
import { Button } from '../ui/Button';
import { formatDate } from '../../lib/utils';
import { DealActivities } from './DealActivities';
import { ProposalList } from './ProposalList';
import { DealNotes } from './DealNotes';
import { ConvertToClientModal } from './ConvertToClientModal';
import {
  DollarSign,
  Calendar,
  User,
  BarChart2,
  FileText,
  MessageSquare,
  UserPlus,
} from 'lucide-react';

interface DealDetailProps {
  dealId: string;
  onClose: () => void;
}

export function DealDetail({ dealId, onClose }: DealDetailProps) {
  const deal = useSalesStore((state) => 
    state.deals.find((d) => d.id === dealId)
  );

  const [activeTab, setActiveTab] = React.useState<'activities' | 'proposals' | 'notes'>('activities');
  const [showConvertModal, setShowConvertModal] = React.useState(false);

  if (!deal) return null;

  const canConvertToClient = deal.stage === 'negotiation' || deal.stage === 'proposal';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:align-middle">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {deal.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Created on {formatDate(deal.createdAt)}
                  </p>
                </div>
                <div className="flex space-x-3">
                  {canConvertToClient && (
                    <Button onClick={() => setShowConvertModal(true)}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Convert to Client
                    </Button>
                  )}
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <DollarSign className="h-4 w-4" />
                    <span>Deal Value</span>
                  </div>
                  <p className="mt-1 text-xl font-semibold text-gray-900">
                    {deal.value.toLocaleString()} {deal.currency}
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <BarChart2 className="h-4 w-4" />
                    <span>Probability</span>
                  </div>
                  <p className="mt-1 text-xl font-semibold text-gray-900">
                    {deal.probability}%
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>Expected Close</span>
                  </div>
                  <p className="mt-1 text-xl font-semibold text-gray-900">
                    {formatDate(deal.expectedCloseDate)}
                  </p>
                </div>
              </div>

              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('activities')}
                    className={`flex items-center px-1 py-4 text-sm font-medium ${
                      activeTab === 'activities'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Activities
                  </button>
                  <button
                    onClick={() => setActiveTab('proposals')}
                    className={`flex items-center px-1 py-4 text-sm font-medium ${
                      activeTab === 'proposals'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Proposals
                  </button>
                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`flex items-center px-1 py-4 text-sm font-medium ${
                      activeTab === 'notes'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Notes
                  </button>
                </nav>
              </div>

              <div className="mt-6">
                {activeTab === 'activities' && <DealActivities dealId={dealId} />}
                {activeTab === 'proposals' && <ProposalList dealId={dealId} />}
                {activeTab === 'notes' && <DealNotes dealId={dealId} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showConvertModal && (
        <ConvertToClientModal
          dealId={dealId}
          onClose={() => setShowConvertModal(false)}
        />
      )}
    </div>
  );
}