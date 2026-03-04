import React, { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signupUserWithEmail,
  loginWithGoogle,
} from "../../../../app/services/auth/AuthService";
import {
  Loader2,
  AlertCircle,
  GraduationCap,
  Search,
  X,
  Plus,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  Mail,
  User,
  Lock,
  Eye,
  EyeOff,
  Rocket,
  TrendingUp,
  Star,
} from "lucide-react";

/* ================= INTERNSHALA-STYLE BRANDING ================= */
const BRANDING = {
  themeColor: "#1295D8", // Internshala Primary Blue
  themeColorLight: "#E8F5FD", // Soft blue background for active states
  backgroundColor: "#FFFFFF",
  surfaceColor: "#F8FAFC", // Soft slate for the right panel background
  textColor: "#334155",
  headingColor: "#0F172A",
  mutedTextColor: "#64748B",
  borderColor: "#E2E8F0",
  borderRadius: "12px", // Modern corners
  fontFamily: "'Inter', system-ui, sans-serif",
  dangerColor: "#EF4444",
};

export default function CandidateRegisterDesktop() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [skillSearch, setSkillSearch] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    status: "student", // 'student' or 'professional'
    preferredRole: "",
    skills: [],
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

  /* ================= SAFE STEP CONTROL ================= */
  const goToStep = useCallback((newStep) => {
    setError("");
    setStep((prev) => Math.min(Math.max(newStep, 1), 4));
  }, []);

  const nextStep = useCallback(
    (e) => {
      if (e) e.preventDefault();
      if (isLoading) return;
      setError("");

      // Step 1 Validation
      if (step === 1) {
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
      }

      // Step 3 Validation
      if (step === 3) {
        if (!form.preferredRole.trim())
          return setError("Please enter your desired job profile.");
      }

      goToStep(step + 1);
    },
    [step, form, isLoading, goToStep],
  );

  const prevStep = useCallback(() => {
    if (isLoading) return;
    goToStep(step - 1);
  }, [step, isLoading, goToStep]);

  /* ================= GOOGLE SIGNUP ================= */
  const handleGoogle = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError("");

    try {
      const user = await loginWithGoogle("candidate");
      if (user) navigate("/candidate/onboarding", { replace: true });
    } catch (err) {
      setError(err.message || "Google signup failed.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= EMAIL SIGNUP ================= */
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (isLoading) return;

    if (form.skills.length === 0) {
      return setError("Please add at least one skill to stand out.");
    }

    setIsLoading(true);
    setError("");

    try {
      await signupUserWithEmail(form.email, form.password, "candidate", {
        ...form,
      });
      navigate("/candidate/onboarding", { replace: true });
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= SKILL LOGIC ================= */
  const handleAddSkill = (e) => {
    e.preventDefault(); // Prevent form submission
    const trimmed = skillSearch.trim();
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

  /* ================= REUSABLE INPUT COMPONENT ================= */
  const DesktopInput = ({ label, icon: Icon, type = "text", ...props }) => (
    <div className="mb-4">
      <label
        className="block text-[13px] font-bold mb-1.5"
        style={{ color: headingColor }}>
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
          {Icon && <Icon size={18} />}
        </div>
        <input
          type={type === "password" && showPassword ? "text" : type}
          className="w-full h-12 pl-11 pr-10 text-[15px] font-medium outline-none bg-slate-50 border transition-all focus:bg-white"
          style={{ color: textColor, borderRadius, borderColor }}
          onFocus={(e) => {
            e.target.style.borderColor = themeColor;
            e.target.style.boxShadow = `0 0 0 4px ${themeColor}15`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = borderColor;
            e.target.style.boxShadow = "none";
          }}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );

  /* ================= UI ================= */
  return (
    <div className="min-h-screen w-full flex bg-white font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* ================= LEFT PANEL: BRANDING ================= */}
      <div
        className="hidden lg:flex w-5/12 relative overflow-hidden flex-col justify-between p-12 xl:p-16"
        style={{ backgroundColor: themeColor }}>
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-black opacity-10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10">
          <Link
            to="/"
            className="flex items-center gap-2 mb-16 opacity-90 hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <Briefcase
                size={22}
                style={{ color: themeColor }}
                strokeWidth={2.5}
              />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">
              CareerPortal
            </span>
          </Link>

          <h1 className="text-4xl xl:text-5xl font-black text-white leading-[1.15] tracking-tight mb-6">
            Launch your career <br /> into high gear.
          </h1>
          <p className="text-blue-50 text-[17px] mb-12 leading-relaxed font-medium max-w-[340px]">
            Join over 10,000+ companies hiring for internships and jobs. Build
            your profile and get discovered today.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-white">
              <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-sm">
                <Rocket size={20} className="text-blue-100" />
              </div>
              <span className="font-semibold text-[15px]">
                1-Click fast applications
              </span>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-sm">
                <Star size={20} className="text-blue-100" />
              </div>
              <span className="font-semibold text-[15px]">
                Exclusive premium roles
              </span>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-sm">
                <TrendingUp size={20} className="text-blue-100" />
              </div>
              <span className="font-semibold text-[15px]">
                Direct recruiter messaging
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-blue-200/60 text-sm font-medium">
          © {new Date().getFullYear()} CareerPortal. All rights reserved.
        </div>
      </div>

      {/* ================= RIGHT PANEL: FORM ================= */}
      <div
        className="flex-1 flex flex-col relative"
        style={{ backgroundColor: surfaceColor }}>
        {/* Header / Navigation */}
        <div className="h-20 px-6 sm:px-12 flex items-center justify-between w-full">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="flex items-center gap-2 text-[14px] font-bold px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              style={{ color: mutedTextColor }}>
              <ChevronLeft size={18} /> Back
            </button>
          ) : (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[14px] font-bold px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              style={{ color: mutedTextColor }}>
              <ChevronLeft size={18} /> Home
            </button>
          )}

          <div className="text-[13px] font-bold uppercase tracking-widest text-slate-400">
            Step {step} of 4
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-200">
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{
              backgroundColor: themeColor,
              width: `${(step / 4) * 100}%`,
            }}
          />
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-8">
          <div className="w-full max-w-[440px]">
            {/* Error Banner */}
            {error && (
              <div
                className="mb-6 p-4 flex items-start gap-3 rounded-xl animate-in slide-in-from-top-2"
                style={{
                  backgroundColor: "#FEF2F2",
                  border: `1px solid #FECACA`,
                }}>
                <AlertCircle
                  size={18}
                  color={dangerColor}
                  className="shrink-0 mt-0.5"
                />
                <p
                  className="text-[14px] font-semibold leading-snug"
                  style={{ color: dangerColor }}>
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={step === 4 ? handleSubmit : nextStep}>
              {/* --- STEP 1: BASICS --- */}
              {step === 1 && (
                <div className="animate-in slide-in-from-right-8 fade-in duration-500">
                  <div className="mb-8">
                    <h2
                      className="text-3xl font-black tracking-tight mb-2"
                      style={{ color: headingColor }}>
                      Create an account
                    </h2>
                    <p
                      className="text-[15px] font-medium"
                      style={{ color: mutedTextColor }}>
                      Discover your next big opportunity.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogle}
                    disabled={isLoading}
                    className="w-full h-12 flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 font-bold text-[15px] rounded-xl hover:bg-slate-50 transition-all focus:ring-4 focus:ring-slate-100 active:scale-[0.98] disabled:opacity-50">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.74 15.63 16.98 16.79 15.81 17.57V20.34H19.37C21.43 18.45 22.56 15.62 22.56 12.25Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23C14.97 23 17.16 22.02 18.78 20.34L15.22 17.57C14.34 18.15 13.26 18.5 12 18.5C9.56 18.5 7.25 16.85 6.44 14.63H2.76V17.48C4.6 21.14 8.42 23 12 23Z"
                        fill="#34A853"
                      />
                      <path
                        d="M6.44 14.63C6.23 14.02 6.12 13.38 6.12 12.72C6.12 12.06 6.23 11.42 6.44 10.81V8.04H2.76C2.01 9.53 1.58 11.08 1.58 12.72C1.58 14.36 2.01 15.91 2.76 17.48L6.44 14.63Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 6.94C13.61 6.94 15.06 7.5 16.2 8.58L19.5 5.28C17.65 3.59 14.96 2.5 12 2.5C8.42 2.5 4.6 4.36 2.76 8.04L6.44 10.81C7.25 8.59 9.56 6.94 12 6.94Z"
                        fill="#EA4335"
                      />
                    </svg>
                    Sign up with Google
                  </button>

                  <div className="flex items-center gap-4 my-6">
                    <div
                      className="flex-1 h-px"
                      style={{ backgroundColor: borderColor }}
                    />
                    <span className="text-[12px] font-bold uppercase tracking-widest text-slate-400">
                      Or register with email
                    </span>
                    <div
                      className="flex-1 h-px"
                      style={{ backgroundColor: borderColor }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <DesktopInput
                      label="First Name"
                      icon={User}
                      placeholder="John"
                      name="firstName"
                      value={form.firstName}
                      onChange={(e) =>
                        setForm({ ...form, firstName: e.target.value })
                      }
                    />
                    <DesktopInput
                      label="Last Name"
                      icon={User}
                      placeholder="Doe"
                      name="lastName"
                      value={form.lastName}
                      onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                      }
                    />
                  </div>
                  <DesktopInput
                    label="Email Address"
                    icon={Mail}
                    type="email"
                    placeholder="john@example.com"
                    name="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                  <DesktopInput
                    label="Password"
                    icon={Lock}
                    type="password"
                    placeholder="••••••••"
                    name="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </div>
              )}

              {/* --- STEP 2: STATUS --- */}
              {step === 2 && (
                <div className="animate-in slide-in-from-right-8 fade-in duration-500">
                  <div className="mb-8">
                    <h2
                      className="text-3xl font-black tracking-tight mb-2"
                      style={{ color: headingColor }}>
                      Current Status
                    </h2>
                    <p
                      className="text-[15px] font-medium"
                      style={{ color: mutedTextColor }}>
                      This helps us tailor your job recommendations.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Option: Student */}
                    <label
                      className="relative flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all hover:bg-slate-50"
                      style={{
                        borderColor:
                          form.status === "student" ? themeColor : borderColor,
                        backgroundColor:
                          form.status === "student" ? themeColorLight : "white",
                      }}>
                      <input
                        type="radio"
                        name="status"
                        value="student"
                        checked={form.status === "student"}
                        onChange={(e) =>
                          setForm({ ...form, status: e.target.value })
                        }
                        className="sr-only"
                      />
                      <div
                        className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mr-4 border"
                        style={{ borderColor: borderColor }}>
                        <GraduationCap
                          size={24}
                          style={{ color: themeColor }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3
                          className="text-[16px] font-bold"
                          style={{ color: headingColor }}>
                          I am a Student
                        </h3>
                        <p
                          className="text-[13px] font-medium mt-0.5"
                          style={{ color: mutedTextColor }}>
                          Looking for internships or entry-level roles.
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${form.status === "student" ? "border-transparent" : "border-slate-300"}`}
                        style={{
                          backgroundColor:
                            form.status === "student"
                              ? themeColor
                              : "transparent",
                        }}>
                        {form.status === "student" && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                    </label>

                    {/* Option: Professional */}
                    <label
                      className="relative flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all hover:bg-slate-50"
                      style={{
                        borderColor:
                          form.status === "professional"
                            ? themeColor
                            : borderColor,
                        backgroundColor:
                          form.status === "professional"
                            ? themeColorLight
                            : "white",
                      }}>
                      <input
                        type="radio"
                        name="status"
                        value="professional"
                        checked={form.status === "professional"}
                        onChange={(e) =>
                          setForm({ ...form, status: e.target.value })
                        }
                        className="sr-only"
                      />
                      <div
                        className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mr-4 border"
                        style={{ borderColor: borderColor }}>
                        <Briefcase size={24} style={{ color: themeColor }} />
                      </div>
                      <div className="flex-1">
                        <h3
                          className="text-[16px] font-bold"
                          style={{ color: headingColor }}>
                          Working Professional
                        </h3>
                        <p
                          className="text-[13px] font-medium mt-0.5"
                          style={{ color: mutedTextColor }}>
                          Looking for full-time career transitions.
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${form.status === "professional" ? "border-transparent" : "border-slate-300"}`}
                        style={{
                          backgroundColor:
                            form.status === "professional"
                              ? themeColor
                              : "transparent",
                        }}>
                        {form.status === "professional" && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* --- STEP 3: ROLE --- */}
              {step === 3 && (
                <div className="animate-in slide-in-from-right-8 fade-in duration-500">
                  <div className="mb-8">
                    <h2
                      className="text-3xl font-black tracking-tight mb-2"
                      style={{ color: headingColor }}>
                      Desired Profile
                    </h2>
                    <p
                      className="text-[15px] font-medium"
                      style={{ color: mutedTextColor }}>
                      What kind of work are you looking for?
                    </p>
                  </div>
                  <DesktopInput
                    label="Preferred Job Role"
                    icon={Search}
                    placeholder="e.g. Frontend Developer, Data Analyst..."
                    name="preferredRole"
                    value={form.preferredRole}
                    onChange={(e) =>
                      setForm({ ...form, preferredRole: e.target.value })
                    }
                  />
                </div>
              )}

              {/* --- STEP 4: SKILLS --- */}
              {step === 4 && (
                <div className="animate-in slide-in-from-right-8 fade-in duration-500">
                  <div className="mb-8">
                    <h2
                      className="text-3xl font-black tracking-tight mb-2"
                      style={{ color: headingColor }}>
                      Top Skills
                    </h2>
                    <p
                      className="text-[15px] font-medium"
                      style={{ color: mutedTextColor }}>
                      Add 3-5 key skills to stand out to recruiters.
                    </p>
                  </div>

                  <div className="mb-6">
                    <label
                      className="block text-[13px] font-bold mb-1.5"
                      style={{ color: headingColor }}>
                      Add a Skill
                    </label>
                    <div className="relative flex items-center">
                      <input
                        placeholder="e.g. React, Python, SEO..."
                        className="w-full h-12 pl-4 pr-14 outline-none bg-slate-50 border text-[15px] font-medium transition-all focus:bg-white"
                        style={{ color: textColor, borderRadius, borderColor }}
                        value={skillSearch}
                        onChange={(e) => setSkillSearch(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddSkill(e);
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = themeColor;
                          e.target.style.boxShadow = `0 0 0 4px ${themeColor}15`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = borderColor;
                          e.target.style.boxShadow = "none";
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddSkill}
                        className="absolute right-2 top-2 bottom-2 aspect-square rounded-lg flex items-center justify-center text-white active:scale-95 transition-transform"
                        style={{ backgroundColor: themeColor }}>
                        <Plus size={20} strokeWidth={3} />
                      </button>
                    </div>
                  </div>

                  {/* Skill Chips Container */}
                  <div
                    className="p-5 border border-dashed rounded-xl bg-white min-h-[140px]"
                    style={{ borderColor: borderColor }}>
                    {form.skills.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-[14px] font-medium text-slate-400">
                        No skills added yet
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2.5">
                        {form.skills.map((skill) => (
                          <div
                            key={skill}
                            className="flex items-center gap-2 px-3.5 py-1.5 text-[14px] font-bold rounded-lg animate-in zoom-in-95 duration-200"
                            style={{
                              backgroundColor: themeColorLight,
                              color: themeColor,
                            }}>
                            {skill}
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(skill)}
                              className="p-0.5 hover:bg-white/50 rounded-md transition-colors">
                              <X size={14} strokeWidth={3} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div
                className="mt-10 pt-6 border-t"
                style={{ borderColor: borderColor }}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full h-12 flex items-center justify-center gap-2 text-white font-bold text-[15px] rounded-xl shadow-md transition-all active:scale-[0.98] disabled:opacity-70 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                  style={{ backgroundColor: themeColor }}>
                  {isLoading ? (
                    <Loader2 className="animate-spin w-5 h-5" />
                  ) : step < 4 ? (
                    <>
                      Continue{" "}
                      <ArrowRight
                        size={18}
                        className="opacity-80 group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  ) : (
                    <>
                      Complete Registration{" "}
                      <CheckCircle2 size={18} className="opacity-80" />
                    </>
                  )}
                </button>
              </div>

              {/* Login Link */}
              {step === 1 && (
                <p className="mt-6 text-center text-[14px] font-medium text-slate-500">
                  Already have an account?{" "}
                  <Link
                    to="/candidate/login"
                    className="font-bold hover:underline transition-colors"
                    style={{ color: themeColor }}>
                    Log in
                  </Link>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
