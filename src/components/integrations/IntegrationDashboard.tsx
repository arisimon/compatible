import React from 'react';
import { useIntegrationStore } from '../../store/integrationStore';
import { Button } from '../ui/Button';
import { Link2, AlertCircle, RefreshCw, Settings, PlusCircle } from 'lucide-react';
import { cn, formatDate } from '../../lib/utils';
import { AddIntegrationModal } from './AddIntegrationModal';
import { IntegrationSettings } from './IntegrationSettings';

export function IntegrationDashboard() {
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [selectedIntegration, setSelectedIntegration] = React.useState<string | null>(null);
  
  const integrations = useIntegrationStore((state) => state.configurations);
  const accounts = useIntegrationStore((state) => state.accounts);

  const handleRefreshToken = (integrationId: string) => {
    // Handle token refresh
    useIntegrationStore.getState().updateIntegrationStatus(integrationId, 'active');
  };

  const handleRemoveIntegration = (integrationId: string) => {
    useIntegrationStore.getState().removeConfiguration(integrationId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Integrations</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your connected platforms and services
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Integration
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => {
          const connectedAccounts = accounts.filter(
            (acc) => acc.integrationId === integration.id
          );

          return (
            <div
              key={integration.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Link2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {integration.provider}
                    </h3>
                    <p className="text-sm text-gray-500">{integration.type}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                    {
                      'bg-green-100 text-green-800': integration.status === 'active',
                      'bg-red-100 text-red-800': integration.status === 'error',
                      'bg-yellow-100 text-yellow-800': integration.status === 'expired',
                    }
                  )}
                >
                  {integration.status === 'error' && (
                    <AlertCircle className="mr-1 h-3 w-3" />
                  )}
                  {integration.status}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Connected Accounts</span>
                  <span className="font-medium text-gray-900">
                    {connectedAccounts.length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Last Sync</span>
                  <span className="font-medium text-gray-900">
                    {integration.metadata.lastSync
                      ? formatDate(integration.metadata.lastSync)
                      : 'Never'}
                  </span>
                </div>
                {integration.metadata.usage && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">API Usage</span>
                    <span className="font-medium text-gray-900">
                      {integration.metadata.usage.requests}/{integration.metadata.usage.quota}
                    </span>
                  </div>
                )}
              </div>

              {integration.status === 'error' && integration.metadata.errorMessage && (
                <div className="mt-4 rounded-md bg-red-50 p-3">
                  <p className="text-sm text-red-700">
                    {integration.metadata.errorMessage}
                  </p>
                </div>
              )}

              <div className="mt-6 flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedIntegration(integration.id)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Configure
                </Button>
                {integration.status === 'expired' && (
                  <Button
                    size="sm"
                    onClick={() => handleRefreshToken(integration.id)}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Token
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <AddIntegrationModal onClose={() => setShowAddModal(false)} />
      )}

      {selectedIntegration && (
        <IntegrationSettings
          integrationId={selectedIntegration}
          onClose={() => setSelectedIntegration(null)}
        />
      )}
    </div>
  );
}