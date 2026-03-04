import React from "react";
import {
  Check,
  User,
  Briefcase,
  FileSearch,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function ApplicationStepper({ currentStep = 1 }) {
  // Step Configuration
  const steps = [
    {
      num: 1,
      title: "Personal Details",
      desc: "Contact & Identity",
      icon: <User size={16} />,
    },
    {
      num: 2,
      title: "Experience & CV",
      desc: "Professional Profile",
      icon: <Briefcase size={16} />,
    },
    {
      num: 3,
      title: "Review & Apply",
      desc: "Final Submission",
      icon: <FileSearch size={16} />,
    },
  ];

  // Calculate progress percentage for the line
  const progressHeight = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="bg-white border border-[#EEE] rounded-xl p-6 shadow-sm">
      {/* 1. Header with Time Estimate */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
            Progress Status
          </h3>
          <p className="text-[18px] font-bold text-[#212121]">
            Step {currentStep}{" "}
            <span className="text-gray-300 font-medium">/ {steps.length}</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-full border border-gray-100">
          <Clock size={12} className="text-gray-400" />
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
            ~2 Mins left
          </span>
        </div>
      </div>

      {/* 2. Vertical Stepper Logic */}
      <div className="relative">
        {/* Static Background Line */}
        <div className="absolute left-[15px] top-2 bottom-2 w-[1.5px] bg-[#F1F1F1] rounded-full" />

        {/* Dynamic Animated Progress Line */}
        <div
          className="absolute left-[15px] top-2 w-[1.5px] bg-[#008BDC] transition-all duration-700 ease-in-out rounded-full"
          style={{ height: `${progressHeight}%` }}
        />

        <div className="space-y-10">
          {steps.map((step) => {
            const isActive = currentStep === step.num;
            const isCompleted = currentStep > step.num;

            return (
              <div key={step.num} className="flex gap-5 relative group">
                {/* Step Marker (Circle) */}
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center relative z-10
                    transition-all duration-500 border-2
                    ${
                      isCompleted
                        ? "bg-[#10b981] border-[#10b981] text-white shadow-lg shadow-emerald-100"
                        : isActive
                          ? "bg-white border-[#008BDC] text-[#008BDC] shadow-[0_0_0_4px_rgba(0,139,220,0.1)] scale-110"
                          : "bg-white border-[#DDD] text-gray-300 group-hover:border-gray-400"
                    }
                  `}>
                  {isCompleted ? (
                    <Check
                      size={16}
                      strokeWidth={4}
                      className="animate-in zoom-in duration-300"
                    />
                  ) : (
                    React.cloneElement(step.icon, {
                      className: isActive ? "text-[#008BDC]" : "text-gray-300",
                    })
                  )}
                </div>

                {/* Text Labels */}
                <div className="flex flex-col justify-center">
                  <h4
                    className={`
                      text-[14px] font-bold leading-none mb-1.5 transition-colors
                      ${
                        isActive || isCompleted
                          ? "text-[#212121]"
                          : "text-gray-400"
                      }
                    `}>
                    {step.title}
                  </h4>

                  <p
                    className={`
                    text-[12px] transition-colors
                    ${isActive ? "text-[#008BDC] font-semibold" : isCompleted ? "text-emerald-500 font-medium" : "text-gray-400"}
                  `}>
                    {isCompleted
                      ? "Verified & Saved"
                      : isActive
                        ? "Currently Editing"
                        : step.desc}
                  </p>
                </div>

                {/* Active Indicator Arrow (Floating Dot) */}
                {isActive && (
                  <div className="absolute -left-1.5 top-3 w-1.5 h-1.5 bg-[#008BDC] rounded-full animate-ping" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Bottom Trust Badge */}
      <div className="mt-10 pt-6 border-t border-[#F5F5F5]">
        <div className="bg-[#f8f9fa] p-3 rounded-lg flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border border-gray-100">
            <ShieldCheck size={16} className="text-[#10b981]" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">
              Data Privacy
            </p>
            <p className="text-[11px] text-gray-400 font-medium leading-tight">
              Encrypted by Internshala Secure systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
