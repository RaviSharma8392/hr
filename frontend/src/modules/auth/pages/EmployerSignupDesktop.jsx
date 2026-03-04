import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signupUserWithEmail,
  loginWithGoogle,
} from "../../../app/services/auth/AuthService";
import {
  Loader2,
  AlertCircle,
  ChevronDown,
  Building2,
  Users,
  LayoutTemplate,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  Globe,
  ChevronLeft,
} from "lucide-react";

/* ================= B2B / HR BRANDING ================= */
const HR_BRANDING = {
  themeColor: "#2563EB", // Strong B2B Trust Blue (Tailwind blue-600)
  themeColorLight: "#EFF6FF",
  backgroundColor: "#FFFFFF",
  surfaceColor: "#F8FAFC", // Slate-50 for app background
  textColor: "#334155",
  headingColor: "#0F172A",
  mutedTextColor: "#64748B",
  borderColor: "#E2E8F0",
  borderRadius: "8px",
  fontFamily: "'Inter', system-ui, sans-serif",
  dangerColor: "#EF4444",
};

// Common departments companies hire for
const DEPARTMENT_OPTIONS = [
  "Engineering",
  "Product Management",
  "Design (UI/UX)",
  "Marketing",
  "Sales",
  "Customer Success",
  "Human Resources",
  "Finance",
  "Operations",
  "Legal",
  "Data & Analytics",
];

