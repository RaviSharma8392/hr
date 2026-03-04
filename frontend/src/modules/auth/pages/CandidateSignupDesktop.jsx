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
  GraduationCap,
  Search,
  X,
  Plus,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Building2,
  ChevronLeft,
} from "lucide-react";

/* ================= DESKTOP BRANDING ================= */
const BRANDING = {
  themeColor: "#1295D8", // Professional Blue
  themeColorLight: "#E8F5FD",
  backgroundColor: "#FFFFFF",
  surfaceColor: "#F8FAFC", // Very subtle slate for app background
  textColor: "#334155",
  headingColor: "#0F172A",
  mutedTextColor: "#64748B",
  borderColor: "#E2E8F0",
  borderRadius: "8px", // Crisp desktop corners
  fontFamily: "'Inter', system-ui, sans-serif",
  dangerColor: "#EF4444",
};

const DEFAULT_SKILLS = [
  "React",
  "Node.js",
  "Python",
  "Java",
  "UI/UX Design",
  "Product Management",
  "Data Science",
  "AWS",
  "Marketing",
  "Sales",
  "DevOps",
  "Finance",
  "Cybersecurity",
  "JavaScript",
  "C++",
  "HTML/CSS",
  "SQL",
  "MongoDB",
  "Figma",
  "SEO",
  "Content Writing",
  "Machine Learning",
  "Azure",
  "Docker",
  "Tailwind CSS",
  "Firebase",
  "Project Management",
  "Agile",
  "Scrum",
].sort();

