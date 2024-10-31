import React from 'react';
import { BarChart, FileText, Download, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatDate } from '../../lib/utils';

interface ClientReportsProps {
  clientId: string;
}

export function ClientReports({ clientId }: ClientReportsProps) {
  const reports = [
    {
      id: '1',
      name: 'Monthly Performance Report',
      type: 'performance',
      date: new Date('2024-02-29'),
      status: 'generated',
    },
    {
      id: '2',
      name: 'Campaign Analytics',
      type: 'analytics',
      date: new Date('2024-02-15'),
      status: 'generated',
    },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Reports</h2>
        <Button>
          <BarChart className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <div className="mt-6 space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {report.name}
                </p>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Calendar className="mr-1 h-4 w-4" />
                  {formatDate(report.date)}
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        ))}

        {reports.length === 0 && (
          <div className="text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No reports</h3>
            <p className="mt-1 text-sm text-gray-500">
              Generate reports to track client performance.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}