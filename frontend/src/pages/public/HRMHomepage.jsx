import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  Users,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const HRMHomepage = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#484848] selection:bg-blue-100 selection:text-[#008BDC]">
      {/* ========================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================= */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 md:pt-32 md:pb-28 text-center flex flex-col items-center overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#008BDC] opacity-[0.03] blur-[100px] pointer-events-none rounded-full"></div>

        {/* Top Badge */}
        <div className="relative z-10 inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-blue-100 bg-blue-50 text-[#008BDC] text-[13px] font-bold tracking-wide shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-[#008BDC] animate-pulse"></span>
          The New Standard for Hiring
        </div>

        {/* Headline */}
        <h1 className="relative z-10 text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-[#212121] leading-[1.1]">
          Hire top talent. <br className="hidden md:block" />
          <span className="text-[#008BDC]">Manage your team.</span>
        </h1>

        {/* Sub-headline */}
        <p className="relative z-10 text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
          HRMastery connects ambitious candidates with forward-thinking
          companies. Post jobs, track applicants, and streamline your HR
          workflow in one powerful platform.
        </p>

        {/* Dual Call-To-Actions */}
        <div className="relative z-10 flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
          {/* Employer CTA */}
          <Link
            to="/free-trial"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#008BDC] text-white px-8 py-3.5 rounded-lg text-[15px] font-bold hover:bg-[#0073B6] shadow-[0_8px_20px_rgba(0,139,220,0.2)] hover:shadow-[0_8px_25px_rgba(0,139,220,0.3)] transition-all active:scale-95">
            Start Hiring <ArrowRight size={18} />
          </Link>

          {/* Candidate CTA */}
          <Link
            to="/candidate/signup"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-[#484848] px-8 py-3.5 rounded-lg text-[15px] font-bold border border-[#DDD] hover:border-[#008BDC] hover:text-[#008BDC] shadow-sm transition-all active:scale-95">
            Find a Job <Search size={18} />
          </Link>
        </div>

        {/* Micro-trust indicator under buttons */}
        <div className="relative z-10 mt-6 flex items-center gap-2 text-[12px] font-bold text-gray-400 uppercase tracking-widest">
          <CheckCircle2 size={14} className="text-[#10b981]" /> Free 14-day
          trial for Employers
        </div>
      </header>

      {/* ========================================================= */}
      {/* SOCIAL PROOF (Logo Ticker) */}
      {/* ========================================================= */}
      <section className="py-10 border-y border-[#EEE] bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">
            Powering modern HR teams worldwide
          </p>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-xl font-black text-gray-400 opacity-60 grayscale transition-opacity hover:grayscale-0">
            <div className="hover:text-[#212121] transition-colors cursor-default">
              Acme Corp
            </div>
            <div className="hover:text-[#212121] transition-colors cursor-default">
              GlobalTech
            </div>
            <div className="hover:text-[#212121] transition-colors cursor-default">
              Nexus
            </div>
            <div className="hover:text-[#212121] transition-colors cursor-default">
              Stark Ind.
            </div>
            <div className="hidden sm:block hover:text-[#212121] transition-colors cursor-default">
              Wayne Ent.
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FEATURES GRID */}
      {/* ========================================================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <section className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-[#212121] mb-4 tracking-tight">
            A complete platform for modern teams
          </h2>
          <p className="text-[16px] text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Everything you need to attract candidates, run payroll, and manage
            your workforce efficiently—without the enterprise clutter.
          </p>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            icon={<Users className="w-6 h-6" />}
            title="Applicant Tracking"
            description="Publish jobs, build custom screening pipelines, and manage candidate communications from one collaborative dashboard."
          />

          <FeatureCard
            icon={<BarChart3 className="w-6 h-6" />}
            title="Payroll & Attendance"
            description="Automate time tracking, leave requests, and generate highly accurate payroll with built-in tax compliance."
          />

          <FeatureCard
            icon={<ShieldCheck className="w-6 h-6" />}
            title="Secure Employee Hub"
            description="Give your team a centralized portal to access payslips, request time off, and manage their performance goals safely."
          />
        </div>
      </main>
    </div>
  );
};

// --- Reusable Feature Card Component ---
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-2xl border border-[#EEE] shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-[#008BDC]/30 transition-all duration-300 group flex flex-col h-full">
    {/* Icon Container */}
    <div className="w-14 h-14 bg-blue-50 text-[#008BDC] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#008BDC] group-hover:text-white transition-all duration-300 shadow-sm">
      {icon}
    </div>

    {/* Text */}
    <h3 className="text-[18px] font-black text-[#212121] mb-2">{title}</h3>
    <p className="text-[14px] text-gray-500 font-medium leading-relaxed flex-grow">
      {description}
    </p>
  </div>
);

export default HRMHomepage;
