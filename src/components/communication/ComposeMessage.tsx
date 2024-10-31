import React from 'react';
import { Button } from '../ui/Button';
import { Paperclip, X } from 'lucide-react';
import { useCommunicationStore } from '../../store/communicationStore';
import { useClientStore } from '../../store/clientStore';

interface ComposeMessageProps {
  onClose: () => void;
}

export function ComposeMessage({ onClose }: ComposeMessageProps) {
  const [formData, setFormData] = React.useState({
    recipients: [] as string[],
    subject: '',
    content: '',
    attachments: [] as File[],
  });

  const clients = useClientStore((state) => state.clients);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message submission
    console.log('Sending message:', formData);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        attachments: [...formData.attachments, ...Array.from(e.target.files)],
      });
    }
  };

  const removeAttachment = (index: number) => {
    setFormData({
      ...formData,
      attachments: formData.attachments.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="w-full">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      New Message
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label
                          htmlFor="recipients"
                          className="block text-sm font-medium text-gray-700"
                        >
                          To
                        </label>
                        <select
                          id="recipients"
                          multiple
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          value={formData.recipients}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              recipients: Array.from(
                                e.target.selectedOptions,
                                (option) => option.value
                              ),
                            })
                          }
                        >
                          {clients.map((client) =>
                            client.contacts.map((contact) => (
                              <option key={contact.id} value={contact.id}>
                                {contact.name} ({client.name})
                              </option>
                            ))
                          )}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="content"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Message
                        </label>
                        <textarea
                          id="content"
                          rows={5}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          value={formData.content}
                          onChange={(e) =>
                            setFormData({ ...formData, content: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Attachments
                        </label>
                        <div className="mt-1 flex items-center space-x-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              document.getElementById('file-upload')?.click()
                            }
                          >
                            <Paperclip className="mr-2 h-4 w-4" />
                            Add Files
                          </Button>
                          <input
                            id="file-upload"
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </div>
                        {formData.attachments.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {formData.attachments.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 text-sm"
                              >
                                <span>{file.name}</span>
                                <button
                                  type="button"
                                  onClick={() => removeAttachment(index)}
                                  className="text-gray-400 hover:text-gray-500"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Button type="submit" className="sm:ml-3">
                Send Message
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