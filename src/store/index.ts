export { useClientStore } from './clientStore';
export { useProjectStore } from './projectStore';
export { useCommunicationStore } from './communicationStore';
export { useTeamStore } from './teamStore';
export { useIntegrationStore } from './integrationStore';
export { useAdvertisingStore } from './advertisingStore';
export { useNoteStore } from './noteStore';

// Initialize stores with mock data
import { initializeStores } from './mockData';
initializeStores();