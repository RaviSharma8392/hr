import React from "react";
import Navbar from "../../components/ui/Navbar";

const HRMHomepage = () => {
  return (
    <>
      <div className="min-h-screen bg-[#F4F4F9] font-sans text-[#161621] selection:bg-[#DCDCE5]">
        {/* HERO */}
        <header className="max-w-6xl mx-auto px-6 py-24 md:py-36 text-center flex flex-col items-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[#DCDCE5] bg-[#EAEAEF] text-[#5A5A6B] text-sm font-medium tracking-wide">
            Introducing Nexus HRM 2.0
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-normal tracking-tight mb-8 text-[#161621] leading-[1.1]">
            HR & Payroll Software, <br className="hidden md:block" />
            <span className="italic text-[#6B6B8A]">elegantly refined.</span>
          </h1>

          <p className="text-lg md:text-xl text-[#5A5A6B] mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Nexus HRM helps businesses manage payroll, attendance, performance
            reviews, and employee operations in one thoughtful, cloud-based
            platform.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-[#161621] text-[#F4F4F9] px-8 py-3.5 rounded-full text-[15px] font-medium hover:bg-[#2C2C3D] transition-colors duration-200">
              Start free trial
            </button>

            <button className="w-full sm:w-auto bg-transparent text-[#161621] px-8 py-3.5 rounded-full text-[15px] font-medium border border-[#C5C5D2] hover:border-[#161621] transition-colors duration-200">
              Explore features
            </button>
          </div>
        </header>

        {/* SOCIAL PROOF */}
        <section className="py-12 border-y border-[#DCDCE5]">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-xs font-medium text-[#6B6B8A] uppercase tracking-[0.2em] mb-8">
              Trusted by forward-thinking teams
            </p>

            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 text-xl font-serif font-medium text-[#161621] opacity-60 grayscale">
              <div>Acme Corp.</div>
              <div>GlobalTech</div>
              <div>Stark Industries</div>
              <div>Wayne Ent.</div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <main className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <section className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-serif font-normal text-[#161621] mb-6 tracking-tight">
              A complete management platform
            </h2>
            <p className="text-lg text-[#5A5A6B] max-w-2xl mx-auto font-light leading-relaxed">
              Everything you need to manage your workforce efficiently — from
              recruitment to payroll processing, designed with clarity in mind.
            </p>
          </section>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              title="Attendance & Leave"
              description="Automate employee time tracking, leave requests, and manager approvals in real time without the friction."
            />

            <FeatureCard
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              title="Payroll Automation"
              description="Generate accurate payroll with automatic tax calculations and compliance support, beautifully organized."
            />

            <FeatureCard
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              }
              title="Performance Tracking"
              description="Set goals, monitor key metrics, and conduct structured performance reviews with absolute clarity."
            />
          </div>
        </main>
      </div>
    </>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-[#FCFCFD] p-10 rounded-2xl border border-[#DCDCE5] hover:border-[#B2B2C2] transition-colors duration-300 group flex flex-col h-full">
    <div className="w-12 h-12 bg-[#EAEAEF] text-[#161621] rounded-full flex items-center justify-center mb-8 group-hover:bg-[#DCDCE5] transition-colors duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-serif font-normal text-[#161621] mb-3">
      {title}
    </h3>
    <p className="text-[#5A5A6B] font-light leading-relaxed flex-grow">
      {description}
    </p>
  </div>
);

export default HRMHomepage;
