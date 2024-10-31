import React from 'react';
import { useAdvertisingStore } from '../../store/advertisingStore';
import { Button } from '../ui/Button';
import { Plus, RefreshCw, AlertTriangle, CheckCircle, Settings } from 'lucide-react';
import { cn, formatDate } from '../../lib/utils';
import { AddAccountModal } from './AddAccountModal';
import { AccountSettings } from './AccountSettings';

interface AccountsOverviewProps {
  clientId?: string;
}

export function AccountsOverview({ clientId }: AccountsOverviewProps) {
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [selectedAccount, setSelectedAccount] = React.useState<string | null>(null);

  const accounts = useAdvertisingStore((state) =>
    clientId
      ? state.accounts.filter((account) => account.clientId === clientId)
      : state.accounts
  );

  const handleVerifyAccount = async (accountId: string) => {
    await useAdvertisingStore.getState().verifyAccount(accountId);
  };

  const platformIcons: Record<string, React.ReactNode> = {
    facebook_ads: <span className="text-blue-600">FB</span>,
    google_ads: <span className="text-red-600">GA</span>,
    google_analytics: <span className="text-yellow-600">GA4</span>,
    google_tag_manager: <span className="text-blue-600">GTM</span>,
    // Add more platform icons as needed
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Advertising Accounts</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your advertising and analytics tracking accounts
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Account
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50">
                  {platformIcons[account.platform] || account.platform.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {account.name}
                  </h3>
                  <p className="text-sm text-gray-500">{account.platform}</p>
                </div>
              </div>
              <span
                className={cn(
                  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                  {
                    'bg-green-100 text-green-800': account.status === 'active',
                    'bg-red-100 text-red-800': account.status === 'error',
                    'bg-yellow-100 text-yellow-800': account.status === 'pending',
                  }
                )}
              >
                {account.status === 'active' && (
                  <CheckCircle className="mr-1 h-3 w-3" />
                )}
                {account.status === 'error' && (
                  <AlertTriangle className="mr-1 h-3 w-3" />
                )}
                {account.status}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Account ID</span>
                <span className="font-mono text-gray-900">{account.accountId}</span>
              </div>
              {account.credentials.pixelId && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Pixel ID</span>
                  <span className="font-mono text-gray-900">
                    {account.credentials.pixelId}
                  </span>
                </div>
              )}
              {account.credentials.trackingId && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Tracking ID</span>
                  <span className="font-mono text-gray-900">
                    {account.credentials.trackingId}
                  </span>
                </div>
              )}
              {account.metadata.lastVerified && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Last Verified</span>
                  <span className="text-gray-900">
                    {formatDate(account.metadata.lastVerified)}
                  </span>
                </div>
              )}
            </div>

            {account.status === 'error' && account.metadata.errorMessage && (
              <div className="mt-4 rounded-md bg-red-50 p-3">
                <p className="text-sm text-red-700">
                  {account.metadata.errorMessage}
                </p>
              </div>
            )}

            <div className="mt-6 flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedAccount(account.id)}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleVerifyAccount(account.id)}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Verify
              </Button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <AddAccountModal
          clientId={clientId}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {selectedAccount && (
        <AccountSettings
          accountId={selectedAccount}
          onClose={() => setSelectedAccount(null)}
        />
      )}
    </div>
  );
}