import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signupUserWithEmail,
  loginWithGoogle,
} from "../../../app/services/auth/AuthService";
import {
  Loader2,
  ChevronLeft,
  AlertCircle,
  ChevronDown,
  GraduationCap,
  Check,
  Search,
  X,
  Plus,
} from "lucide-react";

/* ================= INTERNSHALA-STYLE BRANDING ================= */
const BRANDING = {
  themeColor: "#1295D8", // Internshala Blue
  themeColorLight: "#E8F5FD", // Soft blue for tags/backgrounds
  backgroundColor: "#FFFFFF",
  surfaceColor: "#FFFFFF",
  textColor: "#333333", // Dark gray, softer than pure black
  headingColor: "#444444", // Professional dark gray
  mutedTextColor: "#777777",
  borderColor: "#DDDDDD", // Standard thin border
  borderRadius: "6px", // Professional, slightly rounded corners
  fontFamily: "'Inter', 'Roboto', system-ui, sans-serif",
  dangerColor: "#FF5353",
};

// Robust default list for the suggestions engine
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

export default function CandidateSignupMobile() {
  const navigate = useNavigate();

  // State
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Step 4 Specific State
  const [skillSearch, setSkillSearch] = useState("");
  const [availableSkills, setAvailableSkills] = useState(DEFAULT_SKILLS);

  // Form Fields mapped for API integration later
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
  } = BRANDING;

  const firstNameRef = useRef(null);
  const preferredRoleRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const nextStep = useCallback(() => {
    setError("");
    switch (step) {
      case 2:
        if (
          !form.firstName.trim() ||
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
  }, [step, form]);

  const prevStep = useCallback(() => {
    setError("");
    setStep((prev) => prev - 1);
  }, []);

  /* Focus Management */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (step === 2) firstNameRef.current?.focus();
      else if (step === 3) preferredRoleRef.current?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, [step]);

  /* Step 4 Skill Handlers */
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

  /* Handlers */
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

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    if (form.skills.length === 0) {
      setError("Please add at least one skill to your profile.");
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

  /* ================= SUB-COMPONENTS ================= */
  const MobileInput = ({ label, refObj, ...props }) => (
    <div className="mb-5">
      <label
        className="block text-[14px] font-semibold mb-1.5"
        style={{ color: headingColor }}>
        {label}
      </label>
      <div className="relative">
        <input
          ref={refObj}
          className="w-full h-12 px-3 text-[15px] transition-all outline-none bg-white"
          style={{
            color: textColor,
            borderRadius,
            border: `1px solid ${borderColor}`,
          }}
          onFocus={(e) => {
            e.target.style.borderColor = themeColor;
            e.target.style.boxShadow = `0 0 0 1px ${themeColor}33`; // Subtle glow on focus
          }}
          onBlur={(e) => {
            e.target.style.borderColor = borderColor;
            e.target.style.boxShadow = "none";
          }}
          {...props}
        />
        {props.name === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 font-semibold text-[13px] active:opacity-70 transition-opacity"
            style={{ color: themeColor }}>
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );

  /* ================= RENDER STEPS ================= */
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col h-full justify-center pb-10">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-50">
                <GraduationCap size={32} color={themeColor} />
              </div>
            </div>
            <h2
              className="text-[26px] font-bold text-center mb-3"
              style={{ color: headingColor }}>
              Sign-up and apply for free
            </h2>
            <p
              className="text-[15px] text-center px-4 mb-8"
              style={{ color: mutedTextColor }}>
              1,50,000+ companies hiring on our platform
            </p>

            <div className="space-y-4 w-full">
              <button
                onClick={handleGoogle}
                disabled={isLoading}
                className="w-full h-12 flex items-center justify-center gap-3 bg-white font-semibold active:bg-gray-50 transition-colors disabled:opacity-50"
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
                Sign up with Google
              </button>

              <div className="flex items-center gap-3 my-4">
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
                onClick={nextStep}
                className="w-full h-12 text-white font-semibold active:opacity-90 transition-opacity"
                style={{ backgroundColor: themeColor, borderRadius }}>
                Sign up with Email
              </button>
            </div>

            <div
              className="mt-8 text-center text-[14px]"
              style={{ color: mutedTextColor }}>
              Already registered?{" "}
              <Link
                to="/login"
                className="font-semibold"
                style={{ color: themeColor }}>
                Login
              </Link>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col h-full pb-32">
            <h2
              className="text-[24px] font-bold mb-6"
              style={{ color: headingColor }}>
              Personal Details
            </h2>
            <div className="flex gap-4">
              <div className="flex-1">
                <MobileInput
                  label="First Name"
                  name="firstName"
                  refObj={firstNameRef}
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="John"
                />
              </div>
              <div className="flex-1">
                <MobileInput
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                />
              </div>
            </div>
            <MobileInput
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
            />
            <MobileInput
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
          <div className="flex flex-col h-full pb-32">
            <h2
              className="text-[24px] font-bold mb-2"
              style={{ color: headingColor }}>
              Your Preferences
            </h2>
            <p className="text-[14px] mb-8" style={{ color: mutedTextColor }}>
              This helps us find the best internships and jobs for you.
            </p>

            <MobileInput
              label="Profile you are looking for"
              name="preferredRole"
              refObj={preferredRoleRef}
              value={form.preferredRole}
              onChange={handleChange}
              placeholder="e.g. Marketing, Web Development"
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
                  className="w-full h-12 px-3 text-[15px] appearance-none outline-none bg-white"
                  style={{
                    color: textColor,
                    borderRadius,
                    border: `1px solid ${borderColor}`,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = themeColor)}
                  onBlur={(e) => (e.target.style.borderColor = borderColor)}>
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
          <div className="flex flex-col h-full">
            <h2
              className="text-[24px] font-bold mb-2"
              style={{ color: headingColor }}>
              Skills
            </h2>
            <p className="text-[14px] mb-6" style={{ color: mutedTextColor }}>
              Add skills to help recruiters find you faster.
            </p>

            {/* Search Bar */}
            <div className="relative mb-4 shrink-0">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: mutedTextColor }}
              />
              <input
                type="text"
                placeholder="e.g. Java, Content Writing"
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                className="w-full h-12 pl-10 pr-10 text-[15px] outline-none bg-white transition-all"
                style={{
                  color: textColor,
                  borderRadius,
                  border: `1px solid ${borderColor}`,
                }}
                onFocus={(e) => (e.target.style.borderColor = themeColor)}
                onBlur={(e) => (e.target.style.borderColor = borderColor)}
              />
              {skillSearch && (
                <button
                  onClick={() => setSkillSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 active:bg-gray-100 rounded-full transition-colors">
                  <X className="w-4 h-4" style={{ color: mutedTextColor }} />
                </button>
              )}
            </div>

            {/* Selected Skills Wrap (Internshala Style) */}
            {form.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6 shrink-0">
                {form.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 text-[13px] font-medium animate-in zoom-in-95 duration-200"
                    style={{
                      backgroundColor: themeColorLight,
                      color: themeColor,
                      borderRadius: "4px",
                    }}>
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="p-0.5 hover:bg-blue-100 rounded transition-colors active:scale-90">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* List of Suggestions */}
            <div className="flex-1 overflow-y-auto pb-32">
              <h3
                className="text-[12px] font-semibold uppercase tracking-wide mb-2"
                style={{ color: mutedTextColor }}>
                {skillSearch ? "Results" : "Suggested Skills"}
              </h3>

              <div className="flex flex-wrap gap-2">
                {/* Dynamic "Add Custom" Button */}
                {showAddNew && (
                  <button
                    onClick={() => handleAddSkill(skillSearch)}
                    className="flex items-center gap-1 px-3 py-2 text-[13px] border border-dashed active:bg-gray-50 transition-colors"
                    style={{
                      borderColor: themeColor,
                      color: themeColor,
                      borderRadius: "4px",
                    }}>
                    Add "{skillSearch.trim()}" <Plus className="w-4 h-4" />
                  </button>
                )}

                {/* Filtered Default Skills */}
                {filteredSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleAddSkill(skill)}
                    className="flex items-center gap-1.5 px-3 py-2 text-[13px] active:scale-[0.98] transition-transform bg-white"
                    style={{
                      border: `1px solid ${borderColor}`,
                      color: textColor,
                      borderRadius: "4px",
                    }}>
                    {skill}{" "}
                    <Plus
                      className="w-4 h-4"
                      style={{ color: mutedTextColor }}
                    />
                  </button>
                ))}

                {filteredSkills.length === 0 && !showAddNew && (
                  <div className="w-full text-center py-6">
                    <p
                      className="text-[14px]"
                      style={{ color: mutedTextColor }}>
                      No suggestions found.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  /* ================= UI WRAPPER ================= */
  return (
    <div
      className="flex flex-col h-[100dvh] overflow-hidden bg-white"
      style={{ fontFamily }}>
      {/* HEADER */}
      <div
        className="relative z-20 pt-safe shrink-0 bg-white border-b"
        style={{ borderColor }}>
        <div className="flex items-center justify-between px-2 h-[56px]">
          <div className="w-16 flex justify-start">
            <button
              onClick={step === 1 ? () => navigate("/") : prevStep}
              className="p-3 active:bg-gray-50 rounded-full transition-colors"
              style={{ color: headingColor }}>
              <ChevronLeft size={24} strokeWidth={2} />
            </button>
          </div>
          {step > 1 && (
            <span
              className="text-[14px] font-medium"
              style={{ color: mutedTextColor }}>
              Step {step} of 4
            </span>
          )}
          <div className="w-16" />
        </div>
        {/* Progress Bar */}
        {step > 1 && (
          <div
            className="w-full h-[2px]"
            style={{ backgroundColor: "#F0F0F0" }}>
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${(step / 4) * 100}%`,
                backgroundColor: themeColor,
              }}
            />
          </div>
        )}
      </div>

      {/* ERROR TOAST */}
      {error && (
        <div
          className="mx-4 mt-4 p-3 flex items-center gap-2 shadow-sm animate-in slide-in-from-top-2 z-50"
          style={{
            backgroundColor: "#FFF4F4",
            border: `1px solid #FFD6D6`,
            borderRadius: "4px",
          }}>
          <AlertCircle size={18} color={dangerColor} className="shrink-0" />
          <p className="text-[13px]" style={{ color: dangerColor }}>
            {error}
          </p>
        </div>
      )}

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
        <div
          key={step}
          className="absolute inset-0 px-6 pt-6 flex flex-col animate-fade-in-slide">
          {renderStep()}
        </div>
      </div>

      {/* FIXED BOTTOM CTA */}
      {step > 1 && (
        <div
          className="absolute bottom-0 left-0 right-0 p-4 pb-safe bg-white border-t z-30"
          style={{ borderColor }}>
          <button
            onClick={step === 4 ? handleSubmit : nextStep}
            disabled={isLoading || (step === 4 && form.skills.length === 0)}
            className="w-full h-12 text-white font-semibold text-[15px] active:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-50"
            style={{ backgroundColor: themeColor, borderRadius }}>
            {isLoading ? (
              <Loader2 className="animate-spin w-5 h-5" color="#FFFFFF" />
            ) : step === 4 ? (
              "Submit"
            ) : (
              "Next"
            )}
          </button>
        </div>
      )}

      {/* GLOBAL CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .pt-safe { padding-top: max(0rem, env(safe-area-inset-top)); }
        .pb-safe { padding-bottom: max(1rem, env(safe-area-inset-bottom)); }
        @keyframes fade-in-slide {
          from { opacity: 0; transform: translateX(15px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-slide {
          animation: fade-in-slide 0.2s ease-out forwards;
        }
      `,
        }}
      />
    </div>
  );
}
