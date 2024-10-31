import { Client } from './client';

export type CommunicationType = 'email' | 'meeting' | 'chat' | 'approval';
export type CommunicationStatus = 'draft' | 'sent' | 'received' | 'archived';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface Communication {
  id: string;
  clientId: string;
  type: CommunicationType;
  subject: string;
  content: string;
  status: CommunicationStatus;
  direction: 'inbound' | 'outbound';
  channel: 'email' | 'slack' | 'teams' | 'internal';
  metadata: {
    externalId?: string; // ID from external system (e.g., Gmail)
    threadId?: string;
    labels?: string[];
    responseTime?: number; // in minutes
  };
  participants: Array<{
    id: string;
    name: string;
    email: string;
    role: 'sender' | 'recipient' | 'cc' | 'bcc';
  }>;
  attachments: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Meeting {
  id: string;
  clientId: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'review' | 'planning' | 'presentation' | 'other';
  location: {
    type: 'virtual' | 'physical';
    details: string; // Zoom link or address
  };
  attendees: Array<{
    id: string;
    name: string;
    email: string;
    status: 'accepted' | 'declined' | 'tentative';
  }>;
  notes?: string;
  recording?: {
    url: string;
    duration: number;
  };
  documents: Array<{
    id: string;
    name: string;
    url: string;
    type: 'agenda' | 'presentation' | 'notes' | 'other';
  }>;
}

export interface Approval {
  id: string;
  clientId: string;
  type: 'content' | 'budget' | 'design' | 'strategy';
  title: string;
  description: string;
  status: ApprovalStatus;
  deadline?: Date;
  requestedBy: {
    id: string;
    name: string;
    email: string;
  };
  approvers: Array<{
    id: string;
    name: string;
    email: string;
    status: ApprovalStatus;
    comment?: string;
    respondedAt?: Date;
  }>;
  items: Array<{
    id: string;
    title: string;
    description: string;
    attachments: Array<{
      id: string;
      name: string;
      url: string;
      type: string;
    }>;
    status: ApprovalStatus;
    feedback?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommunicationTemplate {
  id: string;
  name: string;
  description: string;
  type: CommunicationType;
  subject: string;
  content: string;
  category: 'follow-up' | 'proposal' | 'report' | 'meeting' | 'other';
  variables: Array<{
    key: string;
    description: string;
    required: boolean;
  }>;
  metadata: {
    lastUsed?: Date;
    useCount: number;
    tags: string[];
  };
}

export interface WebhookConfig {
  id: string;
  provider: 'make' | 'zapier' | 'custom';
  type: 'email' | 'calendar' | 'chat';
  endpoint: string;
  secret: string;
  enabled: boolean;
  settings: {
    syncDirection: 'inbound' | 'outbound' | 'both';
    filters?: {
      labels?: string[];
      folders?: string[];
      emailDomains?: string[];
    };
  };
  metadata: {
    lastSync?: Date;
    status: 'active' | 'error';
    errorMessage?: string;
  };
}