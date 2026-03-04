import React, { useState, useMemo, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  loginWithEmail,
  loginWithGoogle,
} from "../../../../app/services/auth/AuthService";
import {
  Loader2,
  AlertCircle,
  GraduationCap, // Used for Internshala logo in left panel
  Briefcase, // Used for general logo and left panel feature
  Building2, // Used for left panel feature
  CheckCircle2, // Used for left panel feature
  Eye, // For password visibility
  EyeOff, // For password visibility
  Mail, // For email input icon
  Lock, // For password input icon
  ChevronLeft, // For mobile header back button
} from "lucide-react";

/* ================= BRANDING (Internshala-style) ================= */
const BRANDING = {
  themeColor: "#1295D8", // Professional Blue (Internshala-like)
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

export default function CandidateLoginDesktop() {
  const navigate = useNavigate();
  const location = useLocation();

  // State for form inputs, errors, loading status, and password visibility
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    themeColor,
    headingColor,
    mutedTextColor,
    borderColor,
    borderRadius,
    fontFamily,
    textColor,
    dangerColor,
    surfaceColor,
  } = BRANDING;

  /* ================= SAFE REDIRECT HANDLING ================= */
  const redirectTo = useMemo(() => {
    // 1️⃣ If ProtectedRoute passed state
    const stateRedirect = location.state?.from;

    // 2️⃣ If redirect query param exists
    const queryRedirect = new URLSearchParams(location.search).get("redirect");

    const fallback = "/candidate/dashboard";

    const finalRedirect = stateRedirect || queryRedirect || fallback;

    // Allow only candidate routes, or dashboard fallback
    if (finalRedirect.startsWith("/candidate")) {
      return finalRedirect;
    }

    return fallback;
  }, [location]);

  // Handle form input changes
  const handleChange = useCallback(
    (e) => {
      setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
      if (error) setError(""); // Clear error when user types
    },
    [error],
  );

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleLogin = useCallback(async () => {
    if (isLoading) return; // Prevent multiple submissions

    setIsLoading(true);
    setError("");

    try {
      const user = await loginWithGoogle("candidate"); // Pass default role to service

      // Ensure logged-in user has the 'candidate' role
      if (user.role !== "candidate") {
        throw new Error(
          "Access denied. This Google account is not registered as a candidate.",
        );
      }

      navigate(redirectTo, { replace: true }); // Redirect after successful login
    } catch (err) {
      setError(err.message || "Google login failed.");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, redirectTo, navigate]);

  /* ================= EMAIL LOGIN ================= */
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isLoading) return; // Prevent multiple submissions

      setIsLoading(true);
      setError("");

      if (!form.email || !form.password) {
        setError("Please enter email and password.");
        setIsLoading(false);
        return;
      }

      try {
        const user = await loginWithEmail(form.email, form.password);

        // Ensure logged-in user has the 'candidate' role
        if (user.role !== "candidate") {
          throw new Error(
            "Access denied. This portal is restricted to candidates only.",
          );
        }

        navigate(redirectTo, { replace: true }); // Redirect after successful login
      } catch (err) {
        setError(err.message || "Invalid credentials. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, form, redirectTo, navigate],
  );

  /* -------- Reusable Input Component -------- */
  // Centralized input field styling and logic
  const InputField = ({ icon, label, type = "text", ...props }) => (
    <div className="mb-5">
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
        <input
          {...props}
          type={type}
          required
          className="w-full h-11 pl-10 pr-3 text-[15px] transition-all outline-none bg-white placeholder-slate-400"
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
        {props.name === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] font-semibold hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded-sm"
            aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );

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
              <GraduationCap size={24} style={{ color: themeColor }} />{" "}
              {/* Changed to GraduationCap for Internshala feel */}
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Internshala
            </span>
          </Link>

          <h1 className="text-4xl font-bold text-white leading-[1.2] mb-6">
            Welcome back.
          </h1>
          <p className="text-blue-100 text-lg mb-10 leading-relaxed max-w-sm">
            Log in to manage applications and explore new opportunities.
          </p>

          <div className="space-y-6">
            {[
              { icon: Briefcase, text: "Track your job applications" },
              { icon: Building2, text: "Connect directly with recruiters" },
              { icon: CheckCircle2, text: "Get personalized job matches" },
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
          © {new Date().getFullYear()} Internshala Clone.
        </div>
      </div>

      {/* RIGHT PANEL: The Login Form */}
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
          <div className="w-full max-w-[440px] mx-auto">
            <h2
              className="text-3xl font-bold mb-3 text-center lg:text-left"
              style={{ color: headingColor }}>
              Candidate Login
            </h2>
            <p
              className="text-[16px] mb-8 text-center lg:text-left"
              style={{ color: mutedTextColor }}>
              Log in to track your job applications and connect with recruiters.
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

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
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
              Continue with Google
            </button>

            <div className="flex items-center gap-4 my-6">
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: borderColor }}
              />
              <span
                className="text-[13px] font-medium whitespace-nowrap"
                style={{ color: mutedTextColor }}>
                OR Log in with Email
              </span>
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: borderColor }}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <InputField
                label="Email Address"
                name="email"
                type="email"
                icon={<Mail size={18} />}
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                id="email"
              />
              <InputField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                icon={<Lock size={18} />}
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="current-password"
                id="password"
              />

              <div className="flex justify-end pt-0">
                <Link
                  to="/forgot-password"
                  className="text-[14px] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded-sm"
                  style={{ color: themeColor }}>
                  Forgot Password?
                </Link>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-white font-semibold text-[15px] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded-lg"
                  style={{ backgroundColor: themeColor, borderRadius }}>
                  {isLoading ? (
                    <Loader2 className="animate-spin w-5 h-5" color="#FFFFFF" />
                  ) : (
                    "Access Dashboard"
                  )}
                </button>
              </div>
            </form>

            <p
              className="mt-8 text-center text-[14px]"
              style={{ color: mutedTextColor }}>
              New to Internshala?{" "}
              <Link
                to="/candidate/signup"
                className="font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded-sm"
                style={{ color: themeColor }}>
                Create an account
              </Link>
            </p>

            {/* Employer Login Link */}
            <div className="flex justify-center mt-6">
              <Link
                to="/hr/login"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                <Building2 size={16} /> Employer Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
