import React from 'react';
import { useIntegrationStore } from '../../store/integrationStore';
import { Link2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

interface ClientIntegrationsProps {
  clientId: string;
}

export function ClientIntegrations({ clientId }: ClientIntegrationsProps) {
  const integrations = useIntegrationStore((state) =>
    state.configurations.filter((config) =>
      state.accounts.some((account) => 
        account.integrationId === config.id && 
        account.metadata.clientId === clientId
      )
    )
  );

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Integrations</h2>
        <Button variant="outline" size="sm">
          Add Integration
        </Button>
      </div>

      <div className="mt-6 space-y-4">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-center space-x-3">
              <Link2 className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {integration.provider}
                </p>
                <p className="text-sm text-gray-500">{integration.type}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
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
              <Button variant="outline" size="sm">Configure</Button>
            </div>
          </div>
        ))}

        {integrations.length === 0 && (
          <div className="text-center">
            <Link2 className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No integrations</h3>
            <p className="mt-1 text-sm text-gray-500">
              Connect your tools and services to streamline workflows.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}