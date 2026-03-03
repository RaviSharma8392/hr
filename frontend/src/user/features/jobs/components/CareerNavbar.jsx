import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { fetchCompanyBranding } from "../../../../candidate/service/companyNavbarService";
import {
  Menu,
  X,
  User,
  LogOut,
  Briefcase,
  Bookmark,
  Bell,
  ChevronDown,
  LayoutGrid,
  ArrowRight,
} from "lucide-react";

export default function CompanyCareerNavbar() {
  const navigate = useNavigate();

  // UI States
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // White-Label Data State
  const [brand, setBrand] = useState(null);

  // Mock User
  const platformUser = JSON.parse(localStorage.getItem("platformUser"));

  /* =====================================================
     1. FETCH BRANDING DATA
  ===================================================== */
  useEffect(() => {
    const loadBrandData = async () => {
      try {
        const data = await fetchCompanyBranding();
        setBrand(data);
      } catch (error) {
        console.error("Failed to load white-label branding", error);
      }
    };
    loadBrandData();
  }, []);

  /* =====================================================
     2. EVENT LISTENERS & SCROLL LOCK
  ===================================================== */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Lock body scroll when mobile menu is open (Native App feel)
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("platformUser");
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  if (!brand)
    return (
      <div className="h-[72px] w-full bg-white border-b border-gray-100 animate-pulse"></div>
    );

  /* =====================================================
     3. DYNAMIC STYLES (White-Labeling)
  ===================================================== */
  const primaryButtonStyle = {
    backgroundColor: brand.themeColor,
    color: "#ffffff",
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
          isScrolled || menuOpen
            ? "bg-white/90 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border-b border-gray-200/50"
            : "bg-white border-b border-gray-200"
        }`}>
        {/* max-w-[1440px] gives it that wide, expansive Big-Tech feel */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-[64px] lg:h-[72px] flex items-center justify-between">
          {/* ================= LEFT: BRAND LOGO (Meta Style) ================= */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center group active:scale-[0.98] transition-transform z-50">
            {brand.logo ? (
              <img
                src={brand.logo}
                alt={`${brand.name} Careers`}
                className="h-6 lg:h-7 w-auto object-contain max-w-[180px]"
              />
            ) : (
              <span
                className="text-[18px] font-black tracking-tight"
                style={{ color: brand.themeColor }}>
                {brand.name}
              </span>
            )}

            {/* Minimalist Divider */}
            <div className="h-5 w-px bg-gray-300 mx-3 lg:mx-4 group-hover:bg-gray-400 transition-colors" />

            <span className="text-[16px] lg:text-[17px] font-medium text-gray-800 tracking-tight">
              Careers
            </span>
          </Link>

          {/* ================= CENTER: DESKTOP NAV ================= */}
          <div className="hidden lg:flex items-center h-full absolute left-1/2 -translate-x-1/2">
            {brand.careersNav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="group relative flex items-center h-full px-5 text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors">
                {({ isActive }) => (
                  <>
                    <span
                      className={isActive ? "text-gray-900 font-semibold" : ""}>
                      {item.label}
                    </span>

                    {/* Big-Tech Thick Animated Underline */}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[3px] rounded-t-full transition-transform duration-300 ease-out origin-left ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                      style={{ backgroundColor: brand.themeColor }}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* ================= RIGHT: ACTIONS ================= */}
          <div className="flex items-center gap-5 z-50">
            {platformUser ? (
              <div
                className="hidden lg:flex items-center gap-2 relative"
                ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 py-1.5 pl-1.5 pr-3 rounded-full hover:bg-gray-100 transition-colors focus:outline-none ring-1 ring-transparent hover:ring-gray-200">
                  <img
                    src={`https://ui-avatars.com/api/?name=${platformUser.name.replace(" ", "+")}&background=F3F4F6&color=484848&bold=true`}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full border border-gray-200 object-cover"
                  />
                  <span className="text-[14.5px] font-semibold text-gray-800">
                    {platformUser.name.split(" ")[0]}
                  </span>
                  <ChevronDown
                    size={16}
                    strokeWidth={2.5}
                    className={`text-gray-500 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Highly Polished Profile Dropdown */}
                {dropdownOpen && (
                  <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.12)] ring-1 ring-gray-100 py-2 animate-in fade-in zoom-in-[0.98] duration-200 origin-top-right">
                    <div className="px-5 py-3 border-b border-gray-100 mb-2">
                      <p className="text-[15px] font-bold text-gray-900 truncate">
                        {platformUser.name}
                      </p>
                      <p className="text-[13px] text-gray-500 font-medium mt-0.5">
                        Candidate Portal
                      </p>
                    </div>
                    <Link
                      to="/candidate/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-5 py-2.5 text-[14.5px] font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                      <LayoutGrid size={18} className="text-gray-400" />{" "}
                      Dashboard
                    </Link>
                    <Link
                      to="/candidate/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-5 py-2.5 text-[14.5px] font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                      <User size={18} className="text-gray-400" /> My Profile
                    </Link>
                    <Link
                      to="/candidate/saved"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-5 py-2.5 text-[14.5px] font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                      <Bookmark size={18} className="text-gray-400" /> Saved
                      Jobs
                    </Link>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-5 py-2.5 text-[14.5px] font-semibold text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut size={18} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-[15px] font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-semibold transition-all hover:shadow-lg hover:-translate-y-[1px]"
                  style={primaryButtonStyle}>
                  Join Network{" "}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            )}

            {/* Mobile Hamburger (Animated) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 -mr-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors focus:outline-none">
              {menuOpen ? (
                <X size={26} strokeWidth={2} />
              ) : (
                <Menu size={26} strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU (Full Screen Takeover) ================= */}
      {/* This mimics the Google/Meta mobile drawer behavior */}
      <div
        className={`fixed inset-0 top-[64px] z-40 bg-white lg:hidden transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] overflow-y-auto ${
          menuOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0 pointer-events-none"
        }`}>
        <div className="flex flex-col min-h-full px-6 py-8 pb-safe">
          {/* Main Links */}
          <div className="flex flex-col gap-2">
            {brand.careersNav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center justify-between py-4 text-[20px] tracking-tight font-semibold border-b border-gray-100 transition-colors ${
                    isActive
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                  }`
                }>
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: brand.themeColor }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* User Actions at bottom of mobile menu */}
          <div className="mt-auto pt-10">
            {platformUser ? (
              <div className="bg-gray-50 rounded-3xl p-6">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={`https://ui-avatars.com/api/?name=${platformUser.name.replace(" ", "+")}&background=E5E7EB&color=484848&bold=true`}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="text-[18px] font-bold text-gray-900">
                      {platformUser.name}
                    </p>
                    <p className="text-[14px] text-gray-500 font-medium">
                      Candidate Portal
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    to="/candidate/dashboard"
                    onClick={closeMenu}
                    className="flex items-center gap-3 py-3 text-[16px] font-semibold text-gray-700 active:text-gray-900">
                    <LayoutGrid size={20} className="text-gray-400" /> Dashboard
                  </Link>
                  <Link
                    to="/candidate/profile"
                    onClick={closeMenu}
                    className="flex items-center gap-3 py-3 text-[16px] font-semibold text-gray-700 active:text-gray-900">
                    <User size={20} className="text-gray-400" /> Profile
                  </Link>
                  <Link
                    to="/candidate/saved"
                    onClick={closeMenu}
                    className="flex items-center gap-3 py-3 text-[16px] font-semibold text-gray-700 active:text-gray-900">
                    <Bookmark size={20} className="text-gray-400" /> Saved Jobs
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="mt-4 w-full bg-red-100/50 text-red-600 py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 active:scale-95 transition-transform text-[16px]">
                    <LogOut size={20} /> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="flex justify-center items-center gap-2 py-4 rounded-2xl text-[16px] font-bold shadow-md active:scale-95 transition-transform"
                  style={primaryButtonStyle}>
                  Join Talent Network <ArrowRight size={18} />
                </Link>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex justify-center py-4 text-[16px] font-bold text-gray-700 border-2 border-gray-200 rounded-2xl active:bg-gray-50 transition-colors">
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding behind the fixed navbar */}
      <div className="h-[64px] lg:h-[72px] w-full" />

      <style
        dangerouslySetInnerHTML={{
          __html: `.pb-safe { padding-bottom: max(3rem, env(safe-area-inset-bottom)); }`,
        }}
      />
    </>
  );
}
