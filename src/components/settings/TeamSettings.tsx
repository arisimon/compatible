import React from 'react';
import { Button } from '../ui/Button';
import { UserPlus, Mail, Phone, Building } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Creative Director',
    email: 'sarah@agency.com',
    avatar: 'SJ',
    status: 'active',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Account Manager',
    email: 'michael@agency.com',
    avatar: 'MC',
    status: 'active',
  },
];

const departments = [
  'Creative',
  'Account Management',
  'Strategy',
  'Development',
  'Marketing',
];

export function TeamSettings() {
  const [showInviteForm, setShowInviteForm] = React.useState(false);
  const [inviteData, setInviteData] = React.useState({
    email: '',
    role: '',
    department: '',
    phone: '',
  });

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Invite sent:', inviteData);
    setShowInviteForm(false);
    setInviteData({ email: '', role: '', department: '', phone: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Team Management</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your team members and their roles.
          </p>
        </div>
        <Button onClick={() => setShowInviteForm(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </div>

      {showInviteForm && (
        <div className="rounded-lg border border-gray-200 p-4">
          <form onSubmit={handleInvite} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </span>
                  <input
                    type="email"
                    value={inviteData.email}
                    onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                    className="block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                  </span>
                  <input
                    type="tel"
                    value={inviteData.phone}
                    onChange={(e) => setInviteData({ ...inviteData, phone: e.target.value })}
                    className="block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3">
                    <UserPlus className="h-4 w-4 text-gray-400" />
                  </span>
                  <input
                    type="text"
                    value={inviteData.role}
                    onChange={(e) => setInviteData({ ...inviteData, role: e.target.value })}
                    className="block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3">
                    <Building className="h-4 w-4 text-gray-400" />
                  </span>
                  <select
                    value={inviteData.department}
                    onChange={(e) => setInviteData({ ...inviteData, department: e.target.value })}
                    className="block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => setShowInviteForm(false)}>
                Cancel
              </Button>
              <Button type="submit">Send Invitation</Button>
            </div>
          </form>
        </div>
      )}

      <div className="divide-y divide-gray-200 rounded-lg border border-gray-200">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                {member.avatar}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{member.name}</p>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                {member.status}
              </span>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}