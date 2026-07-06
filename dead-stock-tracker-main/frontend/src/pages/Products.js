import React, { useEffect, useState } from 'react';
import { productService } from '../services/api';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import LoadingSpinner from '../components/LoadingSpinner';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll();
      setProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load products');
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
      setError(err.response?.data?.error || 'Failed to add product');
    }
  };

  const handleUpdateProduct = async (data) => {
    try {
      await productService.update(editingProduct.id, data);
      setEditingProduct(null);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.delete(id);
        fetchProducts();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete product');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Products</h1>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          + Add Product
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

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

      <ProductList
        products={products}
        onEdit={(product) => {
          setEditingProduct(product);
          setShowForm(true);
        }}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
}

export default Products;