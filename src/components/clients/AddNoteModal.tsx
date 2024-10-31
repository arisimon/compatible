import React from 'react';
import { useNoteStore } from '../../store/noteStore';
import { useTeamStore } from '../../store/teamStore';
import { Button } from '../ui/Button';
import { Paperclip, X, Template } from 'lucide-react';

interface AddNoteModalProps {
  clientId: string;
  parentId?: string;
  onClose: () => void;
}

export function AddNoteModal({ clientId, parentId, onClose }: AddNoteModalProps) {
  const templates = useNoteStore((state) => state.templates);
  const teamMembers = useTeamStore((state) => state.members);

  const [formData, setFormData] = React.useState({
    category: 'general' as const,
    content: '',
    mentions: [] as string[],
    attachments: [] as File[],
    templateId: '',
  });

  const handleTemplateChange = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setFormData({
        ...formData,
        category: template.category,
        content: template.content,
        templateId,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    useNoteStore.getState().addNote({
      id: String(Date.now()),
      clientId,
      parentId,
      category: formData.category,
      content: formData.content,
      author: {
        id: 'current-user',
        name: 'Current User',
      },
      mentions: formData.mentions,
      attachments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      templateId: formData.templateId || undefined,
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
                  Add Note
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Template
                    </label>
                    <select
                      value={formData.templateId}
                      onChange={(e) => handleTemplateChange(e.target.value)}
                      className="mt-1"
                    >
                      <option value="">Select a template</option>
                      {templates.map((template) => (
                        <option key={template.id} value={template.id}>
                          {template.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as any,
                        })
                      }
                      className="mt-1"
                    >
                      <option value="general">General</option>
                      <option value="strategy">Strategy</option>
                      <option value="issue">Issue</option>
                      <option value="request">Request</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Content
                    </label>
                    <textarea
                      rows={5}
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      className="mt-1"
                      placeholder="Write your note..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mention Team Members
                    </label>
                    <select
                      multiple
                      value={formData.mentions}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          mentions: Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                          ),
                        })
                      }
                      className="mt-1"
                    >
                      {teamMembers.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Attachments
                    </label>
                    <div className="mt-1">
                      <div className="flex items-center space-x-4">
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
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              attachments: Array.from(e.target.files || []),
                            })
                          }
                        />
                      </div>
                      {formData.attachments.length > 0 && (
                        <ul className="mt-2 divide-y divide-gray-200">
                          {formData.attachments.map((file, index) => (
                            <li
                              key={index}
                              className="flex items-center justify-between py-2"
                            >
                              <span className="text-sm text-gray-500">
                                {file.name}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    attachments: formData.attachments.filter(
                                      (_, i) => i !== index
                                    ),
                                  })
                                }
                                className="text-gray-400 hover:text-gray-500"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Button type="submit" className="sm:ml-3">
                Add Note
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