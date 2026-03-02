import React from "react";
import {
  CheckCircle2,
  Info,
  Lightbulb,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

const StepCompensation = ({ form, setForm }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const togglePerk = (perk) => {
    const currentPerks = form.perks || [];
    if (currentPerks.includes(perk)) {
      setForm((prev) => ({
        ...prev,
        perks: currentPerks.filter((p) => p !== perk),
      }));
    } else {
      setForm((prev) => ({ ...prev, perks: [...currentPerks, perk] }));
    }
  };

  // INTERNSHALA STYLE CLASSES
  const labelStyle =
    "text-[12px] font-bold text-[#484848] mb-2 block uppercase tracking-wider";
  const inputStyle =
    "w-full px-3.5 py-2.5 bg-white border border-[#DDD] rounded-md text-[#212121] text-[15px] font-medium placeholder:text-gray-400 placeholder:font-normal focus:bg-white focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC] outline-none transition-all duration-200 appearance-none shadow-sm";

  // Dynamic Context Flags
  const isInternship = form.jobType === "Internship";
  const showSalaryInputs = form.compensationType !== "Unpaid";
  const isFixed = form.compensationType === "Fixed";

  const internshalaPerks = [
    "Certificate",
    "Letter of recommendation",
    "Flexible work hours",
    "5 days a week",
    "Informal dress code",
    "Free snacks & beverages",
    "Health Insurance",
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
      {/* Header */}
      <div className="border-b border-[#EEE] pb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-[#212121] leading-tight">
          {isInternship ? "Stipend & Perks" : "Compensation & Benefits"}
        </h2>
        <p className="text-[14px] text-[#8A8A8A] mt-1">
          Set the budget and highlight the perks of joining the team.
        </p>
      </div>

      {/* Internshala Best Practice Card */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-md p-4 flex gap-3.5 items-start">
        <TrendingUp className="w-5 h-5 text-[#008BDC] shrink-0 mt-0.5" />
        <div>
          <h4 className="text-[13px] font-bold text-[#008BDC]">
            Transparency Wins
          </h4>
          <p className="text-[13px] text-gray-600 mt-1 leading-relaxed">
            Postings with clear {isInternship ? "stipend" : "salary"} ranges
            receive{" "}
            <strong className="text-[#212121]">65% more applications</strong>{" "}
            and save your HR team hours of negotiation time.
          </p>
        </div>
      </div>

      {/* Pay Structure */}
      <div className="space-y-6">
        <div>
          <label className={labelStyle}>
            {isInternship ? "Stipend Type" : "Salary Type"} *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["Fixed", "Negotiable", "Performance-based", "Unpaid"].map(
              (type) => (
                <RadioPill
                  key={type}
                  active={form.compensationType === type}
                  onClick={() =>
                    setForm((prev) => ({ ...prev, compensationType: type }))
                  }
                  label={type}
                />
              ),
            )}
          </div>
        </div>

        {/* Salary Inputs (Hides if Unpaid) */}
        {showSalaryInputs && (
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 p-5 bg-[#F8F9FA] border border-[#EEE] rounded-md animate-in fade-in zoom-in-95 duration-200">
            <div className="sm:col-span-4">
              <label className={labelStyle}>Currency & Period</label>
              <div className="flex gap-2">
                <select
                  name="currency"
                  value={form.currency}
                  onChange={handleChange}
                  className={`${inputStyle} w-24 cursor-pointer px-2`}>
                  <option value="INR">₹ INR</option>
                  <option value="USD">$ USD</option>
                </select>
                <select
                  name="salaryPeriod"
                  value={form.salaryPeriod}
                  onChange={handleChange}
                  className={`${inputStyle} cursor-pointer`}>
                  <option value="Month">/ Month</option>
                  <option value="Year">/ Year (CTC)</option>
                </select>
              </div>
            </div>

            <div className={`sm:col-span-${isFixed ? "8" : "4"}`}>
              <label className={labelStyle}>
                {isFixed ? "Exact Amount *" : "Minimum *"}
              </label>
              <input
                name="salaryMin"
                type="number"
                value={form.salaryMin}
                onChange={handleChange}
                placeholder="e.g. 15000"
                className={inputStyle}
              />
            </div>

            {!isFixed && (
              <div className="sm:col-span-4">
                <label className={labelStyle}>Maximum *</label>
                <input
                  name="salaryMax"
                  type="number"
                  value={form.salaryMax}
                  onChange={handleChange}
                  placeholder="e.g. 25000"
                  className={inputStyle}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="h-px bg-[#EEE] w-full" />

      {/* DYNAMIC LOGIC: PPO vs Probation */}
      {isInternship ? (
        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-0.5">
              <input
                type="checkbox"
                name="ppo"
                checked={form.ppo || false}
                onChange={handleChange}
                className="peer appearance-none w-5 h-5 border-2 border-[#DDD] rounded bg-white checked:bg-[#008BDC] checked:border-[#008BDC] focus:outline-none transition-all"
              />
              <CheckCircle2
                size={14}
                className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#212121] group-hover:text-[#008BDC] transition-colors">
                Offers Pre-Placement Offer (PPO)
              </span>
              <span className="text-[13px] text-gray-500 mt-0.5">
                Will a full-time role be offered to the candidate upon
                successful completion of the internship?
              </span>
            </div>
          </label>

          {form.ppo && (
            <div className="pl-8 animate-in slide-in-from-top-2 fade-in duration-200">
              <label className={labelStyle}>
                Expected CTC (LPA) after PPO *
              </label>
              <input
                name="ppoSalary"
                type="text"
                value={form.ppoSalary || ""}
                onChange={handleChange}
                placeholder="e.g. 5.5 LPA"
                className={`${inputStyle} max-w-xs`}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-0.5">
              <input
                type="checkbox"
                name="probation"
                checked={form.probation || false}
                onChange={handleChange}
                className="peer appearance-none w-5 h-5 border-2 border-[#DDD] rounded bg-white checked:bg-[#008BDC] checked:border-[#008BDC] focus:outline-none transition-all"
              />
              <CheckCircle2
                size={14}
                className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#212121] group-hover:text-[#008BDC] transition-colors">
                Includes a Probation Period
              </span>
              <span className="text-[13px] text-gray-500 mt-0.5">
                Is there a fixed training or probation period before full-time
                confirmation?
              </span>
            </div>
          </label>

          {form.probation && (
            <div className="pl-8 grid grid-cols-1 sm:grid-cols-2 gap-5 animate-in slide-in-from-top-2 fade-in duration-200">
              <div>
                <label className={labelStyle}>Probation Duration</label>
                <input
                  name="probationDuration"
                  value={form.probationDuration || ""}
                  onChange={handleChange}
                  placeholder="e.g. 3 Months"
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>Salary during probation</label>
                <input
                  name="probationSalary"
                  value={form.probationSalary || ""}
                  onChange={handleChange}
                  placeholder="e.g. ₹20,000 / month"
                  className={inputStyle}
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="h-px bg-[#EEE] w-full" />

      {/* Perks & Benefits (Internshala style chips) */}
      <div>
        <label className={labelStyle}>Perks</label>
        <p className="text-[13px] text-gray-500 mb-4">
          Select the perks offered with this role to attract more candidates.
        </p>
        <div className="flex flex-wrap gap-2.5">
          {internshalaPerks.map((perk) => {
            const isSelected = (form.perks || []).includes(perk);
            return (
              <button
                key={perk}
                type="button"
                onClick={() => togglePerk(perk)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-md text-[13px] font-semibold transition-all duration-200 border ${
                  isSelected
                    ? "bg-blue-50/50 border-[#008BDC] text-[#008BDC]"
                    : "bg-white border-[#DDD] text-[#484848] hover:border-[#008BDC] hover:bg-[#F8F9FA]"
                }`}>
                {isSelected && (
                  <CheckCircle2 size={16} className="text-[#008BDC]" />
                )}
                {perk}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- Reusable Sub-Components ---

const RadioPill = ({ active, onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative py-3 px-3 rounded-md text-[13px] font-semibold transition-all duration-200 border flex items-center justify-center text-center leading-tight ${
      active
        ? "bg-blue-50/50 border-[#008BDC] text-[#008BDC] shadow-[0_0_0_1px_#008BDC]"
        : "bg-white border-[#DDD] text-[#484848] hover:border-[#008BDC] hover:bg-[#F8F9FA]"
    }`}>
    {label}
  </button>
);

export default StepCompensation;
