import React from 'react';
import { useClientStore } from '../store/clientStore';
import { useProjectStore } from '../store/projectStore';
import { MetricsOverview } from '../components/dashboard/MetricsOverview';
import { CampaignPerformance } from '../components/dashboard/CampaignPerformance';
import { ProjectTimeline } from '../components/dashboard/ProjectTimeline';
import { ClientOverview } from '../components/dashboard/ClientOverview';

export function Dashboard() {
  const clients = useClientStore((state) => state.clients);
  const projects = useProjectStore((state) => state.projects);
  const campaigns = useProjectStore((state) => state.campaigns);

  const metrics = [
    {
      name: 'Active Campaigns',
      value: campaigns.filter((c) => c.status === 'active').length,
      change: '+12.5%',
      changeType: 'positive' as const,
      description: 'vs. last month',
    },
    {
      name: 'Total Revenue',
      value: '$52,000',
      change: '+8.2%',
      changeType: 'positive' as const,
      description: 'vs. last month',
    },
    {
      name: 'Active Projects',
      value: projects.filter((p) => p.status === 'active').length,
      change: '-2.1%',
      changeType: 'negative' as const,
      description: 'vs. last month',
    },
    {
      name: 'Client Satisfaction',
      value: '94%',
      change: '+5.3%',
      changeType: 'positive' as const,
      description: 'vs. last month',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your agency's performance and activities.
        </p>
      </div>

      <MetricsOverview metrics={metrics} />

      <div className="grid gap-6 lg:grid-cols-2">
        <CampaignPerformance campaigns={campaigns} />
        <ClientOverview clients={clients} />
      </div>

      <ProjectTimeline projects={projects} />
    </div>
  );
}