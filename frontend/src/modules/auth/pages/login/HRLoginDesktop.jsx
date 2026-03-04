import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginWithEmail,
  loginWithGoogle,
} from "../../../../app/services/auth/AuthService";
import {
  Building2,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function HRLoginDesktop() {
  const navigate = useNavigate();

  // Logic Preserved: State remains exactly the same
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // =============================
  // EMAIL LOGIN (Logic Preserved)
  // =============================
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await loginWithEmail(form.email, form.password);

      if (user.role !== "hr") {
        throw new Error("Access restricted to HR accounts only.");
      }

      navigate("/hr/dashboard");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // GOOGLE LOGIN (Logic Preserved)
  // =============================
  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const user = await loginWithGoogle("hr");

      if (user.role !== "hr") {
        throw new Error("Access restricted to HR accounts only.");
      }

      navigate("/hr/dashboard");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* ================= LEFT SIDE: PREMIUM BRANDING ================= */}
      {/* Hidden on small screens, takes 50% width on desktop */}
      <div className="hidden lg:flex w-1/2 bg-[#0B1120] relative overflow-hidden flex-col justify-between p-16 xl:p-24">
        {/* Abstract Background Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-16">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Building2 className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-white tracking-wide">
              Enterprise<span className="text-blue-400">ATS</span>
            </span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
            Build your dream <br /> workforce,{" "}
            <span className="text-blue-400 italic">faster.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-md leading-relaxed">
            Manage your hiring pipeline, track candidates, and scale your teams
            with our professional HR suite.
          </p>
        </div>

        {/* Feature List / Social Proof */}
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3 text-slate-300">
            <CheckCircle2 className="text-blue-500" size={20} />
            <span className="font-medium">Advanced Candidate Tracking</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <CheckCircle2 className="text-blue-500" size={20} />
            <span className="font-medium">Collaborative Hiring Tools</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <CheckCircle2 className="text-blue-500" size={20} />
            <span className="font-medium">Automated Interview Scheduling</span>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE: LOGIN FORM ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[420px] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back
            </h2>
            <p className="text-slate-500 font-medium">
              Please enter your HR credentials to access the portal.
            </p>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">
                Work Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="e.g. hr@company.com"
                  required
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 text-[15px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-60 disabled:bg-slate-50"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>
                {/* Visual only - linking to a forgot password route if you have one later */}
                <a
                  href="#"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 text-[15px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-60 disabled:bg-slate-50"
                />
              </div>
            </div>

            {/* Primary Submit Button */}
            <button
              disabled={loading}
              className="group relative w-full flex items-center justify-center gap-2 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-600/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none mt-2">
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign in to Dashboard
                  <ArrowRight
                    size={18}
                    className="opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all"
                  />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink-0 mx-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                Or continue with
              </span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full h-12 flex items-center justify-center gap-3 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-all active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none">
              {/* Standard Google "G" Icon */}
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
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
