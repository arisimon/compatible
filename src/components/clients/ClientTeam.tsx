import React from 'react';
import { useTeamStore } from '../../store/teamStore';
import { Users, Mail, Phone } from 'lucide-react';
import { Button } from '../ui/Button';

interface ClientTeamProps {
  clientId: string;
}

export function ClientTeam({ clientId }: ClientTeamProps) {
  const teamMembers = useTeamStore((state) =>
    state.members.filter((member) =>
      member.permissions.clients.includes(clientId)
    )
  );

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Account Team</h2>
        <Button variant="outline" size="sm">
          <Users className="mr-2 h-4 w-4" />
          Manage Team
        </Button>
      </div>

      <div className="mt-6 space-y-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-sm font-medium text-blue-600">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {member.name}
                  </p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                  <Mail className="h-4 w-4" />
                </button>
                <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                  <Phone className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex flex-wrap gap-2">
                {member.metadata.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {teamMembers.length === 0 && (
          <div className="text-center">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No team members</h3>
            <p className="mt-1 text-sm text-gray-500">
              Assign team members to manage this client.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}