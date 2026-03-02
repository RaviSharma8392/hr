import React from "react";
import {
  Briefcase,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  ArrowRight,
} from "lucide-react";

export default function PremiumDarkFooter() {
  const currentYear = new Date().getFullYear();

  return (
    // Deep Corporate Slate background with the signature Blue top border.
    // Notice the pb-28 on mobile to prevent overlapping with the sticky bottom nav bar!
    <footer className="bg-[#181A1F] border-t-4 border-[#008BDC] font-sans pt-16 pb-28 md:pb-12">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Top Section: Newsletter & Brand */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-gray-800 pb-12 mb-12 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#008BDC] p-2 rounded-md text-white">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                HRMastery<span className="text-[#008BDC]">.</span>
              </span>
            </div>
            <p className="text-[14px] text-gray-400 max-w-md font-medium leading-relaxed">
              The modern platform for payroll, performance, and people
              management. Hire top talent and manage your team effortlessly.
            </p>
          </div>

          {/* Newsletter Subscribe */}
          <div className="w-full lg:w-auto">
            <h4 className="text-white font-bold text-[12px] tracking-widest uppercase mb-4">
              Get Hiring Insights
            </h4>
            <div className="flex w-full lg:w-80">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type="email"
                  className="block w-full pl-9 pr-3 py-3 border border-gray-800 rounded-l-md bg-[#22252A] text-white placeholder-gray-500 focus:ring-1 focus:ring-[#008BDC] focus:border-[#008BDC] focus:outline-none text-[14px] transition-all"
                  placeholder="Enter your email"
                />
              </div>
              <button className="bg-[#008BDC] hover:bg-[#0073B6] transition-colors px-4 rounded-r-md flex items-center justify-center text-white">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 mb-16">
          {/* Column 1 */}
          <div>
            <h3 className="text-[12px] font-bold text-white tracking-widest uppercase mb-5">
              Platform
            </h3>
            <ul className="space-y-3.5 text-[14px] font-medium text-gray-400">
              <li>
                <a
                  href="#features"
                  className="hover:text-[#008BDC] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-[#008BDC] transition-colors">
                  Pricing & Plans
                </a>
              </li>
              <li>
                <a
                  href="#integrations"
                  className="hover:text-[#008BDC] transition-colors">
                  Integrations
                </a>
              </li>
              <li>
                <a
                  href="#security"
                  className="hover:text-[#008BDC] transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-[12px] font-bold text-white tracking-widest uppercase mb-5">
              Solutions
            </h3>
            <ul className="space-y-3.5 text-[14px] font-medium text-gray-400">
              <li>
                <a
                  href="#startups"
                  className="hover:text-[#008BDC] transition-colors">
                  For Startups
                </a>
              </li>
              <li>
                <a
                  href="#enterprise"
                  className="hover:text-[#008BDC] transition-colors">
                  For Enterprise
                </a>
              </li>
              <li>
                <a
                  href="#remote"
                  className="hover:text-[#008BDC] transition-colors">
                  Remote Teams
                </a>
              </li>
              <li>
                <a
                  href="#agencies"
                  className="hover:text-[#008BDC] transition-colors">
                  HR Agencies
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-[12px] font-bold text-white tracking-widest uppercase mb-5">
              Resources
            </h3>
            <ul className="space-y-3.5 text-[14px] font-medium text-gray-400">
              <li>
                <a
                  href="#blog"
                  className="hover:text-[#008BDC] transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#guides"
                  className="hover:text-[#008BDC] transition-colors">
                  E-books & Guides
                </a>
              </li>
              <li>
                <a
                  href="#help"
                  className="hover:text-[#008BDC] transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#api"
                  className="hover:text-[#008BDC] transition-colors">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-[12px] font-bold text-white tracking-widest uppercase mb-5">
              Company
            </h3>
            <ul className="space-y-3.5 text-[14px] font-medium text-gray-400">
              <li>
                <a
                  href="#about"
                  className="hover:text-[#008BDC] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#careers"
                  className="hover:text-[#008BDC] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-[#008BDC] transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#partners"
                  className="hover:text-[#008BDC] transition-colors">
                  Partners
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-[13px] font-medium text-gray-500">
            <div>© {currentYear} HRMastery, Inc.</div>
            <div className="hidden sm:block text-gray-700">|</div>
            <div className="flex gap-4">
              <a href="#terms" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#privacy" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#cookies" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>

          {/* Social Icons inside circular containers */}
          <div className="flex items-center gap-3">
            <a
              href="#twitter"
              className="w-9 h-9 rounded-full bg-[#22252A] flex items-center justify-center text-gray-400 hover:bg-[#008BDC] hover:text-white transition-all duration-300">
              <Twitter className="w-4 h-4 fill-current" />
            </a>
            <a
              href="#facebook"
              className="w-9 h-9 rounded-full bg-[#22252A] flex items-center justify-center text-gray-400 hover:bg-[#008BDC] hover:text-white transition-all duration-300">
              <Facebook className="w-4 h-4 fill-current" />
            </a>
            <a
              href="#linkedin"
              className="w-9 h-9 rounded-full bg-[#22252A] flex items-center justify-center text-gray-400 hover:bg-[#008BDC] hover:text-white transition-all duration-300">
              <Linkedin className="w-4 h-4 fill-current" />
            </a>
            <a
              href="#instagram"
              className="w-9 h-9 rounded-full bg-[#22252A] flex items-center justify-center text-gray-400 hover:bg-[#008BDC] hover:text-white transition-all duration-300">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
