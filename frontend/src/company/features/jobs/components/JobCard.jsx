import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Briefcase,
  Clock,
  Edit3,
  Share2,
  Copy,
  Calendar,
  Banknote,
  Building2,
  ChevronRight,
  MoreHorizontal,
  PauseCircle,
  PlayCircle,
} from "lucide-react";

export default function HRJobManagementCard({
  job,
  onEdit,
  onShare,
  onReview,
  onDuplicate,
  onToggleStatus,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const formatDate = (dateString) => {
    if (!dateString) return "Just now";
    return new Intl.DateTimeFormat("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateString));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isHiringActive = job?.status?.toLowerCase() === "active";

  return (
    <div className="bg-white border border-[#EEE] rounded-lg hover:border-[#008BDC]/30 transition-all flex flex-col font-sans shadow-sm">
      {/* 1. TOP BAR: Status & ID (Mobile optimized padding) */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#F8F9FA] border-b border-[#EEE] rounded-t-lg">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${isHiringActive ? "bg-[#10b981] animate-pulse" : "bg-gray-400"}`}
          />
          <span
            className={`text-[11px] font-bold uppercase tracking-wider ${isHiringActive ? "text-[#10b981]" : "text-gray-500"}`}>
            {isHiringActive ? "Accepting Candidates" : "Paused"}
          </span>
        </div>
        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
          ID: {job?.id?.substring(0, 6).toUpperCase() || "9921A"}
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col gap-5">
        {/* 2. HEADER: Title & Quick Menu */}
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1">
            <h2 className="text-base sm:text-lg font-bold text-[#212121] leading-tight mb-1.5 hover:text-[#008BDC] cursor-pointer transition-colors line-clamp-2">
              {job?.title || "Senior Frontend Architect"}
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-gray-500">
              <span className="flex items-center gap-1">
                <Building2 size={14} /> {job?.department || "Engineering"}
              </span>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {job?.location}
              </span>
            </div>
          </div>

          {/* Quick Actions Menu (Dropdown) - Large touch target for mobile */}
          <div className="relative shrink-0" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-gray-400 hover:text-[#212121] hover:bg-gray-100 rounded-md transition-colors">
              <MoreHorizontal size={20} />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-[#EEE] rounded-md shadow-lg z-10 py-1 animate-in fade-in zoom-in-95 duration-200">
                <MenuAction
                  icon={<Edit3 size={16} />}
                  label="Edit Posting"
                  onClick={() => {
                    onEdit?.(job);
                    setShowMenu(false);
                  }}
                />
                <MenuAction
                  icon={<Copy size={16} />}
                  label="Duplicate"
                  onClick={() => {
                    onDuplicate?.(job);
                    setShowMenu(false);
                  }}
                />
                <MenuAction
                  icon={<Share2 size={16} />}
                  label="Share Link"
                  onClick={() => {
                    onShare?.(job);
                    setShowMenu(false);
                  }}
                />
                <div className="h-px bg-[#EEE] my-1" />
                <MenuAction
                  icon={
                    isHiringActive ? (
                      <PauseCircle size={16} />
                    ) : (
                      <PlayCircle size={16} />
                    )
                  }
                  label={isHiringActive ? "Pause Hiring" : "Activate Hiring"}
                  onClick={() => {
                    onToggleStatus?.(job);
                    setShowMenu(false);
                  }}
                  danger={isHiringActive}
                />
              </div>
            )}
          </div>
        </div>

        {/* 3. THE PIPELINE (Optimized for small screens) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <PipelineCard
            label="Applied"
            count={job?.applicationsCount || 0}
            highlight
          />
          <PipelineCard
            label="Shortlisted"
            count={job?.shortlistedCount || 0}
          />
          <PipelineCard
            label="Interviewing"
            count={job?.interviewingCount || 0}
          />
        </div>

        {/* 4. REQUIREMENT METRICS (Wrap neatly on mobile) */}
        <div className="flex flex-wrap gap-2 pt-1">
          <Badge
            icon={<Briefcase size={13} />}
            text={job?.experience || "3-5 Yrs"}
          />
          <Badge
            icon={<Banknote size={13} />}
            text={job?.salary || "₹ 15L - 25L"}
          />
          <Badge icon={<Clock size={13} />} text={job?.type || "Full-Time"} />
        </div>

        {/* 5. BOTTOM ACTION ROW (Stacks on mobile, inline on desktop) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2 pt-4 border-t border-[#EEE]">
          <div className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5">
            <Calendar size={14} /> Created {formatDate(job?.createdAt)}
          </div>

          {/* Full width button on mobile for easy tapping */}
          <button
            onClick={() => onReview?.(job)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[#008BDC] hover:bg-[#0073B6] text-white text-sm font-semibold rounded-md transition-colors shadow-sm active:scale-[0.98]">
            Review Pipeline <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/** 🧩 Sub-Component: HR Pipeline Funnel Cards */
function PipelineCard({ label, count, highlight }) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-md border ${
        highlight ? "bg-blue-50 border-blue-100" : "bg-[#F8F9FA] border-[#EEE]"
      }`}>
      <span
        className={`text-lg sm:text-xl font-bold leading-none mb-1 ${
          highlight ? "text-[#008BDC]" : "text-[#212121]"
        }`}>
        {count}
      </span>
      <span
        className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-center leading-tight ${
          highlight ? "text-[#008BDC]" : "text-gray-500"
        }`}>
        {label}
      </span>
    </div>
  );
}

/** 🧩 Sub-Component: Metric Badge */
function Badge({ icon, text }) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#484848] font-medium bg-white px-2.5 py-1.5 rounded-md border border-[#EEE]">
      <span className="text-gray-400">{icon}</span> {text}
    </div>
  );
}

/** 🧩 Sub-Component: Dropdown Menu Item */
function MenuAction({ icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-[#484848] hover:bg-[#F8F9FA] hover:text-[#008BDC]"
      }`}>
      {icon} {label}
    </button>
  );
}
