import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatDate } from '../../lib/utils';

interface ClientFinancialsProps {
  clientId: string;
}

export function ClientFinancials({ clientId }: ClientFinancialsProps) {
  const financials = {
    totalRevenue: 125000,
    outstandingBalance: 12500,
    lastPayment: {
      amount: 15000,
      date: new Date('2024-02-15'),
    },
    recentInvoices: [
      {
        id: '1',
        number: 'INV-2024-001',
        amount: 15000,
        date: new Date('2024-02-01'),
        status: 'paid',
      },
      {
        id: '2',
        number: 'INV-2024-002',
        amount: 12500,
        date: new Date('2024-03-01'),
        status: 'pending',
      },
    ],
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Financial Overview</h2>
        <Button variant="outline" size="sm">
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-xl font-semibold text-gray-900">
                ${financials.totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Outstanding Balance</p>
              <p className="text-xl font-semibold text-gray-900">
                ${financials.outstandingBalance.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-900">Recent Invoices</h3>
        <div className="mt-2 divide-y divide-gray-200">
          {financials.recentInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between py-3"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {invoice.number}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(invoice.date)}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    invoice.status === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {invoice.status === 'paid' ? (
                    <TrendingUp className="mr-1 h-3 w-3" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3" />
                  )}
                  {invoice.status.toUpperCase()}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  ${invoice.amount.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}