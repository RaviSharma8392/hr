import React from "react";
import { Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const PoweredBy = ({ variant = "dark" }) => {
  // variant "dark" is for white/light backgrounds
  // variant "light" is for dark/navy backgrounds
  const isLight = variant === "light";

  return (
    <div className="flex justify-center w-full py-8 select-none">
      {/* Wrap in a link so interested companies can click it to buy your software */}
      <Link
        to="/"
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-300 ${
          isLight
            ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
            : "bg-gray-50 border-gray-200 hover:bg-white hover:border-[#008BDC]/30 hover:shadow-[0_4px_20px_rgba(0,139,220,0.1)]"
        }`}>
        {/* "Powered by" text */}
        <span
          className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-colors ${
            isLight
              ? "text-gray-400 group-hover:text-gray-300"
              : "text-gray-500 group-hover:text-gray-600"
          }`}>
          Powered by
        </span>

        {/* Your Startup Logo & Name */}
        <div className="flex items-center gap-1.5">
          <div
            className={`p-1 rounded-md shadow-sm transition-transform duration-300 group-hover:scale-110 ${
              isLight ? "bg-[#008BDC]" : "bg-[#008BDC]"
            }`}>
            <Briefcase size={12} className="text-white" strokeWidth={3} />
          </div>

          <span
            className={`text-[15px] font-black tracking-tight ${
              isLight ? "text-white" : "text-[#212121]"
            }`}>
            HRMastery<span className="text-[#008BDC]">.</span>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default PoweredBy;
