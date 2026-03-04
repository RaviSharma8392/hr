import React, { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

const Notification = ({ type = "info", message, onClose, duration = 4000 }) => {
  const [isClosing, setIsClosing] = useState(false);

  // Handle auto-close and trigger exit animation
  useEffect(() => {
    if (message) {
      setIsClosing(false); // Reset state if a new message comes in
      const timer = setTimeout(() => {
        triggerClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  const triggerClose = () => {
    setIsClosing(true);
    // Wait for the slide-up animation to finish before actually unmounting
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!message && !isClosing) return null;

  // App-style color palettes with soft background wrappers for icons
  const variants = {
    success: {
      icon: <CheckCircle2 className="w-5 h-5 text-[#10b981]" />,
      iconBg: "bg-[#10b981]/10",
      progressBar: "bg-[#10b981]",
    },
    error: {
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      iconBg: "bg-red-50",
      progressBar: "bg-red-500",
    },
    info: {
      icon: <Info className="w-5 h-5 text-[#008BDC]" />,
      iconBg: "bg-[#008BDC]/10",
      progressBar: "bg-[#008BDC]",
    },
  };

  const { icon, iconBg, progressBar } = variants[type] || variants.info;

  return (
    <>
      {/* Positioning: Floating pill on mobile (top-4 left-4 right-4), 
        docked to top-right on desktop. Uses safe-area for notched phones.
      */}
      <div
        className={`fixed top-4 sm:top-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-[380px] z-[100] transition-all duration-300 pt-safe
          ${isClosing ? "opacity-0 -translate-y-4 scale-95" : "animate-in slide-in-from-top-4 sm:slide-in-from-right-8 fade-in zoom-in-95"}
        `}>
        {/* Glassmorphism Pill Design */}
        <div className="relative overflow-hidden bg-white/95 backdrop-blur-xl border border-[#EEE] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-3 sm:p-4 flex items-center gap-3.5">
          {/* Soft Icon Wrapper */}
          <div
            className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}>
            {icon}
          </div>

          {/* Message Text */}
          <div className="flex-1 pt-0.5">
            <p className="text-[14px] font-bold text-[#212121] leading-snug">
              {message}
            </p>
          </div>

          {/* Subtle Close Button */}
          <button
            onClick={triggerClose}
            className="shrink-0 p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 active:scale-90"
            aria-label="Close notification">
            <X size={18} />
          </button>

          {/* Animated Progress Bar (CSS controlled) */}
          <div
            className={`absolute bottom-0 left-0 h-[3px] ${progressBar} animate-progress-shrink`}
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      </div>

      {/* Global styles for the progress bar animation and safe areas */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes progress-shrink {
          0% { width: 100%; }
          100% { width: 0%; }
        }
        .animate-progress-shrink {
          animation-name: progress-shrink;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
        .pt-safe { padding-top: env(safe-area-inset-top); }
      `,
        }}
      />
    </>
  );
};

export default Notification;
