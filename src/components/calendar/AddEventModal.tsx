import React from 'react';
import { Button } from '../ui/Button';
import { useCalendarStore } from '../../store/calendarStore';
import { useClientStore } from '../../store/clientStore';
import { useProjectStore } from '../../store/projectStore';

interface AddEventModalProps {
  onClose: () => void;
}

export function AddEventModal({ onClose }: AddEventModalProps) {
  const clients = useClientStore((state) => state.clients);
  const projects = useProjectStore((state) => state.projects);
  const addEvent = useCalendarStore((state) => state.addEvent);

  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    start: '',
    startTime: '',
    end: '',
    endTime: '',
    location: '',
    type: 'meeting' as const,
    clientId: '',
    projectId: '',
    attendees: [] as Array<{ email: string; name?: string }>,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const startDateTime = new Date(`${formData.start}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.end}T${formData.endTime}`);

    await addEvent({
      title: formData.title,
      description: formData.description,
      start: startDateTime,
      end: endDateTime,
      location: formData.location,
      type: formData.type,
      clientId: formData.clientId || undefined,
      projectId: formData.projectId || undefined,
      attendees: formData.attendees,
      status: 'confirmed',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Add Event
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="mt-1"
                      required
                    />
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
                        value={formData.start}
                        onChange={(e) =>
                          setFormData({ ...formData, start: e.target.value })
                        }
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) =>
                          setFormData({ ...formData, startTime: e.target.value })
                        }
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={formData.end}
                        onChange={(e) =>
                          setFormData({ ...formData, end: e.target.value })
                        }
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={formData.endTime}
                        onChange={(e) =>
                          setFormData({ ...formData, endTime: e.target.value })
                        }
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="mt-1"
                      placeholder="Office or meeting link"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Event Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value as any })
                      }
                      className="mt-1"
                    >
                      <option value="meeting">Meeting</option>
                      <option value="task">Task</option>
                      <option value="deadline">Deadline</option>
                      <option value="other">Other</option>
                    </select>
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
                    >
                      <option value="">Select Client</option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.clientId && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Project
                      </label>
                      <select
                        value={formData.projectId}
                        onChange={(e) =>
                          setFormData({ ...formData, projectId: e.target.value })
                        }
                        className="mt-1"
                      >
                        <option value="">Select Project</option>
                        {projects
                          .filter((p) => p.clientId === formData.clientId)
                          .map((project) => (
                            <option key={project.id} value={project.id}>
                              {project.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Attendees
                    </label>
                    <div className="mt-2 space-y-2">
                      {formData.attendees.map((attendee, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="email"
                            value={attendee.email}
                            onChange={(e) => {
                              const newAttendees = [...formData.attendees];
                              newAttendees[index].email = e.target.value;
                              setFormData({ ...formData, attendees: newAttendees });
                            }}
                            className="flex-1"
                            placeholder="Email"
                          />
                          <input
                            type="text"
                            value={attendee.name || ''}
                            onChange={(e) => {
                              const newAttendees = [...formData.attendees];
                              newAttendees[index].name = e.target.value;
                              setFormData({ ...formData, attendees: newAttendees });
                            }}
                            className="flex-1"
                            placeholder="Name (optional)"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              const newAttendees = formData.attendees.filter(
                                (_, i) => i !== index
                              );
                              setFormData({ ...formData, attendees: newAttendees });
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            attendees: [...formData.attendees, { email: '' }],
                          })
                        }
                      >
                        Add Attendee
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Button type="submit" className="sm:ml-3">
                Create Event
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