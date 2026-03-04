import React, { useState } from "react";
import {
  Plus,
  X,
  Briefcase,
  MapPin,
  Users,
  CheckCircle2,
  GraduationCap,
  Home,
  Building,
  Calendar,
} from "lucide-react";

const StepBasicInfo = ({ form, setForm }) => {
  const [isAddingDept, setIsAddingDept] = useState(false);
  const [newDept, setNewDept] = useState("");

  const [departmentOptions, setDepartmentOptions] = useState([
    "Software Development",
    "Design & Creative",
    "Sales & Marketing",
    "Human Resources",
    "Operations",
    "Finance & Legal",
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveNewDept = () => {
    if (newDept.trim()) {
      setDepartmentOptions((prev) => [...prev, newDept]);
      setForm((prev) => ({ ...prev, category: newDept }));
      setIsAddingDept(false);
      setNewDept("");
    }
  };

  // INTERNSHALA STYLE CLASSES
  const labelStyle =
    "text-[12px] font-bold text-[#484848] mb-2 block uppercase tracking-wider";
  const inputStyle =
    "w-full px-3.5 py-2.5 bg-white border border-[#DDD] rounded-md text-[#212121] text-[15px] font-medium placeholder:text-gray-400 placeholder:font-normal focus:bg-white focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC] outline-none transition-all duration-200 appearance-none shadow-sm";
  const inlineBtnStyle =
    "px-4 bg-[#008BDC] text-white rounded-md font-bold text-xs uppercase tracking-widest hover:bg-[#0073B6] transition-colors shadow-sm active:scale-95";
  const inlineCancelStyle =
    "px-3 bg-white border border-[#DDD] text-gray-500 rounded-md hover:bg-gray-50 transition-colors active:scale-95 flex items-center justify-center";

  // Dynamic States
  const isInternship = form.jobType === "Internship";
  const isWFH = form.workMode === "Work from home";
  const isStartDateLater = form.startDateType === "Later";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#EEE] pb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-[#212121] leading-tight">
          Basic Details
        </h2>
        <p className="text-[14px] text-[#8A8A8A] mt-1">
          Provide the foundational information so candidates can find this role.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
        {/* ROW 1: Opportunity Type */}
        <div className="md:col-span-2">
          <label className={labelStyle}>Opportunity Type *</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <RadioPill
              active={form.jobType === "Internship"}
              onClick={() =>
                setForm((prev) => ({ ...prev, jobType: "Internship" }))
              }
              icon={<GraduationCap size={18} />}
              label="Internship"
            />
            <RadioPill
              active={form.jobType === "Job"}
              onClick={() =>
                setForm((prev) => ({ ...prev, jobType: "Job", duration: "" }))
              }
              icon={<Briefcase size={18} />}
              label="Job"
            />
            <RadioPill
              active={form.jobType === "Fresher Job"}
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  jobType: "Fresher Job",
                  duration: "",
                }))
              }
              icon={<Users size={18} />}
              label="Fresher Job"
            />
          </div>
        </div>

        {/* ROW 2: Job Title & Openings */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-12 gap-6">
          <div className="sm:col-span-9">
            <label className={labelStyle}>Profile / Designation *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Senior React Developer"
              className={inputStyle}
            />
          </div>
          <div className="sm:col-span-3">
            <label className={labelStyle}>No. of Openings *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users size={16} className="text-gray-400" />
              </div>
              <input
                type="number"
                min="1"
                name="openings"
                value={form.openings || ""}
                onChange={handleChange}
                placeholder="e.g. 3"
                className={`${inputStyle} pl-9`}
              />
            </div>
          </div>
        </div>

        {/* ROW 3: Department / Category */}
        <div className="col-span-1">
          <div className="flex justify-between items-center mb-1.5">
            <label className={`${labelStyle} mb-0`}>Category *</label>
            {!isAddingDept && (
              <button
                type="button"
                onClick={() => setIsAddingDept(true)}
                className="text-[11px] font-bold text-[#008BDC] uppercase tracking-widest hover:text-[#0073B6] flex items-center gap-1">
                <Plus size={12} /> Custom
              </button>
            )}
          </div>

          {isAddingDept ? (
            <div className="flex gap-2 h-[42px] animate-in fade-in duration-200">
              <input
                autoFocus
                className={`${inputStyle} h-full`}
                placeholder="Category name..."
                value={newDept}
                onChange={(e) => setNewDept(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveNewDept()}
              />
              <button
                type="button"
                onClick={handleSaveNewDept}
                className={inlineBtnStyle}>
                Add
              </button>
              <button
                type="button"
                onClick={() => setIsAddingDept(false)}
                className={inlineCancelStyle}>
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase
                  size={16}
                  className="text-gray-400 group-focus-within:text-[#008BDC]"
                />
              </div>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={`${inputStyle} cursor-pointer pl-9`}>
                <option value="" disabled>
                  Select Category
                </option>
                {departmentOptions.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <ChevronIcon />
            </div>
          )}
        </div>

        {/* ROW 4: Work Mode */}
        <div className="col-span-1">
          <label className={labelStyle}>Work Setup *</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <RadioPill
              active={form.workMode === "In-office"}
              onClick={() =>
                setForm((prev) => ({ ...prev, workMode: "In-office" }))
              }
              icon={<Building size={14} />}
              label="In-office"
              small
            />
            <RadioPill
              active={form.workMode === "Work from home"}
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  workMode: "Work from home",
                  location: [],
                }))
              }
              icon={<Home size={14} />}
              label="WFH"
              small
            />
            <RadioPill
              active={form.workMode === "Hybrid"}
              onClick={() =>
                setForm((prev) => ({ ...prev, workMode: "Hybrid" }))
              }
              icon={<MapPin size={14} />}
              label="Hybrid"
              small
            />
          </div>
        </div>

        {/* ROW 5: Location (Hides if WFH) */}
        {!isWFH && (
          <div className="md:col-span-2 animate-in slide-in-from-top-2 fade-in duration-300">
            <label className={labelStyle}>Cities / Location *</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin
                  size={16}
                  className="text-gray-400 group-focus-within:text-[#008BDC]"
                />
              </div>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Bangalore, Mumbai (Comma separated)"
                className={`${inputStyle} pl-9`}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1.5">
              For multiple cities, separate them with a comma.
            </p>
          </div>
        )}

        {/* ROW 6: Start Date */}
        <div className="md:col-span-2 pt-2 border-t border-[#F5F5F5]">
          <label className={labelStyle}>Start Date *</label>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex gap-3 w-full sm:w-auto">
              <RadioPill
                active={form.startDateType === "Immediately"}
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    startDateType: "Immediately",
                    exactStartDate: "",
                  }))
                }
                label="Immediately (within 30 days)"
              />
              <RadioPill
                active={form.startDateType === "Later"}
                onClick={() =>
                  setForm((prev) => ({ ...prev, startDateType: "Later" }))
                }
                label="Later"
              />
            </div>

            {/* Exact Date Picker if 'Later' is selected */}
            {isStartDateLater && (
              <div className="relative w-full sm:w-48 animate-in zoom-in-95 duration-200">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-[#008BDC]" />
                </div>
                <input
                  type="date"
                  name="exactStartDate"
                  value={form.exactStartDate}
                  onChange={handleChange}
                  className={`${inputStyle} pl-9 border-[#008BDC] ring-1 ring-[#008BDC]/20`}
                />
              </div>
            )}
          </div>
        </div>

        {/* ROW 7: Dynamic Field (Duration vs Experience) */}
        {isInternship ? (
          <div className="md:col-span-2 pt-2 animate-in fade-in duration-300">
            <label className={labelStyle}>Internship Duration *</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {[
                "1 Month",
                "2 Months",
                "3 Months",
                "4 Months",
                "6 Months",
                "Other",
              ].map((dur) => (
                <RadioPill
                  key={dur}
                  active={form.duration === dur}
                  onClick={() =>
                    setForm((prev) => ({ ...prev, duration: dur }))
                  }
                  label={dur}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="md:col-span-2 pt-2 animate-in fade-in duration-300">
            <label className={labelStyle}>Experience Required *</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                "0-2 Years",
                "2-5 Years",
                "5-8 Years",
                "8-10 Years",
                "10+ Years",
              ].map((exp) => (
                <RadioPill
                  key={exp}
                  active={form.experienceLevel === exp}
                  onClick={() =>
                    setForm((prev) => ({ ...prev, experienceLevel: exp }))
                  }
                  label={exp}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Reusable Sub-Components ---

const RadioPill = ({ active, onClick, icon, label, small }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative ${small ? "py-2 px-2" : "py-3 px-4"} rounded-md font-semibold transition-all duration-200 border flex items-center justify-center gap-2 ${
      active
        ? "bg-blue-50/50 border-[#008BDC] text-[#008BDC] shadow-[0_0_0_1px_#008BDC]"
        : "bg-white border-[#DDD] text-[#484848] hover:border-[#008BDC] hover:bg-[#F8F9FA]"
    } ${small ? "text-[12px]" : "text-[14px]"}`}>
    {icon && (
      <span className={active ? "text-[#008BDC]" : "text-gray-400"}>
        {icon}
      </span>
    )}
    {label}
    {active && !small && (
      <CheckCircle2
        size={16}
        className="absolute right-3 text-[#008BDC] hidden sm:block"
      />
    )}
  </button>
);

const ChevronIcon = () => (
  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
);

export default StepBasicInfo;
