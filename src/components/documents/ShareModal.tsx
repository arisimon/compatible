import React from 'react';
import { Button } from '../ui/Button';
import { Copy, Link, Mail, Users } from 'lucide-react';

interface ShareModalProps {
  documentName: string;
  onClose: () => void;
  onShare: (data: {
    type: 'link' | 'email';
    recipients?: string[];
    permissions: 'view' | 'edit';
    expiresIn?: string;
  }) => void;
}

export function ShareModal({ documentName, onClose, onShare }: ShareModalProps) {
  const [shareType, setShareType] = React.useState<'link' | 'email'>('link');
  const [permissions, setPermissions] = React.useState<'view' | 'edit'>('view');
  const [recipients, setRecipients] = React.useState('');
  const [expiresIn, setExpiresIn] = React.useState('never');
  const [shareLink] = React.useState('https://example.com/share/abc123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShare({
      type: shareType,
      recipients: shareType === 'email' ? recipients.split(',').map(r => r.trim()) : undefined,
      permissions,
      expiresIn: expiresIn === 'never' ? undefined : expiresIn,
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
                  Share "{documentName}"
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setShareType('link')}
                        className={`flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                          shareType === 'link'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Link className="mr-2 h-4 w-4" />
                        Share Link
                      </button>
                      <button
                        type="button"
                        onClick={() => setShareType('email')}
                        className={`flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                          shareType === 'email'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </button>
                    </div>
                  </div>

                  {shareType === 'link' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Share Link
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          readOnly
                          value={shareLink}
                          className="flex-1 rounded-none rounded-l-md"
                        />
                        <Button
                          type="button"
                          className="-ml-px rounded-l-none"
                          onClick={() => navigator.clipboard.writeText(shareLink)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label
                        htmlFor="recipients"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Recipients
                      </label>
                      <input
                        type="text"
                        id="recipients"
                        value={recipients}
                        onChange={(e) => setRecipients(e.target.value)}
                        placeholder="Enter email addresses (comma-separated)"
                        className="mt-1"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Permissions
                    </label>
                    <div className="mt-2 flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={permissions === 'view'}
                          onChange={() => setPermissions('view')}
                          className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          View only
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={permissions === 'edit'}
                          onChange={() => setPermissions('edit')}
                          className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Edit access
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="expires"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Link Expiration
                    </label>
                    <select
                      id="expires"
                      value={expiresIn}
                      onChange={(e) => setExpiresIn(e.target.value)}
                      className="mt-1"
                    >
                      <option value="never">Never</option>
                      <option value="1day">1 day</option>
                      <option value="7days">7 days</option>
                      <option value="30days">30 days</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Button type="submit" className="sm:ml-3">
                Share
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