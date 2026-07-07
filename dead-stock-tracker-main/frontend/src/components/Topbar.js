import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authSlice } from '../redux/authSlice';

function Topbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(authSlice.actions.logout());
    navigate('/login');
  };

  return (
    <div className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Welcome to MR10 StockIQ
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-xl">🔔</button>

        <div className="text-right">
          <p className="font-semibold">Nitesh</p>
          <p className="text-xs text-gray-500">Administrator</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Topbar;