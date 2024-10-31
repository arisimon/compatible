import React from 'react';
import { Button } from '../ui/Button';
import { useIntegrationStore } from '../../store/integrationStore';
import { AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';
import { formatDate } from '../../lib/utils';

interface IntegrationSettingsProps {
  integrationId: string;
  onClose: () => void;
}

export function IntegrationSettings({ integrationId, onClose }: IntegrationSettingsProps) {
  const integration = useIntegrationStore((state) =>
    state.configurations.find((config) => config.id === integrationId)
  );

  const accounts = useIntegrationStore((state) =>
    state.accounts.filter((acc) => acc.integrationId === integrationId)
  );

  if (!integration) return null;

  const handleRemoveIntegration = () => {
    useIntegrationStore.getState().removeConfiguration(integrationId);
    onClose();
  };

  const handleRefreshToken = () => {
    useIntegrationStore.getState().updateIntegrationStatus(integrationId, 'active');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {integration.provider} Integration Settings
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your integration settings and connected accounts
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <h4 className="text-sm font-medium text-gray-900">Status</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Current Status</span>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        integration.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : integration.status === 'error'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {integration.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Last Sync</span>
                    <span className="text-gray-900">
                      {integration.metadata.lastSync
                        ? formatDate(integration.metadata.lastSync)
                        : 'Never'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <h4 className="text-sm font-medium text-gray-900">API Usage</h4>
                <div className="mt-2 space-y-2">
                  {integration.metadata.usage && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Requests</span>
                        <span className="text-gray-900">
                          {integration.metadata.usage.requests}/
                          {integration.metadata.usage.quota}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Reset Date</span>
                        <span className="text-gray-900">
                          {formatDate(integration.metadata.usage.resetDate)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <h4 className="text-sm font-medium text-gray-900">Connected Accounts</h4>
                <div className="mt-2 space-y-2">
                  {accounts.map((account) => (
                    <div
                      key={account.id}
                      className="flex items-center justify-between rounded-md bg-gray-50 p-2 text-sm"
                    >
                      <span className="font-medium text-gray-900">
                        {account.name}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          account.status === 'connected'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {account.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {integration.status === 'error' && integration.metadata.errorMessage && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Integration Error
                      </h3>
                      <p className="mt-2 text-sm text-red-700">
                        {integration.metadata.errorMessage}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <Button
              type="button"
              variant="outline"
              className="sm:ml-3"
              onClick={handleRefreshToken}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Token
            </Button>
            <Button
              type="button"
              variant="outline"
              className="sm:ml-3"
              onClick={handleRemoveIntegration}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Integration
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}