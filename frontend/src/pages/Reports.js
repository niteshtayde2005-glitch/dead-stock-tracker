import React, { useEffect, useState } from 'react';
import { reportService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

function Reports() {
  const [reports, setReports] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeReport, setActiveReport] = useState('dead-stock');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const [deadStockReport, categoryReport, valueReport] = await Promise.all([
        reportService.getDeadStockReport(),
        reportService.getCategoryReport(),
        reportService.getValueReport(),
      ]);

      setReports({
        'dead-stock': deadStockReport.data,
        'category': categoryReport.data,
        'value': valueReport.data,
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Reports</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex space-x-4 mb-8 border-b">
        {['dead-stock', 'category', 'value'].map((report) => (
          <button
            key={report}
            onClick={() => setActiveReport(report)}
            className={`py-2 px-4 font-semibold ${
              activeReport === report
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {report === 'dead-stock' ? 'Dead Stock Report' : report === 'category' ? 'Category Report' : 'Value Report'}
          </button>
        ))}
      </div>

      {reports[activeReport] && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{reports[activeReport].report_type}</h2>
          <p className="text-gray-600 mb-4">Generated: {new Date(reports[activeReport].generated_at).toLocaleString()}</p>

          {activeReport === 'dead-stock' && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded">
                  <p className="text-gray-600">Total Items</p>
                  <p className="text-3xl font-bold text-blue-600">{reports[activeReport].total_items}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded">
                  <p className="text-gray-600">Total Value</p>
                  <p className="text-3xl font-bold text-purple-600">${reports[activeReport].total_value?.toFixed(2)}</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2">SKU</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Quantity</th>
                      <th className="px-4 py-2">Value</th>
                      <th className="px-4 py-2">Days</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports[activeReport].items?.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{item.sku}</td>
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">{item.quantity}</td>
                        <td className="px-4 py-2">${item.total_value?.toFixed(2)}</td>
                        <td className="px-4 py-2">{item.days_without_sale}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Reports;