import React from "react";

function RecentProducts({ products = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-gray-800">
          Recent Products
        </h2>

        <span className="text-sm text-blue-600 font-semibold">
          {products.length} Products
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-3">SKU</th>
              <th className="text-left p-3">Product</th>
              <th className="text-left p-3">Category</th>
              <th className="text-left p-3">Qty</th>
              <th className="text-left p-3">Cost</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium">
                  {product.sku}
                </td>

                <td className="p-3">
                  {product.name}
                </td>

                <td className="p-3">
                  {product.category}
                </td>

                <td className="p-3">
                  {product.quantity}
                </td>

                <td className="p-3 font-semibold text-green-600">
                  ₹{Number(product.cost || 0).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No products available
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentProducts;