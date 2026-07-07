import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Package,
  FileBarChart2,
  AlertTriangle,
} from "lucide-react";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Product",
      icon: <Plus size={24} />,
      color: "bg-blue-500",
      action: () => navigate("/products"),
    },
    {
      title: "Manage Products",
      icon: <Package size={24} />,
      color: "bg-green-500",
      action: () => navigate("/products"),
    },
    {
      title: "Generate Report",
      icon: <FileBarChart2 size={24} />,
      color: "bg-purple-500",
      action: () => navigate("/reports"),
    },
    {
      title: "Dead Stock",
      icon: <AlertTriangle size={24} />,
      color: "bg-red-500",
      action: () => navigate("/dead-stock"),
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        ⚡ Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className={`${item.color} text-white rounded-xl p-5 shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300`}
          >
            <div className="flex flex-col items-center gap-3">
              {item.icon}
              <span className="font-semibold">
                {item.title}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;