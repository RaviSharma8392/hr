import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  Building2,
  ChevronLeft,
  Share2,
  IndianRupee,
  Clock,
  ExternalLink,
  CalendarDays,
  Hash,
  Check,
} from "lucide-react";
import { JobService } from "../services/job.service";

export default function HRMCareersJobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJob = async () => {
      setLoading(true);
      const res = await JobService.getJobById(id);
      if (res.success) {
        setJob(res);
      }
      setLoading(false);
    };
    loadJob();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center bg-white">
        <div className="w-8 h-8 border-4 border-[#008bdc] border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!job) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gray-50 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Position Closed</h2>
        <p className="text-gray-500 mt-2 mb-6">
          This job requisition is no longer active or has been filled.
        </p>
        <Link
          to="/jobs"
          className="w-full sm:w-auto px-8 py-3 bg-[#008bdc] text-white rounded-md font-medium hover:bg-[#0073b6] transition-colors">
          View Open Roles
        </Link>
      </div>
    );
  }

  // --- Formatting Helpers ---
  const formatSalary = (min, max) => {
    if (!min && !max) return "Competitive";
    if (min && !max) return `From ₹${(min / 100000).toFixed(1)}L`;
    return `₹${(min / 100000).toFixed(1)}L - ₹${(max / 100000).toFixed(1)}L`;
  };

  const getPostedDate = () => {
    if (!job.createdAt) return "Recently";
    const date = job.createdAt.toDate
      ? job.createdAt.toDate()
      : new Date(job.createdAt);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 pb-24">
      {/* 1. MINIMALIST BRAND NAV (Mobile Optimized) */}
      <div className="border-b border-gray-200 sticky top-0 z-40 bg-white/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link
            to="/jobs"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#008bdc] transition-colors">
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Back to Current Openings</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <div className="text-sm font-bold text-gray-900 line-clamp-1 max-w-[50%] text-right">
            {job.company?.name || "Company Careers"}
          </div>
        </div>
      </div>

      {/* 2. HERO HEADER (Tighter padding on Mobile) */}
      <div className="bg-gray-50/50 border-b border-gray-200 py-8 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight leading-snug">
            {job.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 sm:gap-6 text-sm sm:text-[15px] text-gray-600 font-medium">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-gray-400" />{" "}
              {job.department || "General"}
            </span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gray-400" /> {job.location}
            </span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-gray-400" />{" "}
              {job.employmentType || "Full-time"}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid lg:grid-cols-12 gap-8 sm:gap-16">
        {/* 3. LEFT COLUMN: THE "WHITE PAPER" DOCUMENT */}
        <div className="lg:col-span-8 space-y-8 sm:space-y-10">
          {/* MOBILE ONLY: Essential Metadata Grid */}
          <div className="lg:hidden grid grid-cols-2 gap-3 bg-gray-50 border border-gray-100 rounded-lg p-4 mb-4">
            <MobileMetaItem
              icon={<IndianRupee />}
              label="Compensation"
              value={formatSalary(job.salaryMin, job.salaryMax)}
            />
            <MobileMetaItem
              icon={<Clock />}
              label="Experience"
              value={job.experience || "Not specified"}
            />
            <MobileMetaItem
              icon={<CalendarDays />}
              label="Posted"
              value={getPostedDate()}
            />
            <MobileMetaItem
              icon={<Hash />}
              label="Req ID"
              value={`REQ-${id?.substring(0, 6).toUpperCase() || "10294"}`}
            />
          </div>

          {/* Company Intro */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
              About {job.company?.name || "Us"}
            </h2>
            <div className="text-[15px] sm:text-base text-gray-700 leading-relaxed">
              {job.company?.about ||
                `Join our team at ${job.company?.name || "our company"}. We are looking for passionate individuals to help us build the future.`}
            </div>
          </section>

          {/* Role Description */}
          {job.description && (
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                The Role
              </h2>
              <div className="text-[15px] sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                {job.description}
              </div>
            </section>
          )}

          {/* Responsibilities */}
          {job.responsibilities?.length > 0 && (
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                What You'll Do
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[15px] sm:text-base text-gray-700 leading-relaxed">
                    <Check className="w-5 h-5 text-[#008bdc] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Requirements / Skills */}
          {job.requirements?.length > 0 && (
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                What We're Looking For
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-[15px] sm:text-base text-gray-700 marker:text-gray-400">
                {job.requirements.map((skill, i) => (
                  <li key={i} className="leading-relaxed pl-1">
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Benefits */}
          {job.benefits && (
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                Perks & Benefits
              </h2>
              <div className="text-[15px] sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                {Array.isArray(job.benefits) ? (
                  <ul className="list-disc pl-5 space-y-2 marker:text-gray-400">
                    {job.benefits.map((b, i) => (
                      <li key={i} className="pl-1">
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : (
                  job.benefits
                )}
              </div>
            </section>
          )}

          {/* Bottom Apply Section (Visible mainly for Desktop scrollers) */}
          <div className="hidden sm:block pt-10 mt-10 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Ready to join us?
            </h2>
            <button className="bg-[#008bdc] hover:bg-[#0073b6] text-white px-8 py-3.5 rounded-md text-base font-semibold transition-colors shadow-sm flex items-center gap-2 w-auto justify-center">
              Apply for this job <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4. RIGHT COLUMN: HR METADATA SIDEBAR (Desktop Only) */}
        <aside className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-24">
            {/* Action Card */}
            <div className="mb-8">
              <button className="w-full bg-[#008bdc] hover:bg-[#0073b6] text-white py-4 rounded-md text-base font-semibold transition-colors shadow-sm flex items-center justify-center gap-2 mb-3">
                Apply for this job
              </button>
              <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3.5 rounded-md text-[15px] font-semibold transition-colors flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" /> Share Role
              </button>
            </div>

            {/* Job Overview Metadata Panel */}
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-6">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-6">
                Job Overview
              </h3>

              <div className="space-y-5">
                <HRMetaRow
                  icon={<Hash />}
                  label="Req ID"
                  value={`REQ-${id?.substring(0, 6).toUpperCase() || "10294"}`}
                />
                <HRMetaRow
                  icon={<CalendarDays />}
                  label="Date Posted"
                  value={getPostedDate()}
                />
                <HRMetaRow
                  icon={<Building2 />}
                  label="Department"
                  value={job.department || "General"}
                />
                <HRMetaRow
                  icon={<MapPin />}
                  label="Location"
                  value={job.location}
                />
                <HRMetaRow
                  icon={<Briefcase />}
                  label="Job Type"
                  value={job.employmentType || "Full-time"}
                />
                <HRMetaRow
                  icon={<Clock />}
                  label="Experience"
                  value={job.experience || "Not specified"}
                />
                <HRMetaRow
                  icon={<IndianRupee />}
                  label="Compensation"
                  value={formatSalary(job.salaryMin, job.salaryMax)}
                />
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* 5. MOBILE FLOATING APPLY BAR WITH SHARE */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-50 flex gap-3 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] pb-safe">
        <button className="p-3.5 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
        <button className="flex-1 bg-[#008bdc] text-white py-3.5 rounded-md text-base font-semibold active:scale-95 transition-transform shadow-sm">
          Apply Now
        </button>
      </div>
    </div>
  );
}

/* --- Sub-Components --- */

// For the Desktop Sidebar
const HRMetaRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    {React.cloneElement(icon, {
      className: "w-5 h-5 text-gray-400 shrink-0 mt-0.5",
    })}
    <div>
      <div className="text-xs text-gray-500 font-medium">{label}</div>
      <div className="text-[14px] font-medium text-gray-900 mt-0.5 leading-snug">
        {value}
      </div>
    </div>
  </div>
);

// For the Mobile Grid View
const MobileMetaItem = ({ icon, label, value }) => (
  <div className="flex flex-col gap-1 p-2">
    <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium uppercase tracking-wide">
      {React.cloneElement(icon, { className: "w-3.5 h-3.5 text-gray-400" })}{" "}
      {label}
    </div>
    <div className="text-[13px] font-semibold text-gray-900 leading-tight">
      {value}
    </div>
  </div>
);
