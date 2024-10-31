import { TeamMember } from './team';

export type NoteCategory = 'strategy' | 'issue' | 'request' | 'general';

export interface Note {
  id: string;
  clientId: string;
  parentId?: string; // For threaded discussions
  category: NoteCategory;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  mentions: string[]; // Array of team member IDs
  attachments: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
  templateId?: string;
}

export interface NoteTemplate {
  id: string;
  name: string;
  category: NoteCategory;
  content: string;
  tags: string[];
}