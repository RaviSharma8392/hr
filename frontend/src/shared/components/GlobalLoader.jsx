import React from "react";
import { Briefcase } from "lucide-react";

export default function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-[999] bg-[#F8F9FA] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center animate-in zoom-in-95 duration-300">
        {/* Logo Box */}
        <div className="bg-[#008BDC] p-3 rounded-xl shadow-[0_8px_30px_rgba(0,139,220,0.3)] mb-4 animate-pulse">
          <Briefcase className="w-8 h-8 text-white" />
        </div>

        {/* Brand Text */}
        <span className="text-3xl font-black text-[#212121]">
          HRMastery<span className="text-[#008BDC]">.</span>
        </span>

        {/* Spinner */}
        <div className="mt-6 w-10 h-10 border-4 border-[#008BDC] border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}
