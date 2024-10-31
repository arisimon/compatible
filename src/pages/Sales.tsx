import React from 'react';
import { SalesPipeline } from '../components/sales/SalesPipeline';
import { SalesForecastChart } from '../components/sales/SalesForecastChart';
import { DealList } from '../components/sales/DealList';
import { Button } from '../components/ui/Button';
import { Plus } from 'lucide-react';
import { AddDealModal } from '../components/sales/AddDealModal';

export function Sales() {
  const [showAddDeal, setShowAddDeal] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Sales Pipeline</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your deals and track sales performance
          </p>
        </div>
        <Button onClick={() => setShowAddDeal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Deal
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SalesPipeline />
        <SalesForecastChart />
      </div>

      <DealList />

      {showAddDeal && (
        <AddDealModal onClose={() => setShowAddDeal(false)} />
      )}
    </div>
  );
}