import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function SalesChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Inventory Value",
        data: [12000, 18000, 15000, 22000, 26000, 31000],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.15)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-96">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Inventory Growth
      </h2>

      <div className="h-72">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default SalesChart;
