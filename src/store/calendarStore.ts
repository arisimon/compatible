import { create } from 'zustand';
import { googleCalendarService } from '../lib/googleCalendar';

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  location?: string;
  attendees?: Array<{
    email: string;
    name?: string;
    responseStatus?: 'needsAction' | 'declined' | 'tentative' | 'accepted';
  }>;
  googleEventId?: string;
  clientId?: string;
  projectId?: string;
  type: 'meeting' | 'deadline' | 'task' | 'other';
  status: 'confirmed' | 'tentative' | 'cancelled';
}

interface CalendarStore {
  events: CalendarEvent[];
  isGoogleCalendarConnected: boolean;
  isSyncing: boolean;
  lastSyncTime?: Date;
  
  // Calendar actions
  addEvent: (event: Omit<CalendarEvent, 'id'>) => Promise<CalendarEvent>;
  updateEvent: (eventId: string, updates: Partial<CalendarEvent>) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  
  // Google Calendar actions
  connectGoogleCalendar: () => Promise<void>;
  disconnectGoogleCalendar: () => void;
  syncWithGoogle: () => Promise<void>;
  
  // Utility actions
  getEventsByDateRange: (start: Date, end: Date) => CalendarEvent[];
  getEventsByClient: (clientId: string) => CalendarEvent[];
  getEventsByProject: (projectId: string) => CalendarEvent[];
}

export const useCalendarStore = create<CalendarStore>((set, get) => ({
  events: [],
  isGoogleCalendarConnected: false,
  isSyncing: false,
  
  addEvent: async (eventData) => {
    const newEvent: CalendarEvent = {
      id: String(Date.now()),
      ...eventData,
    };

    if (get().isGoogleCalendarConnected) {
      try {
        const googleEvent = await googleCalendarService.createEvent({
          summary: eventData.title,
          description: eventData.description,
          start: {
            dateTime: eventData.start.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          end: {
            dateTime: eventData.end.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          location: eventData.location,
          attendees: eventData.attendees?.map(({ email, name }) => ({ email, displayName: name })),
        });

        newEvent.googleEventId = googleEvent.id;
      } catch (error) {
        console.error('Failed to create Google Calendar event:', error);
      }
    }

    set((state) => ({
      events: [...state.events, newEvent],
    }));

    return newEvent;
  },

  updateEvent: async (eventId, updates) => {
    const event = get().events.find((e) => e.id === eventId);
    if (!event) return;

    if (get().isGoogleCalendarConnected && event.googleEventId) {
      try {
        await googleCalendarService.updateEvent(event.googleEventId, {
          summary: updates.title ?? event.title,
          description: updates.description ?? event.description,
          start: updates.start ? {
            dateTime: updates.start.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          } : undefined,
          end: updates.end ? {
            dateTime: updates.end.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          } : undefined,
          location: updates.location ?? event.location,
          attendees: updates.attendees?.map(({ email, name }) => ({ email, displayName: name })),
        });
      } catch (error) {
        console.error('Failed to update Google Calendar event:', error);
      }
    }

    set((state) => ({
      events: state.events.map((e) =>
        e.id === eventId ? { ...e, ...updates } : e
      ),
    }));
  },

  deleteEvent: async (eventId) => {
    const event = get().events.find((e) => e.id === eventId);
    if (!event) return;

    if (get().isGoogleCalendarConnected && event.googleEventId) {
      try {
        await googleCalendarService.deleteEvent(event.googleEventId);
      } catch (error) {
        console.error('Failed to delete Google Calendar event:', error);
      }
    }

    set((state) => ({
      events: state.events.filter((e) => e.id !== eventId),
    }));
  },

  connectGoogleCalendar: async () => {
    try {
      await googleCalendarService.initialize();
      await googleCalendarService.authorize();
      set({ isGoogleCalendarConnected: true });
      await get().syncWithGoogle();
    } catch (error) {
      console.error('Failed to connect Google Calendar:', error);
      throw error;
    }
  },

  disconnectGoogleCalendar: () => {
    set({ isGoogleCalendarConnected: false });
  },

  syncWithGoogle: async () => {
    if (!get().isGoogleCalendarConnected) return;

    set({ isSyncing: true });

    try {
      const timeMin = new Date();
      timeMin.setMonth(timeMin.getMonth() - 1); // Sync from 1 month ago
      const timeMax = new Date();
      timeMax.setMonth(timeMax.getMonth() + 3); // Sync up to 3 months ahead

      const googleEvents = await googleCalendarService.listEvents(timeMin, timeMax);

      const newEvents: CalendarEvent[] = googleEvents.map((googleEvent) => ({
        id: String(Date.now() + Math.random()),
        googleEventId: googleEvent.id,
        title: googleEvent.summary || '',
        description: googleEvent.description,
        start: new Date(googleEvent.start?.dateTime || googleEvent.start?.date || ''),
        end: new Date(googleEvent.end?.dateTime || googleEvent.end?.date || ''),
        location: googleEvent.location,
        attendees: googleEvent.attendees?.map((attendee) => ({
          email: attendee.email || '',
          name: attendee.displayName,
          responseStatus: attendee.responseStatus as any,
        })),
        type: 'meeting',
        status: googleEvent.status as any || 'confirmed',
      }));

      set((state) => ({
        events: [
          ...state.events.filter((e) => !e.googleEventId), // Keep local-only events
          ...newEvents,
        ],
        lastSyncTime: new Date(),
      }));
    } catch (error) {
      console.error('Failed to sync with Google Calendar:', error);
    } finally {
      set({ isSyncing: false });
    }
  },

  getEventsByDateRange: (start, end) =>
    get().events.filter(
      (event) => event.start >= start && event.end <= end
    ),

  getEventsByClient: (clientId) =>
    get().events.filter((event) => event.clientId === clientId),

  getEventsByProject: (projectId) =>
    get().events.filter((event) => event.projectId === projectId),
}));