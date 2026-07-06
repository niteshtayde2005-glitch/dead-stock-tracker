import React, { useEffect, useState } from 'react';
import { inventoryService } from '../services/api';
import DeadStockTable from '../components/DeadStockTable';
import LoadingSpinner from '../components/LoadingSpinner';

function DeadStock() {
  const [deadStockItems, setDeadStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDeadStock();
  }, []);

  const fetchDeadStock = async () => {
    try {
      setLoading(true);
      const response = await inventoryService.getDeadStock();
      setDeadStockItems(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load dead stock items');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const totalValue = deadStockItems.reduce((sum, item) => sum + (item.quantity * item.cost), 0);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Dead Stock Items</h1>
      <p className="text-gray-600 mb-8">Items not sold in the last 90 days</p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Items</h3>
          <p className="text-4xl font-bold text-red-600">{deadStockItems.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Quantity</h3>
          <p className="text-4xl font-bold text-orange-600">
            {deadStockItems.reduce((sum, item) => sum + item.quantity, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Value</h3>
          <p className="text-4xl font-bold text-purple-600">${totalValue.toFixed(2)}</p>
        </div>
      </div>

      <DeadStockTable items={deadStockItems} />
    </div>
  );
}

export default DeadStock;