export default function EmployerSignupDesktop() {
  const navigate = useNavigate();

  // State
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    workEmail: "",
    password: "",
    companyName: "",
    companyWebsite: "",
    companySize: "1-10",
    hiringNeeds: [],
  });

  const {
    themeColor,
    themeColorLight,
    headingColor,
    mutedTextColor,
    borderColor,
    borderRadius,
    fontFamily,
    textColor,
    dangerColor,
    surfaceColor,
  } = HR_BRANDING;

  const firstNameRef = useRef(null);
  const companyNameRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const nextStep = useCallback(
    (e) => {
      if (e) e.preventDefault();
      setError("");
      switch (step) {
        case 2:
          if (
            !form.firstName.trim() ||
            !form.lastName.trim() ||
            !form.workEmail.trim() ||
            !form.password.trim()
          )
            return setError("Please fill in all required fields.");
          if (!/\S+@\S+\.\S+/.test(form.workEmail))
            return setError("Please enter a valid work email address.");
          if (form.password.length < 6)
            return setError("Password must be at least 6 characters.");
          break;
        case 3:
          if (!form.companyName.trim() || !form.companyWebsite.trim())
            return setError("Please provide your company details.");
          // Basic URL check
          if (!form.companyWebsite.includes("."))
            return setError("Please enter a valid website URL.");
          break;
      }
      setStep((prev) => prev + 1);
    },
    [step, form],
  );

  const prevStep = useCallback(() => {
    setError("");
    setStep((prev) => prev - 1);
  }, []);

  /* Focus Management */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (step === 2) firstNameRef.current?.focus();
      else if (step === 3) companyNameRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, [step]);

  /* Keyboard Navigation */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && step > 1 && step < 4) {
      nextStep();
    }
  };

  /* Hiring Needs Toggle */
  const toggleDepartment = (dept) => {
    setForm((prev) => ({
      ...prev,
      hiringNeeds: prev.hiringNeeds.includes(dept)
        ? prev.hiringNeeds.filter((d) => d !== dept)
        : [...prev.hiringNeeds, dept],
    }));
    setError("");
  };

  /* Submit Handlers */
  const handleGoogle = async () => {
    setIsLoading(true);
    setError("");
    try {
      // Pass 'employer' or 'hr' role to your auth service
      const user = await loginWithGoogle("employer");
      if (user) navigate("/employer/dashboard");
    } catch (err) {
      setError(err.message || "Google signup failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError("");
    if (form.hiringNeeds.length === 0) {
      setError("Please select at least one department you are hiring for.");
      setIsLoading(false);
      return;
    }
    try {
      // Register as employer with company data attached
      await signupUserWithEmail(form.workEmail, form.password, "employer", {
        firstName: form.firstName,
        lastName: form.lastName,
        companyName: form.companyName,
        companyWebsite: form.companyWebsite,
        companySize: form.companySize,
        hiringNeeds: form.hiringNeeds,
      });
      navigate("/employer/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= REUSABLE DESKTOP INPUT ================= */
  const DesktopInput = ({ label, refObj, icon: Icon, ...props }) => (
    <div className="mb-5">
      <label
        className="block text-[14px] font-semibold mb-1.5"
        style={{ color: headingColor }}>
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50"
            style={{ color: mutedTextColor }}
          />
        )}
        <input
          ref={refObj}
          className={`w-full h-11 ${Icon ? "pl-9" : "px-3"} pr-3 text-[15px] transition-all outline-none bg-white placeholder-slate-400`}
          style={{
            color: textColor,
            borderRadius,
            border: `1px solid ${borderColor}`,
          }}
          onFocus={(e) => {
            e.target.style.borderColor = themeColor;
            e.target.style.boxShadow = `0 0 0 3px ${themeColor}15`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = borderColor;
            e.target.style.boxShadow = "none";
          }}
          onKeyDown={handleKeyDown}
          {...props}
        />
        {props.name === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] font-semibold hover:opacity-70 transition-opacity"
            style={{ color: themeColor }}
            tabIndex="-1">
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );

  /* ================= RENDER FORM STEPS ================= */
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2
              className="text-3xl font-bold mb-3"
              style={{ color: headingColor }}>
              Create your Employer Account
            </h2>
            <p className="text-[16px] mb-8" style={{ color: mutedTextColor }}>
              Post jobs, track applicants, and launch your branded careers page
              in minutes.
            </p>

            <button
              onClick={handleGoogle}
              disabled={isLoading}
              className="w-full h-12 flex items-center justify-center gap-3 bg-white font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
              style={{
                border: `1px solid ${borderColor}`,
                borderRadius,
                color: textColor,
              }}>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google (Work Email)
            </button>

            <div className="flex items-center gap-4 my-6">
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: borderColor }}
              />
              <span
                className="text-[13px] font-medium"
                style={{ color: mutedTextColor }}>
                OR
              </span>
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: borderColor }}
              />
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full h-12 text-white font-semibold shadow-sm hover:shadow-md hover:opacity-95 transition-all"
              style={{ backgroundColor: themeColor, borderRadius }}>
              Sign up with Work Email
            </button>

            <p
              className="mt-8 text-center text-[14px]"
              style={{ color: mutedTextColor }}>
              Already hiring with us?{" "}
              <Link
                to="/employer/login"
                className="font-semibold hover:underline"
                style={{ color: themeColor }}>
                Log in here
              </Link>
            </p>
          </div>
        );

      case 2:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: headingColor }}>
              Your Profile
            </h2>
            <p className="text-[15px] mb-6" style={{ color: mutedTextColor }}>
              Set up your administrator account.
            </p>

            <div className="flex gap-4">
              <div className="flex-1">
                <DesktopInput
                  label="First Name"
                  name="firstName"
                  refObj={firstNameRef}
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Sarah"
                />
              </div>
              <div className="flex-1">
                <DesktopInput
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Connor"
                />
              </div>
            </div>
            <DesktopInput
              label="Work Email Address"
              name="workEmail"
              type="email"
              value={form.workEmail}
              onChange={handleChange}
              placeholder="sarah@yourcompany.com"
            />
            <DesktopInput
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Min 6 characters"
            />
          </div>
        );

      case 3:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: headingColor }}>
              Company Details
            </h2>
            <p className="text-[15px] mb-6" style={{ color: mutedTextColor }}>
              Where are you hiring for?
            </p>

            <DesktopInput
              label="Company Name"
              name="companyName"
              icon={Building2}
              refObj={companyNameRef}
              value={form.companyName}
              onChange={handleChange}
              placeholder="Acme Corp"
            />
            <DesktopInput
              label="Company Website"
              name="companyWebsite"
              icon={Globe}
              value={form.companyWebsite}
              onChange={handleChange}
              placeholder="acmecorp.com"
            />

            <div className="mb-5">
              <label
                className="block text-[14px] font-semibold mb-1.5"
                style={{ color: headingColor }}>
                Number of Employees
              </label>
              <div className="relative">
                <Users
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50"
                  style={{ color: mutedTextColor }}
                />
                <select
                  name="companySize"
                  value={form.companySize}
                  onChange={handleChange}
                  className="w-full h-11 pl-9 pr-3 text-[15px] outline-none bg-white cursor-pointer transition-all"
                  style={{
                    color: textColor,
                    borderRadius,
                    border: `1px solid ${borderColor}`,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = themeColor;
                    e.target.style.boxShadow = `0 0 0 3px ${themeColor}15`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = borderColor;
                    e.target.style.boxShadow = "none";
                  }}>
                  <option value="1-10">1 - 10 employees</option>
                  <option value="11-50">11 - 50 employees</option>
                  <option value="51-200">51 - 200 employees</option>
                  <option value="201-500">201 - 500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: mutedTextColor }}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col h-full">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: headingColor }}>
              Hiring Needs
            </h2>
            <p className="text-[15px] mb-6" style={{ color: mutedTextColor }}>
              Which departments are you currently hiring for?
            </p>

            <div className="flex flex-wrap gap-3">
              {DEPARTMENT_OPTIONS.map((dept) => {
                const isSelected = form.hiringNeeds.includes(dept);
                return (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => toggleDepartment(dept)}
                    className="flex items-center gap-2 px-4 py-2.5 text-[14px] font-medium transition-all"
                    style={{
                      backgroundColor: isSelected ? themeColorLight : "white",
                      color: isSelected ? themeColor : textColor,
                      borderRadius: "6px",
                      border: `1px solid ${isSelected ? themeColor : borderColor}`,
                    }}>
                    {isSelected && <CheckCircle2 size={16} />}
                    {dept}
                  </button>
                );
              })}
            </div>
          </div>
        );
    }
  };

  /* ================= DESKTOP UI WRAPPER ================= */
  return (
    <div className="min-h-screen w-full flex bg-white" style={{ fontFamily }}>
      {/* LEFT PANEL: B2B Value Proposition */}
      <div
        className="hidden lg:flex flex-col justify-between w-5/12 max-w-[500px] p-12 relative overflow-hidden"
        style={{ backgroundColor: headingColor }} // Deep dark background for premium SaaS feel
      >
        {/* Subtle glowing orb effect in the background */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3"
          style={{ backgroundColor: themeColor }}></div>

        <div className="relative z-10">
          {/* Your App Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 mb-16 opacity-90 hover:opacity-100 transition-opacity">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: themeColor }}>
              <Briefcase size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              HRMastery
            </span>
          </Link>

          <h1 className="text-4xl font-bold text-white leading-[1.2] mb-6">
            Build a team that <br />
            builds the future.
          </h1>
          <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-sm">
            Everything you need to attract, track, and hire top talent in one
            unified platform.
          </p>

          {/* B2B Feature Selling Points */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 text-white">
              <div className="p-2.5 bg-white/10 rounded-lg backdrop-blur-sm mt-0.5">
                <LayoutTemplate size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[16px]">
                  Free White-Label Career Page
                </h3>
                <p className="text-slate-400 text-[14px] mt-1">
                  Get a beautifully branded, SEO-optimized careers site hosted
                  on your domain.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-white">
              <div className="p-2.5 bg-white/10 rounded-lg backdrop-blur-sm mt-0.5">
                <Users size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[16px]">
                  Seamless Applicant Tracking
                </h3>
                <p className="text-slate-400 text-[14px] mt-1">
                  Move candidates through stages with an intuitive,
                  drag-and-drop pipeline.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-white">
              <div className="p-2.5 bg-white/10 rounded-lg backdrop-blur-sm mt-0.5">
                <Globe size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[16px]">
                  Access to 1M+ Candidates
                </h3>
                <p className="text-slate-400 text-[14px] mt-1">
                  Tap directly into our vast network of active job seekers and
                  students.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-16 text-slate-500 text-sm">
          © {new Date().getFullYear()} HRMastery App. All rights reserved.
        </div>
      </div>

      {/* RIGHT PANEL: Employer Registration Form */}
      <div
        className="flex-1 flex flex-col relative"
        style={{ backgroundColor: surfaceColor }}>
        {/* Top Navigation / Progress */}
        <div className="h-20 px-8 flex items-center justify-between w-full max-w-3xl mx-auto">
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 text-sm font-semibold hover:bg-slate-200/50 px-3 py-2 rounded-md transition-colors"
                style={{ color: mutedTextColor }}>
                <ChevronLeft size={18} /> Back
              </button>
            )}
          </div>
          {step > 1 && (
            <div className="flex items-center gap-3">
              <span
                className="text-sm font-semibold"
                style={{ color: mutedTextColor }}>
                Step {step} of 4
              </span>
              <div className="flex gap-1.5">
                {[2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: step >= s ? "24px" : "8px",
                      backgroundColor: step >= s ? themeColor : borderColor,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Form Container Centered */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-[440px]">
            {/* Error Message Inline */}
            {error && (
              <div
                className="mb-6 p-4 flex items-start gap-3 shadow-sm animate-in slide-in-from-top-2"
                style={{
                  backgroundColor: "#FEF2F2",
                  border: `1px solid #FECACA`,
                  borderRadius,
                }}>
                <AlertCircle
                  size={18}
                  color={dangerColor}
                  className="shrink-0 mt-0.5"
                />
                <p
                  className="text-[14px] leading-snug"
                  style={{ color: dangerColor }}>
                  {error}
                </p>
              </div>
            )}

            {/* Step Content */}
            <form onSubmit={step === 4 ? handleSubmit : nextStep}>
              {renderStepContent()}

              {/* Action Buttons for Steps 2, 3, 4 */}
              {step > 1 && (
                <div className="mt-8 pt-6 border-t" style={{ borderColor }}>
                  <button
                    type="submit"
                    disabled={
                      isLoading || (step === 4 && form.hiringNeeds.length === 0)
                    }
                    className="w-full h-12 text-white font-semibold text-[15px] hover:shadow-md hover:-translate-y-[1px] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
                    style={{ backgroundColor: themeColor, borderRadius }}>
                    {isLoading ? (
                      <Loader2
                        className="animate-spin w-5 h-5"
                        color="#FFFFFF"
                      />
                    ) : step === 4 ? (
                      "Create Employer Account"
                    ) : (
                      "Continue"
                    )}
                    {!isLoading && step < 4 && <ArrowRight size={18} />}
                  </button>
                  {step === 4 && (
                    <p
                      className="text-[12px] text-center mt-4"
                      style={{ color: mutedTextColor }}>
                      By registering, you agree to our{" "}
                      <Link
                        to="/employer/terms"
                        className="hover:underline"
                        style={{ color: themeColor }}>
                        Employer Terms of Service
                      </Link>
                      .
                    </p>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
