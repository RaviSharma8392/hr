import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginWithEmail, loginWithGoogle } from "../services/AuthService";
import {
  Briefcase,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  Rocket,
  Star,
} from "lucide-react";

const CandidateLoginPage = () => {
  const navigate = useNavigate();

  // State
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Added for mobile UX

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ================= EMAIL LOGIN (CANDIDATE ONLY) ================= */
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const user = await loginWithEmail(form.email, form.password);

      // ✅ STRICT ROLE CHECK
      if (user.role !== "candidate") {
        throw new Error(
          "Access denied. This portal is restricted to candidates only.",
        );
      }

      navigate("/candidate/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= GOOGLE LOGIN (CANDIDATE ONLY) ================= */
  const handleGoogleAuth = async () => {
    setError("");
    setIsLoading(true);

    try {
      const user = await loginWithGoogle();

      if (user.role !== "candidate") {
        throw new Error(
          "This Google account is not registered as a candidate.",
        );
      }

      navigate("/candidate/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Google authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- STYLES ---
  const inputStyle =
    "w-full px-4 py-3.5 bg-[#F8F9FA] border border-[#DDD] rounded-lg text-[#212121] text-[15px] font-medium placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC] transition-all";
  const labelStyle =
    "block text-[12px] font-bold text-[#484848] mb-1.5 uppercase tracking-wider";

  return (
    <div className="min-h-screen w-full flex font-sans bg-white md:bg-[#F8F9FA] lg:bg-white">
      {/* ========================================================= */}
      {/* LEFT PANEL - Candidate Value Prop (Hidden on Mobile/Tablet) */}
      {/* ========================================================= */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0A2540] relative flex-col justify-between p-12 xl:p-16 overflow-hidden">
        {/* Decorative Background Accents */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#008BDC] opacity-20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500 opacity-10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Top: Logo */}
        <Link
          to="/"
          className="relative z-10 flex items-center gap-2 hover:opacity-90 transition-opacity w-max">
          <div className="bg-[#008BDC] p-2 rounded-md text-white shadow-lg shadow-blue-500/20">
            <Briefcase className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black text-white tracking-tight">
            HRMastery<span className="text-[#008BDC]">.</span>
          </span>
        </Link>

        {/* Middle: Value Proposition */}
        <div className="relative z-10 max-w-lg mt-12 xl:mt-0">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6">
            <Rocket size={14} /> Accelerate Your Career
          </div>
          <h1 className="text-4xl xl:text-5xl font-black text-white mb-6 tracking-tight leading-[1.15]">
            Land your <br />
            <span className="text-[#008BDC]">dream role.</span>
          </h1>
          <p className="text-[#8A8D9F] text-lg font-medium leading-relaxed mb-8">
            Connect with top companies, track your applications in real-time,
            and stand out from the crowd with a premium candidate profile.
          </p>
        </div>

        {/* Bottom: Testimonial */}
        <div className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl mt-12">
          <div className="flex gap-1 text-amber-400 mb-3">
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
          </div>
          <p className="text-gray-300 font-medium leading-relaxed mb-5 text-[15px]">
            "The candidate dashboard made tracking my interviews so easy. I
            applied, interviewed, and got hired by a top tech firm all within
            one seamless platform."
          </p>
          <div className="flex items-center gap-3">
            <img
              src="https://ui-avatars.com/api/?name=David+Kim&background=008BDC&color=fff"
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-white/10"
            />
            <div>
              <div className="text-white text-[13px] font-bold tracking-wide">
                David Kim
              </div>
              <div className="text-gray-400 text-[12px] font-medium">
                Frontend Engineer
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT PANEL - Login Form (Centered Card on all devices) */}
      {/* ========================================================= */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-12 py-8 relative pb-safe">
        {/* Mobile Logo (Visible only on mobile/tablet) */}
        <div className="lg:hidden absolute top-6 left-6 sm:top-8 sm:left-8">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90">
            <div className="bg-[#008BDC] p-1.5 rounded-md text-white shadow-sm">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-[#212121] tracking-tight">
              HRMastery<span className="text-[#008BDC]">.</span>
            </span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-[440px] mt-12 lg:mt-0 bg-white md:bg-transparent lg:bg-white md:rounded-2xl lg:rounded-none md:border lg:border-none border-[#EEE] md:shadow-[0_8px_40px_rgba(0,0,0,0.04)] lg:shadow-none p-4 sm:p-10 lg:p-0">
          <div className="mb-8 lg:mb-10">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#008BDC] px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-widest mb-3">
              Candidate Portal
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#212121] tracking-tight mb-2">
              Welcome back
            </h2>
            <p className="text-gray-500 font-medium text-[14px]">
              Log in to track your job applications.
            </p>
          </div>

          {/* 🚨 ERROR BANNER */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-[13px] font-semibold text-red-700 leading-relaxed">
                {error}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border-2 border-[#EEE] rounded-lg text-[14px] font-bold text-[#484848] bg-white hover:bg-[#F8F9FA] hover:border-[#DDD] transition-all duration-200 shadow-sm active:scale-95 disabled:opacity-70">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <div className="flex items-center my-7">
            <div className="flex-1 border-t border-[#EEE]"></div>
            <span className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Or log in with email
            </span>
            <div className="flex-1 border-t border-[#EEE]"></div>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {/* Email Row */}
            <div>
              <label htmlFor="email" className={labelStyle}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
                placeholder="you@example.com"
                className={inputStyle}
              />
            </div>

            {/* Password Row with Native Reveal Toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className={`${labelStyle} mb-0`}>
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[12px] font-bold text-[#008BDC] hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className={`${inputStyle} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#008BDC] focus:outline-none transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-lg text-[15px] font-bold text-white bg-[#008BDC] hover:bg-[#0073B6] shadow-[0_4px_14px_rgba(0,139,220,0.3)] transition-all active:scale-[0.98] disabled:opacity-70 disabled:shadow-none">
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Access Dashboard"
                )}
              </button>
            </div>
          </form>

          {/* Registration Redirect */}
          <p className="mt-8 text-center text-[14px] font-medium text-gray-500">
            New to HRMastery?{" "}
            <Link
              to="/candidate/signup"
              className="text-[#008BDC] font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Global CSS for PWA Safe Areas */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .pb-safe { padding-bottom: max(2rem, env(safe-area-inset-bottom)); }
      `,
        }}
      />
    </div>
  );
};

export default CandidateLoginPage;
