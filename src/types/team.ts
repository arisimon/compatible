export type TeamRole = 'admin' | 'manager' | 'member' | 'client';
export type TeamMemberStatus = 'active' | 'invited' | 'inactive';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  department: string;
  status: TeamMemberStatus;
  avatar?: string;
  phone?: string;
  permissions: {
    clients: string[];
    projects: string[];
    features: string[];
  };
  metadata: {
    lastActive?: Date;
    skills: string[];
    timezone: string;
  };
}

export interface Department {
  id: string;
  name: string;
  description: string;
  lead?: string; // TeamMember ID
  members: string[]; // TeamMember IDs
  projects: string[]; // Project IDs
}