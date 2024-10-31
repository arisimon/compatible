import React from 'react';
import { Client } from '../../types/client';
import { Button } from '../ui/Button';
import { Building, Users, MapPin, Tag, Activity } from 'lucide-react';
import { AccountsOverview } from '../advertising/AccountsOverview';

interface ClientProfileProps {
  client: Client;
}

export function ClientProfile({ client }: ClientProfileProps) {
  if (!client) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{client.name}</h2>
          <p className="mt-1 text-sm text-gray-500">{client.industry}</p>
        </div>
        <Button variant="outline">Edit Profile</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <Building className="h-5 w-5 text-gray-400" />
            <h3 className="text-sm font-medium text-gray-900">Company Details</h3>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-500">
              Size: {client.size}
            </p>
            <p className="text-sm text-gray-500">
              Status: {client.status}
            </p>
            <div className="flex flex-wrap gap-2">
              {client.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-gray-400" />
            <h3 className="text-sm font-medium text-gray-900">Location</h3>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-500">
              {client.location.address}
            </p>
            <p className="text-sm text-gray-500">
              {client.location.city}, {client.location.state} {client.location.postalCode}
            </p>
            <p className="text-sm text-gray-500">
              {client.location.country}
            </p>
            <p className="text-sm text-gray-500">
              Timezone: {client.location.timezone}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 p-4">
        <AccountsOverview clientId={client.id} />
      </div>
    </div>
  );
}