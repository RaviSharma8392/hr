import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signupUserWithEmail,
  loginWithGoogle,
} from "../../../../app/services/auth/AuthService";

import {
  Chrome, // Replaced Mail for Google icon
  Mail,
  User, // Used for Full Name icon
  Lock,
  Building2,
  ChevronLeft,
  UsersRound,
  ArrowRight,
  Briefcase, // Used for HRMastery logo
  CheckCircle2, // For features
  Rocket, // Value prop icon
  Star, // Value prop icon
  ChevronDown, // For select dropdown
  Loader2, // For loading states
  AlertCircle, // For error messages
} from "lucide-react";

/* ================= DESKTOP BRANDING (Internshala-style) ================= */
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

export default function HRRegisterDesktop() {
  const navigate = useNavigate();
  const ROLE = "hr";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    companySize: "",
    email: "",
    password: "",
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

  /* ------------------ Helpers ------------------ */

  const routeToDashboard = useCallback(() => {
    navigate("/hr/dashboard");
  }, [navigate]);

  const validateForm = useCallback(() => {
    if (!form.fullName.trim()) return "Full name is required.";
    if (!form.companyName.trim()) return "Company name is required.";
    if (!form.companySize) return "Company size is required.";

    if (!form.email.trim()) return "Email is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email))
      return "Please enter a valid email address.";

    if (!form.password) return "Password is required.";
    if (form.password.length < 6)
      return "Password must be at least 6 characters.";

    return null;
  }, [form]);

  const handleChange = useCallback((e) => {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
    setError("");
  }, []);

  /* ------------------ Google Signup ------------------ */

  const handleGoogleSignup = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);
      setError("");

      const user = await loginWithGoogle(ROLE);

      if (user.role !== ROLE) {
        throw new Error(`This Google account is registered as ${user.role}.`);
      }

      routeToDashboard();
    } catch (err) {
      setError(err.message || "Google sign-up failed.");
    } finally {
      setLoading(false);
    }
  }, [loading, routeToDashboard]);

  /* ------------------ Email Signup ------------------ */

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (loading) return;

      const validationError = validateForm();
      if (validationError) {
        setError(validationError);
        return;
      }

      try {
        setLoading(true);
        setError("");

        await signupUserWithEmail(form.email.trim(), form.password, ROLE, {
          fullName: form.fullName.trim(),
          companyName: form.companyName.trim(),
          companySize: form.companySize,
        });

        routeToDashboard();
      } catch (err) {
        setError(err.message || "Registration failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [loading, validateForm, form, routeToDashboard],
  );

  /* -------- Reusable Input Component -------- */
  // Adapting the DesktopInput pattern for this form
  const InputField = ({ icon, label, type = "text", ...props }) => (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="block text-[14px] font-semibold mb-1.5"
        style={{ color: headingColor }}>
        {label}
      </label>
      <div className="relative">
        <div
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: mutedTextColor }}>
          {icon}
        </div>
        {props.name === "companySize" ? (
          <>
            <select
              {...props}
              required
              className="w-full h-11 pl-10 pr-10 text-[15px] transition-all outline-none bg-white cursor-pointer appearance-none"
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
              <option value="" disabled>
                Select company size
              </option>
              <option value="1-10">1–10 Employees</option>
              <option value="11-50">11–50 Employees</option>
              <option value="51-200">51–200 Employees</option>
              <option value="200+">200+ Employees</option>
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: mutedTextColor }}
            />
          </>
        ) : (
          <input
            {...props}
            type={type}
            required
            className="w-full h-11 pl-10 text-[15px] transition-all outline-none bg-white placeholder-slate-400"
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
        )}
      </div>
    </div>
  );

  /* ------------------ UI ------------------ */

  return (
    <div
      className="min-h-screen w-full flex bg-white antialiased"
      style={{ fontFamily }}>
      {/* LEFT PANEL: Value Proposition (Hidden on mobile/tablet, flex on LG screens) */}
      <div
        className="hidden lg:flex flex-col justify-between w-5/12 max-w-[500px] p-8 xl:p-12 relative overflow-hidden"
        style={{ backgroundColor: themeColor }}>
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-10 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-1/3 -translate-x-1/4"></div>

        <div className="relative z-10">
          <Link
            to="/"
            className="flex items-center gap-2 mb-16 opacity-90 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded-sm">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Briefcase size={24} style={{ color: themeColor }} />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              HRMastery
            </span>
          </Link>

          <h1 className="text-4xl font-bold text-white leading-[1.2] mb-6">
            Find the right <br />
            talent, faster.
          </h1>
          <p className="text-blue-100 text-lg mb-10 leading-relaxed max-w-sm">
            Access a pool of qualified candidates, streamline your hiring, and
            build your dream team with HRMastery.
          </p>

          <div className="space-y-6">
            {[
              { icon: UsersRound, text: "Connect with 1.5 Lakh+ Candidates" },
              { icon: Briefcase, text: "Seamless hiring management" },
              { icon: Rocket, text: "Boost your recruitment efficiency" },
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
          © {new Date().getFullYear()} HRMastery. All rights reserved.
        </div>
      </div>

      {/* RIGHT PANEL: The HR Registration Form */}
      <div
        className="flex-1 flex flex-col relative py-8 px-4 sm:px-8 lg:p-0"
        style={{ backgroundColor: surfaceColor }}>
        {/* Mobile Header (Visible on mobile/tablet, hidden on large screens) */}
        <div className="lg:hidden absolute top-0 left-0 right-0 h-16 bg-white flex items-center justify-between px-4 sm:px-8 border-b border-gray-100 z-10">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="p-2 -ml-2 text-gray-600 hover:text-gray-900 active:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
            <ChevronLeft size={28} strokeWidth={2} />
          </button>
          <Link
            to="/"
            className="flex items-center gap-1.5 font-bold text-lg text-gray-900">
            <Briefcase size={18} className="text-[#008BDC]" strokeWidth={2.5} />
            HRMastery
          </Link>
          <div className="w-10"></div> {/* Spacer for balance */}
        </div>

        {/* Form Container Centered within its flex-1 parent */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 mt-16 lg:mt-0">
          {" "}
          {/* Added flex-col justify-center items-center here */}
          <div className="w-full max-w-[440px] mx-auto">
            {" "}
            {/* Added mx-auto here to center the card itself */}
            <h2
              className="text-3xl font-bold mb-3 text-center lg:text-left"
              style={{ color: headingColor }}>
              Register Your Company
            </h2>
            <p
              className="text-[16px] mb-8 text-center lg:text-left"
              style={{ color: mutedTextColor }}>
              Start hiring the best talent today.
            </p>
            {/* Error Message Inline */}
            {error && (
              <div
                role="alert"
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
            {/* Google Signup Button */}
            <button
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full h-12 flex items-center justify-center gap-3 bg-white font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded-lg"
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
            <div className="flex items-center gap-4 my-6">
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: borderColor }}
              />
              <span
                className="text-[13px] font-medium whitespace-nowrap"
                style={{ color: mutedTextColor }}>
                OR Register with Email
              </span>
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: borderColor }}
              />
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <InputField
                icon={<User size={18} />} /* Changed to User for full name */
                name="fullName"
                type="text"
                placeholder="John Doe"
                value={form.fullName}
                onChange={handleChange}
                label="Full Name"
                id="fullName"
              />

              <InputField
                icon={<Mail size={18} />}
                name="email"
                type="email"
                placeholder="your.email@company.com"
                value={form.email}
                onChange={handleChange}
                label="Work Email"
                id="email"
              />

              <InputField
                icon={<Lock size={18} />}
                name="password"
                type="password"
                placeholder="•••••••• (min 6 characters)"
                value={form.password}
                onChange={handleChange}
                label="Password"
                id="password"
              />

              <InputField
                icon={<Building2 size={18} />}
                name="companyName"
                type="text"
                placeholder="Acme Corp"
                value={form.companyName}
                onChange={handleChange}
                label="Company Name"
                id="companyName"
              />

              {/* Company Size Select Field */}
              <InputField
                icon={<UsersRound size={18} />}
                name="companySize"
                value={form.companySize}
                onChange={handleChange}
                label="Company Size"
                id="companySize"
                type="select" // Custom prop to trigger select rendering
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-white font-semibold text-[15px] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded-lg"
                style={{ backgroundColor: themeColor, borderRadius }}>
                {loading ? (
                  <Loader2 className="animate-spin w-5 h-5" color="#FFFFFF" />
                ) : (
                  <>
                    Create HR Account <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
            <div
              className="mt-8 text-center text-[14px]"
              style={{ color: mutedTextColor }}>
              Already have an account?{" "}
              <Link
                to="/hr/login"
                className="font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded-sm"
                style={{ color: themeColor }}>
                Sign in here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
