export type IntegrationType = 
  | 'analytics' 
  | 'social' 
  | 'email' 
  | 'storage' 
  | 'calendar' 
  | 'crm' 
  | 'document';

export type IntegrationStatus = 'active' | 'error' | 'expired' | 'pending';

export interface IntegrationConfig {
  id: string;
  type: IntegrationType;
  provider: string;
  credentials: {
    accessToken: string;
    refreshToken?: string;
    expiresAt?: Date;
    scopes: string[];
  };
  settings: Record<string, any>;
  status: IntegrationStatus;
  metadata: {
    lastSync?: Date;
    errorMessage?: string;
    usage?: {
      requests: number;
      quota: number;
      resetDate: Date;
    };
  };
}

export interface IntegrationAccount {
  id: string;
  integrationId: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected';
  lastSync?: Date;
  metadata: Record<string, any>;
}