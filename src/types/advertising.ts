import { z } from 'zod';

export type AdvertisingPlatform = 
  | 'facebook_ads'
  | 'google_ads'
  | 'google_analytics'
  | 'google_tag_manager'
  | 'linkedin_ads'
  | 'twitter_ads'
  | 'tiktok_ads'
  | 'pinterest_ads'
  | 'snapchat_ads'
  | 'bing_ads'
  | 'trade_desk'
  | 'dv360';

export type AccountStatus = 'active' | 'inactive' | 'pending' | 'error';

export interface AdvertisingAccount {
  id: string;
  clientId: string;
  platform: AdvertisingPlatform;
  name: string;
  accountId: string;
  status: AccountStatus;
  credentials: {
    pixelId?: string;
    trackingId?: string;
    containerId?: string;
    conversionId?: string;
    apiKey?: string;
    clientId?: string;
    clientSecret?: string;
  };
  settings: {
    currency: string;
    timezone: string;
    autoTagging?: boolean;
    enhancedConversions?: boolean;
    crossDomainTracking?: boolean;
  };
  metadata: {
    lastVerified?: Date;
    errorMessage?: string;
    spendLimit?: number;
  };
}

// Validation schema for advertising accounts
export const advertisingAccountSchema = z.object({
  platform: z.enum([
    'facebook_ads',
    'google_ads',
    'google_analytics',
    'google_tag_manager',
    'linkedin_ads',
    'twitter_ads',
    'tiktok_ads',
    'pinterest_ads',
    'snapchat_ads',
    'bing_ads',
    'trade_desk',
    'dv360'
  ]),
  name: z.string().min(1),
  accountId: z.string().min(1),
  credentials: z.object({
    pixelId: z.string().optional(),
    trackingId: z.string().optional(),
    containerId: z.string().optional(),
    conversionId: z.string().optional(),
    apiKey: z.string().optional(),
    clientId: z.string().optional(),
    clientSecret: z.string().optional(),
  }),
  settings: z.object({
    currency: z.string(),
    timezone: z.string(),
    autoTagging: z.boolean().optional(),
    enhancedConversions: z.boolean().optional(),
    crossDomainTracking: z.boolean().optional(),
  }),
});