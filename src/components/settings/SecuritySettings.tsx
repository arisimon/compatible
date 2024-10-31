import React from 'react';
import { Button } from '../ui/Button';
import { Shield, Smartphone } from 'lucide-react';

export function SecuritySettings() {
  const [showChangePassword, setShowChangePassword] = React.useState(false);
  const [passwordData, setPasswordData] = React.useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password updated:', passwordData);
    setShowChangePassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Security Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account security and authentication methods.
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Shield className="h-6 w-6 text-blue-500" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-gray-900">Password</h3>
              <p className="mt-1 text-sm text-gray-500">
                Change your password or reset it if you've forgotten it.
              </p>
              {!showChangePassword ? (
                <Button
                  type="button"
                  variant="outline"
                  className="mt-3"
                  onClick={() => setShowChangePassword(true)}
                >
                  Change Password
                </Button>
              ) : (
                <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="current-password"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, currentPassword: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, newPassword: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => setShowChangePassword(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Update Password</Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Smartphone className="h-6 w-6 text-blue-500" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
              <p className="mt-1 text-sm text-gray-500">
                Add an extra layer of security to your account by enabling 2FA.
              </p>
              <Button type="button" variant="outline" className="mt-3">
                Enable 2FA
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}