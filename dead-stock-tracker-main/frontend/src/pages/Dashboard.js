import React, { useEffect, useState } from 'react';
import { dashboardService } from '../services/api';
import StatCard from '../components/StatCard';
import LoadingSpinner from '../components/LoadingSpinner';

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getAnalytics();
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Products"
              value={data.summary?.total_products || 0}
              icon="📦"
              color="blue"
            />
            <StatCard
              title="Total Quantity"
              value={data.summary?.total_quantity || 0}
              icon="📊"
              color="green"
            />
            <StatCard
              title="Total Value"
              value={`$${Number(data.summary?.total_value || 0).toFixed(2)}`}
              icon="💰"
              color="purple"
            />
            <StatCard
              title="Dead Stock Items"
              value={data.deadStockCount || 0}
              icon="🚫"
              color="red"
            />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Categories</h2>
            <div className="space-y-4">
              {data.topCategories?.map((cat, idx) => (
                <div key={idx} className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-700 font-semibold">{cat.category}</span>
                  <span className="text-gray-600">${Number(cat.value || 0).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">SKU</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentProducts?.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{product.sku}</td>
                      <td className="px-4 py-2">{product.name}</td>
                      <td className="px-4 py-2">{product.category}</td>
                      <td className="px-4 py-2">{product.quantity}</td>
                      <td className="px-4 py-2">${product.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;