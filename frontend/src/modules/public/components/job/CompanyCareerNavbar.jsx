import React, { useState, useRef, useEffect, useCallback } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { fetchCompanyBranding } from "../../services/branding/companyNavbarService";
import {
  Menu,
  X,
  User,
  LogOut,
  Briefcase,
  Bookmark,
  ChevronDown,
  Globe,
  LayoutGrid,
  Building2,
} from "lucide-react";

/* ================= DARWINBOX-STYLE BRANDING ================= */
const FALLBACK_BRANDING = {
  themeColor: "#E40000", // Corporate Red (Airtel style)
  themeColorLight: "#FDECEC",
  backgroundColor: "#FFFFFF", // General background, often for elements that stand out
  surfaceColor: "#F4F5F7", // Default page background
  textColor: "#333333",
  headingColor: "#222222",
  mutedTextColor: "#666666",
  borderColor: "#DEDEDE",
  borderRadius: "4px", // Crisp, small borders
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  name: "Company",
  logo: null,
  careersNav: [
    { label: "Home", path: "/" },
    { label: "Open Jobs", path: "/jobs" },
  ],
  features: { showLogin: true }, // Placeholder for feature flags
};

export default function CompanyCareerNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // UI States
  const [menuOpen, setMenuOpen] = useState(false); // Controls mobile drawer
  const [dropdownOpen, setDropdownOpen] = useState(false); // Controls user dropdown
  const dropdownRef = useRef(null); // Ref for user dropdown content
  const userDropdownButtonRef = useRef(null); // Ref for user dropdown toggle button

  const [brand, setBrand] = useState(null); // Branding data

  // Safely parse user from local storage
  const [platformUser, setPlatformUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("platformUser");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      console.error("Failed to parse platformUser from localStorage");
      return null;
    }
  });

  /* ================= FETCH BRANDING ================= */
  useEffect(() => {
    const loadBrandData = async () => {
      try {
        const data = await fetchCompanyBranding();
        if (data) setBrand({ ...FALLBACK_BRANDING, ...data });
        else setBrand(FALLBACK_BRANDING); // Fallback if no data
      } catch (error) {
        console.error("Failed to load branding", error);
        setBrand(FALLBACK_BRANDING); // Fallback on error
      }
    };
    loadBrandData();
  }, []);

  /* ================= EVENT LISTENERS ================= */
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        userDropdownButtonRef.current &&
        !userDropdownButtonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  // Close menus/dropdowns on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("platformUser");
    setPlatformUser(null);
    navigate("/login"); // Redirect to login after logout
    setDropdownOpen(false); // Close dropdown after logout
  }, [navigate]);

  const closeMobileMenu = useCallback(() => setMenuOpen(false), []);
  const toggleDropdown = useCallback(
    () => setDropdownOpen((prev) => !prev),
    [],
  );

  // Initial Loading State for the Navbar
  if (!brand)
    return (
      <div className="fixed top-0 left-0 right-0 z-50 h-16 w-full bg-white border-b border-gray-200 animate-pulse">
        <span className="sr-only">Loading navigation...</span>
      </div>
    );

  return (
    <>
      <nav
        aria-label="Main Navigation"
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b h-16 flex items-center justify-between px-4 sm:px-6 transition-all shadow-sm" // Added shadow
        style={{
          fontFamily: brand.fontFamily,
          borderColor: brand.borderColor,
        }}>
        <div className="flex items-center h-full w-full max-w-[1440px] mx-auto justify-between">
          {/* ================= LEFT: LOGO & NAV LINKS ================= */}
          <div className="flex items-center h-full">
            {/* Logo */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="mr-4 sm:mr-8 flex items-center gap-2 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded-sm">
              {" "}
              {/* Added focus styles */}
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={`${brand.name} Careers logo`}
                  className="h-8 w-auto object-contain max-h-full"
                />
              ) : (
                <>
                  <Building2 size={28} style={{ color: brand.themeColor }} />
                  <span
                    className="font-bold text-lg hidden sm:inline-block" // Hidden on xs, inline-block on sm+
                    style={{ color: brand.themeColor }}>
                    {brand.name}
                  </span>
                </>
              )}
            </Link>

            {/* Desktop Nav Links (Hidden on mobile) */}
            <div className="hidden md:flex h-full items-center">
              {brand.careersNav.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={
                    ({ isActive }) =>
                      `px-5 h-full flex items-center text-[15px] font-medium transition-colors duration-200 relative group outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-400 rounded-sm mx-1` // Added focus styles
                  }
                  style={({ isActive }) => ({
                    color: isActive ? brand.themeColor : brand.textColor, // Active text color
                  })}>
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {/* Underline effect for active link */}
                      {isActive && (
                        <span
                          className="absolute bottom-0 left-0 right-0 h-0.5"
                          style={{ backgroundColor: brand.themeColor }}
                        />
                      )}
                      {/* Hover effect for non-active links */}
                      {!isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-gray-200 transition-colors duration-200" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ================= RIGHT: ACTIONS ================= */}
          <div className="flex items-center gap-2 sm:gap-4 h-full">
            {" "}
            {/* Adjusted gap for better mobile spacing */}
            {/* Language Selector (Hidden on xs, visible on sm+) */}
            <button
              aria-expanded={dropdownOpen} // Indicates whether dropdown is open
              aria-controls="language-menu" // Connects button to menu for screen readers
              className="hidden sm:flex items-center gap-1.5 text-[14px] font-medium cursor-pointer hover:opacity-80 transition-opacity outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded-sm py-2 px-1"
              style={{ color: brand.textColor }}>
              <Globe size={16} /> EN <ChevronDown size={14} />
              <span className="sr-only">Select language</span>
            </button>
            {platformUser ? (
              /* --- LOGGED IN USER DROPDOWN --- */
              <div className="relative flex items-center h-full">
                <button
                  ref={userDropdownButtonRef}
                  onClick={toggleDropdown}
                  aria-haspopup="true" // Indicates a popup menu
                  aria-expanded={dropdownOpen} // Indicates whether dropdown is open
                  aria-controls="user-menu" // Connects button to menu for screen readers
                  className="flex items-center gap-1 sm:gap-2 p-1.5 pr-2 rounded border hover:bg-gray-50 transition-colors bg-white outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                  style={{ borderColor: brand.borderColor }}>
                  <div
                    className="w-7 h-7 flex items-center justify-center text-white font-bold text-[12px] rounded-full flex-shrink-0" // Changed to rounded-full for avatar
                    style={{ backgroundColor: brand.themeColor }}>
                    {platformUser.name ? (
                      platformUser.name.charAt(0).toUpperCase()
                    ) : (
                      <User size={14} />
                    )}
                  </div>
                  <span
                    className="hidden sm:block text-[14px] font-medium max-w-[80px] truncate" // Adjusted max-width for name
                    style={{ color: brand.textColor }}>
                    {platformUser.name?.split(" ")[0]}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : "rotate-0"}`} // Rotate arrow
                    style={{ color: brand.mutedTextColor }}
                  />
                  <span className="sr-only">User menu</span>
                </button>

                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    id="user-menu" // Link to aria-controls
                    role="menu" // Indicates this is a menu
                    className="absolute top-[calc(100%+8px)] right-0 w-60 bg-white border rounded shadow-lg py-2 origin-top-right animate-fade-in-up" // Adjusted top, added animation
                    style={{ borderColor: brand.borderColor }}>
                    <div
                      className="px-4 py-3 mb-1 border-b bg-gray-50/50"
                      style={{ borderColor: brand.borderColor }}>
                      <p
                        className="text-[14px] font-bold truncate"
                        style={{ color: brand.headingColor }}>
                        {platformUser.name}
                      </p>
                      <p
                        className="text-[12px] truncate"
                        style={{ color: brand.mutedTextColor }}>
                        {platformUser.email}
                      </p>
                    </div>
                    <Link
                      to="/candidate/dashboard"
                      role="menuitem" // Mark as menu item
                      className="flex items-center gap-3 px-4 py-2.5 text-[14px] hover:bg-gray-50 transition-colors duration-150 outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-400"
                      style={{ color: brand.textColor }}>
                      <LayoutGrid
                        size={16}
                        style={{ color: brand.mutedTextColor }}
                      />{" "}
                      Dashboard
                    </Link>
                    <Link
                      to="/candidate/applications"
                      role="menuitem"
                      className="flex items-center gap-3 px-4 py-2.5 text-[14px] hover:bg-gray-50 transition-colors duration-150 outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-400"
                      style={{ color: brand.textColor }}>
                      <Briefcase
                        size={16}
                        style={{ color: brand.mutedTextColor }}
                      />{" "}
                      My Applications
                    </Link>
                    <Link
                      to="/candidate/saved"
                      role="menuitem"
                      className="flex items-center gap-3 px-4 py-2.5 text-[14px] hover:bg-gray-50 transition-colors duration-150 outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-400"
                      style={{ color: brand.textColor }}>
                      <Bookmark
                        size={16}
                        style={{ color: brand.mutedTextColor }}
                      />{" "}
                      Saved Jobs
                    </Link>
                    <div className="h-px bg-gray-200 my-1" />
                    <button
                      onClick={handleLogout}
                      role="menuitem"
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-red-600 hover:bg-red-50 transition-colors duration-150 text-left outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-400 rounded-b">
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* --- GUEST SIGN IN (Hidden on mobile nav) --- */
              <Link
                to="/login"
                className="hidden md:flex px-5 py-2.5 text-white text-[14px] font-semibold transition-all hover:opacity-90 active:scale-95 items-center justify-center rounded-md outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                style={{
                  backgroundColor: brand.themeColor,
                  borderRadius: brand.borderRadius,
                }}>
                Sign In
              </Link>
            )}
            {/* --- MOBILE HAMBURGER --- */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open mobile menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="md:hidden p-2 -mr-2 text-gray-700 hover:bg-gray-100 rounded transition-colors duration-150 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE SLIDE-IN DRAWER ================= */}
      <div
        id="mobile-menu" // Linked to aria-controls
        role="dialog" // Indicates a dialog
        aria-modal="true" // Indicates a modal dialog
        className={`fixed inset-0 z-[100] md:hidden flex justify-end transition-opacity duration-300 ease-out ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible" // Use visible/invisible for better screen reader experience
        }`}>
        <div
          className="absolute inset-0 bg-black/50"
          onClick={closeMobileMenu}
          aria-hidden="true" // Hide overlay from screen readers
        />

        <div
          className={`relative w-[80%] max-w-[300px] h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ fontFamily: brand.fontFamily }}>
          {/* Drawer Header */}
          <div
            className="flex items-center justify-between p-4 sm:p-5 border-b" // Adjusted padding
            style={{ borderColor: brand.borderColor }}>
            {brand.logo ? (
              <img
                src={brand.logo}
                alt={`${brand.name} Careers logo`}
                className="h-7 sm:h-8 object-contain max-h-full"
              />
            ) : (
              <span
                className="text-lg sm:text-xl font-bold"
                style={{ color: brand.themeColor }}>
                {brand.name}
              </span>
            )}
            <button
              onClick={closeMobileMenu}
              aria-label="Close mobile menu"
              className="p-1.5 hover:bg-gray-100 rounded transition-colors duration-150 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
              <X size={24} style={{ color: brand.mutedTextColor }} />
            </button>
          </div>

          {/* Drawer Body - Scrollable Area */}
          <div className="flex-1 overflow-y-auto">
            {/* Mobile Nav Links */}
            <div
              role="menu" // Main navigation links as a menu
              className="flex flex-col py-2 border-b"
              style={{ borderColor: brand.borderColor }}>
              {brand.careersNav.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  role="menuitem" // Mark as menu item
                  className={({ isActive }) =>
                    `px-6 py-3 sm:py-4 text-base sm:text-[16px] font-medium transition-colors duration-150 relative block outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-400`
                  }
                  style={({ isActive }) => ({
                    color: isActive ? brand.themeColor : brand.textColor,
                    backgroundColor: isActive
                      ? brand.themeColorLight
                      : "transparent", // Light background for active
                    borderLeft: isActive
                      ? `4px solid ${brand.themeColor}`
                      : "4px solid transparent", // Left border for active
                  })}>
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile User Section (only if logged in) */}
            {platformUser && (
              <div className="flex flex-col py-2">
                <p
                  className="px-6 py-3 text-xs font-bold uppercase tracking-widest"
                  style={{ color: brand.mutedTextColor }}>
                  My Account
                </p>
                <Link
                  to="/candidate/dashboard"
                  onClick={closeMobileMenu}
                  role="menuitem"
                  className="flex items-center gap-3 px-6 py-3 text-[15px] hover:bg-gray-50 transition-colors duration-150 outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-400"
                  style={{ color: brand.textColor }}>
                  <LayoutGrid
                    size={18}
                    style={{ color: brand.mutedTextColor }}
                  />{" "}
                  Dashboard
                </Link>
                <Link
                  to="/candidate/applications"
                  onClick={closeMobileMenu}
                  role="menuitem"
                  className="flex items-center gap-3 px-6 py-3 text-[15px] hover:bg-gray-50 transition-colors duration-150 outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-400"
                  style={{ color: brand.textColor }}>
                  <Briefcase
                    size={18}
                    style={{ color: brand.mutedTextColor }}
                  />{" "}
                  Applications
                </Link>
                <Link
                  to="/candidate/saved"
                  onClick={closeMobileMenu}
                  role="menuitem"
                  className="flex items-center gap-3 px-6 py-3 text-[15px] hover:bg-gray-50 transition-colors duration-150 outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-400"
                  style={{ color: brand.textColor }}>
                  <Bookmark size={18} style={{ color: brand.mutedTextColor }} />{" "}
                  Saved Jobs
                </Link>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          <div
            className="p-4 sm:p-5 border-t" // Adjusted padding
            style={{ borderColor: brand.borderColor }}>
            {platformUser ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 rounded border hover:bg-gray-50 transition-colors duration-150 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                style={{
                  borderColor: brand.borderColor,
                  color: brand.textColor,
                }}>
                <LogOut size={18} /> Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="w-full flex items-center justify-center py-3 text-white text-[15px] font-semibold transition-all hover:opacity-90 active:scale-95 rounded-md outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                style={{
                  backgroundColor: brand.themeColor,
                  borderRadius: brand.borderRadius,
                }}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding under fixed nav */}
      <div className="h-16 w-full" aria-hidden="true" />
    </>
  );
}
