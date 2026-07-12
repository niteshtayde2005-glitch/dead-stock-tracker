import React, { useEffect, useState } from 'react';
import { inventoryService } from '../services/api';
import DeadStockTable from '../components/DeadStockTable';
import LoadingSpinner from '../components/LoadingSpinner';

function DeadStock() {
  const [deadStockItems, setDeadStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("All"); 

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
  const filteredItems = deadStockItems.filter((item) => {
  const matchesSearch =
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase());

  const daysWithoutSale = item.last_sale_date
    ? Math.floor(
        (new Date() - new Date(item.last_sale_date)) /
          (1000 * 60 * 60 * 24)
      )
    : 9999;

  let risk = "Low";

  if (daysWithoutSale > 365) {
    risk = "High";
  } else if (daysWithoutSale > 180) {
    risk = "Medium";
  }

  const matchesRisk =
    riskFilter === "All" || risk === riskFilter;

  return matchesSearch && matchesRisk;
});

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Dead Stock Items</h1>
      <p className="text-gray-600 mb-8">Items not sold in the last 90 days</p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    <input
      type="text"
      placeholder="🔍 Search dead stock..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
    />

    <select
      value={riskFilter}
      onChange={(e) => setRiskFilter(e.target.value)}
      className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      <option>All</option>
      <option>High</option>
      <option>Medium</option>
      <option>Low</option>
    </select>

  </div>

</div>

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

      <DeadStockTable items={filteredItems} />
    </div>
  );
}

export default DeadStock;