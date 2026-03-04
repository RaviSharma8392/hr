// layouts/HRDesktopLayout.jsx
import React from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import {
  Briefcase,
  Users,
  LayoutDashboard,
  Settings,
  PlusCircle,
  LogOut,
  User as UserIcon,
  // Bell, // Bell is in DesktopNav, not here
} from "lucide-react";
import { useAuth } from "../../../app/context/AuthContext";

// SidebarLink component is good, keep it separate
const SidebarLink = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors
      ${isActive ? "bg-blue-50 text-[#008BDC]" : "text-gray-700 hover:bg-blue-50 hover:text-[#008BDC]"}`
    }
    end={to === "/hr"}>
    <Icon size={20} />
    <span>{label}</span>
  </NavLink>
);

const HRDesktopLayout = () => {
  const { user, logout } = useAuth();

  const getUserDisplayName = () => {
    if (user) {
      if (user.firstName && user.lastName)
        return `${user.firstName} ${user.lastName}`;
      if (user.email) return user.email.split("@")[0];
    }
    return "HR User";
  };

  const getUserAvatarUrl = () => {
    return (
      user?.photoURL ||
      `https://ui-avatars.com/api/?name=${getUserDisplayName().replace(" ", "+")}&background=008BDC&color=fff&font-size=0.35&bold=true`
    );
  };

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
  };

  return (
    // This layout is designed for desktop (md and larger)
    // It expects the main HRNavbar (DesktopNav) to be rendered globally at the top
    <div className="flex h-[100dvh] w-full bg-[#F8F9FA] font-sans">
      {/* DESKTOP SIDEBAR */}
      <aside className="w-64 bg-white border-r border-[#EEE] p-5 flex flex-col justify-between shadow-sm shrink-0 z-20">
        <div>
          {/* Logo */}
          <Link to="/hr" className="flex items-center gap-2 mb-8">
            <div className="bg-[#008BDC] p-2 rounded-md text-white shadow-sm">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-[#212121] tracking-tight">
              HRMastery<span className="text-[#008BDC]">.</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="space-y-1.5">
            <SidebarLink to="/hr" icon={LayoutDashboard} label="Dashboard" />
            <SidebarLink to="/hr/jobs" icon={Briefcase} label="Job Postings" />
            <SidebarLink
              to="/hr/post-job"
              icon={PlusCircle}
              label="Post New Job"
            />
            <SidebarLink to="/hr/candidates" icon={Users} label="Candidates" />
            <SidebarLink to="/hr/settings" icon={Settings} label="Settings" />
            {/* Add more links as needed */}
          </nav>
        </div>

        {/* User / Logout at the bottom of the sidebar */}
        <div className="border-t border-[#EEE] pt-4 mt-4">
          <div className="w-full flex flex-col items-center gap-2 px-2 py-2.5 rounded-lg text-sm text-gray-700">
            <img
              src={getUserAvatarUrl()}
              alt={getUserDisplayName()}
              className="w-10 h-10 rounded-full border border-[#EEE] object-cover"
            />
            <div className="text-center">
              <p className="font-semibold text-gray-800 leading-tight">
                {getUserDisplayName()}
              </p>
              <p className="text-xs text-gray-500">
                {user?.company?.name || "Your Company"}
              </p>
            </div>
          </div>
          <NavLink
            to="/hr/profile"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-[#484848] hover:bg-[#F8F9FA] hover:text-[#008BDC] transition-colors rounded-md mt-2">
            <UserIcon size={16} className="text-gray-400" /> My Profile
          </NavLink>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-md transition-colors mt-1">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto relative w-full h-full p-6 lg:p-8">
        <Outlet />{" "}
        {/* This is where the HR Dashboard/Jobs/etc. content will render */}
      </main>
    </div>
  );
};

export default HRDesktopLayout;
