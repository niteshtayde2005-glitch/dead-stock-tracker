import React from 'react';

function ProductList({ products, onEdit, onDelete }) {
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
              <th className="px-6 py-3 font-semibold text-gray-700">Location</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{product.sku}</td>
                <td className="px-6 py-3">{product.name}</td>
                <td className="px-6 py-3">{product.category}</td>
                <td className="px-6 py-3">{product.quantity}</td>
                <td className="px-6 py-3">${product.cost}</td>
                <td className="px-6 py-3">{product.location}</td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => onEdit(product)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;