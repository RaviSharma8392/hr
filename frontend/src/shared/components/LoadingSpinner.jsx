import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#008BDC] border-t-transparent rounded-full animate-spin"></div>

        <div className="absolute w-8 h-8 border-2 border-[#008BDC]/30 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
