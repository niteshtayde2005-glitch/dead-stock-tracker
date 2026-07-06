import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authSlice } from '../redux/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold">
              📦 Dead Stock Tracker
            </Link>
            <div className="flex space-x-6">
              <Link to="/" className="hover:text-blue-200">Dashboard</Link>
              <Link to="/products" className="hover:text-blue-200">Products</Link>
              <Link to="/dead-stock" className="hover:text-blue-200">Dead Stock</Link>
              <Link to="/reports" className="hover:text-blue-200">Reports</Link>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;