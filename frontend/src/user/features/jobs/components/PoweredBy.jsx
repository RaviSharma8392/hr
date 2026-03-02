import React from "react";
import { Briefcase } from "lucide-react";

const PoweredBy = ({ variant = "dark" }) => {
  const isLight = variant === "light";

  return (
    <div className="flex items-center justify-center gap-2 py-6 select-none">
      {/* "Powered by" label */}
      <span
        className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
          isLight ? "text-gray-400" : "text-[#8A8D9F]"
        }`}>
        Powered by
      </span>

      {/* Brand Mini-Logo */}
      <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity duration-300">
        <div
          className={`p-1 rounded-sm ${isLight ? "bg-white" : "bg-[#282C3F]"}`}>
          <Briefcase
            className={`w-3 h-3 ${isLight ? "text-[#282C3F]" : "text-white"}`}
          />
        </div>
        <span
          className={`text-xs font-black uppercase tracking-tighter ${
            isLight ? "text-white" : "text-[#282C3F]"
          }`}>
          HRMastery<span className="text-[#FF3F6C]">.</span>
        </span>
      </div>
    </div>
  );
};

export default PoweredBy;
