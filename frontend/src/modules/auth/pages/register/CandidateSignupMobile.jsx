import React, { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signupUserWithEmail,
  loginWithGoogle,
} from "../../../../app/services/auth/AuthService";
import {
  Loader2,
  ArrowLeft,
  AlertCircle,
  Plus,
  X,
  User,
  Mail,
  Lock,
  Briefcase,
} from "lucide-react";

/* ================= MOBILE BRANDING ================= */
const BRANDING = {
  themeColor: "#0A66C2", // Premium LinkedIn Blue
  themeColorLight: "#EFF6FF",
  surfaceColor: "#FFFFFF",
  textColor: "#0F172A",
  mutedTextColor: "#64748B",
  borderColor: "#E2E8F0",
  borderRadius: "12px", // Squircle corners for native feel
  dangerColor: "#EF4444",
};

export default function CandidateSignupMobile() {
  const navigate = useNavigate();

  const {
    themeColor,
    themeColorLight,
    surfaceColor,
    textColor,
    mutedTextColor,
    borderColor,
    borderRadius,
    dangerColor,
  } = BRANDING;

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [skillInput, setSkillInput] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    preferredRole: "",
    skills: [],
  });

  /* ================= VALIDATION ================= */
  const validateStep = () => {
    if (step === 1) {
      if (!form.firstName || !form.lastName)
        return "Please enter your full name.";
      if (!form.email.match(/\S+@\S+\.\S+/))
        return "Please enter a valid email address.";
      if (form.password.length < 6)
        return "Password must be at least 6 characters.";
    }
    if (step === 2) {
      if (!form.preferredRole.trim())
        return "Please enter your desired job profile.";
    }
    if (step === 3) {
      if (form.skills.length === 0) return "Please add at least one skill.";
    }
    return null;
  };

  const next = () => {
    const validationError = validateStep();
    if (validationError) return setError(validationError);

    setError("");
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const back = () => {
    setError("");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  /* ================= GOOGLE ================= */
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

  /* ================= EMAIL SUBMIT ================= */
  const handleSubmit = async () => {
    const validationError = validateStep();
    if (validationError) return setError(validationError);

    if (isLoading) return;
    setIsLoading(true);
    setError("");

    try {
      await signupUserWithEmail(form.email, form.password, "candidate", {
        ...form,
      });
      navigate("/candidate/onboarding", { replace: true });
    } catch (err) {
      setError(err.message || "Signup failed.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= SKILLS ================= */
  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;

    if (!form.skills.includes(trimmed)) {
      setForm((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmed],
      }));
    }
    setSkillInput("");
  };

  const removeSkill = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  /* ================= REUSABLE INPUT ================= */
  const InputField = ({ icon: Icon, ...props }) => (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
        <Icon size={18} />
      </div>
      <input
        {...props}
        className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 text-[15px] font-medium rounded-xl focus:bg-white focus:outline-none focus:ring-4 transition-all placeholder:text-slate-400 placeholder:font-normal"
        style={{
          "--tw-ring-color": `${themeColor}20`,
          focusBorderColor: themeColor,
        }}
        onFocus={(e) => (e.target.style.borderColor = themeColor)}
        onBlur={(e) => (e.target.style.borderColor = borderColor)}
      />
    </div>
  );

  /* ================= UI ================= */
  return (
    <div
      className="min-h-[100dvh] flex flex-col antialiased selection:bg-blue-100"
      style={{ backgroundColor: surfaceColor }}>
      {/* 1. Header & Progress Bar */}
      <div className="bg-white sticky top-0 z-10 pt-safe">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="w-10">
            {step > 1 ? (
              <button
                onClick={back}
                className="p-2 -ml-2 rounded-full hover:bg-slate-50 active:bg-slate-100 transition-colors">
                <ArrowLeft size={22} style={{ color: textColor }} />
              </button>
            ) : (
              <button
                onClick={() => navigate(-1)}
                className="p-2 -ml-2 rounded-full hover:bg-slate-50 active:bg-slate-100 transition-colors">
                <ArrowLeft size={22} style={{ color: textColor }} />
              </button>
            )}
          </div>
          <h1 className="text-[16px] font-bold" style={{ color: textColor }}>
            Create Account
          </h1>
          <div className="w-10 text-right text-xs font-bold text-slate-400">
            {step}/3
          </div>
        </div>
        {/* Animated Progress Bar */}
        <div className="w-full h-1 bg-slate-100">
          <div
            className="h-full transition-all duration-500 ease-out rounded-r-full"
            style={{
              backgroundColor: themeColor,
              width: `${(step / 3) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* 2. Error Banner */}
      {error && (
        <div className="mx-5 mt-4 p-3.5 flex items-start gap-3 rounded-xl bg-red-50 border border-red-100 animate-in fade-in slide-in-from-top-2">
          <AlertCircle
            size={18}
            color={dangerColor}
            className="shrink-0 mt-0.5"
          />
          <span
            className="text-[14px] font-medium leading-snug"
            style={{ color: dangerColor }}>
            {error}
          </span>
        </div>
      )}

      {/* 3. Main Content Area */}
      <div className="flex-1 px-5 pt-6 pb-28 flex flex-col">
        {/* --- STEP 1: BASIC INFO --- */}
        {step === 1 && (
          <div className="flex flex-col gap-5 animate-in slide-in-from-right-4 fade-in duration-300">
            <div className="mb-2">
              <h2
                className="text-[26px] font-black tracking-tight mb-2"
                style={{ color: textColor }}>
                Let's get started
              </h2>
              <p className="text-[15px]" style={{ color: mutedTextColor }}>
                Join thousands of professionals finding their dream jobs.
              </p>
            </div>

            <button
              onClick={handleGoogle}
              disabled={isLoading}
              className="w-full h-14 flex items-center justify-center gap-3 bg-white border border-slate-200 rounded-xl font-bold text-[15px] shadow-sm hover:bg-slate-50 active:scale-[0.98] transition-all disabled:opacity-50"
              style={{ color: textColor }}>
              <svg
                width="22"
                height="22"
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
              Continue with Google
            </button>

            <div className="flex items-center gap-4 my-1">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                Or register with email
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="flex gap-3">
              <InputField
                icon={User}
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />
              <InputField
                icon={User}
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
            </div>
            <InputField
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <InputField
              icon={Lock}
              type="password"
              placeholder="Create Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        )}

        {/* --- STEP 2: ROLE --- */}
        {step === 2 && (
          <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 fade-in duration-300">
            <div>
              <h2
                className="text-[26px] font-black tracking-tight mb-2"
                style={{ color: textColor }}>
                What kind of work?
              </h2>
              <p className="text-[15px]" style={{ color: mutedTextColor }}>
                Tell us your desired role so we can match you with the best
                opportunities.
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-[13px] font-bold uppercase tracking-wider text-slate-400 ml-1">
                Desired Job Profile
              </label>
              <InputField
                icon={Briefcase}
                placeholder="e.g. Frontend Developer"
                value={form.preferredRole}
                onChange={(e) =>
                  setForm({ ...form, preferredRole: e.target.value })
                }
              />
            </div>
          </div>
        )}

        {/* --- STEP 3: SKILLS --- */}
        {step === 3 && (
          <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 fade-in duration-300">
            <div>
              <h2
                className="text-[26px] font-black tracking-tight mb-2"
                style={{ color: textColor }}>
                Add your skills
              </h2>
              <p className="text-[15px]" style={{ color: mutedTextColor }}>
                Add 3-5 skills to make your profile stand out to recruiters.
              </p>
            </div>

            <div className="relative flex items-center">
              <input
                placeholder="e.g. React, Python, Marketing..."
                className="w-full h-14 pl-4 pr-16 bg-slate-50 border border-slate-200 text-[15px] font-medium rounded-xl focus:bg-white focus:outline-none focus:ring-4 transition-all"
                style={{ "--tw-ring-color": `${themeColor}20` }}
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                onFocus={(e) => (e.target.style.borderColor = themeColor)}
                onBlur={(e) => (e.target.style.borderColor = borderColor)}
              />
              <button
                onClick={addSkill}
                className="absolute right-2 top-2 bottom-2 aspect-square rounded-lg flex items-center justify-center text-white active:scale-95 transition-transform"
                style={{ backgroundColor: themeColor }}>
                <Plus size={20} strokeWidth={3} />
              </button>
            </div>

            {/* Skill Chips */}
            <div className="flex flex-wrap gap-2.5">
              {form.skills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 px-3.5 py-2 text-[14px] font-bold rounded-lg animate-in zoom-in-95 duration-200"
                  style={{
                    backgroundColor: themeColorLight,
                    color: themeColor,
                  }}>
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="p-0.5 hover:bg-white/50 rounded-md transition-colors">
                    <X size={14} strokeWidth={3} />
                  </button>
                </div>
              ))}
              {form.skills.length === 0 && (
                <div className="w-full text-center py-8 text-[14px] font-medium text-slate-400 border border-dashed rounded-xl border-slate-300">
                  No skills added yet
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 4. Sticky Bottom CTA (with safe area support for iPhone) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-100 p-4 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-20">
        {step < 3 ? (
          <button
            onClick={next}
            className="w-full h-14 text-white text-[16px] font-bold rounded-xl shadow-lg active:scale-[0.98] transition-transform"
            style={{ backgroundColor: themeColor }}>
            Continue
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full h-14 text-white text-[16px] font-bold rounded-xl shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2 disabled:opacity-70"
            style={{ backgroundColor: themeColor }}>
            {isLoading ? (
              <Loader2 className="animate-spin w-6 h-6" />
            ) : (
              "Complete Signup"
            )}
          </button>
        )}
      </div>

      {/* Tailwind Utility for iOS bottom bar (add to your global CSS if not present, or it falls back gracefully) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .pb-safe { padding-bottom: max(1rem, env(safe-area-inset-bottom)); }
        .pt-safe { padding-top: max(0px, env(safe-area-inset-top)); }
      `,
        }}
      />
    </div>
  );
}
