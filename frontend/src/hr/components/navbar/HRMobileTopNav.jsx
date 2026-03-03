import React from "react";
import { Link } from "react-router-dom";
import { Bell, Briefcase } from "lucide-react";

export default function HRMobileTopNavbar({ user }) {
  // Dynamically generate the user's avatar based on their actual name
  const getUserAvatarUrl = () => {
    if (user?.photoURL) return user.photoURL;

    const name = user?.firstName
      ? `${user.firstName}+${user?.lastName || ""}`
      : "HR+Admin";

    return `https://ui-avatars.com/api/?name=${name}&background=008BDC&color=fff&font-size=0.35&bold=true`;
  };

  return (
    // 1. md:hidden ensures this never accidentally shows on desktop layouts
    // 2. backdrop-blur-xl gives it that beautiful iOS frosted glass effect as content scrolls underneath
    <header className="md:hidden sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-[#EEE]">
      <div className="flex items-center justify-between px-4 h-[60px]">
        {/* ========================================== */}
        {/* LOGO (Left)                                */}
        {/* ========================================== */}
        <Link
          to="/hr"
          className="flex items-center gap-2 active:opacity-70 transition-opacity">
          <div className="bg-[#008BDC] p-1.5 rounded-md text-white shadow-sm">
            <Briefcase size={18} strokeWidth={2.5} />
          </div>
          <span className="text-[20px] font-black text-[#212121] tracking-tight">
            HRMastery<span className="text-[#008BDC]">.</span>
          </span>
        </Link>

        {/* ========================================== */}
        {/* RIGHT ACTIONS                              */}
        {/* ========================================== */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Notification Bell */}
          <button
            className="relative p-2.5 text-[#484848] hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors focus:outline-none"
            aria-label="Notifications">
            <Bell size={22} strokeWidth={2} />
            {/* Notification Badge */}
            <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Profile Avatar */}
          <Link
            to="/hr/settings" // Or /hr/profile depending on your routing
            className="ml-1 active:scale-90 transition-transform">
            <div className="p-0.5 rounded-full bg-white border border-[#DDD] shadow-sm">
              <img
                src={getUserAvatarUrl()}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
