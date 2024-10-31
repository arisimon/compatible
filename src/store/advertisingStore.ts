import { create } from 'zustand';
import { AdvertisingAccount } from '../types/advertising';

interface AdvertisingStore {
  accounts: AdvertisingAccount[];
  selectedAccountId: string | null;

  // Account actions
  addAccount: (account: AdvertisingAccount) => void;
  updateAccount: (accountId: string, updates: Partial<AdvertisingAccount>) => void;
  removeAccount: (accountId: string) => void;
  verifyAccount: (accountId: string) => Promise<boolean>;
  
  // Selection actions
  setSelectedAccount: (accountId: string | null) => void;
}

export const useAdvertisingStore = create<AdvertisingStore>((set) => ({
  accounts: [],
  selectedAccountId: null,

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

  verifyAccount: async (accountId) => {
    // Simulate account verification
    const success = Math.random() > 0.1;
    set((state) => ({
      accounts: state.accounts.map((account) =>
        account.id === accountId
          ? {
              ...account,
              status: success ? 'active' : 'error',
              metadata: {
                ...account.metadata,
                lastVerified: new Date(),
                errorMessage: success ? undefined : 'Failed to verify account credentials',
              },
            }
          : account
      ),
    }));
    return success;
  },

  setSelectedAccount: (accountId) =>
    set({ selectedAccountId: accountId }),
}));