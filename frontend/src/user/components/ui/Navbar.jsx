import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Layout,
  Briefcase,
  BookOpen,
  CreditCard,
  User,
  Building2,
} from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const loginDropdownRef = useRef(null);

  // Close desktop login dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        loginDropdownRef.current &&
        !loginDropdownRef.current.contains(event.target)
      ) {
        setIsLoginDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- DESKTOP STYLES ---
  const getDesktopNavLinkClass = ({ isActive }) =>
    `text-[15px] font-semibold transition-colors duration-200 flex items-center gap-1 ${
      isActive ? "text-[#008BDC]" : "text-[#484848] hover:text-[#008BDC]"
    }`;

  // --- MOBILE STYLES ---
  const getMobileNavLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3.5 rounded-md text-[15px] font-semibold transition-colors ${
      isActive
        ? "text-[#008BDC] bg-blue-50/50"
        : "text-[#484848] hover:text-[#008BDC] hover:bg-[#F8F9FA]"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#EEE] transition-all duration-300 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center w-full">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className="bg-[#008BDC] p-1.5 rounded-md text-white shadow-sm">
            <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-[#212121] tracking-tight">
            HRMastery<span className="text-[#008BDC]">.</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/platform" className={getDesktopNavLinkClass}>
            Platform
          </NavLink>
          <NavLink to="/solutions" className={getDesktopNavLinkClass}>
            Solutions <ChevronDown size={16} className="mt-0.5 text-gray-400" />
          </NavLink>
          <NavLink to="/resources" className={getDesktopNavLinkClass}>
            Resources
          </NavLink>
          <NavLink to="/pricing" className={getDesktopNavLinkClass}>
            Pricing
          </NavLink>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-5">
          {/* MULTI-USER LOGIN DROPDOWN */}
          <div className="relative" ref={loginDropdownRef}>
            <button
              onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
              className={`flex items-center gap-1 text-[15px] font-bold transition-colors duration-200 ${isLoginDropdownOpen ? "text-[#008BDC]" : "text-[#484848] hover:text-[#008BDC]"}`}>
              Log in{" "}
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${isLoginDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isLoginDropdownOpen && (
              <div className="absolute right-0 top-full mt-4 w-56 bg-white border border-[#EEE] rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.08)] py-2 animate-in fade-in zoom-in-95 duration-200">
                <Link
                  to="/candidate/login"
                  onClick={() => setIsLoginDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#F8F9FA] transition-colors group">
                  <div className="bg-blue-50 text-[#008BDC] p-1.5 rounded-md group-hover:bg-[#008BDC] group-hover:text-white transition-colors">
                    <User size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#212121]">
                      Candidate
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium">
                      Find jobs & apply
                    </span>
                  </div>
                </Link>

                <div className="h-px bg-[#EEE] my-1 mx-4"></div>

                <Link
                  to="/hr/login"
                  onClick={() => setIsLoginDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#F8F9FA] transition-colors group">
                  <div className="bg-orange-50 text-orange-500 p-1.5 rounded-md group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Building2 size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#212121]">
                      Employer / HR
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium">
                      Post jobs & hire
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Employer Signup CTA */}
          <Link
            to="/free-trial"
            className="bg-[#008BDC] text-white px-6 py-2.5 rounded-md text-[14px] font-bold hover:bg-[#0073B6] shadow-sm active:scale-95 transition-all duration-200">
            Hire Talent
          </Link>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          className="md:hidden p-2 -mr-2 text-[#484848] hover:text-[#008BDC] hover:bg-gray-50 rounded-md transition-colors focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-[#EEE] shadow-[0_10px_20px_rgba(0,0,0,0.05)] animate-in slide-in-from-top-2 duration-200 z-40">
          <div className="px-4 py-4 space-y-1">
            <NavLink
              to="/platform"
              onClick={() => setIsMobileMenuOpen(false)}
              className={getMobileNavLinkClass}>
              <Layout size={18} className="text-gray-400" /> Platform
            </NavLink>
            <NavLink
              to="/solutions"
              onClick={() => setIsMobileMenuOpen(false)}
              className={getMobileNavLinkClass}>
              <Briefcase size={18} className="text-gray-400" /> Solutions
            </NavLink>
            <NavLink
              to="/resources"
              onClick={() => setIsMobileMenuOpen(false)}
              className={getMobileNavLinkClass}>
              <BookOpen size={18} className="text-gray-400" /> Resources
            </NavLink>
            <NavLink
              to="/pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className={getMobileNavLinkClass}>
              <CreditCard size={18} className="text-gray-400" /> Pricing
            </NavLink>
          </div>

          {/* Mobile Bottom Actions (Split for Multi-User) */}
          <div className="px-4 pt-4 pb-6 bg-[#F8F9FA] border-t border-[#EEE] flex flex-col space-y-3">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">
              Log in as
            </p>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/candidate/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full text-[13px] font-bold text-[#484848] py-3 bg-white border border-[#DDD] rounded-md hover:border-[#008BDC] hover:text-[#008BDC] shadow-sm transition-all">
                <User size={16} /> Candidate
              </Link>
              <Link
                to="/hr/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full text-[13px] font-bold text-[#484848] py-3 bg-white border border-[#DDD] rounded-md hover:border-orange-500 hover:text-orange-500 shadow-sm transition-all">
                <Building2 size={16} /> Employer
              </Link>
            </div>

            <Link
              to="/free-trial"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 text-center w-full bg-[#008BDC] text-white px-6 py-3 rounded-md text-[15px] font-bold shadow-sm active:scale-95 transition-all">
              Start free trial
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
