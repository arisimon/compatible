import { create } from 'zustand';
import type { Deal, SalesActivity, Proposal, SalesForecast, Commission } from '../types/sales';

interface SalesStore {
  deals: Deal[];
  activities: SalesActivity[];
  proposals: Proposal[];
  forecasts: SalesForecast[];
  commissions: Commission[];
  selectedDealId: string | null;

  // Deal actions
  addDeal: (deal: Deal) => void;
  updateDeal: (dealId: string, updates: Partial<Deal>) => void;
  deleteDeal: (dealId: string) => void;
  
  // Activity actions
  addActivity: (activity: SalesActivity) => void;
  updateActivity: (activityId: string, updates: Partial<SalesActivity>) => void;
  deleteActivity: (activityId: string) => void;
  
  // Proposal actions
  addProposal: (proposal: Proposal) => void;
  updateProposal: (proposalId: string, updates: Partial<Proposal>) => void;
  deleteProposal: (proposalId: string) => void;
  
  // Forecast actions
  updateForecast: (forecast: SalesForecast) => void;
  
  // Commission actions
  addCommission: (commission: Commission) => void;
  updateCommission: (commissionId: string, updates: Partial<Commission>) => void;
  deleteCommission: (commissionId: string) => void;
  
  // Selection actions
  setSelectedDeal: (dealId: string | null) => void;
  
  // Analytics
  getDealsByStage: (stage: Deal['stage']) => Deal[];
  getForecastByPeriod: (period: string) => SalesForecast | undefined;
  getCommissionsBySalesRep: (salesRepId: string) => Commission[];
}

export const useSalesStore = create<SalesStore>((set, get) => ({
  deals: [],
  activities: [],
  proposals: [],
  forecasts: [],
  commissions: [],
  selectedDealId: null,

  addDeal: (deal) =>
    set((state) => ({ deals: [...state.deals, deal] })),

  updateDeal: (dealId, updates) =>
    set((state) => ({
      deals: state.deals.map((deal) =>
        deal.id === dealId ? { ...deal, ...updates, updatedAt: new Date() } : deal
      ),
    })),

  deleteDeal: (dealId) =>
    set((state) => ({
      deals: state.deals.filter((d) => d.id !== dealId),
      activities: state.activities.filter((a) => a.dealId !== dealId),
      proposals: state.proposals.filter((p) => p.dealId !== dealId),
    })),

  addActivity: (activity) =>
    set((state) => ({ activities: [...state.activities, activity] })),

  updateActivity: (activityId, updates) =>
    set((state) => ({
      activities: state.activities.map((activity) =>
        activity.id === activityId
          ? { ...activity, ...updates, updatedAt: new Date() }
          : activity
      ),
    })),

  deleteActivity: (activityId) =>
    set((state) => ({
      activities: state.activities.filter((a) => a.id !== activityId),
    })),

  addProposal: (proposal) =>
    set((state) => ({ proposals: [...state.proposals, proposal] })),

  updateProposal: (proposalId, updates) =>
    set((state) => ({
      proposals: state.proposals.map((proposal) =>
        proposal.id === proposalId
          ? { ...proposal, ...updates, updatedAt: new Date() }
          : proposal
      ),
    })),

  deleteProposal: (proposalId) =>
    set((state) => ({
      proposals: state.proposals.filter((p) => p.id !== proposalId),
    })),

  updateForecast: (forecast) =>
    set((state) => ({
      forecasts: [
        ...state.forecasts.filter((f) => f.period !== forecast.period),
        forecast,
      ],
    })),

  addCommission: (commission) =>
    set((state) => ({ commissions: [...state.commissions, commission] })),

  updateCommission: (commissionId, updates) =>
    set((state) => ({
      commissions: state.commissions.map((commission) =>
        commission.id === commissionId
          ? { ...commission, ...updates, updatedAt: new Date() }
          : commission
      ),
    })),

  deleteCommission: (commissionId) =>
    set((state) => ({
      commissions: state.commissions.filter((c) => c.id !== commissionId),
    })),

  setSelectedDeal: (dealId) =>
    set({ selectedDealId: dealId }),

  getDealsByStage: (stage) =>
    get().deals.filter((deal) => deal.stage === stage),

  getForecastByPeriod: (period) =>
    get().forecasts.find((forecast) => forecast.period === period),

  getCommissionsBySalesRep: (salesRepId) =>
    get().commissions.filter((commission) => commission.salesRepId === salesRepId),
}));