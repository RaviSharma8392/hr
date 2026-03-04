import React from "react";

const stats = [
  { title: "Open Positions", value: 12 },
  { title: "Total Applicants", value: 324 },
  { title: "Interviews Scheduled", value: 18 },
  { title: "Hired This Month", value: 5 },
];

const JobsStatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h4 className="text-sm text-slate-500">{stat.title}</h4>
          <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default JobsStatsCards;
