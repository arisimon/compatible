import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useClientStore } from '../store/clientStore';
import { initializeStores } from '../store/mockData';
import { ClientProfile } from '../components/clients/ClientProfile';
import { ClientHealth } from '../components/clients/ClientHealth';
import { ClientProjects } from '../components/clients/ClientProjects';
import { ClientCommunication } from '../components/clients/ClientCommunication';
import { ClientDocuments } from '../components/clients/ClientDocuments';
import { ClientNotes } from '../components/clients/ClientNotes';
import { ClientFinancials } from '../components/clients/ClientFinancials';
import { ClientTeam } from '../components/clients/ClientTeam';
import { ClientReports } from '../components/clients/ClientReports';
import { ClientAlerts } from '../components/clients/ClientAlerts';

export function ClientDetail() {
  const { clientId } = useParams<{ clientId: string }>();
  const client = useClientStore((state) => 
    state.clients.find((c) => c.id === clientId)
  );

  useEffect(() => {
    initializeStores();
  }, []);

  if (!client) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Client not found</p>
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
        <ClientProfile client={client} />
        <ClientHealth client={client} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ClientProjects clientId={client.id} />
        <ClientCommunication clientId={client.id} />
        <ClientDocuments clientId={client.id} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ClientNotes clientId={client.id} />
        <ClientTeam clientId={client.id} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ClientFinancials clientId={client.id} />
        <ClientReports clientId={client.id} />
      </div>

      <ClientAlerts clientId={client.id} />
    </div>
  );
}