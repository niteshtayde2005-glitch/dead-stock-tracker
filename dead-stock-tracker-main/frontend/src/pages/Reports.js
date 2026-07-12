import React, { useEffect, useState } from "react";
import { reportService } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

function Reports() {
  const [reports, setReports] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeReport, setActiveReport] =
    useState("dead-stock");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);

      const [
        deadStockReport,
        categoryReport,
        valueReport,
      ] = await Promise.all([
        reportService.getDeadStockReport(),
        reportService.getCategoryReport(),
        reportService.getValueReport(),
      ]);

      setReports({
        "dead-stock": deadStockReport.data,
        category: categoryReport.data,
        value: valueReport.data,
      });
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to load reports"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = async () => {
  try {
    const response = await reportService.exportExcel();

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");

    link.href = url;
    link.setAttribute(
      "download",
      "MR10_Inventory.xlsx"
    );

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

  } catch (err) {
    alert("Failed to export Excel");
    console.error(err);
  }
};

  if (loading) return <LoadingSpinner />;

  const deadStock =
    reports["dead-stock"] || {};

  const category =
    reports["category"] || {};

  const value =
    reports["value"] || {};

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            📊 Reports
          </h1>

          <p className="text-gray-500 mt-2">
            Analytics & Business Insights
          </p>
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg"
          onClick={handleExportExcel}
        >
          📥 Export Excel
          Export Report
        </button>

      </div>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-4 mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-500">
            Dead Stock Items
          </h3>

          <p className="text-4xl font-bold text-red-600 mt-2">
            {deadStock.total_items || 0}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-500">
            Inventory Value
          </h3>

          <p className="text-4xl font-bold text-purple-600 mt-2">
            ₹
            {Number(
              deadStock.total_value || 0
            ).toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-500">
            Categories
          </h3>

          <p className="text-4xl font-bold text-blue-600 mt-2">
            {category.categories?.length || 0}
          </p>
        </div>

      </div>

      <div className="flex gap-4 mb-8">

        <button
          onClick={() =>
            setActiveReport("dead-stock")
          }
          className={`px-6 py-3 rounded-xl font-semibold ${
            activeReport === "dead-stock"
              ? "bg-blue-600 text-white"
              : "bg-white shadow"
          }`}
        >
          Dead Stock
        </button>

        <button
          onClick={() =>
            setActiveReport("category")
          }
          className={`px-6 py-3 rounded-xl font-semibold ${
            activeReport === "category"
              ? "bg-blue-600 text-white"
              : "bg-white shadow"
          }`}
        >
          Category
        </button>

        <button
          onClick={() =>
            setActiveReport("value")
          }
          className={`px-6 py-3 rounded-xl font-semibold ${
            activeReport === "value"
              ? "bg-blue-600 text-white"
              : "bg-white shadow"
          }`}
        >
          Inventory Value
        </button>

      </div>

            {activeReport === "dead-stock" && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">
              Dead Stock Report
            </h2>

            <p className="text-gray-500 mt-1">
              Generated:
              {" "}
              {deadStock.generated_at
                ? new Date(
                    deadStock.generated_at
                  ).toLocaleString()
                : "-"}
            </p>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>
                  <th className="px-6 py-4 text-left">
                    SKU
                  </th>

                  <th className="px-6 py-4 text-left">
                    Product
                  </th>

                  <th className="px-6 py-4 text-left">
                    Qty
                  </th>

                  <th className="px-6 py-4 text-left">
                    Value
                  </th>

                  <th className="px-6 py-4 text-left">
                    Days
                  </th>

                </tr>

              </thead>

              <tbody>

                {deadStock.items?.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="px-6 py-4">
                      {item.sku}
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      {item.name}
                    </td>

                    <td className="px-6 py-4">
                      {item.quantity}
                    </td>

                    <td className="px-6 py-4 text-red-600 font-bold">
                      ₹{Number(item.total_value || 0).toFixed(2)}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          item.days_without_sale > 365
                            ? "bg-red-100 text-red-700"
                            : item.days_without_sale > 180
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.days_without_sale} Days
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}

      {activeReport === "category" && (
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Category Report
          </h2>

          <pre className="text-gray-700 whitespace-pre-wrap">
            {JSON.stringify(category, null, 2)}
          </pre>

        </div>
      )}

      {activeReport === "value" && (
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Inventory Value Report
          </h2>

          <pre className="text-gray-700 whitespace-pre-wrap">
            {JSON.stringify(value, null, 2)}
          </pre>

        </div>
      )}

    </div>
  );
}

export default Reports;