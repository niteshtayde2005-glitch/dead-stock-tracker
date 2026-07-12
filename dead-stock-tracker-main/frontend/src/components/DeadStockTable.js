import React from "react";

function DeadStockTable({ items }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700">SKU</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Name</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Category</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Quantity</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Cost</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Total Value</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Last Sale</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Location</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Risk</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => {
              const totalValue =
                (Number(item.quantity) || 0) *
                (Number(item.cost) || 0);

              const lastSaleDate = item.last_sale_date
                ? new Date(item.last_sale_date)
                : null;

              const daysWithoutSale = lastSaleDate
                ? Math.floor(
                    (new Date() - lastSaleDate) /
                      (1000 * 60 * 60 * 24)
                  )
                : "N/A";

              let risk = "Low";
              let riskColor =
                "bg-green-100 text-green-700";

              if (daysWithoutSale !== "N/A") {
                if (daysWithoutSale > 365) {
                  risk = "High";
                  riskColor =
                    "bg-red-100 text-red-700";
                } else if (daysWithoutSale > 180) {
                  risk = "Medium";
                  riskColor =
                    "bg-yellow-100 text-yellow-700";
                }
              }

              return (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-semibold">
                    {item.sku}
                  </td>

                  <td className="px-6 py-4">
                    {item.name}
                  </td>

                  <td className="px-6 py-4">
                    {item.category}
                  </td>

                  <td className="px-6 py-4">
                    {item.quantity}
                  </td>

                  <td className="px-6 py-4">
                    ₹{Number(item.cost || 0).toFixed(2)}
                  </td>

                  <td className="px-6 py-4 font-bold text-red-600">
                    ₹{totalValue.toFixed(2)}
                  </td>

                  <td className="px-6 py-4">
                    {lastSaleDate
                      ? lastSaleDate.toLocaleDateString()
                      : "Never"}

                    {daysWithoutSale !== "N/A" && (
                      <span className="block text-xs text-gray-500">
                        {daysWithoutSale} days ago
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    {item.location}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`${riskColor} px-3 py-1 rounded-full text-xs font-bold`}
                    >
                      {risk}
                    </span>
                  </td>
                </tr>
              );
            })}

            {items.length === 0 && (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-8 text-gray-500"
                >
                  No dead stock items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeadStockTable;