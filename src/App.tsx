import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { ClientList } from './pages/ClientList';
import { ClientDetail } from './pages/ClientDetail';
import { Calendar } from './pages/Calendar';
import { Documents } from './pages/Documents';
import { Projects } from './pages/Projects';
import { Settings } from './pages/Settings';
import { OnboardingFlow } from './pages/OnboardingFlow';
import { Sales } from './pages/Sales';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/onboarding" element={<OnboardingFlow />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/clients" element={<ClientList />} />
            <Route path="/dashboard/clients/:clientId" element={<ClientDetail />} />
            <Route path="/dashboard/projects" element={<Projects />} />
            <Route path="/dashboard/sales" element={<Sales />} />
            <Route path="/dashboard/calendar" element={<Calendar />} />
            <Route path="/dashboard/documents" element={<Documents />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}