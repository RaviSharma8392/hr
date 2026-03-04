import React, { useState, useMemo } from "react";
import {
  MapPin,
  Banknote,
  Clock,
  Bookmark,
  Share2,
  ExternalLink,
  Sparkles,
  Building2,
} from "lucide-react";

import { useJobNavigation } from "../../utils/jobNavigationHelper";

/* ================= INTERNSHALA-STYLE BRANDING ================= */
const DEFAULT_BRANDING = {
  themeColor: "#1295D8", // Internshala Blue
  themeColorLight: "#E8F5FD", // Light blue for tags
  backgroundColor: "#FFFFFF",
  surfaceColor: "#F8FAFC", // Light slate for secondary badges
  textColor: "#333333",
  headingColor: "#444444",
  mutedTextColor: "#777777",
  borderColor: "#E5E7EB",
  borderRadius: "6px", // Professional, crisp corners
  fontFamily: "'Inter', 'Roboto', system-ui, sans-serif",
};

export default function AppJobCard({ job = {}, branding = DEFAULT_BRANDING }) {
  const [saved, setSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const currentBrand = useMemo(
    () => ({ ...DEFAULT_BRANDING, ...branding }),
    [branding],
  );
  const { navigateToJobDetails, navigateToApply, shareJob } =
    useJobNavigation();

  /* ---------------- JOB DATA ---------------- */
  const {
    id,
    title = "Untitled Role",
    companyName = "Company",
    location = "Not Specified",
    salary = "Not Disclosed",
    experience = "",
    postedAt = "Recently",
    jobType = "Full Time",
    isActive = true,
    company = { logo: null },
  } = job;

  /* ---------------- BRANDING ACCESSORS ---------------- */
  const {
    themeColor,
    themeColorLight,
    backgroundColor,
    surfaceColor,
    headingColor,
    mutedTextColor,
    borderColor,
    borderRadius,
    fontFamily,

    textColor,
  } = currentBrand;

  /* ---------------- SKELETON LOADER ---------------- */
  if (!id) {
    return (
      <div
        className="w-full bg-white border animate-pulse flex flex-col p-5"
        style={{ borderRadius, borderColor }}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded bg-gray-100 shrink-0" />
            <div className="space-y-2 mt-1">
              <div className="h-5 w-40 bg-gray-200 rounded" />
              <div className="h-3 w-24 bg-gray-100 rounded" />
            </div>
          </div>
          <div className="w-8 h-8 rounded bg-gray-50" />
        </div>
        <div className="flex gap-2 mb-6">
          <div className="h-6 w-20 bg-gray-50 rounded" />
          <div className="h-6 w-24 bg-gray-50 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="h-4 bg-gray-50 rounded w-3/4" />
          <div className="h-4 bg-gray-50 rounded w-1/2" />
        </div>
        <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-100">
          <div className="h-4 w-20 bg-gray-50 rounded" />
          <div className="flex gap-2">
            <div className="h-9 w-24 bg-gray-50 rounded" />
            <div className="h-9 w-28 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- MAIN COMPONENT ---------------- */
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigateToJobDetails(job)}
      style={{
        fontFamily,
        borderRadius,
        background: backgroundColor,
        borderColor: isHovered ? themeColor : borderColor,
        boxShadow: isHovered ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
      }}
      className="relative border p-5 transition-all duration-200 cursor-pointer group flex flex-col h-full">
      {/* Top Section: Logo, Title, and Quick Actions */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3.5">
          {/* Logo Container */}
          <div
            className="w-12 h-12 rounded border flex items-center justify-center shrink-0 overflow-hidden"
            style={{ borderColor, backgroundColor: surfaceColor }}>
            {branding.logo ? (
              <img
                src={branding.logo}
                alt={companyName}
                className="w-8 h-8 object-contain "
              />
            ) : (
              <Building2 size={20} style={{ color: mutedTextColor }} />
            )}
          </div>

          {/* Title & Company */}
          <div className="mt-0.5">
            <h3
              style={{ color: headingColor }}
              className="text-[17px] font-bold leading-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            <p
              style={{ color: mutedTextColor }}
              className="text-[14px] font-medium mt-1">
              {companyName}
            </p>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex gap-1 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSaved(!saved);
            }}
            className="p-1.5 rounded hover:bg-gray-50 transition-colors focus:outline-none"
            style={{ color: saved ? themeColor : mutedTextColor }}
            aria-label="Save job">
            <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              shareJob(job);
            }}
            className="p-1.5 rounded hover:bg-gray-50 transition-colors focus:outline-none"
            style={{ color: mutedTextColor }}
            aria-label="Share job">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Badges Section */}
      <div className="flex flex-wrap gap-2 mb-5">
        {isActive && (
          <span
            style={{
              backgroundColor: themeColorLight,
              color: themeColor,
              borderRadius: "4px",
            }}
            className="text-[12px] font-semibold px-2 py-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Actively Hiring
          </span>
        )}
        {jobType && (
          <span
            style={{
              backgroundColor: surfaceColor,
              color: textColor,
              borderRadius: "4px",
              border: `1px solid ${borderColor}`,
            }}
            className="text-[12px] font-medium px-2 py-1">
            {jobType}
          </span>
        )}
        {experience && (
          <span
            style={{
              backgroundColor: surfaceColor,
              color: textColor,
              borderRadius: "4px",
              border: `1px solid ${borderColor}`,
            }}
            className="text-[12px] font-medium px-2 py-1">
            {experience}
          </span>
        )}
      </div>

      {/* Details Grid (Location & Salary) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 mb-6">
        <MetaItem icon={MapPin} text={location} color={mutedTextColor} />
        <MetaItem icon={Banknote} text={salary} color={mutedTextColor} />
      </div>

      {/* Footer Section */}
      <div
        className="mt-auto pt-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4"
        style={{ borderColor }}>
        <div
          className="flex items-center gap-1.5 text-[13px] font-medium w-full sm:w-auto"
          style={{ color: mutedTextColor }}>
          <Clock className="w-3.5 h-3.5" /> {postedAt}
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateToJobDetails(job);
            }}
            style={{
              color: themeColor,
              border: `1px solid ${themeColor}`,
              borderRadius: "4px",
            }}
            className="flex-1 sm:flex-none px-4 py-2 text-[13px] font-semibold hover:bg-blue-50 transition-colors focus:outline-none">
            View Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateToApply(job);
            }}
            style={{
              backgroundColor: themeColor,
              color: "#ffffff",
              borderRadius: "4px",
            }}
            className="flex-1 sm:flex-none px-4 py-2 text-[13px] font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 focus:outline-none">
            Apply Now <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- META SUB-COMPONENT ---------------- */
function MetaItem({ icon: Icon, text, color }) {
  return (
    <div
      className="flex items-center gap-1.5 text-[13px] font-medium"
      style={{ color }}>
      <Icon className="w-4 h-4 shrink-0 opacity-70" />
      <span className="truncate">{text}</span>
    </div>
  );
}