export default function CandidateSignupDesktop() {
  const navigate = useNavigate();

  // State
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [skillSearch, setSkillSearch] = useState("");
  const [availableSkills, setAvailableSkills] = useState(DEFAULT_SKILLS);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    status: "student",
    preferredRole: "",
    skills: [],
    experience: "",
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
  } = BRANDING;

  const firstNameRef = useRef(null);
  const preferredRoleRef = useRef(null);

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
            !form.email.trim() ||
            !form.password.trim()
          )
            return setError("Please fill in all required fields.");
          if (!/\S+@\S+\.\S+/.test(form.email))
            return setError("Please enter a valid email address.");
          if (form.password.length < 6)
            return setError("Password must be at least 6 characters.");
          break;
        case 3:
          if (!form.preferredRole.trim())
            return setError("Please enter your desired job profile.");
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
      else if (step === 3) preferredRoleRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, [step]);

  /* Keyboard Navigation */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && step > 1 && step < 4) {
      nextStep();
    }
  };

  /* Skill Handlers */
  const handleAddSkill = (skillToAdd) => {
    const trimmed = skillToAdd.trim();
    if (!trimmed) return;
    if (!form.skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setForm((prev) => ({ ...prev, skills: [trimmed, ...prev.skills] }));
    }
    setSkillSearch("");
  };

  const handleRemoveSkill = (skillToRemove) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const filteredSkills = availableSkills.filter(
    (s) =>
      s.toLowerCase().includes(skillSearch.toLowerCase()) &&
      !form.skills.some(
        (selected) => selected.toLowerCase() === s.toLowerCase(),
      ),
  );

  const showAddNew =
    skillSearch.trim() !== "" &&
    !availableSkills.some(
      (s) => s.toLowerCase() === skillSearch.trim().toLowerCase(),
    ) &&
    !form.skills.some(
      (s) => s.toLowerCase() === skillSearch.trim().toLowerCase(),
    );

  /* Submit Handlers */
  const handleGoogle = async () => {
    setIsLoading(true);
    setError("");
    try {
      const user = await loginWithGoogle("candidate");
      if (user) navigate("/candidate/onboarding");
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
    if (form.skills.length === 0) {
      setError("Please add at least one skill.");
      setIsLoading(false);
      return;
    }
    try {
      await signupUserWithEmail(form.email, form.password, "candidate", {
        ...form,
      });
      navigate("/candidate/onboarding");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= REUSABLE DESKTOP INPUT ================= */
  const DesktopInput = ({ label, refObj, ...props }) => (
    <div className="mb-5">
      <label
        className="block text-[14px] font-semibold mb-1.5"
        style={{ color: headingColor }}>
        {label}
      </label>
      <div className="relative">
        <input
          ref={refObj}
          className="w-full h-11 px-3 text-[15px] transition-all outline-none bg-white placeholder-slate-400"
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
              Find your next great opportunity
            </h2>
            <p className="text-[16px] mb-8" style={{ color: mutedTextColor }}>
              Join 150,000+ professionals actively applying to top companies.
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
              Continue with Google
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
              className="w-full h-12 text-white font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: themeColor, borderRadius }}>
              Sign up with Email
            </button>

            <p
              className="mt-8 text-center text-[14px]"
              style={{ color: mutedTextColor }}>
              Already registered?{" "}
              <Link
                to="/login"
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
              className="text-2xl font-bold mb-6"
              style={{ color: headingColor }}>
              Personal Details
            </h2>
            <div className="flex gap-4">
              <div className="flex-1">
                <DesktopInput
                  label="First Name"
                  name="firstName"
                  refObj={firstNameRef}
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Jane"
                />
              </div>
              <div className="flex-1">
                <DesktopInput
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                />
              </div>
            </div>
            <DesktopInput
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
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
              Career Goals
            </h2>
            <p className="text-[15px] mb-6" style={{ color: mutedTextColor }}>
              Help us match you with the right roles.
            </p>

            <DesktopInput
              label="What profile are you looking for?"
              name="preferredRole"
              refObj={preferredRoleRef}
              value={form.preferredRole}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer, Marketing Intern"
            />

            <div className="mb-5">
              <label
                className="block text-[14px] font-semibold mb-1.5"
                style={{ color: headingColor }}>
                Current Status
              </label>
              <div className="relative">
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full h-11 px-3 text-[15px] outline-none bg-white cursor-pointer transition-all"
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
                  <option value="student">College Student</option>
                  <option value="fresher">Recent Graduate / Fresher</option>
                  <option value="experienced">Experienced Professional</option>
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
              Add Skills
            </h2>
            <p className="text-[15px] mb-6" style={{ color: mutedTextColor }}>
              Add skills to stand out to recruiters.
            </p>

            <div className="relative mb-4 shrink-0">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: mutedTextColor }}
              />
              <input
                type="text"
                placeholder="Search or add custom skill..."
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                className="w-full h-11 pl-9 pr-10 text-[15px] outline-none bg-white transition-all"
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
              />
            </div>

            {/* Selected Skills */}
            {form.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4 shrink-0">
                {form.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-1.5 pl-3 pr-1 py-1 text-[13px] font-medium transition-all"
                    style={{
                      backgroundColor: themeColorLight,
                      color: themeColor,
                      borderRadius: "4px",
                    }}>
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="p-1 hover:bg-blue-100 rounded transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Scrolling Skill List for Desktop */}
            <div
              className="flex-1 overflow-y-auto max-h-[240px] border rounded-md p-2 bg-slate-50/50"
              style={{ borderColor }}>
              <div className="flex flex-wrap gap-2">
                {showAddNew && (
                  <button
                    onClick={() => handleAddSkill(skillSearch)}
                    className="flex items-center gap-1 px-3 py-1.5 text-[13px] border border-dashed hover:bg-slate-50 transition-colors"
                    style={{
                      borderColor: themeColor,
                      color: themeColor,
                      borderRadius: "4px",
                    }}>
                    Add "{skillSearch.trim()}" <Plus className="w-3.5 h-3.5" />
                  </button>
                )}
                {filteredSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleAddSkill(skill)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] hover:bg-slate-50 transition-colors bg-white"
                    style={{
                      border: `1px solid ${borderColor}`,
                      color: textColor,
                      borderRadius: "4px",
                    }}>
                    {skill}{" "}
                    <Plus
                      className="w-3.5 h-3.5"
                      style={{ color: mutedTextColor }}
                    />
                  </button>
                ))}
                {filteredSkills.length === 0 && !showAddNew && (
                  <div
                    className="w-full text-center py-6 text-[14px]"
                    style={{ color: mutedTextColor }}>
                    No suggestions found.
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  /* ================= DESKTOP UI WRAPPER ================= */
  return (
    <div className="min-h-screen w-full flex bg-white" style={{ fontFamily }}>
      {/* LEFT PANEL: Value Proposition (Hidden on mobile/tablet, flex on LG screens) */}
      <div
        className="hidden lg:flex flex-col justify-between w-5/12 max-w-[500px] p-12 relative overflow-hidden"
        style={{ backgroundColor: themeColor }}>
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-10 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-1/3 -translate-x-1/4"></div>

        <div className="relative z-10">
          <Link
            to="/"
            className="flex items-center gap-2 mb-16 opacity-90 hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <GraduationCap size={24} style={{ color: themeColor }} />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Internshala
            </span>
          </Link>

          <h1 className="text-4xl font-bold text-white leading-[1.2] mb-6">
            Kickstart your <br />
            career today.
          </h1>
          <p className="text-blue-100 text-lg mb-10 leading-relaxed max-w-sm">
            Join the platform where thousands of companies find their best
            talent.
          </p>

          <div className="space-y-6">
            {[
              { icon: Briefcase, text: "1.5 Lakh+ Active Jobs & Internships" },
              { icon: Building2, text: "Direct connections with recruiters" },
              { icon: CheckCircle2, text: "100% verified opportunities" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 text-white">
                <div className="p-2 bg-white/10 rounded-md backdrop-blur-sm">
                  <feature.icon size={20} className="text-white" />
                </div>
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-16 text-blue-100/70 text-sm">
          © {new Date().getFullYear()} Internshala Clone. All rights reserved.
        </div>
      </div>

      {/* RIGHT PANEL: The Form */}
      <div
        className="flex-1 flex flex-col relative"
        style={{ backgroundColor: surfaceColor }}>
        {/* Top Navigation / Progress */}
        <div className="h-20 px-8 flex items-center justify-between w-full max-w-3xl mx-auto">
          <div>
            {step > 1 && (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 text-sm font-semibold hover:bg-slate-100 px-3 py-2 rounded-md transition-colors"
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
                      isLoading || (step === 4 && form.skills.length === 0)
                    }
                    className="w-full h-12 text-white font-semibold text-[15px] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
                    style={{ backgroundColor: themeColor, borderRadius }}>
                    {isLoading ? (
                      <Loader2
                        className="animate-spin w-5 h-5"
                        color="#FFFFFF"
                      />
                    ) : step === 4 ? (
                      "Complete Registration"
                    ) : (
                      "Continue to Next Step"
                    )}
                    {!isLoading && step < 4 && <ArrowRight size={18} />}
                  </button>
                  {step === 4 && (
                    <p
                      className="text-[12px] text-center mt-4"
                      style={{ color: mutedTextColor }}>
                      By completing registration, you agree to our{" "}
                      <Link
                        to="/terms"
                        className="hover:underline"
                        style={{ color: themeColor }}>
                        Terms & Conditions
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
