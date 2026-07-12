import React, { useEffect, useState } from "react";
import { productService } from "../services/api";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import LoadingSpinner from "../components/LoadingSpinner";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");

  const [currentPage, setCurrentPage] = useState(1);
const productsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll();
      setProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (data) => {
    try {
      await productService.create(data);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add product");
    }
  };

  const handleUpdateProduct = async (data) => {
    try {
      await productService.update(editingProduct.id, data);
      setEditingProduct(null);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update product");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productService.delete(id);
        fetchProducts();
      } catch (err) {
        setError(err.response?.data?.error || "Failed to delete product");
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
  const sortedProducts = [...filteredProducts].sort((a, b) => {
  switch (sortBy) {
    case "name-asc":
      return a.name.localeCompare(b.name);

    case "name-desc":
      return b.name.localeCompare(a.name);

    case "price-low":
      return Number(a.cost) - Number(b.cost);

    case "price-high":
      return Number(b.cost) - Number(a.cost);

    case "qty-low":
      return Number(a.quantity) - Number(b.quantity);

    case "qty-high":
      return Number(b.quantity) - Number(a.quantity);

    default:
      return 0;
  }
});
const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

const paginatedProducts = sortedProducts.slice(
  indexOfFirstProduct,
  indexOfLastProduct
);

  return (
    <div className="p-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">

        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            📦 Products
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your inventory efficiently
          </p>
        </div>

        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition hover:scale-105"
        >
          + Add Product
        </button>

      </div>

      {/* Search + Filter */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Categories</option>

            {[...new Set(products.map((p) => p.category))].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}

          </select>
          <select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="name-asc">Sort: A → Z</option>
  <option value="name-desc">Sort: Z → A</option>
  <option value="price-low">Price: Low → High</option>
  <option value="price-high">Price: High → Low</option>
  <option value="qty-low">Quantity: Low → High</option>
  <option value="qty-high">Quantity: High → Low</option>
</select>

        </div>

      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">

        <div className="bg-white rounded-2xl shadow-lg p-5">
          <h3 className="text-gray-500 text-sm">Total Products</h3>
          <p className="text-3xl font-bold text-blue-600">
            {products.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5">
          <h3 className="text-gray-500 text-sm">Total Quantity</h3>
          <p className="text-3xl font-bold text-green-600">
            {products.reduce((sum, p) => sum + (Number(p.quantity) || 0), 0)}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5">
          <h3 className="text-gray-500 text-sm">Inventory Value</h3>
          <p className="text-3xl font-bold text-purple-600">
            ₹
            {products
              .reduce(
                (sum, p) =>
                  sum + (Number(p.quantity) || 0) * (Number(p.cost) || 0),
                0
              )
              .toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5">
          <h3 className="text-gray-500 text-sm">Low Stock</h3>
          <p className="text-3xl font-bold text-red-600">
            {products.filter((p) => Number(p.quantity) < 10).length}
          </p>
        </div>

      </div>

      {/* Error */}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Product Form */}

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Product Table */}

      <ProductList
  products={paginatedProducts}
  onEdit={(product) => {
    setEditingProduct(product);
    setShowForm(true);
  }}
  onDelete={handleDeleteProduct}
/>
<div className="flex justify-center items-center gap-2 mt-8">

  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
  >
    Previous
  </button>

  {Array.from(
    { length: Math.ceil(sortedProducts.length / productsPerPage) },
    (_, index) => (
      <button
        key={index}
        onClick={() => setCurrentPage(index + 1)}
        className={`px-4 py-2 rounded-lg ${
          currentPage === index + 1
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        {index + 1}
      </button>
    )
  )}

  <button
    onClick={() =>
      setCurrentPage((prev) =>
        Math.min(
          prev + 1,
          Math.ceil(sortedProducts.length / productsPerPage)
        )
      )
    }
    disabled={
      currentPage ===
      Math.ceil(sortedProducts.length / productsPerPage)
    }
    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
  >
    Next
  </button>

</div>
    </div>
  );
}

export default Products;