import React from "react";
import { Link, Zap, ExternalLink, Inbox } from "lucide-react";

const StepApplication = ({ form, setForm }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMethodSelect = (method) => {
    setForm((prev) => ({ ...prev, applicationMethod: method }));
  };

  // INTERNSHALA STYLE CLASSES
  const labelStyle =
    "text-[12px] font-bold text-[#484848] mb-2 uppercase tracking-wider block";
  const inputStyle =
    "w-full px-3.5 py-2.5 bg-white border border-[#DDD] rounded-md text-[#212121] text-[15px] font-medium placeholder:text-gray-400 placeholder:font-normal focus:bg-white focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC] outline-none transition-all duration-200 shadow-sm";

  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
      {/* Header */}
      <div className="border-b border-[#EEE] pb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-[#212121] leading-tight">
          Application Routing
        </h2>
        <p className="text-[14px] text-[#8A8A8A] mt-1">
          Choose how candidates will apply and manage visibility settings.
        </p>
      </div>

      {/* Application Method (Choice Cards) */}
      <div>
        <label className={labelStyle}>How should candidates apply?</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {/* Card 1: Platform / Easy Apply */}
          <button
            type="button"
            onClick={() => handleMethodSelect("platform")}
            className={`flex flex-col text-left p-4 rounded-lg border transition-all duration-200 ${
              form.applicationMethod === "platform" || !form.applicationMethod
                ? "bg-blue-50/50 border-[#008BDC] shadow-[0_0_0_1px_#008BDC]"
                : "bg-white border-[#DDD] hover:border-[#008BDC] hover:bg-[#F8F9FA]"
            }`}>
            <div className="flex items-center gap-2 mb-1.5">
              <Inbox
                className={`w-5 h-5 ${form.applicationMethod === "platform" || !form.applicationMethod ? "text-[#008BDC]" : "text-gray-400"}`}
              />
              <span
                className={`font-bold text-[14px] ${form.applicationMethod === "platform" || !form.applicationMethod ? "text-[#008BDC]" : "text-[#484848]"}`}>
                Easy Apply (In-Platform)
              </span>
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed pl-7">
              Candidates apply directly here. Review resumes and chat with
              applicants in your dashboard.
            </p>
          </button>

          {/* Card 2: External ATS */}
          <button
            type="button"
            onClick={() => handleMethodSelect("external")}
            className={`flex flex-col text-left p-4 rounded-lg border transition-all duration-200 ${
              form.applicationMethod === "external"
                ? "bg-blue-50/50 border-[#008BDC] shadow-[0_0_0_1px_#008BDC]"
                : "bg-white border-[#DDD] hover:border-[#008BDC] hover:bg-[#F8F9FA]"
            }`}>
            <div className="flex items-center gap-2 mb-1.5">
              <ExternalLink
                className={`w-5 h-5 ${form.applicationMethod === "external" ? "text-[#008BDC]" : "text-gray-400"}`}
              />
              <span
                className={`font-bold text-[14px] ${form.applicationMethod === "external" ? "text-[#008BDC]" : "text-[#484848]"}`}>
                External Website
              </span>
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed pl-7">
              Redirect candidates to your company's own career page or a
              third-party ATS system.
            </p>
          </button>
        </div>
      </div>

      {/* Conditional External URL Input */}
      {form.applicationMethod === "external" && (
        <div className="animate-in slide-in-from-top-2 fade-in duration-200 bg-[#F8F9FA] p-5 rounded-md border border-[#EEE]">
          <label className={labelStyle}>External Application URL *</label>
          <div className="relative mt-1.5">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Link size={16} />
            </span>
            <input
              name="externalApplyUrl"
              type="url"
              value={form.externalApplyUrl || ""}
              onChange={handleChange}
              placeholder="https://careers.yourcompany.com/job/123"
              className={`${inputStyle} pl-9`}
              autoFocus
            />
          </div>
          <p className="text-[12px] font-semibold text-gray-500 mt-2">
            Candidates will be redirected to this link when they click "Apply
            Now".
          </p>
        </div>
      )}

      <div className="h-px bg-[#EEE] w-full" />

      {/* Feature / Promotion Box (Internshala Premium Style) */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-md p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0 border border-amber-200">
              <Zap className="w-5 h-5 text-amber-600 fill-amber-600" />
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-amber-900 leading-tight">
                Boost this posting
              </h4>
              <p className="text-[13px] text-amber-800/80 mt-1 leading-relaxed max-w-md font-medium">
                Highlight your listing at the top of search results. Boosted
                postings receive up to{" "}
                <strong className="text-amber-900 font-black">
                  4x more views
                </strong>{" "}
                from premium candidates.
              </p>
            </div>
          </div>

          {/* Native App Style Toggle Switch */}
          <label className="flex items-center cursor-pointer shrink-0 self-start sm:self-center ml-14 sm:ml-0">
            <div className="relative">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured || false}
                onChange={handleChange}
                className="sr-only"
              />
              {/* Toggle Track */}
              <div
                className={`block w-12 h-7 rounded-full transition-colors duration-300 ${form.featured ? "bg-amber-500 shadow-inner" : "bg-gray-300 shadow-inner"}`}></div>
              {/* Toggle Dot */}
              <div
                className={`dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full shadow-sm transition-transform duration-300 flex items-center justify-center ${form.featured ? "transform translate-x-5" : ""}`}>
                {form.featured && (
                  <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                )}
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default StepApplication;
