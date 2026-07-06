import React from 'react';

function StatCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    red: 'bg-red-50 text-red-600 border-red-200',
  };

  return (
    <div className={`${colorClasses[color]} rounded-lg border-2 p-6`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 text-sm font-semibold mb-2">{title}</p>
          <p className="text-4xl font-bold">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  );
}

export default StatCard;