import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (email, password, name) => api.post('/auth/register', { email, password, name }),
};

// Product services
export const productService = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

// Inventory services
export const inventoryService = {
  getSummary: () => api.get('/inventory/summary'),
  getDeadStock: () => api.get('/inventory/dead-stock'),
  getByCategory: () => api.get('/inventory/by-category'),
  getLowStock: () => api.get('/inventory/low-stock'),
};

// Dashboard services
export const dashboardService = {
  getAnalytics: () => api.get('/dashboard'),
};

// Report services
export const reportService = {
  getDeadStockReport: () => api.get('/reports/dead-stock'),
  getCategoryReport: () => api.get('/reports/category'),
  getValueReport: () => api.get('/reports/value'),
};

export default api;