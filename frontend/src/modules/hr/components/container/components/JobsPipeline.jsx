import React from "react";

const stages = [
  { name: "Applied", count: 120 },
  { name: "Screening", count: 60 },
  { name: "Interview", count: 25 },
  { name: "Offered", count: 8 },
  { name: "Hired", count: 5 },
];

const JobsPipeline = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold mb-6">Recruitment Pipeline</h3>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stages.map((stage, i) => (
          <div key={i} className="bg-slate-50 p-4 rounded-lg text-center">
            <h4 className="text-sm text-slate-500">{stage.name}</h4>
            <p className="text-2xl font-bold text-slate-900 mt-2">
              {stage.count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsPipeline;
