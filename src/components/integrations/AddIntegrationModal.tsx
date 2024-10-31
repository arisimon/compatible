import React from 'react';
import { Button } from '../ui/Button';
import { useIntegrationStore } from '../../store/integrationStore';
import { IntegrationType } from '../../types/integration';

interface AddIntegrationModalProps {
  onClose: () => void;
}

export function AddIntegrationModal({ onClose }: AddIntegrationModalProps) {
  const [formData, setFormData] = React.useState({
    type: '' as IntegrationType,
    provider: '',
    credentials: {
      accessToken: '',
      refreshToken: '',
      scopes: [] as string[],
    },
    settings: {},
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    useIntegrationStore.getState().addConfiguration({
      id: String(Date.now()),
      ...formData,
      status: 'active',
      metadata: {
        lastSync: new Date(),
        usage: {
          requests: 0,
          quota: 1000,
          resetDate: new Date(),
        },
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Add Integration
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Integration Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value as IntegrationType })
                      }
                      className="mt-1"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="analytics">Analytics</option>
                      <option value="social">Social Media</option>
                      <option value="email">Email Marketing</option>
                      <option value="crm">CRM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Provider
                    </label>
                    <input
                      type="text"
                      value={formData.provider}
                      onChange={(e) =>
                        setFormData({ ...formData, provider: e.target.value })
                      }
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Access Token
                    </label>
                    <input
                      type="password"
                      value={formData.credentials.accessToken}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          credentials: {
                            ...formData.credentials,
                            accessToken: e.target.value,
                          },
                        })
                      }
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Refresh Token
                    </label>
                    <input
                      type="password"
                      value={formData.credentials.refreshToken}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          credentials: {
                            ...formData.credentials,
                            refreshToken: e.target.value,
                          },
                        })
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Scopes
                    </label>
                    <input
                      type="text"
                      placeholder="Enter scopes separated by commas"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          credentials: {
                            ...formData.credentials,
                            scopes: e.target.value.split(',').map((s) => s.trim()),
                          },
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Button type="submit" className="sm:ml-3">
                Add Integration
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