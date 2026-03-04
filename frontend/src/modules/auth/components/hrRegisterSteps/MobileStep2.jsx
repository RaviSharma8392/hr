// src/pages/auth/HRRegisterSteps/MobileStep2.jsx
import React, { useEffect, useState } from "react";
import { ChevronDown, AlertCircle } from "lucide-react";

export default function MobileStep2({
  form,
  handleChange,
  nextStep,
  prevStep,
  setError,
}) {
  const [fieldErrors, setFieldErrors] = useState({});

  // Clear any previous global error when this step loads
  useEffect(() => {
    setError("");
  }, [setError]);

  const handleContinue = () => {
    const errors = {};

    if (!form.companyName.trim()) {
      errors.companyName = "Please enter your company name.";
    }
    if (!form.companySize) {
      errors.companySize = "Please select your company size.";
    }

    setFieldErrors(errors);

    // If no errors, proceed to next step
    if (Object.keys(errors).length === 0) {
      nextStep();
    }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-8 duration-400 font-sans">
      <div className="mb-8 mt-2">
        <h2 className="text-[26px] font-semibold text-gray-900 tracking-tight leading-tight">
          Tell us about your company
        </h2>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        {/* ========================================== */}
        {/* COMPANY NAME INPUT                         */}
        {/* ========================================== */}
        <div>
          <label
            htmlFor="companyName"
            className="block text-[14px] font-semibold text-gray-800 mb-1.5">
            Company name
          </label>
          <input
            type="text"
            name="companyName"
            id="companyName"
            placeholder="e.g. Acme Corp"
            value={form.companyName}
            onChange={handleChange}
            className={`w-full h-12 px-4 bg-white border rounded-md text-[16px] text-gray-900 transition-all focus:outline-none ${
              fieldErrors.companyName
                ? "border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-gray-400 hover:border-gray-600 focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC]"
            }`}
          />
          {fieldErrors.companyName && (
            <p className="flex items-start gap-1.5 text-[13px] text-red-600 mt-1.5 font-medium animate-in slide-in-from-top-1">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />{" "}
              {fieldErrors.companyName}
            </p>
          )}
        </div>

        {/* ========================================== */}
        {/* COMPANY SIZE SELECT                        */}
        {/* ========================================== */}
        <div>
          <label
            htmlFor="companySize"
            className="block text-[14px] font-semibold text-gray-800 mb-1.5">
            Company size
          </label>
          <div className="relative">
            <select
              name="companySize"
              id="companySize"
              value={form.companySize}
              onChange={handleChange}
              className={`w-full h-12 pl-4 pr-10 bg-white border rounded-md text-[16px] transition-all focus:outline-none appearance-none cursor-pointer ${
                form.companySize ? "text-gray-900" : "text-gray-500"
              } ${
                fieldErrors.companySize
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-gray-400 hover:border-gray-600 focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC]"
              }`}>
              <option value="" disabled>
                Select company size
              </option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="200+">200+ employees</option>
            </select>

            {/* Standard Dropdown Chevron */}
            <ChevronDown
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
          {fieldErrors.companySize && (
            <p className="flex items-start gap-1.5 text-[13px] text-red-600 mt-1.5 font-medium animate-in slide-in-from-top-1">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />{" "}
              {fieldErrors.companySize}
            </p>
          )}
        </div>
      </div>

      {/* ========================================== */}
      {/* CONTINUE BUTTON                            */}
      {/* ========================================== */}
      <div className="pt-6 mt-4">
        <button
          onClick={handleContinue}
          className="w-full h-14 bg-[#008BDC] hover:bg-[#0073B6] text-white rounded-full font-semibold text-[16px] transition-colors duration-200">
          Agree & Join
        </button>

        {/* Small Legal Disclaimer (Crucial for Professional Apps) */}
        <p className="text-[12px] text-gray-500 text-center leading-relaxed px-2 mt-2">
          By clicking Agree & Join, you agree to the HRMastery{" "}
          <span className="font-semibold text-[#008BDC] cursor-pointer hover:underline">
            User Agreement
          </span>
          ,{" "}
          <span className="font-semibold text-[#008BDC] cursor-pointer hover:underline">
            Privacy Policy
          </span>
          , and{" "}
          <span className="font-semibold text-[#008BDC] cursor-pointer hover:underline">
            Cookie Policy
          </span>
          .
        </p>
      </div>
    </div>
  );
}
