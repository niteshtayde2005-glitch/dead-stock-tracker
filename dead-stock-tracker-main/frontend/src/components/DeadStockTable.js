import React from 'react';

function DeadStockTable({ items }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-700">SKU</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Category</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Quantity</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Cost</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Total Value</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Last Sale</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Location</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const totalValue = item.quantity * item.cost;
              const lastSaleDate = item.last_sale_date ? new Date(item.last_sale_date) : null;
              const daysWithoutSale = lastSaleDate 
                ? Math.floor((new Date() - lastSaleDate) / (1000 * 60 * 60 * 24))
                : 'N/A';

              return (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 font-semibold">{item.sku}</td>
                  <td className="px-6 py-3">{item.name}</td>
                  <td className="px-6 py-3">{item.category}</td>
                  <td className="px-6 py-3">{item.quantity}</td>
                  <td className="px-6 py-3">${item.cost.toFixed(2)}</td>
                  <td className="px-6 py-3 font-semibold text-red-600">${totalValue.toFixed(2)}</td>
                  <td className="px-6 py-3">
                    {lastSaleDate ? lastSaleDate.toLocaleDateString() : 'Never'}
                    {daysWithoutSale !== 'N/A' && <span className="text-gray-600 text-sm block">({daysWithoutSale}d ago)</span>}
                  </td>
                  <td className="px-6 py-3">{item.location}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeadStockTable;