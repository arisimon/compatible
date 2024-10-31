import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Users,
  Calendar,
  Settings,
  LogOut,
  FolderOpen,
  Briefcase,
  DollarSign,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Sales', href: '/dashboard/sales', icon: DollarSign },
  { name: 'Clients', href: '/dashboard/clients', icon: Users },
  { name: 'Projects', href: '/dashboard/projects', icon: Briefcase },
  { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
  { name: 'Documents', href: '/dashboard/documents', icon: FolderOpen },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <div className="hidden w-64 flex-shrink-0 bg-white shadow-sm lg:block">
          <div className="flex h-full flex-col">
            <div className="flex h-16 shrink-0 items-center px-6">
              <h1 className="text-xl font-bold text-gray-900">Agency Portal</h1>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-4">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'group flex items-center rounded-md px-3 py-2 text-sm font-medium',
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <Icon
                      className={cn(
                        'mr-3 h-5 w-5',
                        isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="shrink-0 border-t border-gray-200 p-4">
              <button className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-gray-50 px-6 py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}