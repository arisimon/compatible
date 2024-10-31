import React from 'react';
import { useProjectStore } from '../../store/projectStore';
import { Calendar, Clock } from 'lucide-react';
import { formatDate } from '../../lib/utils';

interface ClientProjectsProps {
  clientId: string;
}

export function ClientProjects({ clientId }: ClientProjectsProps) {
  const projects = useProjectStore((state) =>
    state.projects.filter((p) => p.clientId === clientId)
  );
  const campaigns = useProjectStore((state) =>
    state.campaigns.filter((c) => c.clientId === clientId)
  );

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-lg font-medium text-gray-900">Projects & Campaigns</h2>
      
      <div className="mt-6 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Active Projects</h3>
          <div className="mt-2 space-y-3">
            {projects
              .filter((p) => p.status === 'active')
              .map((project) => (
                <div
                  key={project.id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">
                      {project.name}
                    </h4>
                    <span
                      className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                    >
                      {project.priority}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Clock className="mr-1 h-4 w-4" />
                    Due {formatDate(project.endDate)}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Active Campaigns</h3>
          <div className="mt-2 space-y-3">
            {campaigns
              .filter((c) => c.status === 'active')
              .map((campaign) => (
                <div
                  key={campaign.id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">
                      {campaign.name}
                    </h4>
                    <span
                      className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
                    >
                      {campaign.type}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" />
                    Until {formatDate(campaign.endDate)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}