// src/pages/auth/LoginDesktop.jsx
import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Loader2, Briefcase, AlertCircle, Eye, EyeOff } from "lucide-react";
import {
  loginWithEmail,
  loginWithGoogle,
} from "../../../app/services/auth/AuthService";

export default function LoginDesktop() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  /* ================= ROLE DETECTION ================= */
  const role = location.pathname.includes("hr")
    ? "hr"
    : location.pathname.includes("candidate")
      ? "candidate"
      : location.pathname.includes("admin")
        ? "admin"
        : "user";

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const routeUserBasedOnRole = (user) => {
    if (user?.role === "hr") navigate("/hr/dashboard");
    else if (user?.role === "candidate") navigate("/candidate/dashboard");
    else if (user?.role === "admin") navigate("/admin/dashboard");
    else navigate("/dashboard");
  };

  const handleGoogleLogin = async () => {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const user = await loginWithGoogle();
      routeUserBasedOnRole(user);
    } catch (err) {
      setError(err.message || "Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const user = await loginWithEmail(form.email, form.password);
      routeUserBasedOnRole(user);
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DYNAMIC SIDEBAR CONTENT ================= */
  const sidebarContent = {
    hr: {
      title: "Build your dream workforce.",
      subtitle:
        "Join thousands of companies using HRMastery to streamline their hiring pipeline and discover top talent.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
    },
    candidate: {
      title: "Accelerate your career.",
      subtitle:
        "Connect with industry-leading companies, showcase your skills, and land the job you deserve.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    },
    default: {
      title: "Welcome to HRMastery.",
      subtitle:
        "The all-in-one platform connecting ambitious professionals with forward-thinking companies.",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    },
  };

  const currentContent = sidebarContent[role] || sidebarContent.default;

  return (
    <div className="min-h-screen w-full flex bg-white font-sans selection:bg-blue-100">
      {/* ========================================== */}
      {/* LEFT SIDE: MARKETING / HERO IMAGE          */}
      {/* ========================================== */}
      <div className="hidden lg:flex w-1/2 relative bg-[#0F172A] overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105 hover:scale-110"
          style={{ backgroundImage: `url('${currentContent.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-[#0F172A]/40" />

        {/* Brand Logo */}
        <div className="absolute top-10 left-12 z-20 flex items-center gap-2">
          <div className="p-2 bg-[#008BDC] rounded-xl text-white shadow-lg">
            <Briefcase size={24} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black text-white tracking-tight">
            HRMastery<span className="text-[#008BDC]">.</span>
          </span>
        </div>

        {/* Text Content */}
        <div className="relative z-10 flex flex-col justify-end p-16 h-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-[44px] xl:text-[52px] font-black text-white leading-[1.1] mb-6 tracking-tight">
            {currentContent.title}
          </h1>
          <p className="text-[18px] text-gray-300 leading-relaxed font-medium">
            {currentContent.subtitle}
          </p>
        </div>
      </div>

      {/* ========================================== */}
      {/* RIGHT SIDE: LOGIN FORM                     */}
      {/* ========================================== */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 xl:px-32 relative">
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
          <div className="p-2 bg-[#008BDC] rounded-xl text-white">
            <Briefcase size={20} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tight">
            HRMastery<span className="text-[#008BDC]">.</span>
          </span>
        </div>

        <div className="w-full max-w-[440px] mx-auto animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="mb-10 mt-16 lg:mt-0">
            <h2 className="text-[32px] font-semibold text-gray-900 tracking-tight leading-tight mb-2">
              Welcome back
            </h2>
            <p className="text-[16px] font-medium text-gray-500">
              Please enter your details to sign in.
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
              <p className="text-[14px] font-bold text-red-800 leading-snug">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Email */}
            <div>
              <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="w-full h-14 px-5 bg-gray-50 border border-gray-200 rounded-2xl text-[16px] font-medium text-gray-900 placeholder:text-gray-400 transition-all focus:outline-none focus:bg-white focus:border-[#008BDC] focus:ring-4 focus:ring-[#008BDC]/10 hover:border-gray-300"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full h-14 pl-5 pr-16 bg-gray-50 border border-gray-200 rounded-2xl text-[16px] font-medium text-gray-900 placeholder:text-gray-400 transition-all focus:outline-none focus:bg-white focus:border-[#008BDC] focus:ring-4 focus:ring-[#008BDC]/10 hover:border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[14px] font-bold text-[#008BDC] hover:bg-blue-50 px-3 py-2 rounded-xl transition-colors">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="flex justify-end mt-3 mr-1">
                <Link
                  to="/forgot-password"
                  className="text-[14px] font-bold text-[#008BDC] hover:underline transition-all">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 mt-2 bg-[#008BDC] hover:bg-[#0073B6] text-white rounded-full font-bold text-[16px] shadow-[0_8px_20px_rgba(0,139,220,0.2)] active:scale-[0.98] transition-all duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? (
                <Loader2 className="animate-spin w-6 h-6" />
              ) : (
                "Sign in"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center w-full my-2">
              <div className="flex-grow border-t border-gray-200" />
              <span className="mx-4 text-[12px] font-bold text-gray-400 uppercase tracking-widest">
                or continue with
              </span>
              <div className="flex-grow border-t border-gray-200" />
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex items-center justify-center w-full h-14 bg-white border border-gray-200 text-gray-700 font-bold rounded-full shadow-sm hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
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
              Google
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 text-center text-[15px] font-medium text-gray-500 pb-8">
            Don't have an account?{" "}
            <Link
              to={`/register/${role}`}
              className="text-[#008BDC] font-bold hover:underline transition-all">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
