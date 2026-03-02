import React from "react";
import {
  Briefcase,
  IndianRupee,
  ClipboardCheck,
  Rocket,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const StepReview = ({ form, onPublish, loading, isEditing }) => {
  // Helper to format salary numbers nicely (e.g., 500000 -> 5,00,000)
  const formatCurrency = (amount) => {
    if (!amount) return "0";
    return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
      amount,
    );
  };

  const currencySymbol =
    form.currency === "USD"
      ? "$"
      : form.currency === "EUR"
        ? "€"
        : form.currency === "GBP"
          ? "£"
          : "₹";
  const isInternship = form.jobType === "Internship";

  // INTERNSHALA STYLE CLASSES
  const cardStyle =
    "bg-white border border-[#EEE] rounded-md p-5 sm:p-6 shadow-sm";
  const sectionTitleStyle =
    "flex items-center gap-2 text-[15px] font-bold text-[#212121] border-b border-[#EEE] pb-3 mb-4";
  const labelStyle =
    "text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1 block";
  const valueStyle = "text-[14px] font-semibold text-[#212121]";

  // Dynamic Salary String Generator
  const getSalaryString = () => {
    if (form.compensationType === "Unpaid") return "Unpaid";
    if (form.compensationType === "Fixed")
      return `${currencySymbol}${formatCurrency(form.salaryMin)} / ${form.salaryPeriod}`;
    if (!form.salaryMin && !form.salaryMax)
      return (
        <span className="text-red-500 italic flex items-center gap-1">
          <AlertCircle size={14} /> Missing amount
        </span>
      );
    return `${currencySymbol}${formatCurrency(form.salaryMin)} - ${currencySymbol}${formatCurrency(form.salaryMax)} / ${form.salaryPeriod}`;
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
      {/* Header */}
      <div className="border-b border-[#EEE] pb-5 text-center sm:text-left">
        <h2 className="hidden md:block md:text-xl font-bold text-[#212121] tracking-tight">
          Review & Publish
        </h2>
        <p className="text-[14px] text-[#8A8A8A] mt-1">
          Double-check your {isInternship ? "internship" : "job"} details before
          pushing it live to candidates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Core Details Card */}
        <div className={cardStyle}>
          <h3 className={sectionTitleStyle}>
            <Briefcase size={18} className="text-[#008BDC]" /> 1. Basic Details
          </h3>
          <dl className="grid grid-cols-2 gap-y-5 gap-x-4">
            <div className="col-span-2">
              <dt className={labelStyle}>Profile / Title</dt>
              <dd className={`${valueStyle} text-base`}>
                {form.title || (
                  <span className="text-red-500 italic">Missing Title</span>
                )}
              </dd>
            </div>
            <div>
              <dt className={labelStyle}>Opportunity Type</dt>
              <dd className={valueStyle}>{form.jobType || "Not Specified"}</dd>
            </div>
            <div>
              <dt className={labelStyle}>Openings</dt>
              <dd className={valueStyle}>{form.openings || "1"}</dd>
            </div>
            <div>
              <dt className={labelStyle}>Work Setup</dt>
              <dd className={valueStyle}>{form.workMode || "Not Specified"}</dd>
            </div>
            <div>
              <dt className={labelStyle}>Location</dt>
              <dd className={valueStyle}>
                {form.workMode === "Work from home"
                  ? "Remote"
                  : form.location || "Not Specified"}
              </dd>
            </div>
            <div>
              <dt className={labelStyle}>Start Date</dt>
              <dd className={valueStyle}>
                {form.startDateType === "Immediately"
                  ? "Immediately"
                  : form.exactStartDate || "Not Specified"}
              </dd>
            </div>
            <div>
              <dt className={labelStyle}>
                {isInternship ? "Duration" : "Experience Required"}
              </dt>
              <dd className={valueStyle}>
                {isInternship ? form.duration : form.experienceLevel}
              </dd>
            </div>
          </dl>
        </div>

        {/* 2. Compensation Card */}
        <div className={cardStyle}>
          <h3 className={sectionTitleStyle}>
            <IndianRupee size={18} className="text-[#008BDC]" /> 2.{" "}
            {isInternship ? "Stipend & Perks" : "Compensation"}
          </h3>
          <dl className="grid grid-cols-1 gap-y-5">
            <div>
              <dt className={labelStyle}>
                {isInternship ? "Stipend" : "Salary"}
              </dt>
              <dd className={valueStyle}>
                {getSalaryString()}
                {form.compensationType === "Performance-based" && (
                  <span className="text-[12px] font-normal text-gray-500 ml-1">
                    (Performance-based)
                  </span>
                )}
                {form.compensationType === "Negotiable" && (
                  <span className="text-[12px] font-normal text-gray-500 ml-1">
                    (Negotiable)
                  </span>
                )}
              </dd>
            </div>

            {/* Dynamic PPO/Probation Logic */}
            {isInternship && form.ppo && (
              <div className="bg-blue-50/50 p-3 rounded border border-blue-100">
                <dt className="text-[11px] font-bold text-[#008BDC] uppercase tracking-widest mb-0.5">
                  Pre-Placement Offer (PPO)
                </dt>
                <dd className="text-[13px] font-semibold text-[#212121]">
                  Available (Expected CTC: {form.ppoSalary || "TBD"})
                </dd>
              </div>
            )}
            {!isInternship && form.probation && (
              <div className="bg-orange-50/50 p-3 rounded border border-orange-100">
                <dt className="text-[11px] font-bold text-orange-600 uppercase tracking-widest mb-0.5">
                  Probation Period
                </dt>
                <dd className="text-[13px] font-semibold text-[#212121]">
                  {form.probationDuration || "TBD"} (
                  {form.probationSalary
                    ? `${form.probationSalary} during probation`
                    : "Salary TBD"}
                  )
                </dd>
              </div>
            )}

            <div>
              <dt className={labelStyle}>Included Perks</dt>
              <dd className="flex flex-wrap gap-1.5 mt-1.5">
                {form.perks && form.perks.length > 0 ? (
                  form.perks.map((perk, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-semibold bg-[#F8F9FA] border border-[#DDD] text-[#484848] px-2.5 py-1 rounded-md">
                      {perk}
                    </span>
                  ))
                ) : (
                  <span className="text-[13px] text-gray-400">
                    None selected
                  </span>
                )}
              </dd>
            </div>
          </dl>
        </div>

        {/* 3. Content Summary Card */}
        <div className="md:col-span-2 cardStyle bg-white border border-[#EEE] rounded-md p-5 sm:p-6 shadow-sm">
          <h3 className={sectionTitleStyle}>
            <ClipboardCheck size={18} className="text-[#008BDC]" /> 3. Content &
            Assessment
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Content Stats */}
            <div className="sm:col-span-2 space-y-4">
              <div>
                <dt className={labelStyle}>Role Overview</dt>
                <dd className="text-[13px] text-[#484848] line-clamp-2 leading-relaxed">
                  {form.description || (
                    <span className="text-gray-400 italic">
                      No description provided.
                    </span>
                  )}
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                <div>
                  <dt className={labelStyle}>Responsibilities</dt>
                  <dd className={valueStyle}>
                    {form.responsibilities?.filter((r) => r.trim() !== "")
                      .length || 0}{" "}
                    items
                  </dd>
                </div>
                <div>
                  <dt className={labelStyle}>Requirements</dt>
                  <dd className={valueStyle}>
                    {form.requirements?.filter((r) => r.trim() !== "").length ||
                      0}{" "}
                    items
                  </dd>
                </div>
                <div>
                  <dt className={labelStyle}>Required Skills</dt>
                  <dd className={valueStyle}>
                    {form.skills?.length || 0} tags
                  </dd>
                </div>
              </div>
            </div>

            {/* Routing & Assessment Settings */}
            <div className="sm:border-l border-[#EEE] sm:pl-6 space-y-4">
              <div>
                <dt className={labelStyle}>Apply Method</dt>
                <dd className={valueStyle}>
                  {form.applicationMethod === "external"
                    ? "External ATS Link"
                    : "In-Platform (Easy Apply)"}
                </dd>
              </div>
              <div>
                <dt className={labelStyle}>Assessment</dt>
                <dd className="text-[13px] font-semibold text-[#484848] flex flex-col gap-1">
                  <span className="flex items-center gap-1.5">
                    {form.requireCoverLetter ? (
                      <CheckCircle2 size={14} className="text-[#10b981]" />
                    ) : (
                      <AlertCircle size={14} className="text-gray-400" />
                    )}
                    Cover Letter{" "}
                    {form.requireCoverLetter ? "Required" : "Optional"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#10b981]" />
                    {form.screeningQuestions?.length || 0} Custom Questions
                  </span>
                </dd>
              </div>
              {form.featured && (
                <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-md border border-amber-200 text-xs font-bold mt-1">
                  <Rocket size={14} /> Boosted Post
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Final Action Area (Hidden on mobile because the sticky bottom bar handles it) */}
      <div className="hidden md:block mt-8 pt-6 border-t border-[#EEE]">
        <button
          onClick={onPublish}
          disabled={loading}
          className="px-12 py-3.5 bg-[#10b981] hover:bg-[#0ea5e9] text-white rounded-md font-bold text-[15px] shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 mx-auto">
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{" "}
              {isEditing ? "Saving..." : "Publishing..."}
            </>
          ) : (
            <>
              {isEditing ? "Confirm & Save Changes" : "Confirm & Publish Job"}
            </>
          )}
        </button>
        <p className="text-center text-[12px] text-gray-500 mt-3 font-medium">
          By {isEditing ? "saving" : "publishing"}, you agree to our Terms of
          Service & Employer Guidelines.
        </p>
      </div>
    </div>
  );
};

export default StepReview;
