import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Globe,
  LayoutDashboard,
  Bot,
  ShieldCheck,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import HRFooter from "../../../shared/components/HRFooter";

const HRMHomepage = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#484848] selection:bg-blue-100 selection:text-[#008BDC]">
      <Navbar />

      {/* ========================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================= */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 md:pt-32 md:pb-28 text-center flex flex-col items-center overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#008BDC] opacity-[0.04] blur-[100px] pointer-events-none rounded-full"></div>

        {/* Top Badge */}
        <div className="relative z-10 inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-blue-100 bg-blue-50 text-[#008BDC] text-[13px] font-bold tracking-wide shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-[#008BDC] animate-pulse"></span>
          The Ultimate White-Label ATS
        </div>

        {/* Headline */}
        <h1 className="relative z-10 text-4xl sm:text-6xl lg:text-[72px] font-black tracking-tight mb-6 text-[#212121] leading-[1.1]">
          Your brand. <br className="hidden md:block" />
          <span className="text-[#008BDC]">Our powerful hiring engine.</span>
        </h1>

        {/* Sub-headline */}
        <p className="relative z-10 text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
          Launch a stunning, fully white-labeled career portal in minutes. Track
          applicants, automate screening, and hire top talent without writing a
          single line of code.
        </p>

        {/* Dual Call-To-Actions */}
        <div className="relative z-10 flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
          {/* Primary CTA (Sales/Demo) */}
          <Link
            to="/book-demo"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#008BDC] text-white px-8 py-4 rounded-full text-[16px] font-bold hover:bg-[#0073B6] shadow-[0_8px_20px_rgba(0,139,220,0.2)] hover:shadow-[0_8px_25px_rgba(0,139,220,0.3)] transition-all active:scale-95">
            Book a Demo <PlayCircle size={18} />
          </Link>

          {/* Secondary CTA (Self-Serve) */}
          <Link
            to="/free-trial"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-[#484848] px-8 py-4 rounded-full text-[16px] font-bold border-2 border-[#EEE] hover:border-[#008BDC] hover:text-[#008BDC] shadow-sm transition-all active:scale-95">
            Start Free Trial <ArrowRight size={18} />
          </Link>
        </div>

        {/* Micro-trust indicator */}
        <div className="relative z-10 mt-6 flex items-center gap-2 text-[12px] font-bold text-gray-400 uppercase tracking-widest">
          <CheckCircle2 size={14} className="text-[#10b981]" /> No credit card
          required
        </div>
      </header>

      {/* ========================================================= */}
      {/* SOCIAL PROOF (Logo Ticker) */}
      {/* ========================================================= */}
      <section className="py-10 border-y border-[#EEE] bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">
            Trusted by fast-growing startups and enterprises
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
            Everything you need to scale your team
          </h2>
          <p className="text-[16px] text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            HRMastery replaces clunky, outdated recruitment tools with a sleek,
            customizable platform built for modern HR teams.
          </p>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            icon={<Globe className="w-6 h-6" />}
            title="White-Label Career Pages"
            description="Create a beautiful, SEO-optimized career portal that matches your exact brand colors and typography. Hosted on your own custom domain."
          />

          <FeatureCard
            icon={<LayoutDashboard className="w-6 h-6" />}
            title="Smart Applicant Tracking"
            description="Move candidates through custom hiring pipelines. Schedule interviews, leave internal notes, and manage offers from one collaborative dashboard."
          />

          <FeatureCard
            icon={<Bot className="w-6 h-6" />}
            title="AI-Powered Screening"
            description="Stop reading hundreds of resumes. Our AI automatically parses CVs, highlights key skills, and ranks top candidates based on your job description."
          />
        </div>
      </main>

      <HRFooter />
    </div>
  );
};

// --- Reusable Feature Card Component ---
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-[2rem] border border-[#EEE] shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-[#008BDC]/30 transition-all duration-300 group flex flex-col h-full">
    {/* Icon Container */}
    <div className="w-14 h-14 bg-blue-50 text-[#008BDC] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#008BDC] group-hover:text-white transition-all duration-300 shadow-sm">
      {icon}
    </div>

    {/* Text */}
    <h3 className="text-[18px] font-black text-[#212121] mb-2 leading-tight">
      {title}
    </h3>
    <p className="text-[14px] text-gray-500 font-medium leading-relaxed flex-grow">
      {description}
    </p>
  </div>
);

export default HRMHomepage;
