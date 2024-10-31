export type DealStage = 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
export type DealPriority = 'low' | 'medium' | 'high';

export interface Deal {
  id: string;
  clientId: string;
  name: string;
  value: number;
  currency: string;
  stage: DealStage;
  priority: DealPriority;
  probability: number;
  expectedCloseDate: Date;
  actualCloseDate?: Date;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
  activities: SalesActivity[];
  proposals: Proposal[];
  notes: string;
  tags: string[];
  customFields: Record<string, any>;
}

export interface SalesActivity {
  id: string;
  dealId: string;
  type: 'call' | 'email' | 'meeting' | 'task' | 'note';
  description: string;
  outcome?: string;
  scheduledAt: Date;
  completedAt?: Date;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Proposal {
  id: string;
  dealId: string;
  version: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  content: {
    products: Array<{
      name: string;
      quantity: number;
      unitPrice: number;
      discount?: number;
    }>;
    services: Array<{
      name: string;
      hours: number;
      ratePerHour: number;
      discount?: number;
    }>;
    terms: string;
    validUntil: Date;
  };
  totalValue: number;
  sentAt?: Date;
  respondedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SalesForecast {
  period: string;
  predictedRevenue: number;
  deals: Array<{
    id: string;
    name: string;
    value: number;
    probability: number;
    weightedValue: number;
  }>;
  accuracy: number;
  lastUpdated: Date;
}

export interface Commission {
  id: string;
  dealId: string;
  salesRepId: string;
  amount: number;
  rate: number;
  status: 'pending' | 'approved' | 'paid';
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}