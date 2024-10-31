import React from 'react';
import { useSalesStore } from '../../store/salesStore';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function SalesForecastChart() {
  const forecasts = useSalesStore((state) => state.forecasts);

  const data = forecasts.map((forecast) => ({
    name: forecast.period,
    Predicted: forecast.predictedRevenue,
    Actual: forecast.deals.reduce((sum, deal) => sum + deal.weightedValue, 0),
  }));

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-lg font-medium text-gray-900">Sales Forecast</h2>
      
      <div className="mt-4 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Predicted" fill="#93c5fd" />
            <Bar dataKey="Actual" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-sm font-medium text-gray-500">Forecast Accuracy</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {Math.round(
                forecasts.reduce((sum, f) => sum + f.accuracy, 0) /
                  forecasts.length || 0
              )}%
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-sm font-medium text-gray-500">Projected Revenue</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              ${forecasts
                .reduce((sum, f) => sum + f.predictedRevenue, 0)
                .toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}