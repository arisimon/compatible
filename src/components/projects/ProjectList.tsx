import React from 'react';
import { useProjectStore } from '../../store/projectStore';
import { useClientStore } from '../../store/clientStore';
import { useTeamStore } from '../../store/teamStore';
import { Button } from '../ui/Button';
import { Calendar, Clock, DollarSign, Users } from 'lucide-react';
import { formatDate, cn } from '../../lib/utils';
import { ProjectDetail } from './ProjectDetail';

interface ProjectListProps {
  clientId?: string;
  teamMemberId?: string;
  status?: string;
}

export function ProjectList({ clientId, teamMemberId, status }: ProjectListProps) {
  const [selectedProject, setSelectedProject] = React.useState<string | null>(null);
  
  const projects = useProjectStore((state) => {
    let filtered = state.projects;
    
    if (clientId) {
      filtered = filtered.filter(p => p.clientId === clientId);
    }
    
    if (teamMemberId) {
      filtered = filtered.filter(p => p.team.some(t => t.id === teamMemberId));
    }
    
    if (status) {
      filtered = filtered.filter(p => p.status === status);
    }
    
    return filtered;
  });

  const getClientName = (clientId: string) => {
    const client = useClientStore.getState().clients.find(c => c.id === clientId);
    return client?.name || 'Unknown Client';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-orange-100 text-orange-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {project.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {getClientName(project.clientId)}
              </p>
            </div>
            <span
              className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                getStatusColor(project.status)
              )}
            >
              {project.status.toUpperCase()}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Due {formatDate(project.endDate)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <DollarSign className="h-4 w-4" />
              <span>
                ${project.budget.spent.toLocaleString()} / ${project.budget.allocated.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Users className="h-4 w-4" />
              <span>{project.team.length} team members</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>
                {project.milestones.filter(m => m.completedAt).length} /{' '}
                {project.milestones.length} milestones
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedProject(project.id)}
            >
              View Details
            </Button>
          </div>
        </div>
      ))}

      {projects.length === 0 && (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
          <h3 className="text-sm font-medium text-gray-900">No projects found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new project.
          </p>
        </div>
      )}

      {selectedProject && (
        <ProjectDetail
          projectId={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}