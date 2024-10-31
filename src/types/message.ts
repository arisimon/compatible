export interface Message {
  id: number;
  sender: {
    name: string;
    email: string;
    avatar?: string;
  };
  subject: string;
  preview: string;
  content: string;
  timestamp: string;
  isUnread: boolean;
  labels: string[];
  attachments: Array<{
    id: string;
    name: string;
    size: string;
    url: string;
    type: string;
  }>;
}

export interface MessageFolder {
  id: string;
  name: string;
  count?: number;
  icon: React.ComponentType<{ className?: string }>;
}