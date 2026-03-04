import React from "react";
import { Check } from "lucide-react";

const steps = [
  "Basic Info",
  "Content",
  "Compensation",
  "Screening",
  "Application",
  "Review",
];

const Stepper = ({ step, setStep }) => {
  return (
    <div className="w-full relative pb-8">
      {/* 1. Track Lines Container (Calculated to perfectly hit circle centers) */}
      <div className="absolute top-4 left-4 right-4 h-[2px] bg-[#EEE] z-0">
        {/* Active Progress Line */}
        <div
          className="absolute top-0 left-0 h-full bg-[#008BDC] transition-all duration-500 ease-out"
          style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>

      {/* 2. Stepper Nodes */}
      <div className="flex justify-between relative z-10">
        {steps.map((label, index) => {
          const current = index + 1;
          const isActive = current === step;
          const isCompleted = current < step;

          return (
            <div
              key={label}
              className="flex flex-col items-center group relative w-8">
              {/* Circle Indicator */}
              <button
                onClick={() => setStep(current)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-all duration-300 focus:outline-none z-10
                  ${
                    isActive
                      ? "bg-[#008BDC] text-white shadow-[0_0_0_4px_rgba(0,139,220,0.15)] scale-110" // Active: Blue with soft glow
                      : isCompleted
                        ? "bg-[#008BDC] text-white hover:bg-[#0073B6]" // Completed: Solid Blue
                        : "bg-white border-2 border-[#DDD] text-[#8A8A8A] hover:border-[#008BDC] hover:text-[#008BDC]" // Upcoming: Gray outlined
                  }`}>
                {isCompleted ? (
                  <Check
                    size={16}
                    strokeWidth={3}
                    className="animate-in zoom-in duration-200"
                  />
                ) : (
                  current
                )}
              </button>

              {/* Text Label (Hidden on mobile, perfectly centered on desktop) */}
              <span
                className={`mt-3 text-[12px] transition-colors duration-200 hidden sm:block absolute top-8 whitespace-nowrap text-center
                  ${
                    isActive
                      ? "text-[#212121] font-bold"
                      : isCompleted
                        ? "text-[#484848] font-semibold"
                        : "text-[#8A8A8A] font-medium group-hover:text-[#008BDC]"
                  }`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
