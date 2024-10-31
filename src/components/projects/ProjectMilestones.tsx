import React from 'react';
import { useProjectStore } from '../../store/projectStore';
import { Button } from '../ui/Button';
import { Plus, CheckCircle, Clock } from 'lucide-react';
import { formatDate } from '../../lib/utils';

interface ProjectMilestonesProps {
  projectId: string;
}

export function ProjectMilestones({ projectId }: ProjectMilestonesProps) {
  const project = useProjectStore((state) =>
    state.projects.find((p) => p.id === projectId)
  );

  if (!project) return null;

  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Milestones</h3>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Milestone
        </Button>
      </div>

      <div className="mt-6 space-y-4">
        {project.milestones.map((milestone) => (
          <div
            key={milestone.id}
            className="rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  {milestone.title}
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  {milestone.description}
                </p>
              </div>
              {milestone.completedAt ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Clock className="h-5 w-5 text-gray-400" />
              )}
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Due Date</span>
                <span className="text-gray-900">
                  {formatDate(milestone.dueDate)}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-gray-500">Deliverables</span>
                <span className="text-gray-900">
                  {milestone.deliverables.filter((d) => d.status === 'approved').length} /{' '}
                  {milestone.deliverables.length} completed
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}