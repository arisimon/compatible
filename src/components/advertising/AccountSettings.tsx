import React from 'react';
import { Button } from '../ui/Button';
import { useAdvertisingStore } from '../../store/advertisingStore';
import { AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';
import { formatDate } from '../../lib/utils';

interface AccountSettingsProps {
  accountId: string;
  onClose: () => void;
}

export function AccountSettings({ accountId, onClose }: AccountSettingsProps) {
  const account = useAdvertisingStore((state) =>
    state.accounts.find((acc) => acc.id === accountId)
  );

  if (!account) return null;

  const handleRemoveAccount = () => {
    useAdvertisingStore.getState().removeAccount(accountId);
    onClose();
  };

  const handleVerifyAccount = async () => {
    await useAdvertisingStore.getState().verifyAccount(accountId);
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
                  {account.name} Settings
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your advertising account settings
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <h4 className="text-sm font-medium text-gray-900">Account Details</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Platform</span>
                    <span className="text-gray-900">{account.platform}</span>
                  </div>
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
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <h4 className="text-sm font-medium text-gray-900">Settings</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Currency</span>
                    <span className="text-gray-900">{account.settings.currency}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Timezone</span>
                    <span className="text-gray-900">{account.settings.timezone}</span>
                  </div>
                  {account.settings.autoTagging !== undefined && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Auto-Tagging</span>
                      <span className="text-gray-900">
                        {account.settings.autoTagging ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {account.status === 'error' && account.metadata.errorMessage && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Account Error
                      </h3>
                      <p className="mt-2 text-sm text-red-700">
                        {account.metadata.errorMessage}
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
              onClick={handleVerifyAccount}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Verify Account
            </Button>
            <Button
              type="button"
              variant="outline"
              className="sm:ml-3"
              onClick={handleRemoveAccount}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Account
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