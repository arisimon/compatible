import React from 'react';
import { useProjectStore } from '../../store/projectStore';
import { useClientStore } from '../../store/clientStore';
import { useTeamStore } from '../../store/teamStore';
import { Button } from '../ui/Button';
import { Plus, Filter } from 'lucide-react';
import { ProjectList } from './ProjectList';
import { AddProjectModal } from './AddProjectModal';

export function ProjectDashboard() {
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [selectedClient, setSelectedClient] = React.useState<string>('all');
  const [selectedTeamMember, setSelectedTeamMember] = React.useState<string>('all');
  const [selectedStatus, setSelectedStatus] = React.useState<string>('all');

  const clients = useClientStore((state) => state.clients);
  const teamMembers = useTeamStore((state) => state.members);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Projects & Campaigns</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your client projects and marketing campaigns
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          className="rounded-md border-gray-300 text-sm"
        >
          <option value="all">All Clients</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>

        <select
          value={selectedTeamMember}
          onChange={(e) => setSelectedTeamMember(e.target.value)}
          className="rounded-md border-gray-300 text-sm"
        >
          <option value="all">All Team Members</option>
          {teamMembers.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="rounded-md border-gray-300 text-sm"
        >
          <option value="all">All Status</option>
          <option value="planning">Planning</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <ProjectList
        clientId={selectedClient === 'all' ? undefined : selectedClient}
        teamMemberId={selectedTeamMember === 'all' ? undefined : selectedTeamMember}
        status={selectedStatus === 'all' ? undefined : selectedStatus}
      />

      {showAddModal && (
        <AddProjectModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}