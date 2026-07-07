import React from "react";

function StatCard({ title, value, icon, color }) {
  const styles = {
    blue: {
      bg: "bg-gradient-to-br from-blue-500 to-blue-700",
      shadow: "shadow-blue-300",
    },
    green: {
      bg: "bg-gradient-to-br from-green-500 to-green-700",
      shadow: "shadow-green-300",
    },
    purple: {
      bg: "bg-gradient-to-br from-purple-500 to-purple-700",
      shadow: "shadow-purple-300",
    },
    red: {
      bg: "bg-gradient-to-br from-red-500 to-red-700",
      shadow: "shadow-red-300",
    },
  };

  const currentStyle = styles[color] || styles.blue;

  return (
    <div
      className={`
        ${currentStyle.bg}
        ${currentStyle.shadow}
        rounded-2xl
        shadow-xl
        p-6
        text-white
        transition-all
        duration-300
        hover:scale-105
        hover:shadow-2xl
        cursor-pointer
      `}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-white/80 text-sm font-medium uppercase tracking-wide">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3 break-words">
            {value}
          </h2>

          <p className="text-xs mt-4 text-white/80">
            Updated just now
          </p>
        </div>

        <div className="text-5xl bg-white/20 p-4 rounded-2xl">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;