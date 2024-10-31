import { create } from 'zustand';
import { IntegrationConfig, IntegrationAccount } from '../types/integration';

interface IntegrationStore {
  configurations: IntegrationConfig[];
  accounts: IntegrationAccount[];
  
  // Configuration actions
  addConfiguration: (config: IntegrationConfig) => void;
  updateConfiguration: (configId: string, updates: Partial<IntegrationConfig>) => void;
  removeConfiguration: (configId: string) => void;
  
  // Account actions
  addAccount: (account: IntegrationAccount) => void;
  updateAccount: (accountId: string, updates: Partial<IntegrationAccount>) => void;
  removeAccount: (accountId: string) => void;
  
  // Status actions
  updateIntegrationStatus: (configId: string, status: IntegrationConfig['status'], error?: string) => void;
}

export const useIntegrationStore = create<IntegrationStore>((set) => ({
  configurations: [
    {
      id: '1',
      type: 'analytics',
      provider: 'Google Analytics',
      credentials: {
        accessToken: 'sample-token',
        refreshToken: 'sample-refresh',
        scopes: ['analytics.read'],
        expiresAt: new Date('2024-12-31'),
      },
      settings: {
        propertyId: '123456789',
      },
      status: 'active',
      metadata: {
        lastSync: new Date('2024-03-01'),
        usage: {
          requests: 450,
          quota: 1000,
          resetDate: new Date('2024-04-01'),
        },
      },
    },
    {
      id: '2',
      type: 'social',
      provider: 'Facebook',
      credentials: {
        accessToken: 'sample-token',
        refreshToken: 'sample-refresh',
        scopes: ['pages_read', 'pages_manage_posts'],
        expiresAt: new Date('2024-06-30'),
      },
      settings: {},
      status: 'active',
      metadata: {
        lastSync: new Date('2024-03-01'),
        usage: {
          requests: 250,
          quota: 500,
          resetDate: new Date('2024-04-01'),
        },
      },
    },
  ],
  accounts: [
    {
      id: '1',
      integrationId: '1',
      name: 'Main Analytics Account',
      type: 'analytics',
      status: 'connected',
      lastSync: new Date('2024-03-01'),
      metadata: {
        propertyId: '123456789',
        websiteUrl: 'https://example.com',
      },
    },
    {
      id: '2',
      integrationId: '2',
      name: 'Company Facebook Page',
      type: 'facebook_page',
      status: 'connected',
      lastSync: new Date('2024-03-01'),
      metadata: {
        pageId: '987654321',
        pageName: 'Our Company',
      },
    },
  ],

  addConfiguration: (config) =>
    set((state) => ({ configurations: [...state.configurations, config] })),

  updateConfiguration: (configId, updates) =>
    set((state) => ({
      configurations: state.configurations.map((config) =>
        config.id === configId ? { ...config, ...updates } : config
      ),
    })),

  removeConfiguration: (configId) =>
    set((state) => ({
      configurations: state.configurations.filter((c) => c.id !== configId),
      accounts: state.accounts.filter((a) => a.integrationId !== configId),
    })),

  addAccount: (account) =>
    set((state) => ({ accounts: [...state.accounts, account] })),

  updateAccount: (accountId, updates) =>
    set((state) => ({
      accounts: state.accounts.map((account) =>
        account.id === accountId ? { ...account, ...updates } : account
      ),
    })),

  removeAccount: (accountId) =>
    set((state) => ({
      accounts: state.accounts.filter((a) => a.id !== accountId),
    })),

  updateIntegrationStatus: (configId, status, error) =>
    set((state) => ({
      configurations: state.configurations.map((config) =>
        config.id === configId
          ? {
              ...config,
              status,
              metadata: {
                ...config.metadata,
                errorMessage: error,
                lastSync: status === 'active' ? new Date() : config.metadata.lastSync,
              },
            }
          : config
      ),
    })),
}));