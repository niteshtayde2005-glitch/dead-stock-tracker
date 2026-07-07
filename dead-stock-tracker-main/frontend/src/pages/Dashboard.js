import React, { useEffect, useState } from "react";
import { dashboardService } from "../services/api";

import StatCard from "../components/StatCard";
import LoadingSpinner from "../components/LoadingSpinner";

import SalesChart from "../components/Dashboard/SalesChart";
import CategoryChart from "../components/Dashboard/CategoryChart";
import RecentProducts from "../components/Dashboard/RecentProducts";
import QuickActions from "../components/Dashboard/QuickActions";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getAnalytics();
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Dashboard
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {data && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Products"
              value={data.summary?.total_products || 0}
              icon="📦"
              color="blue"
            />

            <StatCard
              title="Total Quantity"
              value={data.summary?.total_quantity || 0}
              icon="📊"
              color="green"
            />

            <StatCard
              title="Total Value"
              value={`$${Number(
                data.summary?.total_value || 0
              ).toFixed(2)}`}
              icon="💰"
              color="purple"
            />

            <StatCard
              title="Dead Stock Items"
              value={data.deadStockCount || 0}
              icon="🚫"
              color="red"
            />
          </div>

          {/* Charts + Quick Actions */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <div className="xl:col-span-2">
              <SalesChart />
            </div>

            <QuickActions />
          </div>

          {/* Category Chart */}
          <div className="mb-8">
            <CategoryChart />
          </div>

          {/* Top Categories */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Top Categories
            </h2>

            <div className="space-y-4">
              {data.topCategories?.map((cat, idx) => (
                <div
                  key={idx}
                  className="flex justify-between border-b pb-3"
                >
                  <span className="font-semibold text-gray-700">
                    {cat.category}
                  </span>

                  <span className="font-bold text-blue-600">
                    ₹{Number(cat.value || 0).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Products */}
          <RecentProducts
            products={data.recentProducts || []}
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;