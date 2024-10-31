import React from 'react';
import { Button } from '../ui/Button';
import { useClientStore } from '../../store/clientStore';
import { useSalesStore } from '../../store/salesStore';
import { useNavigate } from 'react-router-dom';

interface ConvertToClientModalProps {
  dealId: string;
  onClose: () => void;
}

export function ConvertToClientModal({ dealId, onClose }: ConvertToClientModalProps) {
  const navigate = useNavigate();
  const deal = useSalesStore((state) => 
    state.deals.find((d) => d.id === dealId)
  );

  const [formData, setFormData] = React.useState({
    industry: '',
    size: '',
    location: {
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      timezone: 'UTC',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deal) return;

    // Create new client
    const newClient = {
      id: String(Date.now()),
      name: deal.name,
      industry: formData.industry,
      size: formData.size,
      location: formData.location,
      status: 'active' as const,
      tags: deal.tags,
      contacts: [],
      servicePackages: [
        {
          id: String(Date.now()),
          name: 'Initial Package',
          features: [],
          startDate: new Date(),
          endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          status: 'active' as const,
          value: deal.value,
          currency: deal.currency,
        },
      ],
      customFields: {},
      activities: [],
      metrics: {
        engagementScore: 0,
        responseRate: 0,
        projectSuccessRate: 0,
        retentionProbability: 0,
        riskLevel: 'low' as const,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add client and update deal
    useClientStore.getState().addClient(newClient);
    useSalesStore.getState().updateDeal(dealId, {
      stage: 'closed_won',
      actualCloseDate: new Date(),
    });

    // Navigate to client onboarding
    navigate(`/onboarding?clientId=${newClient.id}`);
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
                  Convert Deal to Client
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Please provide additional information to set up the client account.
                </p>

                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Industry
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) =>
                        setFormData({ ...formData, industry: e.target.value })
                      }
                      className="mt-1"
                      required
                    >
                      <option value="">Select Industry</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
                      <option value="retail">Retail</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="services">Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Company Size
                    </label>
                    <select
                      value={formData.size}
                      onChange={(e) =>
                        setFormData({ ...formData, size: e.target.value })
                      }
                      className="mt-1"
                      required
                    >
                      <option value="">Select Size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501+">501+ employees</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      value={formData.location.address}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          location: { ...formData.location, address: e.target.value },
                        })
                      }
                      className="mt-1"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.location.city}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            location: { ...formData.location, city: e.target.value },
                          })
                        }
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        State/Province
                      </label>
                      <input
                        type="text"
                        value={formData.location.state}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            location: { ...formData.location, state: e.target.value },
                          })
                        }
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={formData.location.postalCode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            location: { ...formData.location, postalCode: e.target.value },
                          })
                        }
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <input
                        type="text"
                        value={formData.location.country}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            location: { ...formData.location, country: e.target.value },
                          })
                        }
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Button type="submit" className="sm:ml-3">
                Convert to Client
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