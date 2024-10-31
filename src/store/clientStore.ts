import { create } from 'zustand';
import type { Client, ClientDocument, Integration } from '../types/client';

interface ClientStore {
  clients: Client[];
  documents: ClientDocument[];
  integrations: Integration[];
  selectedClientId: string | null;
  
  // Client actions
  addClient: (client: Client) => void;
  updateClient: (clientId: string, updates: Partial<Client>) => void;
  archiveClient: (clientId: string) => void;
  
  // Document actions
  addDocument: (document: ClientDocument) => void;
  updateDocument: (documentId: string, updates: Partial<ClientDocument>) => void;
  archiveDocument: (documentId: string) => void;
  
  // Integration actions
  addIntegration: (integration: Integration) => void;
  updateIntegration: (integrationId: string, updates: Partial<Integration>) => void;
  removeIntegration: (integrationId: string) => void;
  
  // Selection actions
  setSelectedClient: (clientId: string | null) => void;
}

export const useClientStore = create<ClientStore>((set) => ({
  clients: [],
  documents: [],
  integrations: [],
  selectedClientId: null,

  addClient: (client) =>
    set((state) => ({ clients: [...state.clients, client] })),

  updateClient: (clientId, updates) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === clientId ? { ...client, ...updates } : client
      ),
    })),

  archiveClient: (clientId) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === clientId ? { ...client, status: 'archived' } : client
      ),
    })),

  addDocument: (document) =>
    set((state) => ({ documents: [...state.documents, document] })),

  updateDocument: (documentId, updates) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === documentId ? { ...doc, ...updates } : doc
      ),
    })),

  archiveDocument: (documentId) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === documentId ? { ...doc, status: 'archived' } : doc
      ),
    })),

  addIntegration: (integration) =>
    set((state) => ({ integrations: [...state.integrations, integration] })),

  updateIntegration: (integrationId, updates) =>
    set((state) => ({
      integrations: state.integrations.map((integration) =>
        integration.id === integrationId ? { ...integration, ...updates } : integration
      ),
    })),

  removeIntegration: (integrationId) =>
    set((state) => ({
      integrations: state.integrations.filter((i) => i.id !== integrationId),
    })),

  setSelectedClient: (clientId) =>
    set({ selectedClientId: clientId }),
}));