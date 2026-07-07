import React from "react";

function ProductList({ products, onEdit, onDelete }) {
  const getStatus = (qty) => {
    const quantity = Number(qty) || 0;

    if (quantity === 0) {
      return {
        text: "Out of Stock",
        className: "bg-red-100 text-red-700",
      };
    }

    if (quantity < 10) {
      return {
        text: "Low Stock",
        className: "bg-yellow-100 text-yellow-700",
      };
    }

    return {
      text: "In Stock",
      className: "bg-green-100 text-green-700",
    };
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

      <div className="px-6 py-5 border-b">
        <h2 className="text-2xl font-bold text-gray-800">
          Product Inventory
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Total Products: {products.length}
        </p>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="px-6 py-4 text-left">SKU</th>
              <th className="px-6 py-4 text-left">Product</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-center">Quantity</th>
              <th className="px-6 py-4 text-center">Cost</th>
              <th className="px-6 py-4 text-left">Location</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {products.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="text-center py-12 text-gray-500"
                >
                  No products found.
                </td>

              </tr>

            ) : (

              products.map((product) => {

                const status = getStatus(product.quantity);

                return (

                  <tr
                    key={product.id}
                    className="border-b hover:bg-blue-50 transition-all"
                  >

                    <td className="px-6 py-4 font-medium">
                      {product.sku}
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      {product.name}
                    </td>

                    <td className="px-6 py-4">
                      {product.category}
                    </td>

                    <td className="px-6 py-4 text-center">
                      {product.quantity}
                    </td>

                    <td className="px-6 py-4 text-center font-semibold text-green-600">
                      ₹{Number(product.cost || 0).toFixed(2)}
                    </td>

                    <td className="px-6 py-4">
                      {product.location}
                    </td>

                    <td className="px-6 py-4 text-center">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${status.className}`}
                      >
                        {status.text}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() => onEdit(product)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => onDelete(product.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                );
              })

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ProductList;