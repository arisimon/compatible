import React from 'react';
import { Button } from '../ui/Button';
import { useSalesStore } from '../../store/salesStore';
import { useClientStore } from '../../store/clientStore';
import { useTeamStore } from '../../store/teamStore';
import type { DealStage, DealPriority } from '../../types/sales';

interface AddDealModalProps {
  onClose: () => void;
}

export function AddDealModal({ onClose }: AddDealModalProps) {
  const clients = useClientStore((state) => state.clients);
  const teamMembers = useTeamStore((state) => state.members);

  const [formData, setFormData] = React.useState({
    name: '',
    clientId: '',
    value: 0,
    currency: 'USD',
    stage: 'lead' as DealStage,
    priority: 'medium' as DealPriority,
    probability: 0,
    expectedCloseDate: '',
    assignedTo: '',
    notes: '',
    tags: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    useSalesStore.getState().addDeal({
      ...formData,
      id: String(Date.now()),
      activities: [],
      proposals: [],
      customFields: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Add New Deal
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Deal Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Client
                    </label>
                    <select
                      value={formData.clientId}
                      onChange={(e) =>
                        setFormData({ ...formData, clientId: e.target.value })
                      }
                      className="mt-1"
                      required
                    >
                      <option value="">Select Client</option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Value
                      </label>
                      <input
                        type="number"
                        value={formData.value}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            value: Number(e.target.value),
                          })
                        }
                        min="0"
                        step="0.01"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Currency
                      </label>
                      <select
                        value={formData.currency}
                        onChange={(e) =>
                          setFormData({ ...formData, currency: e.target.value })
                        }
                        className="mt-1"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Stage
                      </label>
                      <select
                        value={formData.stage}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            stage: e.target.value as DealStage,
                          })
                        }
                        className="mt-1"
                      >
                        <option value="lead">Lead</option>
                        <option value="qualified">Qualified</option>
                        <option value="proposal">Proposal</option>
                        <option value="negotiation">Negotiation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Priority
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            priority: e.target.value as DealPriority,
                          })
                        }
                        className="mt-1"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Probability (%)
                      </label>
                      <input
                        type="number"
                        value={formData.probability}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            probability: Number(e.target.value),
                          })
                        }
                        min="0"
                        max="100"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Expected Close Date
                      </label>
                      <input
                        type="date"
                        value={formData.expectedCloseDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            expectedCloseDate: e.target.value,
                          })
                        }
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Assigned To
                    </label>
                    <select
                      value={formData.assignedTo}
                      onChange={(e) =>
                        setFormData({ ...formData, assignedTo: e.target.value })
                      }
                      className="mt-1"
                      required
                    >
                      <option value="">Select Team Member</option>
                      {teamMembers.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Button type="submit" className="sm:ml-3">
                Create Deal
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}