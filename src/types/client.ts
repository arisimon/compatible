export interface Client {
  id: string;
  name: string;
  industry: string;
  size: string;
  location: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    timezone: string;
  };
  status: 'active' | 'pending' | 'archived';
  tags: string[];
  contacts: Array<{
    id: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    slackHandle: string;
    preferences: {
      communicationChannel: string;
      meetingFrequency: string;
      notifications: boolean;
    };
  }>;
  servicePackages: Array<{
    id: string;
    name: string;
    features: string[];
    startDate: Date;
    endDate: Date;
    status: 'active' | 'pending' | 'expired';
    value: number;
    currency: string;
  }>;
  customFields: Record<string, any>;
  activities: any[];
  metrics: {
    engagementScore: number;
    responseRate: number;
    projectSuccessRate: number;
    retentionProbability: number;
    riskLevel: 'low' | 'medium' | 'high';
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientDocument {
  id: string;
  clientId: string;
  name: string;
  type: string;
  url: string;
  status: 'active' | 'archived';
  metadata: {
    lastModified: Date;
    size: number;
    version: number;
  };
}

export interface Integration {
  id: string;
  clientId: string;
  type: string;
  provider: string;
  status: 'active' | 'inactive';
  credentials: Record<string, any>;
  metadata: Record<string, any>;
}