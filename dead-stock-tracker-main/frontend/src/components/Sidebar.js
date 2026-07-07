import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  AlertTriangle,
  FileBarChart2,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Products",
      path: "/products",
      icon: <Package size={20} />,
    },
    {
      name: "Dead Stock",
      path: "/dead-stock",
      icon: <AlertTriangle size={20} />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FileBarChart2 size={20} />,
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white shadow-2xl flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-3xl font-extrabold tracking-wide text-blue-400">
          MR10
        </h1>

        <p className="text-sm text-slate-400 mt-2">
          Smart Inventory Platform
        </p>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`mx-3 mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
              location.pathname === item.path
                ? "bg-blue-600 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700 p-4">
        <p className="text-xs text-center text-slate-500">
          MR10 StockIQ v2.0
        </p>
      </div>
    </div>
  );
}

export default Sidebar;