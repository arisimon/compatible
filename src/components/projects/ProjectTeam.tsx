import React from 'react';
import { useProjectStore } from '../../store/projectStore';
import { useTeamStore } from '../../store/teamStore';
import { Button } from '../ui/Button';
import { Plus, Users } from 'lucide-react';

interface ProjectTeamProps {
  projectId: string;
}

export function ProjectTeam({ projectId }: ProjectTeamProps) {
  const project = useProjectStore((state) =>
    state.projects.find((p) => p.id === projectId)
  );

  if (!project) return null;

  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Team</h3>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      <div className="mt-6 space-y-4">
        {project.team.map((member) => (
          <div
            key={member.id}
            className="flex items-center space-x-3 rounded-lg border border-gray-200 p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <span className="text-sm font-medium text-blue-600">
                {member.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{member.name}</p>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          </div>
        ))}

        {project.team.length === 0 && (
          <div className="text-center">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No team members</h3>
            <p className="mt-1 text-sm text-gray-500">
              Add team members to this project.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}