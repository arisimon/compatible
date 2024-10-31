import React from 'react';
import { Button } from '../ui/Button';
import { useCalendarStore } from '../../store/calendarStore';
import { useClientStore } from '../../store/clientStore';
import { useProjectStore } from '../../store/projectStore';
import { Clock, MapPin, Users, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface EventDetailProps {
  eventId: string;
  onClose: () => void;
}

export function EventDetail({ eventId, onClose }: EventDetailProps) {
  const event = useCalendarStore((state) =>
    state.events.find((e) => e.id === eventId)
  );

  const client = useClientStore((state) =>
    event?.clientId ? state.clients.find((c) => c.id === event.clientId) : null
  );

  const project = useProjectStore((state) =>
    event?.projectId ? state.projects.find((p) => p.id === event.projectId) : null
  );

  const deleteEvent = useCalendarStore((state) => state.deleteEvent);

  if (!event) return null;

  const handleDelete = async () => {
    await deleteEvent(eventId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                {event.description && (
                  <p className="mt-2 text-sm text-gray-500">{event.description}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>
                    {format(event.start, 'PPP p')} - {format(event.end, 'p')}
                  </span>
                </div>

                {event.location && (
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                )}

                {client && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Client: {client.name}</span>
                  </div>
                )}

                {project && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Project: {project.name}</span>
                  </div>
                )}
              </div>

              {event.attendees && event.attendees.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Attendees</h4>
                  <ul className="mt-2 space-y-2">
                    {event.attendees.map((attendee, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 text-sm"
                      >
                        <span className="font-medium text-gray-900">
                          {attendee.name || attendee.email}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            attendee.responseStatus === 'accepted'
                              ? 'bg-green-100 text-green-800'
                              : attendee.responseStatus === 'declined'
                              ? 'bg-red-100 text-red-800'
                              : attendee.responseStatus === 'tentative'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {attendee.responseStatus || 'Pending'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleDelete}
              className="sm:ml-3"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Event
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