// components/dashboard/RecentActivity.jsx
import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Clock } from "lucide-react";

const RecentActivity = ({ applicants }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#212121] flex items-center gap-2">
          <TrendingUp size={20} className="text-[#008BDC]" /> Recent Activity
        </h2>
      </div>

      <div className="bg-white border border-[#EEE] rounded-lg shadow-sm p-4 sm:p-5">
        <div className="space-y-5">
          {applicants.map((applicant, index) => (
            <div key={applicant.id} className="flex gap-3 relative">
              {/* Connecting line for timeline effect */}
              {index !== applicants.length - 1 && (
                <div className="absolute top-8 bottom-[-20px] left-[19px] w-px bg-[#EEE]"></div>
              )}

              <img
                src={`https://ui-avatars.com/api/?name=${applicant.name.replace(" ", "+")}&background=F8F9FA&color=008BDC&rounded=true`}
                alt={applicant.name}
                className="w-10 h-10 rounded-full border border-[#EEE] z-10 bg-white"
              />
              <div>
                <p className="text-[14px] font-bold text-[#212121] leading-tight">
                  {applicant.name}
                </p>
                <p className="text-[12px] text-gray-500 font-medium mt-0.5">
                  Applied for{" "}
                  <span className="text-[#008BDC] font-semibold">
                    {applicant.role}
                  </span>
                </p>
                <p className="text-[11px] text-gray-400 font-semibold mt-1 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock size={12} /> {applicant.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Link
          to="/hr/candidates"
          className="mt-5 block w-full text-center py-2.5 bg-[#F8F9FA] border border-[#EEE] rounded-md text-[13px] font-bold text-[#484848] hover:text-[#008BDC] hover:border-[#008BDC] transition-colors">
          View All Candidates
        </Link>
      </div>
    </div>
  );
};

export default RecentActivity;
