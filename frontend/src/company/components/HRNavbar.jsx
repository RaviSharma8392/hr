import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  Briefcase,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Plus,
  User as UserIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function PremiumHRNavbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Dashboard", icon: LayoutDashboard, to: "/hr" },
    { name: "Jobs", icon: Briefcase, to: "/hr/jobs" },
    { name: "Candidates", icon: Users, to: "/hr/candidates" },
  ];

  // --- DESKTOP TAB STYLES ---
  const desktopNavClassName = ({ isActive }) => `
    flex items-center gap-2 text-[15px] font-semibold transition-all duration-200 border-b-[3px] h-full px-1
    ${
      isActive
        ? "border-[#008BDC] text-[#008BDC]"
        : "border-transparent text-[#484848] hover:text-[#008BDC] hover:border-[#008BDC]/30"
    }
  `;

  // --- MOBILE BOTTOM TAB STYLES ---
  const mobileTabClassName = ({ isActive }) => `
    flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors
    ${isActive ? "text-[#008BDC]" : "text-gray-400 hover:text-gray-600"}
  `;

  return (
    <>
      {/* ========================================== */}
      {/* 1. TOP NAVBAR (Unified for Desktop & Mobile) */}
      {/* ========================================== */}
      <nav className="bg-white border-b border-[#EEE] sticky top-0 z-50 font-sans shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 sm:h-16 lg:h-20">
            {/* Left: Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-xl sm:text-2xl font-black text-[#212121] tracking-tight">
                HRMastery<span className="text-[#008BDC]">.</span>
              </span>
            </div>

            {/* Middle: Desktop Navigation (Hidden on Mobile) */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.name}
                    to={link.to}
                    className={desktopNavClassName}
                    end>
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={18}
                          className={isActive ? "" : "text-gray-400"}
                        />
                        {link.name}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>

            {/* Right: Actions & Profile */}
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Post Job CTA Button (Hidden on Mobile, replaced by Bottom FAB) */}
              <NavLink
                to="/hr/post-job"
                className="hidden md:flex bg-[#008BDC] hover:bg-[#0073B6] text-white px-5 py-2.5 rounded-md text-sm font-semibold shadow-sm items-center justify-center gap-2 transition-all duration-200 active:scale-95">
                <Plus size={18} />
                Post Job
              </NavLink>

              {/* Divider (Desktop Only) */}
              <div className="hidden md:block w-px h-6 bg-[#EEE]"></div>

              {/* Notification Bell */}
              <button
                className="text-[#484848] hover:text-[#008BDC] transition-colors relative p-2 rounded-full hover:bg-blue-50 focus:outline-none"
                aria-label="Notifications">
                <Bell size={20} />
                <span className="absolute top-1.5 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 focus:outline-none rounded-full p-0.5 hover:ring-2 hover:ring-[#008BDC]/20 transition-all"
                  aria-expanded={isProfileOpen}>
                  <img
                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover border border-[#DDD]"
                    src="https://ui-avatars.com/api/?name=Admin+User&background=008BDC&color=fff&font-size=0.35&bold=true"
                    alt="Admin Avatar"
                  />
                </button>

                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-3 w-60 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.08)] bg-white border border-[#EEE] py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-5 py-3 border-b border-[#EEE] mb-1">
                      <p className="text-[15px] font-bold text-[#212121] leading-tight">
                        Admin User
                      </p>
                      <p className="text-[13px] text-gray-500 mt-0.5 truncate font-medium">
                        admin@hrmastery.com
                      </p>
                    </div>
                    <div className="py-1 px-2 space-y-0.5">
                      <NavLink
                        to="/hr/settings"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-[#484848] hover:bg-[#F8F9FA] hover:text-[#008BDC] transition-colors rounded-md"
                        onClick={() => setIsProfileOpen(false)}>
                        <Settings size={16} className="text-gray-400" /> Company
                        Settings
                      </NavLink>
                      <NavLink
                        to="/profile"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-[#484848] hover:bg-[#F8F9FA] hover:text-[#008BDC] transition-colors rounded-md"
                        onClick={() => setIsProfileOpen(false)}>
                        <UserIcon size={16} className="text-gray-400" /> My
                        Profile
                      </NavLink>
                    </div>
                    <div className="border-t border-[#EEE] mt-1 pt-1 px-2 pb-1">
                      <button
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        onClick={() => setIsProfileOpen(false)}>
                        <LogOut size={16} /> Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ========================================== */}
      {/* 2. MOBILE BOTTOM NAVIGATION (App Style) */}
      {/* ========================================== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#EEE] z-[60] pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
        <div className="flex justify-between items-center h-16 px-2 relative">
          {/* Dashboard Tab */}
          <div className="flex-1">
            <NavLink to="/hr" className={mobileTabClassName} end>
              {({ isActive }) => (
                <>
                  <LayoutDashboard
                    size={20}
                    className={isActive ? "fill-[#008BDC]/20" : ""}
                  />
                  <span className="text-[10px] font-bold">Home</span>
                </>
              )}
            </NavLink>
          </div>

          {/* Jobs Tab */}
          <div className="flex-1">
            <NavLink to="/hr/jobs" className={mobileTabClassName}>
              {({ isActive }) => (
                <>
                  <Briefcase
                    size={20}
                    className={isActive ? "fill-[#008BDC]/20" : ""}
                  />
                  <span className="text-[10px] font-bold">Jobs</span>
                </>
              )}
            </NavLink>
          </div>

          {/* Center Floating Action Button (FAB) - Post Job */}
          <div className="flex-1 flex justify-center">
            <NavLink
              to="/hr/post-job"
              className="absolute -top-5 flex items-center justify-center w-14 h-14 bg-[#008BDC] text-white rounded-full shadow-lg border-[4px] border-white active:scale-95 transition-transform">
              <Plus size={24} strokeWidth={3} />
            </NavLink>
            {/* Empty space text to balance the flex container */}
            <span className="text-[10px] font-bold text-transparent mt-8">
              Post
            </span>
          </div>

          {/* Candidates Tab */}
          <div className="flex-1">
            <NavLink to="/hr/candidates" className={mobileTabClassName}>
              {({ isActive }) => (
                <>
                  <Users
                    size={20}
                    className={isActive ? "fill-[#008BDC]/20" : ""}
                  />
                  <span className="text-[10px] font-bold">Applicants</span>
                </>
              )}
            </NavLink>
          </div>

          {/* Settings Tab */}
          <div className="flex-1">
            <NavLink to="/hr/settings" className={mobileTabClassName}>
              {({ isActive }) => (
                <>
                  <Settings
                    size={20}
                    className={isActive ? "fill-[#008BDC]/20" : ""}
                  />
                  <span className="text-[10px] font-bold">Settings</span>
                </>
              )}
            </NavLink>
          </div>
        </div>
      </div>

      {/* Global CSS for Mobile Safe Area padding */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .pb-safe { padding-bottom: max(0.5rem, env(safe-area-inset-bottom)); }
        
        /* Add bottom padding to body on mobile to prevent content from hiding behind nav */
        @media (max-width: 768px) {
          body {
            padding-bottom: 5rem; 
          }
        }
      `,
        }}
      />
    </>
  );
}
