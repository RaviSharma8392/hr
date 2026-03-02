import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, Briefcase } from "lucide-react";

const InternshalaCareerNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Internshala uses a clean blue for active states and standard gray for others
  const linkClass = ({ isActive }) =>
    `block py-2 text-sm font-medium transition-all duration-200 hover:text-[#008bdc] ${
      isActive
        ? "text-[#008bdc] border-b-2 border-[#008bdc] md:py-[22px]"
        : "text-gray-600 md:py-[22px] border-b-2 border-transparent"
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-[#008bdc] p-1.5 rounded text-white group-hover:bg-[#0073b6] transition-colors">
            <Briefcase className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            HRMastery.<span className="text-[#008bdc]">Careers</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 h-full">
          <NavLink to="/jobs" className={linkClass}>
            Open Roles
          </NavLink>
          <NavLink to="/teams" className={linkClass}>
            Teams
          </NavLink>
          <NavLink to="/culture" className={linkClass}>
            Our Culture
          </NavLink>
          <NavLink to="/benefits" className={linkClass}>
            Benefits
          </NavLink>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-5">
          <Link
            to="/login"
            className="hidden sm:block text-sm font-semibold text-gray-500 hover:text-[#008bdc] transition-colors">
            Login
          </Link>

          {/* Internshala Style Outline Button */}
          <Link
            to="/jobs"
            className="hidden sm:inline-block border-2 border-[#008bdc] text-[#008bdc] px-6 py-2 rounded font-bold text-sm hover:bg-blue-50 transition-all active:scale-95">
            Register Now
          </Link>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-600 focus:outline-none p-1">
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-down */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white ${
          menuOpen
            ? "max-h-[500px] border-t border-gray-100 shadow-inner"
            : "max-h-0"
        }`}>
        <div className="px-6 py-6 space-y-4">
          <NavLink
            to="/jobs"
            onClick={() => setMenuOpen(false)}
            className="block text-base font-semibold text-gray-700 hover:text-[#008bdc]">
            Open Roles
          </NavLink>
          <NavLink
            to="/teams"
            onClick={() => setMenuOpen(false)}
            className="block text-base font-semibold text-gray-700 hover:text-[#008bdc]">
            Teams
          </NavLink>
          <NavLink
            to="/culture"
            onClick={() => setMenuOpen(false)}
            className="block text-base font-semibold text-gray-700 hover:text-[#008bdc]">
            Our Culture
          </NavLink>
          <NavLink
            to="/benefits"
            onClick={() => setMenuOpen(false)}
            className="block text-base font-semibold text-gray-700 hover:text-[#008bdc]">
            Benefits
          </NavLink>

          <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-center py-2 text-base font-bold text-gray-600">
              Candidate Login
            </Link>

            <Link
              to="/jobs"
              onClick={() => setMenuOpen(false)}
              className="bg-[#008bdc] text-white text-center py-3 rounded font-bold hover:bg-[#0073b6] transition-all shadow-md">
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default InternshalaCareerNavbar;
