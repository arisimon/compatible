import { gapi } from 'gapi-script';

const CLIENT_ID = 'YOUR_CLIENT_ID';
const API_KEY = 'YOUR_API_KEY';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar';

export class GoogleCalendarService {
  private static instance: GoogleCalendarService;
  private tokenClient: google.accounts.oauth2.TokenClient | null = null;
  private gapiInited = false;
  private gisInited = false;

  private constructor() {}

  static getInstance(): GoogleCalendarService {
    if (!GoogleCalendarService.instance) {
      GoogleCalendarService.instance = new GoogleCalendarService();
    }
    return GoogleCalendarService.instance;
  }

  async initialize(): Promise<void> {
    try {
      await this.loadGapiClient();
      await this.loadGisClient();
    } catch (error) {
      console.error('Error initializing Google Calendar:', error);
      throw error;
    }
  }

  private async loadGapiClient(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      gapi.load('client', {
        callback: async () => {
          try {
            await gapi.client.init({
              apiKey: API_KEY,
              discoveryDocs: [DISCOVERY_DOC],
            });
            this.gapiInited = true;
            resolve();
          } catch (error) {
            reject(error);
          }
        },
        onerror: reject,
      });
    });
  }

  private async loadGisClient(): Promise<void> {
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '', // Will be set later
    });
    this.gisInited = true;
  }

  async authorize(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.tokenClient) {
        reject(new Error('Token client not initialized'));
        return;
      }

      this.tokenClient.callback = async (resp) => {
        if (resp.error) {
          reject(resp);
          return;
        }
        resolve();
      };

      if (gapi.client.getToken() === null) {
        this.tokenClient.requestAccessToken({ prompt: 'consent' });
      } else {
        this.tokenClient.requestAccessToken({ prompt: '' });
      }
    });
  }

  async listEvents(timeMin: Date, timeMax: Date): Promise<google.calendar.calendar_v3.Schema$Event[]> {
    try {
      const response = await gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime',
      });

      return response.result.items || [];
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  async createEvent(event: google.calendar.calendar_v3.Schema$Event): Promise<google.calendar.calendar_v3.Schema$Event> {
    try {
      const response = await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });

      return response.result;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  async updateEvent(
    eventId: string,
    event: google.calendar.calendar_v3.Schema$Event
  ): Promise<google.calendar.calendar_v3.Schema$Event> {
    try {
      const response = await gapi.client.calendar.events.update({
        calendarId: 'primary',
        eventId: eventId,
        resource: event,
      });

      return response.result;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }

  async deleteEvent(eventId: string): Promise<void> {
    try {
      await gapi.client.calendar.events.delete({
        calendarId: 'primary',
        eventId: eventId,
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }
}

export const googleCalendarService = GoogleCalendarService.getInstance();