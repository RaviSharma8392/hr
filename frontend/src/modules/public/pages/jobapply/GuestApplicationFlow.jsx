import React, { useCallback, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  LogIn,
  UserPlus,
  ChevronLeft,
  CheckCircle2,
  BriefcaseBusiness,
} from "lucide-react";

export default function GuestApplicationFlow() {
  const navigate = useNavigate();
  const { jobId, jobSlug } = useParams();
  const [isMounted, setIsMounted] = useState(false);

  // Trigger smooth entrance animation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Mock Data (Replace with your actual data fetching)
  const jobTitle = "Senior Software Engineer";
  const companyName = "TechCorp Global";

  const handleLogin = useCallback(() => {
    navigate(`/candidate/login?redirect=/apply/${jobId}/${jobSlug}/form`);
  }, [navigate, jobId, jobSlug]);

  const handleGuestApply = useCallback(() => {
    navigate(`/apply/${jobId}/${jobSlug}/guest/form`);
  }, [navigate, jobId, jobSlug]);

  return (
    // Outer Container: Gray background on desktop, white on mobile
    <main className="md:min-h-dvh w-full flex flex-col md:items-center md:justify-center md:bg-[#F3F4F6] antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Inner Card: 
        - Mobile: Takes full height/width, white background.
        - Desktop: Max-width 480px, rounded corners, soft shadow, floating in center.
      */}
      <div
        className={`flex flex-col flex-1 w-full bg-white md:flex-none md:max-w-[480px] md:h-auto md:rounded-[28px] md:shadow-[0_8px_30px_rgb(0,0,0,0.06)] md:border md:border-slate-100 overflow-hidden relative transition-all duration-700 ease-out ${
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
        {/* 1. TOP NAVIGATION / ESCAPE HATCH */}
        <header className="w-full flex items-center px-4 sm:px-6 pt-4 pb-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 p-2 -ml-2 text-slate-500 hover:text-slate-900 transition-colors focus:outline-none rounded-lg hover:bg-slate-50 group">
            <ChevronLeft
              size={24}
              strokeWidth={2}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-[15px] font-semibold hidden sm:block">
              Back
            </span>
          </button>
        </header>

        {/* 2. MAIN CONTENT AREA */}
        <div className="px-6 sm:px-10 flex-1 flex flex-col">
          {/* Icon/Logo area */}
          <div className="mt-2 mb-8">
            <div className="w-16 h-16 bg-[#F0F7FF] rounded-[20px] flex items-center justify-center border border-[#E1EFFF]">
              <BriefcaseBusiness
                className="text-[#0A66C2]"
                size={32}
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Typography - Trustworthy & Clean */}
          <h1 className="text-[26px] sm:text-[30px] font-black text-slate-900 tracking-tight leading-[1.15] mb-2">
            Apply to {companyName}
          </h1>
          <p className="text-[16px] text-slate-500 font-medium mb-10">
            Applying for:{" "}
            <span className="text-slate-800 font-bold">{jobTitle}</span>
          </p>

          {/* Value Proposition List */}
          <div className="flex flex-col gap-4 mb-8">
            <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Why sign in?
            </h3>

            <div className="flex items-start gap-3.5">
              <CheckCircle2
                size={20}
                className="text-[#0A66C2] shrink-0 mt-0.5"
                strokeWidth={2}
              />
              <div>
                <p className="text-[15px] font-bold text-slate-800">
                  1-Click Apply
                </p>
                <p className="text-[14px] text-slate-500 mt-0.5">
                  Use your saved profile and resume to apply instantly.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <CheckCircle2
                size={20}
                className="text-[#0A66C2] shrink-0 mt-0.5"
                strokeWidth={2}
              />
              <div>
                <p className="text-[15px] font-bold text-slate-800">
                  Track Application
                </p>
                <p className="text-[14px] text-slate-500 mt-0.5">
                  Get real-time updates when the employer views your profile.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. ANCHORED BOTTOM ACTIONS */}
        {/* On mobile, mt-auto pushes this to the absolute bottom of the screen. On desktop, it flows naturally. */}
        <div className="w-full px-6 sm:px-10 pb-8 sm:pb-10 pt-4 mt-auto bg-white/80 backdrop-blur-md border-t border-slate-50 md:border-none md:bg-transparent md:backdrop-blur-none">
          <div className="flex flex-col gap-3">
            {/* Primary Action (Professional Blue) */}
            <button
              onClick={handleLogin}
              className="group w-full h-[54px] sm:h-[56px] flex items-center justify-center gap-2.5 px-6 text-white text-[16px] font-bold rounded-2xl transition-all active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-500/20"
              style={{ backgroundColor: "#0A66C2" }} // LinkedIn/Professional Blue
            >
              <LogIn
                size={20}
                strokeWidth={2.5}
                className="opacity-90 group-hover:-translate-x-0.5 transition-transform"
              />
              Sign in to apply
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                or
              </span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            {/* Secondary Action (Ghost/Outline) */}
            <button
              onClick={handleGuestApply}
              className="group w-full h-[54px] sm:h-[56px] flex items-center justify-center gap-2.5 px-6 text-slate-700 text-[16px] font-bold rounded-2xl bg-white border-[1.5px] border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-slate-100">
              <UserPlus
                size={20}
                strokeWidth={2.5}
                className="text-slate-400 group-hover:text-slate-600 transition-colors"
              />
              Continue as guest
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
