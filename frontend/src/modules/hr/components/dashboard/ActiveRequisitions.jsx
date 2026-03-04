// components/dashboard/ActiveRequisitions.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Users, UserPlus, ChevronRight } from "lucide-react";

const ActiveRequisitions = ({ jobs }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#212121] flex items-center gap-2">
          <Briefcase size={20} className="text-[#008BDC]" /> Active Requisitions
        </h2>
        <Link
          to="/hr/jobs"
          className="text-[13px] font-bold text-[#008BDC] hover:underline">
          View All
        </Link>
      </div>

      <div className="bg-white border border-[#EEE] rounded-lg shadow-sm overflow-hidden">
        {jobs.map((job, index) => (
          <div
            key={job.id}
            className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-[#F8F9FA] ${
              index !== jobs.length - 1 ? "border-b border-[#EEE]" : ""
            }`}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-[15px] font-bold text-[#212121]">
                  {job.title}
                </h3>
                <span className="text-[10px] font-bold bg-[#F8F9FA] border border-[#DDD] px-2 py-0.5 rounded text-gray-500 uppercase tracking-widest">
                  {job.type}
                </span>
              </div>
              <div className="flex items-center gap-4 text-[13px] text-gray-500 font-medium mt-2">
                <span className="flex items-center gap-1.5">
                  <Users size={14} /> {job.applicants} Total
                </span>
                <span className="flex items-center gap-1.5 text-[#10b981] bg-emerald-50 px-2 py-0.5 rounded">
                  <UserPlus size={14} /> {job.new} New Today
                </span>
              </div>
            </div>
            <Link
              to={`/hr/jobs/${job.id}/pipeline`}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 border border-[#DDD] text-[#484848] text-[13px] font-bold rounded-md hover:border-[#008BDC] hover:text-[#008BDC] transition-colors">
              Pipeline <ChevronRight size={16} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveRequisitions;
