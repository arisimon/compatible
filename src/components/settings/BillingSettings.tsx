import React from 'react';
import { Button } from '../ui/Button';
import { CreditCard, Download } from 'lucide-react';

const invoices = [
  { id: 1, date: 'March 1, 2024', amount: '$299.00', status: 'Paid' },
  { id: 2, date: 'February 1, 2024', amount: '$299.00', status: 'Paid' },
  { id: 3, date: 'January 1, 2024', amount: '$299.00', status: 'Paid' },
];

export function BillingSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Billing & Subscription</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your subscription plan and billing information.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Current Plan</h3>
            <p className="mt-1 text-sm text-gray-500">Professional Plan</p>
          </div>
          <Button>Upgrade Plan</Button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CreditCard className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Payment Method</p>
              <p className="text-sm text-gray-500">Visa ending in 4242</p>
            </div>
          </div>
          <Button variant="outline">Update</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900">Billing History</h3>
        <div className="mt-4 divide-y divide-gray-200 rounded-lg border border-gray-200">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-gray-900">{invoice.date}</p>
                <p className="text-sm text-gray-500">{invoice.amount}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{invoice.status}</span>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}