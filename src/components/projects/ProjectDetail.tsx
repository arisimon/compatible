import React from 'react';
import { useProjectStore } from '../../store/projectStore';
import { useClientStore } from '../../store/clientStore';
import { Button } from '../ui/Button';
import { formatDate } from '../../lib/utils';
import { ProjectMilestones } from './ProjectMilestones';
import { ProjectTasks } from './ProjectTasks';
import { ProjectTeam } from './ProjectTeam';

interface ProjectDetailProps {
  projectId: string;
  onClose: () => void;
}

export function ProjectDetail({ projectId, onClose }: ProjectDetailProps) {
  const project = useProjectStore((state) =>
    state.projects.find((p) => p.id === projectId)
  );

  const client = useClientStore((state) =>
    state.clients.find((c) => c.id === project?.clientId)
  );

  if (!project || !client) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:align-middle">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {project.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {client.name}
                  </p>
                </div>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="col-span-2 space-y-6">
                  <ProjectMilestones projectId={projectId} />
                  <ProjectTasks projectId={projectId} />
                </div>
                <div>
                  <ProjectTeam projectId={projectId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}