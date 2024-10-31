import { useClientStore } from './clientStore';
import { useProjectStore } from './projectStore';
import { useCommunicationStore } from './communicationStore';
import { useTeamStore } from './teamStore';

export const initializeStores = () => {
  // Previous client and team store initialization remains the same...

  // Initialize communications
  useCommunicationStore.setState({
    communications: [
      {
        id: '1',
        clientId: '1',
        type: 'email',
        subject: 'Campaign Update',
        content: 'Weekly progress report for the ongoing marketing campaign.',
        participants: ['john@acmecorp.com', 'sarah@agency.com'],
        attachments: ['report.pdf'],
        timestamp: new Date('2024-03-01T10:00:00'),
        status: 'sent',
        metadata: {
          channel: 'email',
        },
      },
      {
        id: '2',
        clientId: '1',
        type: 'meeting',
        subject: 'Strategy Review',
        content: 'Monthly strategy review meeting with the client team.',
        participants: ['john@acmecorp.com', 'sarah@agency.com'],
        attachments: ['presentation.pdf'],
        timestamp: new Date('2024-03-05T14:30:00'),
        status: 'sent',
        metadata: {
          channel: 'zoom',
          duration: 60,
          location: 'https://zoom.us/j/123456789',
        },
      },
    ],
  });

  // Rest of the store initializations...
};