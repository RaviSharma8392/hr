import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function JobsTabs({ activeTab, onTabChange }) {
  const navigate = useNavigate();
  const tabs = ["active", "drafts", "closed"];

  return (
    <div className="bg-white border-b border-[#EEE] sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto hide-scrollbar">
          {/* App-Style Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-[#484848] hover:text-[#008BDC] hover:bg-blue-50 rounded-full transition-all active:scale-95 flex items-center justify-center focus:outline-none shrink-0"
            aria-label="Go back">
            <ArrowLeft size={20} strokeWidth={2.5} />
          </button>

          {/* Tabs Container */}
          <div className="flex gap-8 sm:gap-10 h-full">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  className={`relative py-4 text-[14px] sm:text-[15px] font-bold capitalize whitespace-nowrap transition-colors ${
                    isActive
                      ? "text-[#008BDC]"
                      : "text-gray-500 hover:text-[#212121]"
                  }`}>
                  {tab} Postings
                  {/* Active Tab Indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#008BDC] rounded-t-md animate-in fade-in slide-in-from-bottom-1 duration-200" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
