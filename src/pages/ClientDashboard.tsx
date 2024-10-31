import React from 'react';
import { useClientStore } from '../store/clientStore';
import { ClientOverview } from '../components/clients/ClientOverview';
import { ClientHealth } from '../components/clients/ClientHealth';
import { ClientProjects } from '../components/clients/ClientProjects';
import { ClientCommunication } from '../components/clients/ClientCommunication';
import { ClientDocuments } from '../components/clients/ClientDocuments';
import { ClientIntegrations } from '../components/clients/ClientIntegrations';
import { ClientNotes } from '../components/clients/ClientNotes';
import { ClientFinancials } from '../components/clients/ClientFinancials';
import { ClientTeam } from '../components/clients/ClientTeam';
import { ClientReports } from '../components/clients/ClientReports';
import { ClientAlerts } from '../components/clients/ClientAlerts';

export function ClientDashboard() {
  const selectedClientId = useClientStore((state) => state.selectedClientId);
  const client = useClientStore((state) => 
    state.clients.find((c) => c.id === selectedClientId)
  );

  if (!client) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Please select a client to view their dashboard</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{client.name}</h1>
        <p className="mt-1 text-sm text-gray-500">Client Dashboard</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ClientOverview client={client} />
        <ClientHealth client={client} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ClientProjects clientId={client.id} />
        <ClientCommunication clientId={client.id} />
        <ClientDocuments clientId={client.id} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ClientIntegrations clientId={client.id} />
        <ClientNotes clientId={client.id} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ClientFinancials clientId={client.id} />
        <ClientTeam clientId={client.id} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ClientReports clientId={client.id} />
        <ClientAlerts clientId={client.id} />
      </div>
    </div>
  );
}