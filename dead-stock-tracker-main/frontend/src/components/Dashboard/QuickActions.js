import React from "react";
import { Plus, Package, FileBarChart2, AlertTriangle } from "lucide-react";

function QuickActions() {
  const actions = [
    {
      title: "Add Product",
      icon: <Plus size={24} />,
      color: "bg-blue-500",
    },
    {
      title: "Manage Products",
      icon: <Package size={24} />,
      color: "bg-green-500",
    },
    {
      title: "Generate Report",
      icon: <FileBarChart2 size={24} />,
      color: "bg-purple-500",
    },
    {
      title: "Dead Stock",
      icon: <AlertTriangle size={24} />,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`${action.color} text-white rounded-xl p-5 hover:scale-105 transition duration-300 shadow-md`}
          >
            <div className="flex flex-col items-center gap-3">
              {action.icon}
              <span className="font-semibold text-sm">
                {action.title}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;