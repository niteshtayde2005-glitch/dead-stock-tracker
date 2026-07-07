import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryChart() {
  const data = {
    labels: ["Electronics", "Fashion", "Grocery", "Furniture"],
    datasets: [
      {
        data: [35, 25, 20, 20],
        backgroundColor: [
          "#2563eb",
          "#10b981",
          "#f59e0b",
          "#ef4444",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-96">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Category Distribution
      </h2>

      <div className="h-72">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default CategoryChart;