import React from 'react';
import { User, Bell, Lock, Globe, Users } from 'lucide-react';
import { cn } from '../lib/utils';
import { ProfileSettings } from '../components/settings/ProfileSettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { SecuritySettings } from '../components/settings/SecuritySettings';
import { IntegrationDashboard } from '../components/integrations/IntegrationDashboard';
import { TeamSettings } from '../components/settings/TeamSettings';

const navigation = [
  { name: 'Profile', icon: User, id: 'profile' },
  { name: 'Team', icon: Users, id: 'team' },
  { name: 'Notifications', icon: Bell, id: 'notifications' },
  { name: 'Security', icon: Lock, id: 'security' },
  { name: 'Integrations', icon: Globe, id: 'integrations' },
];

export function Settings() {
  const [currentTab, setCurrentTab] = React.useState('profile');

  const renderContent = () => {
    switch (currentTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'team':
        return <TeamSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'integrations':
        return <IntegrationDashboard />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your agency settings and preferences.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <nav className="w-full lg:w-64">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={cn(
                    'flex w-full items-center rounded-md px-3 py-2 text-sm font-medium',
                    currentTab === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="flex-1">
          <div className="rounded-lg bg-white p-6 shadow">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}