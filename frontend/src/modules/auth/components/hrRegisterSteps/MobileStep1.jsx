// src/pages/auth/HRRegisterSteps/MobileStep1.jsx
import React, { useEffect, useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

export default function MobileStep1({
  form,
  handleChange,
  nextStep,
  setError,
}) {
  const [fieldErrors, setFieldErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setError("");
  }, [setError]);

  /* ---------------------------------------
     Password Strength Calculator
  ---------------------------------------- */
  useEffect(() => {
    const pwd = form.password;
    let strength = 0;

    if (pwd.length >= 6) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;

    setPasswordStrength(strength);
  }, [form.password]);

  const validate = () => {
    const errors = {};

    if (!form.fullName.trim()) {
      errors.fullName = "Please enter your full name.";
    }

    if (!form.email.trim()) {
      errors.email = "Please enter your work email.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!form.password) {
      errors.password = "Please enter a password.";
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      nextStep();
    }
  };

  const strengthColors = [
    "bg-[#E11D48]", // Red
    "bg-[#D97706]", // Orange
    "bg-[#059669]", // Green
    "bg-[#059669]", // Green
  ];

  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-8 duration-400 font-sans">
      <div className="mb-8 mt-2">
        <h2 className="text-[26px] font-semibold text-gray-900 tracking-tight leading-tight">
          Make the most of your professional life
        </h2>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        {/* ========================================== */}
        {/* FULL NAME INPUT                            */}
        {/* ========================================== */}
        <div>
          <label className="block text-[14px] font-semibold text-gray-800 mb-1.5">
            Full name
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className={`w-full h-12 px-4 bg-white border rounded-md text-[16px] text-gray-900 transition-all focus:outline-none ${
              fieldErrors.fullName
                ? "border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-gray-400 hover:border-gray-600 focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC]"
            }`}
          />
          {fieldErrors.fullName && (
            <p className="flex items-start gap-1.5 text-[13px] text-red-600 mt-1.5 font-medium animate-in slide-in-from-top-1">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />{" "}
              {fieldErrors.fullName}
            </p>
          )}
        </div>

        {/* ========================================== */}
        {/* EMAIL INPUT                                */}
        {/* ========================================== */}
        <div>
          <label className="block text-[14px] font-semibold text-gray-800 mb-1.5">
            Work email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full h-12 px-4 bg-white border rounded-md text-[16px] text-gray-900 transition-all focus:outline-none ${
              fieldErrors.email
                ? "border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-gray-400 hover:border-gray-600 focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC]"
            }`}
          />
          {fieldErrors.email && (
            <p className="flex items-start gap-1.5 text-[13px] text-red-600 mt-1.5 font-medium animate-in slide-in-from-top-1">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />{" "}
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* ========================================== */}
        {/* PASSWORD INPUT                             */}
        {/* ========================================== */}
        <div>
          <label className="block text-[14px] font-semibold text-gray-800 mb-1.5">
            Password (6 or more characters)
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full h-12 pl-4 pr-12 bg-white border rounded-md text-[16px] text-gray-900 transition-all focus:outline-none ${
                fieldErrors.password
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-gray-400 hover:border-gray-600 focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC]"
              }`}
            />

            {/* LinkedIn Style "Show/Hide" Text Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] font-semibold text-[#008BDC] hover:bg-blue-50 px-2 py-1 rounded transition-colors">
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Clean LinkedIn-style Strength Indicator */}
          {form.password && !fieldErrors.password && (
            <div className="mt-2 animate-in fade-in duration-300">
              <div className="flex gap-1 h-1 w-full">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-full flex-1 transition-all duration-300 ${
                      level <= passwordStrength
                        ? strengthColors[passwordStrength - 1]
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {fieldErrors.password && (
            <p className="flex items-start gap-1.5 text-[13px] text-red-600 mt-1.5 font-medium animate-in slide-in-from-top-1">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />{" "}
              {fieldErrors.password}
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
          Continue
        </button>
      </div>
    </div>
  );
}
