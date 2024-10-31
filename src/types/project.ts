export type ProjectStatus = 'planning' | 'active' | 'paused' | 'completed' | 'cancelled';
export type ProjectPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  assignee: {
    id: string;
    name: string;
  };
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: ProjectPriority;
  dueDate: Date;
  completedAt?: Date;
  dependencies: string[]; // Task IDs
  attachments: Array<{
    id: string;
    name: string;
    url: string;
  }>;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completedAt?: Date;
  tasks: string[]; // Task IDs
  deliverables: Array<{
    id: string;
    name: string;
    status: 'pending' | 'delivered' | 'approved';
  }>;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  clientId: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  startDate: Date;
  endDate: Date;
  budget: {
    allocated: number;
    spent: number;
    currency: string;
  };
  team: Array<{
    id: string;
    name: string;
    role: string;
  }>;
  milestones: ProjectMilestone[];
  tasks: ProjectTask[];
  attachments: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
  }>;
  metadata: {
    campaignId?: string;
    tags: string[];
    customFields: Record<string, any>;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  clientId: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  type: 'social' | 'email' | 'content' | 'advertising' | 'integrated';
  startDate: Date;
  endDate: Date;
  budget: {
    allocated: number;
    spent: number;
    currency: string;
  };
  channels: Array<{
    name: string;
    status: 'active' | 'paused';
    metrics: Record<string, number>;
  }>;
  metrics: {
    reach: number;
    engagement: number;
    conversion: number;
    roi: number;
    customMetrics: Record<string, number>;
  };
  assets: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
    status: 'draft' | 'approved' | 'published';
  }>;
  projectId?: string;
  createdAt: Date;
  updatedAt: Date;
}