import React from "react";
import { Briefcase, CheckCircle2, Building2 } from "lucide-react";

export default function CandidateDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-800">Candidate Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Applied Jobs */}
        <div className="bg-white rounded-lg shadow p-6">
          <Briefcase className="text-blue-500 mb-3" size={28} />
          <h2 className="text-lg font-semibold text-slate-700">Applied Jobs</h2>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>

        {/* Shortlisted */}
        <div className="bg-white rounded-lg shadow p-6">
          <CheckCircle2 className="text-green-500 mb-3" size={28} />
          <h2 className="text-lg font-semibold text-slate-700">Shortlisted</h2>
          <p className="text-3xl font-bold mt-2">3</p>
        </div>

        {/* Companies Viewed */}
        <div className="bg-white rounded-lg shadow p-6">
          <Building2 className="text-purple-500 mb-3" size={28} />
          <h2 className="text-lg font-semibold text-slate-700">
            Companies Viewed
          </h2>
          <p className="text-3xl font-bold mt-2">7</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-slate-700 mb-4">
          Recent Activity
        </h2>
        <ul className="space-y-3 text-slate-600">
          <li>• Applied to Frontend Developer at ABC Tech</li>
          <li>• Profile viewed by XYZ Company</li>
          <li>• Shortlisted for UI Developer role</li>
        </ul>
      </div>
    </div>
  );
}
