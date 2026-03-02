import React from "react";
import { Search, Sparkles, MapPin } from "lucide-react";

const PremiumMinimalHero = ({ filters, setFilters }) => {
  return (
    <div className="relative bg-white pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden font-sans border-b border-gray-100">
      {/* Soft Design Accents (The "Glass" effect) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#008bdc]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF3F6C]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Modern Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-100 rounded-full mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#FF3F6C]" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#535766]">
            India's #1 Hiring Platform
          </span>
        </div>

        {/* Massive Clean Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#282C3F] tracking-tighter leading-[0.9] mb-8">
          Find your next <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008bdc] to-[#FF3F6C]">
            big opportunity.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[#535766] mb-12 max-w-xl font-medium leading-relaxed">
          Search thousands of verified jobs from top startups and established
          enterprises. Simple, fast, and transparent.
        </p>

        {/* The "Floating" Search Bar */}
        <div className="w-full max-w-4xl">
          <div className="flex flex-col md:flex-row items-stretch bg-white p-2 rounded-xl sm:rounded-2xl shadow-[0_20px_70px_rgba(0,0,0,0.08)] border border-gray-100 gap-2">
            {/* Search Input */}
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#008bdc]">
                <Search className="w-5 h-5 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Job title, skills, or company"
                className="w-full pl-12 pr-4 py-4 rounded-xl text-sm font-bold text-[#282C3F] placeholder-[#8A8D9F] outline-none focus:bg-gray-50 transition-all"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
            </div>

            {/* Location Divider (Desktop only) */}
            <div className="hidden md:block w-px bg-gray-100 my-3" />

            {/* Location Quick Input */}
            <div className="flex-1 relative group hidden sm:flex">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#008bdc]">
                <MapPin className="w-5 h-5 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="City or 'Remote'"
                className="w-full pl-12 pr-4 py-4 rounded-xl text-sm font-bold text-[#282C3F] placeholder-[#8A8D9F] outline-none focus:bg-gray-50 transition-all"
              />
            </div>

            {/* Action Button */}
            <button className="bg-[#282C3F] hover:bg-[#FF3F6C] text-white px-10 py-4 rounded-lg sm:rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-lg active:scale-95 whitespace-nowrap">
              Search Jobs
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 opacity-40 grayscale">
            <span className="text-sm font-black text-[#282C3F] uppercase tracking-tighter italic">
              Arjun Buildtech
            </span>
            <span className="text-sm font-black text-[#282C3F] uppercase tracking-tighter">
              Munchizo
            </span>
            <span className="text-sm font-black text-[#282C3F] uppercase tracking-tighter italic">
              NainitalHub
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumMinimalHero;
