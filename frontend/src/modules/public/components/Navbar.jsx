import React, { useState, useRef, useEffect, useCallback } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Briefcase, // Used for HRMastery logo
  User,
  Building2,
  Globe,
  Bot,
  Calendar,
  LayoutDashboard,
  PlayCircle,
  BarChart2, // Alternative for Solutions or Analytics if desired
  DollarSign, // Alternative for Pricing
  Target, // Another option for solutions
} from "lucide-react";

/* =========================================================================
   1. DESKTOP B2B NAVIGATION (Optimized for larger screens)
========================================================================= */
const DesktopNav = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isPlatformHovered, setIsPlatformHovered] = useState(false);
  const loginRef = useRef(null); // Ref for login dropdown container
  const platformRef = useRef(null); // Ref for platform mega-menu container
  const loginButtonRef = useRef(null); // Ref for login button
  const platformButtonRef = useRef(null); // Ref for platform button

  // Handle keyboard navigation for the "Our Platform" mega-menu
  const handlePlatformKeyDown = useCallback((event) => {
    if (event.key === "Escape") {
      setIsPlatformHovered(false);
      platformButtonRef.current?.focus(); // Return focus to the button
    }
  }, []);

  // Handle keyboard navigation for the "Login" dropdown
  const handleLoginKeyDown = useCallback((event) => {
    if (event.key === "Escape") {
      setIsLoginOpen(false);
      loginButtonRef.current?.focus(); // Return focus to the button
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Close Login dropdown
      if (
        loginRef.current &&
        !loginRef.current.contains(e.target) &&
        loginButtonRef.current &&
        !loginButtonRef.current.contains(e.target)
      ) {
        setIsLoginOpen(false);
      }
      // Close Platform mega-menu
      if (
        platformRef.current &&
        !platformRef.current.contains(e.target) &&
        platformButtonRef.current &&
        !platformButtonRef.current.contains(e.target)
      ) {
        setIsPlatformHovered(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkBaseClasses =
    "relative flex items-center gap-1 text-[15px] font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200 py-6 group h-full outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-blue-400 rounded-sm";

  // Function to determine NavLink styling (for Solutions/Pricing)
  const activeNavLinkClass = useCallback(
    ({ isActive }) => {
      const activeColor = isActive ? "text-gray-900" : "text-gray-600";
      return `${navLinkBaseClasses} ${activeColor}`;
    },
    [navLinkBaseClasses],
  );

  return (
    <nav
      aria-label="Desktop Main Navigation"
      className="hidden lg:flex w-full items-center justify-between max-w-7xl mx-auto px-6 h-16" // Fixed height for consistency
    >
      {/* Brand Logo and Name */}
      <Link
        to="/"
        className="flex items-center gap-2.5 hover:opacity-90 transition-opacity duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 rounded-sm">
        <div className="bg-[#008BDC] p-2 rounded-xl text-white shadow-lg shadow-[#008BDC]/20">
          <Briefcase size={20} strokeWidth={2.5} />
        </div>
        <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
          HRMastery<span className="text-[#008BDC]">.</span>
        </span>
      </Link>

      {/* Main Links with Mega Menu */}
      <div className="flex items-center gap-8 h-full">
        {/* PLATFORM MEGA MENU */}
        <div
          className="group relative h-full flex items-center" // Align button vertically
          onMouseEnter={() => setIsPlatformHovered(true)}
          onMouseLeave={() => setIsPlatformHovered(false)}
          onFocusCapture={() => setIsPlatformHovered(true)} // For keyboard navigation
          onBlurCapture={() =>
            setTimeout(() => {
              // Delay to allow focus to shift within menu
              if (!platformRef.current?.contains(document.activeElement)) {
                setIsPlatformHovered(false);
              }
            }, 100)
          }
          ref={platformRef}>
          <button
            ref={platformButtonRef}
            className={navLinkBaseClasses}
            aria-expanded={isPlatformHovered}
            aria-haspopup="menu" // Indicates a menu
            aria-controls="platform-menu"
            onKeyDown={handlePlatformKeyDown}>
            Our Platform{" "}
            <ChevronDown
              size={16}
              strokeWidth={2.5}
              className={`transition-transform duration-300 ${
                isPlatformHovered ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Mega-Menu Dropdown Card */}
          <div
            id="platform-menu"
            role="menu" // Mark as a menu
            className={`absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[600px] bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100 p-3 overflow-hidden transition-all duration-300 ease-out z-50 transform
              ${isPlatformHovered ? "opacity-100 visible translate-y-2" : "opacity-0 invisible translate-y-0"}`}
            onKeyDown={handlePlatformKeyDown} // Trap keyboard navigation
          >
            <div className="grid grid-cols-2 gap-2">
              {/* Feature 1: White Label Pages (Your core business) */}
              <Link
                to="/features/white-label"
                onClick={() => setIsPlatformHovered(false)}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-150 group outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
                role="menuitem" // Mark as menu item
              >
                <div className="bg-blue-50 text-[#008BDC] p-2.5 rounded-lg shrink-0 group-hover:bg-[#008BDC] group-hover:text-white transition-colors duration-150">
                  <Globe size={22} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-gray-900 mb-0.5">
                    White-Label Careers
                  </h4>
                  <p className="text-[13px] text-gray-500 font-medium leading-snug">
                    Custom career pages that match your company's brand
                    perfectly.
                  </p>
                </div>
              </Link>

              {/* Feature 2: ATS */}
              <Link
                to="/features/ats"
                onClick={() => setIsPlatformHovered(false)}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-150 group outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
                role="menuitem">
                <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-lg shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-150">
                  <LayoutDashboard size={22} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-gray-900 mb-0.5">
                    Applicant Tracking
                  </h4>
                  <p className="text-[13px] text-gray-500 font-medium leading-snug">
                    Manage your entire hiring pipeline from one dashboard.
                  </p>
                </div>
              </Link>

              {/* Feature 3: AI Screening */}
              <Link
                to="/features/ai"
                onClick={() => setIsPlatformHovered(false)}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-150 group outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
                role="menuitem">
                <div className="bg-purple-50 text-purple-600 p-2.5 rounded-lg shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-150">
                  <Bot size={22} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-gray-900 mb-0.5">
                    AI Resume Parsing
                  </h4>
                  <p className="text-[13px] text-gray-500 font-medium leading-snug">
                    Automatically screen and rank candidates using AI.
                  </p>
                </div>
              </Link>

              {/* Feature 4: Scheduling */}
              <Link
                to="/features/scheduling"
                onClick={() => setIsPlatformHovered(false)}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-150 group outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
                role="menuitem">
                <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-lg shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-150">
                  <Calendar size={22} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-gray-900 mb-0.5">
                    Smart Scheduling
                  </h4>
                  <p className="text-[13px] text-gray-500 font-medium leading-snug">
                    Automated interview booking synced with your calendar.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Regular NavLinks */}
        <NavLink to="/solutions" className={activeNavLinkClass}>
          Solutions
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#008BDC] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />{" "}
          {/* Underline effect */}
        </NavLink>
        <NavLink to="/pricing" className={activeNavLinkClass}>
          Pricing
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#008BDC] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
        </NavLink>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Dual Login Dropdown */}
        <div className="relative" ref={loginRef}>
          <button
            ref={loginButtonRef}
            onClick={() => setIsLoginOpen(!isLoginOpen)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[15px] font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 ${
              // Enhanced focus ring
              isLoginOpen
                ? "bg-gray-100 text-gray-900 shadow-sm"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
            aria-expanded={isLoginOpen}
            aria-haspopup="menu"
            aria-controls="login-menu"
            onKeyDown={handleLoginKeyDown}>
            Log in
            <ChevronDown
              size={16}
              strokeWidth={2.5}
              className={`transition-transform duration-200 ${
                isLoginOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            id="login-menu"
            role="menu" // Mark as a menu
            className={`absolute right-0 top-full mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.08)] py-2 transition-all duration-200 ease-out transform origin-top-right
              ${isLoginOpen ? "opacity-100 visible translate-y-0 scale-100" : "opacity-0 invisible -translate-y-2 scale-95"}`}
            onKeyDown={handleLoginKeyDown} // Trap keyboard navigation
          >
            <Link
              to="/candidate/login"
              onClick={() => setIsLoginOpen(false)}
              className="flex items-start gap-3 px-5 py-3 hover:bg-gray-50 transition-colors duration-150 group outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-blue-400"
              role="menuitem">
              <div className="bg-blue-50 text-[#008BDC] p-2 rounded-lg group-hover:bg-[#008BDC] group-hover:text-white transition-colors duration-150">
                <User size={18} strokeWidth={2.5} />
              </div>
              <div>
                <span className="block text-[15px] font-bold text-gray-900">
                  Job Seeker
                </span>
                <span className="block text-[12px] text-gray-500 font-medium">
                  Find jobs & apply easily
                </span>
              </div>
            </Link>
            <div className="h-px bg-gray-100 my-1 mx-4" />
            <Link
              to="/hr/login"
              onClick={() => setIsLoginOpen(false)}
              className="flex items-start gap-3 px-5 py-3 hover:bg-gray-50 transition-colors duration-150 group outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-blue-400"
              role="menuitem">
              <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-150">
                <Building2 size={18} strokeWidth={2.5} />
              </div>
              <div>
                <span className="block text-[15px] font-bold text-gray-900">
                  Employer / HR
                </span>
                <span className="block text-[12px] text-gray-500 font-medium">
                  Manage your talent pipeline
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* B2B Primary CTA */}
        <Link
          to="/book-demo"
          className="group flex items-center gap-2 bg-[#008BDC] text-white px-6 py-2.5 rounded-full text-[15px] font-bold hover:bg-[#0073B6] shadow-[0_8px_20px_rgba(0,139,220,0.25)] active:scale-[0.97] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400">
          Book a Demo
          <PlayCircle
            size={16}
            strokeWidth={2.5}
            className="group-hover:scale-110 transition-transform duration-200"
          />
        </Link>
      </div>
    </nav>
  );
};

/* =========================================================================
   2. MOBILE B2B NAVIGATION (Optimized for smaller screens)
========================================================================= */
const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false); // Controls mobile drawer
  const [platformOpen, setPlatformOpen] = useState(false); // Controls platform accordion
  const location = useLocation(); // To close menu on route change
  const menuContentRef = useRef(null); // Ref for mobile menu content for focus trapping
  const menuButtonRef = useRef(null); // Ref for the hamburger menu button

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setPlatformOpen(false);
  }, [location.pathname]);

  // Manage body scroll and focus trap for mobile menu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Trap focus within the mobile menu
      const focusableElements = Array.from(
        menuContentRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) || [],
      ).filter(
        (el) =>
          !el.hasAttribute("disabled") &&
          !el.getAttribute("aria-hidden") === "true",
      );

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e) => {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstFocusable) {
              lastFocusable?.focus();
              e.preventDefault();
            }
          } else {
            // Tab
            if (document.activeElement === lastFocusable) {
              firstFocusable?.focus();
              e.preventDefault();
            }
          }
        }
      };

      if (firstFocusable) {
        firstFocusable.focus(); // Focus first element when menu opens
      }

      document.addEventListener("keydown", handleTabKey);
      return () => {
        document.removeEventListener("keydown", handleTabKey);
        document.body.style.overflow = "unset";
        menuButtonRef.current?.focus(); // Return focus to hamburger button when menu closes
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setPlatformOpen(false);
  }, []);

  const mobileLinkClass =
    "flex items-center justify-between w-full px-4 py-3 text-[17px] font-semibold text-gray-800 border-b border-gray-100 active:bg-gray-50 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-blue-400"; // Added focus-visible

  const mobileSubLinkClass =
    "flex items-center gap-3 p-3 rounded-lg active:bg-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-blue-400"; // Added focus-visible

  return (
    <div className="lg:hidden w-full">
      {/* Mobile Top Bar */}
      <div className="flex justify-between items-center px-4 h-16 bg-white/90 backdrop-blur-md relative z-[60]">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 rounded-sm">
          <div className="bg-[#008BDC] p-1.5 rounded-lg text-white">
            <Briefcase size={18} strokeWidth={2.5} />
          </div>
          <span className="text-[20px] font-extrabold text-gray-900 tracking-tight">
            HRMastery
          </span>
        </Link>
        <button
          ref={menuButtonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 -mr-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-blue-400"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-controls="mobile-menu"
          aria-expanded={isOpen}>
          {isOpen ? (
            <X size={26} strokeWidth={2} />
          ) : (
            <Menu size={26} strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Mobile Full-Screen Drawer */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 top-16 z-50 bg-white flex flex-col transform transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title">
        <h2 id="mobile-menu-title" className="sr-only">
          Main navigation
        </h2>{" "}
        {/* Screen reader only title */}
        <div
          ref={menuContentRef} // Apply ref here for focus trapping
          className="flex-1 overflow-y-auto px-4 py-2 pb-32">
          {/* Platform Accordion */}
          <div>
            <button
              onClick={() => setPlatformOpen(!platformOpen)}
              className={mobileLinkClass}
              aria-expanded={platformOpen}
              aria-controls="platform-sub-menu">
              Our Platform
              <ChevronDown
                size={20}
                className={`text-gray-400 transition-transform duration-300 ${
                  platformOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Accordion Content */}
            <div
              id="platform-sub-menu"
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                platformOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
              }`} // Dynamic max-height for smooth accordion
              aria-hidden={!platformOpen} // Hide from screen readers when closed
            >
              <div className="bg-gray-50 rounded-xl p-2 mx-2 my-3 flex flex-col gap-1">
                <Link
                  to="/features/white-label"
                  onClick={closeMenu}
                  className={mobileSubLinkClass}>
                  <Globe size={20} className="text-[#008BDC]" />
                  <span className="font-bold text-[15px] text-gray-800">
                    White-Label Careers
                  </span>
                </Link>
                <Link
                  to="/features/ats"
                  onClick={closeMenu}
                  className={mobileSubLinkClass}>
                  <LayoutDashboard size={20} className="text-indigo-600" />
                  <span className="font-bold text-[15px] text-gray-800">
                    Applicant Tracking
                  </span>
                </Link>
                <Link
                  to="/features/ai"
                  onClick={closeMenu}
                  className={mobileSubLinkClass}>
                  <Bot size={20} className="text-purple-600" />
                  <span className="font-bold text-[15px] text-gray-800">
                    AI Resume Parsing
                  </span>
                </Link>
                <Link
                  to="/features/scheduling"
                  onClick={closeMenu}
                  className={mobileSubLinkClass}>
                  <Calendar size={20} className="text-emerald-600" />
                  <span className="font-bold text-[15px] text-gray-800">
                    Smart Scheduling
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <NavLink
            to="/solutions"
            onClick={closeMenu}
            className={mobileLinkClass}>
            Solutions
          </NavLink>
          <NavLink
            to="/pricing"
            onClick={closeMenu}
            className={mobileLinkClass}>
            Pricing
          </NavLink>
        </div>
        {/* Bottom Dual Login & CTA */}
        <div className="absolute bottom-0 left-0 w-full px-4 pt-6 pb-safe bg-white border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Link
              to="/candidate/login"
              onClick={closeMenu}
              className="flex flex-col items-center gap-1.5 py-3 border border-gray-200 rounded-2xl active:bg-gray-50 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-blue-400">
              <User size={18} className="text-[#008BDC]" />
              <span className="text-[13px] font-bold text-gray-800">
                Candidate
              </span>
            </Link>
            <Link
              to="/hr/login"
              onClick={closeMenu}
              className="flex flex-col items-center gap-1.5 py-3 border border-gray-200 rounded-2xl active:bg-gray-50 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-blue-400">
              <Building2 size={18} className="text-indigo-600" />
              <span className="text-[13px] font-bold text-gray-800">
                Employer
              </span>
            </Link>
          </div>
          <Link
            to="/book-demo"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-[#008BDC] text-white text-[16px] font-bold shadow-lg shadow-[#008BDC]/20 active:scale-[0.98] transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-blue-400">
            Book a Demo <PlayCircle size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   3. MAIN EXPORT WRAPPER (Handles global scroll effects)
========================================================================= */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30); // Slight delay for scroll effect
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100" // More pronounced scrolled state
          : "bg-white border-b border-transparent"
      }`}>
      {/* Desktop Navigation Component */}
      <DesktopNav />
      {/* Mobile Navigation Component */}
      <MobileNav />
      {/* Utility style for safe area inset on mobile devices */}
      <style
        dangerouslySetInnerHTML={{
          __html: `.pb-safe { padding-bottom: max(1.5rem, env(safe-area-inset-bottom)); }`,
        }}
      />
    </header>
  );
};

export default Navbar;
