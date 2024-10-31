import React from 'react';
import { Button } from '../ui/Button';
import { useProjectStore } from '../../store/projectStore';
import { useClientStore } from '../../store/clientStore';
import { useTeamStore } from '../../store/teamStore';

interface AddProjectModalProps {
  onClose: () => void;
}

export function AddProjectModal({ onClose }: AddProjectModalProps) {
  const clients = useClientStore((state) => state.clients);
  const teamMembers = useTeamStore((state) => state.members);

  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    clientId: '',
    status: 'planning' as const,
    priority: 'medium' as const,
    startDate: '',
    endDate: '',
    budget: {
      allocated: 0,
      spent: 0,
      currency: 'USD',
    },
    team: [] as Array<{ id: string; name: string; role: string }>,
    milestones: [] as Array<{
      id: string;
      title: string;
      description: string;
      dueDate: string;
      deliverables: Array<{ id: string; name: string; status: 'pending' }>;
    }>,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    useProjectStore.getState().addProject({
      ...formData,
      id: String(Date.now()),
      tasks: [],
      attachments: [],
      metadata: {
        tags: [],
        customFields: {},
      },
      createdAt: new Date(),
      updatedAt: new Date(),
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
                  Create New Project
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Project Name
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
                      Client
                    </label>
                    <select
                      value={formData.clientId}
                      onChange={(e) =>
                        setFormData({ ...formData, clientId: e.target.value })
                      }
                      className="mt-1"
                      required
                    >
                      <option value="">Select Client</option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) =>
                          setFormData({ ...formData, startDate: e.target.value })
                        }
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) =>
                          setFormData({ ...formData, endDate: e.target.value })
                        }
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Priority
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            priority: e.target.value as any,
                          })
                        }
                        className="mt-1"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Budget
                      </label>
                      <input
                        type="number"
                        value={formData.budget.allocated}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            budget: {
                              ...formData.budget,
                              allocated: Number(e.target.value),
                            },
                          })
                        }
                        className="mt-1"
                        min="0"
                        step="100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Team Members
                    </label>
                    <select
                      multiple
                      value={formData.team.map((t) => t.id)}
                      onChange={(e) => {
                        const selectedMembers = Array.from(
                          e.target.selectedOptions,
                          (option) => {
                            const member = teamMembers.find(
                              (m) => m.id === option.value
                            );
                            return {
                              id: option.value,
                              name: member?.name || '',
                              role: member?.role || '',
                            };
                          }
                        );
                        setFormData({ ...formData, team: selectedMembers });
                      }}
                      className="mt-1"
                    >
                      {teamMembers.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name} - {member.role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Button type="submit" className="sm:ml-3">
                Create Project
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