import { create } from 'zustand';

export interface Communication {
  id: string;
  clientId: string;
  type: 'email' | 'meeting' | 'call' | 'chat';
  subject: string;
  content: string;
  participants: string[];
  attachments: string[];
  timestamp: Date;
  status: 'sent' | 'received' | 'draft';
  metadata: {
    channel?: string;
    duration?: number;
    location?: string;
  };
}

interface CommunicationStore {
  communications: Communication[];
  addCommunication: (communication: Communication) => void;
  updateCommunication: (id: string, updates: Partial<Communication>) => void;
  deleteCommunication: (id: string) => void;
  getCommunicationsByClient: (clientId: string) => Communication[];
}

export const useCommunicationStore = create<CommunicationStore>((set, get) => ({
  communications: [],
  addCommunication: (communication) =>
    set((state) => ({
      communications: [...state.communications, communication],
    })),
  updateCommunication: (id, updates) =>
    set((state) => ({
      communications: state.communications.map((comm) =>
        comm.id === id ? { ...comm, ...updates } : comm
      ),
    })),
  deleteCommunication: (id) =>
    set((state) => ({
      communications: state.communications.filter((comm) => comm.id !== id),
    })),
  getCommunicationsByClient: (clientId) =>
    get().communications.filter((comm) => comm.clientId === clientId),
}));