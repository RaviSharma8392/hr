import React from "react";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Settings,
  Plus,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function HRMobileBottomNavbar() {
  const tabClass = ({ isActive }) =>
    `flex flex-col items-center justify-center flex-1 text-xs font-semibold transition-colors
    ${isActive ? "text-[#008BDC]" : "text-gray-400"}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-50">
      <div className="flex items-center justify-between h-16 relative">
        <NavLink to="/hr" className={tabClass} end>
          <LayoutDashboard size={20} />
          <span>Home</span>
        </NavLink>

        <NavLink to="/hr/jobs" className={tabClass}>
          <Briefcase size={20} />
          <span>Jobs</span>
        </NavLink>

        {/* Floating Post Job Button */}
        <div className="flex-1 flex justify-center">
          <NavLink
            to="/hr/post-job"
            className="absolute -top-5 w-14 h-14 bg-[#008BDC] text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white active:scale-95 transition">
            <Plus size={24} strokeWidth={3} />
          </NavLink>
          <span className="text-transparent text-xs mt-8">Post</span>
        </div>

        <NavLink to="/hr/candidates" className={tabClass}>
          <Users size={20} />
          <span>Applicants</span>
        </NavLink>

        <NavLink to="/hr/settings" className={tabClass}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
}
