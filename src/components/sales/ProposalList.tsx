import React from 'react';
import { useSalesStore } from '../../store/salesStore';
import { Button } from '../ui/Button';
import { formatDate } from '../../lib/utils';
import { FileText, Download, Send } from 'lucide-react';
import { ProposalForm } from './ProposalForm';

interface ProposalListProps {
  dealId: string;
}

export function ProposalList({ dealId }: ProposalListProps) {
  const [showAddProposal, setShowAddProposal] = React.useState(false);
  const proposals = useSalesStore((state) =>
    state.proposals.filter((p) => p.dealId === dealId)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Proposals</h3>
        <Button onClick={() => setShowAddProposal(true)}>
          <FileText className="mr-2 h-4 w-4" />
          Create Proposal
        </Button>
      </div>

      <div className="space-y-4">
        {proposals.map((proposal) => (
          <div
            key={proposal.id}
            className="rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  Proposal v{proposal.version}
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  Created on {formatDate(proposal.createdAt)}
                </p>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                  proposal.status
                )}`}
              >
                {proposal.status.toUpperCase()}
              </span>
            </div>

            <div className="mt-4">
              <div className="text-sm text-gray-500">
                <p>Total Value: ${proposal.totalValue.toLocaleString()}</p>
                <p>Valid Until: {formatDate(proposal.content.validUntil)}</p>
              </div>
            </div>

            <div className="mt-4 flex space-x-4">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              {proposal.status === 'draft' && (
                <Button size="sm">
                  <Send className="mr-2 h-4 w-4" />
                  Send to Client
                </Button>
              )}
            </div>
          </div>
        ))}

        {proposals.length === 0 && (
          <div className="text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No proposals yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Create a new proposal to send to the client.
            </p>
          </div>
        )}
      </div>

      {showAddProposal && (
        <ProposalForm
          dealId={dealId}
          onClose={() => setShowAddProposal(false)}
        />
      )}
    </div>
  );
}