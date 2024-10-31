import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Campaign } from '../../types/project';

interface CampaignPerformanceProps {
  campaigns: Campaign[];
}

export function CampaignPerformance({ campaigns }: CampaignPerformanceProps) {
  const data = campaigns.map((campaign) => ({
    name: campaign.name,
    reach: campaign.metrics.reach,
    engagement: campaign.metrics.engagement,
    conversion: campaign.metrics.conversion,
  }));

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-lg font-medium text-gray-900">Campaign Performance</h2>
      <div className="mt-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="reach" fill="#3b82f6" name="Reach" />
            <Bar dataKey="engagement" fill="#10b981" name="Engagement" />
            <Bar dataKey="conversion" fill="#6366f1" name="Conversion" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}