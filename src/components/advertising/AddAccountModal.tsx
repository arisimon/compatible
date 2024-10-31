import React from 'react';
import { Button } from '../ui/Button';
import { useAdvertisingStore } from '../../store/advertisingStore';
import { advertisingAccountSchema } from '../../types/advertising';
import type { AdvertisingPlatform } from '../../types/advertising';

interface AddAccountModalProps {
  clientId?: string;
  onClose: () => void;
}

export function AddAccountModal({ clientId, onClose }: AddAccountModalProps) {
  const [formData, setFormData] = React.useState({
    platform: '' as AdvertisingPlatform,
    name: '',
    accountId: '',
    credentials: {
      pixelId: '',
      trackingId: '',
      containerId: '',
      conversionId: '',
      apiKey: '',
      clientId: '',
      clientSecret: '',
    },
    settings: {
      currency: 'USD',
      timezone: 'UTC',
      autoTagging: false,
      enhancedConversions: false,
      crossDomainTracking: false,
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data
      advertisingAccountSchema.parse(formData);

      // Add account to store
      useAdvertisingStore.getState().addAccount({
        id: String(Date.now()),
        clientId: clientId || 'global',
        ...formData,
        status: 'pending',
        metadata: {},
      });

      onClose();
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  const renderCredentialFields = () => {
    switch (formData.platform) {
      case 'facebook_ads':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pixel ID
              </label>
              <input
                type="text"
                value={formData.credentials.pixelId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    credentials: {
                      ...formData.credentials,
                      pixelId: e.target.value,
                    },
                  })
                }
                className="mt-1"
                placeholder="123456789012345"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Access Token
              </label>
              <input
                type="password"
                value={formData.credentials.apiKey}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    credentials: {
                      ...formData.credentials,
                      apiKey: e.target.value,
                    },
                  })
                }
                className="mt-1"
              />
            </div>
          </>
        );

      case 'google_ads':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Conversion ID
              </label>
              <input
                type="text"
                value={formData.credentials.conversionId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    credentials: {
                      ...formData.credentials,
                      conversionId: e.target.value,
                    },
                  })
                }
                className="mt-1"
                placeholder="AW-1234567890"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Client ID
              </label>
              <input
                type="text"
                value={formData.credentials.clientId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    credentials: {
                      ...formData.credentials,
                      clientId: e.target.value,
                    },
                  })
                }
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Client Secret
              </label>
              <input
                type="password"
                value={formData.credentials.clientSecret}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    credentials: {
                      ...formData.credentials,
                      clientSecret: e.target.value,
                    },
                  })
                }
                className="mt-1"
              />
            </div>
          </>
        );

      case 'google_analytics':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Measurement ID
            </label>
            <input
              type="text"
              value={formData.credentials.trackingId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  credentials: {
                    ...formData.credentials,
                    trackingId: e.target.value,
                  },
                })
              }
              className="mt-1"
              placeholder="G-XXXXXXXXXX"
            />
          </div>
        );

      case 'google_tag_manager':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Container ID
            </label>
            <input
              type="text"
              value={formData.credentials.containerId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  credentials: {
                    ...formData.credentials,
                    containerId: e.target.value,
                  },
                })
              }
              className="mt-1"
              placeholder="GTM-XXXXXXX"
            />
          </div>
        );

      default:
        return null;
    }
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
                  Add Advertising Account
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Platform
                    </label>
                    <select
                      value={formData.platform}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          platform: e.target.value as AdvertisingPlatform,
                        })
                      }
                      className="mt-1"
                      required
                    >
                      <option value="">Select Platform</option>
                      <option value="facebook_ads">Facebook Ads</option>
                      <option value="google_ads">Google Ads</option>
                      <option value="google_analytics">Google Analytics 4</option>
                      <option value="google_tag_manager">Google Tag Manager</option>
                      <option value="linkedin_ads">LinkedIn Ads</option>
                      <option value="twitter_ads">Twitter Ads</option>
                      <option value="tiktok_ads">TikTok Ads</option>
                      <option value="pinterest_ads">Pinterest Ads</option>
                      <option value="snapchat_ads">Snapchat Ads</option>
                      <option value="bing_ads">Microsoft Ads</option>
                      <option value="trade_desk">The Trade Desk</option>
                      <option value="dv360">Display & Video 360</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Account Name
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
                      Account ID
                    </label>
                    <input
                      type="text"
                      value={formData.accountId}
                      onChange={(e) =>
                        setFormData({ ...formData, accountId: e.target.value })
                      }
                      className="mt-1"
                      required
                    />
                  </div>

                  {renderCredentialFields()}

                  <div className="space-y-4 rounded-lg border border-gray-200 p-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      Advanced Settings
                    </h4>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Currency
                        </label>
                        <select
                          value={formData.settings.currency}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              settings: {
                                ...formData.settings,
                                currency: e.target.value,
                              },
                            })
                          }
                          className="mt-1"
                        >
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="GBP">GBP</option>
                          {/* Add more currencies as needed */}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Timezone
                        </label>
                        <select
                          value={formData.settings.timezone}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              settings: {
                                ...formData.settings,
                                timezone: e.target.value,
                              },
                            })
                          }
                          className="mt-1"
                        >
                          <option value="UTC">UTC</option>
                          <option value="America/New_York">Eastern Time</option>
                          <option value="America/Chicago">Central Time</option>
                          <option value="America/Denver">Mountain Time</option>
                          <option value="America/Los_Angeles">Pacific Time</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {formData.platform.includes('google') && (
                        <>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={formData.settings.autoTagging}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  settings: {
                                    ...formData.settings,
                                    autoTagging: e.target.checked,
                                  },
                                })
                              }
                              className="rounded border-gray-300 text-blue-600"
                            />
                            <span className="text-sm text-gray-700">
                              Enable Auto-Tagging
                            </span>
                          </label>

                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={formData.settings.enhancedConversions}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  settings: {
                                    ...formData.settings,
                                    enhancedConversions: e.target.checked,
                                  },
                                })
                              }
                              className="rounded border-gray-300 text-blue-600"
                            />
                            <span className="text-sm text-gray-700">
                              Enable Enhanced Conversions
                            </span>
                          </label>

                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={formData.settings.crossDomainTracking}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  settings: {
                                    ...formData.settings,
                                    crossDomainTracking: e.target.checked,
                                  },
                                })
                              }
                              className="rounded border-gray-300 text-blue-600"
                            />
                            <span className="text-sm text-gray-700">
                              Enable Cross-Domain Tracking
                            </span>
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Button type="submit" className="sm:ml-3">
                Add Account
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