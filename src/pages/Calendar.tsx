import React, { useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { useCalendarStore } from '../store/calendarStore';
import { AddEventModal } from '../components/calendar/AddEventModal';
import { EventDetail } from '../components/calendar/EventDetail';
import { cn } from '../lib/utils';

export function Calendar() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [showAddEvent, setShowAddEvent] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<string | null>(null);

  const {
    events,
    isGoogleCalendarConnected,
    isSyncing,
    connectGoogleCalendar,
    syncWithGoogle,
    getEventsByDateRange,
  } = useCalendarStore();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const monthEvents = getEventsByDateRange(monthStart, monthEnd);

  useEffect(() => {
    if (isGoogleCalendarConnected) {
      syncWithGoogle();
    }
  }, [isGoogleCalendarConnected]);

  const handleGoogleCalendarConnect = async () => {
    try {
      await connectGoogleCalendar();
    } catch (error) {
      console.error('Failed to connect to Google Calendar:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
        <div className="flex items-center space-x-4">
          {!isGoogleCalendarConnected ? (
            <Button onClick={handleGoogleCalendarConnect}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              Connect Google Calendar
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => syncWithGoogle()}
              disabled={isSyncing}
            >
              <RefreshCw className={cn('mr-2 h-4 w-4', { 'animate-spin': isSyncing })} />
              Sync Calendar
            </Button>
          )}
          <Button onClick={() => setShowAddEvent(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <div className="grid grid-cols-7 gap-px">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="bg-gray-50 px-4 py-2 text-center text-sm font-medium text-gray-700"
            >
              {day}
            </div>
          ))}
          {days.map((day) => {
            const dayEvents = monthEvents.filter(
              (event) =>
                format(event.start, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
            );

            return (
              <div
                key={day.toISOString()}
                className={cn(
                  'min-h-32 border border-gray-200 p-2',
                  format(day, 'MM') !== format(currentDate, 'MM') && 'bg-gray-50'
                )}
              >
                <div className="text-right">
                  <span
                    className={cn(
                      'inline-flex h-6 w-6 items-center justify-center rounded-full text-sm',
                      format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700'
                    )}
                  >
                    {format(day, 'd')}
                  </span>
                </div>
                <div className="mt-2 space-y-1">
                  {dayEvents.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => setSelectedEvent(event.id)}
                      className={cn(
                        'w-full truncate rounded px-2 py-1 text-left text-xs',
                        {
                          'bg-blue-100 text-blue-700': event.type === 'meeting',
                          'bg-green-100 text-green-700': event.type === 'task',
                          'bg-red-100 text-red-700': event.type === 'deadline',
                          'bg-gray-100 text-gray-700': event.type === 'other',
                        }
                      )}
                    >
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{format(event.start, 'HH:mm')}</span>
                      </div>
                      <span className="block truncate">{event.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showAddEvent && (
        <AddEventModal onClose={() => setShowAddEvent(false)} />
      )}

      {selectedEvent && (
        <EventDetail
          eventId={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}