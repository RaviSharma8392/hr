import React from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-[#EEE]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Links & Brand */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2 pr-4 lg:pr-12">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-90 transition-opacity w-max mb-5">
              <div className="bg-[#008BDC] p-1.5 rounded-md text-white shadow-sm">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-[#212121] tracking-tight">
                HRMastery<span className="text-[#008BDC]">.</span>
              </span>
            </Link>

            <p className="text-gray-500 text-[14px] font-medium leading-relaxed max-w-sm mb-8">
              The modern platform for applicant tracking, payroll, and people
              management. Hire top talent effortlessly.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 text-gray-400">
              <a
                href="#twitter"
                className="hover:text-[#008BDC] transition-colors duration-200 p-2 hover:bg-blue-50 rounded-full">
                <span className="sr-only">Twitter</span>
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#linkedin"
                className="hover:text-[#008BDC] transition-colors duration-200 p-2 hover:bg-blue-50 rounded-full">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#facebook"
                className="hover:text-[#008BDC] transition-colors duration-200 p-2 hover:bg-blue-50 rounded-full">
                <span className="sr-only">Facebook</span>
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#instagram"
                className="hover:text-[#008BDC] transition-colors duration-200 p-2 hover:bg-blue-50 rounded-full">
                <span className="sr-only">Instagram</span>
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Column 1: Platform */}
          <div>
            <h3 className="text-[#212121] text-[13px] font-bold tracking-widest uppercase mb-5">
              Platform
            </h3>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="#features"
                  className="text-gray-500 text-[14px] font-medium hover:text-[#008BDC] transition-colors duration-200">
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#payroll"
                  className="text-gray-500 text-[14px] font-medium hover:text-[#008BDC] transition-colors duration-200">
                  Payroll
                </a>
              </li>
              <li>
                <a
                  href="#ats"
                  className="text-gray-500 text-[14px] font-medium hover:text-[#008BDC] transition-colors duration-200">
                  Applicant Tracking
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-500 text-[14px] font-medium hover:text-[#008BDC] transition-colors duration-200">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Resources */}
          <div>
            <h3 className="text-[#212121] text-[13px] font-bold tracking-widest uppercase mb-5">
              Resources
            </h3>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="#blog"
                  className="text-gray-500 text-[14px] font-medium hover:text-[#008BDC] transition-colors duration-200">
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#guides"
                  className="text-gray-500 text-[14px] font-medium hover:text-[#008BDC] transition-colors duration-200">
                  Hiring Guides
                </a>
              </li>
              <li>
                <a
                  href="#help"
                  className="text-gray-500 text-[14px] font-medium hover:text-[#008BDC] transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-500 text-[14px] font-medium hover:text-[#008BDC] transition-colors duration-200">
                  Contact Sales
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Legal */}
          <div>
            <h3 className="text-[#212121] text-[13px] font-bold tracking-widest uppercase mb-5">
              Legal
            </h3>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="#privacy"
                  className="text-gray-500 text-[14px] font-medium hover:text-[#008BDC] transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-gray-500 text-[14px] font-medium hover:text-[#008BDC] transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#cookies"
                  className="text-gray-500 text-[14px] font-medium hover:text-[#008BDC] transition-colors duration-200">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#security"
                  className="text-gray-500 text-[14px] font-medium hover:text-[#008BDC] transition-colors duration-200">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Extras */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#EEE] text-[13px] font-medium text-gray-400">
          <p>© {new Date().getFullYear()} HRMastery. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#status"
              className="hover:text-[#212121] transition-colors duration-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10b981]"></span> System
              Status
            </a>
            <a
              href="#lang"
              className="hover:text-[#212121] transition-colors duration-200">
              English (US)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
