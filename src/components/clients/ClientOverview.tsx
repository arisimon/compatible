import React from 'react';
import { Building, Users, Tag, Calendar } from 'lucide-react';
import { Client } from '../../types/client';
import { Button } from '../ui/Button';
import { formatDate } from '../../lib/utils';

interface ClientOverviewProps {
  client: Client;
}

export function ClientOverview({ client }: ClientOverviewProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Client Overview</h2>
        <Button variant="outline" size="sm">Edit Profile</Button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <div className="flex items-center">
            <Building className="mr-2 h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-500">Company Info</span>
          </div>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-gray-900">Industry: {client.industry}</p>
            <p className="text-sm text-gray-900">Size: {client.size}</p>
            <p className="text-sm text-gray-900">
              Location: {client.location.city}, {client.location.country}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-500">Key Contacts</span>
          </div>
          <div className="mt-2 space-y-2">
            {client.contacts.slice(0, 3).map((contact) => (
              <div key={contact.id} className="text-sm text-gray-900">
                {contact.name} - {contact.role}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center">
            <Tag className="mr-2 h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-500">Tags</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
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

        <div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-500">Important Dates</span>
          </div>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-gray-900">
              Client Since: {formatDate(client.createdAt)}
            </p>
            <p className="text-sm text-gray-900">
              Last Review: {formatDate(client.updatedAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}