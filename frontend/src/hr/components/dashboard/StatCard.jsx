// components/dashboard/StatCard.jsx
import React from "react";
import { MoreHorizontal } from "lucide-react";

const StatCard = ({ title, value, icon, trend, color, bg }) => {
  return (
    <div className="bg-white border border-[#EEE] rounded-lg p-5 shadow-sm min-w-[240px] sm:min-w-0 snap-start">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-md ${bg} ${color}`}>{icon}</div>
        <button className="text-gray-300 hover:text-gray-500">
          <MoreHorizontal size={20} />
        </button>
      </div>
      <h3 className="text-3xl font-black text-[#212121] tracking-tight">
        {value}
      </h3>
      <p className="text-[13px] font-bold text-[#8A8A8A] mt-1">{title}</p>
      <p className="text-[11px] font-semibold text-[#008BDC] mt-2.5 bg-blue-50/50 inline-block px-2 py-1 rounded">
        {trend}
      </p>
    </div>
  );
};

export default StatCard;
