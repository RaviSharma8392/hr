import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  loginWithEmail,
  loginWithGoogle,
} from "../../../services/auth/AuthService";

import {
  Briefcase,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  ShieldCheck,
  Star,
} from "lucide-react";

const HRLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputStyle =
    "w-full px-4 py-3.5 bg-[#F8F9FA] border border-[#DDD] rounded-lg text-[#212121] text-[15px] font-medium placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC] transition-all";

  const labelStyle =
    "block text-[12px] font-bold text-[#484848] mb-1.5 uppercase tracking-wider";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ================= EMAIL LOGIN (HR ONLY) ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const user = await loginWithEmail(form.email, form.password);

      if (user.role !== "hr") {
        throw new Error(
          "Access denied. This portal is restricted to HR accounts only.",
        );
      }

      navigate("/hr", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= GOOGLE LOGIN (HR ONLY) ================= */
  const handleGoogle = async () => {
    setError("");
    setIsLoading(true);

    try {
      const user = await loginWithGoogle();

      if (user.role !== "hr") {
        throw new Error(
          "This Google account is not registered as an HR account.",
        );
      }

      navigate("/hr", { replace: true });
    } catch (err) {
      setError(err.message || "Google authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex font-sans bg-white md:bg-[#F8F9FA] lg:bg-white">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0F172A] relative flex-col justify-between p-12 xl:p-16 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#008BDC] opacity-20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-400 opacity-10 rounded-full blur-3xl pointer-events-none"></div>

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

        <div className="relative z-10 max-w-lg mt-12 xl:mt-0">
          <div className="inline-flex items-center gap-1.5 bg-[#1E293B] border border-gray-700 text-gray-300 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6">
            <ShieldCheck size={14} className="text-[#008BDC]" /> Enterprise
            Ready
          </div>
          <h1 className="text-4xl xl:text-5xl font-black text-white mb-6 tracking-tight leading-[1.15]">
            Build your dream <br />
            <span className="text-[#008BDC]">workforce.</span>
          </h1>
          <p className="text-gray-400 text-lg font-medium leading-relaxed mb-8">
            Manage job postings, track top-tier candidates, and streamline your
            entire hiring pipeline with our intelligent HR platform.
          </p>
        </div>

        <div className="relative z-10 bg-[#1E293B]/50 border border-gray-800 backdrop-blur-sm p-6 rounded-xl mt-12">
          <div className="flex gap-1 text-amber-400 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <p className="text-gray-300 font-medium leading-relaxed mb-5 text-[15px]">
            "Switching to HRMastery completely transformed how we manage our
            hiring. The UI is incredibly intuitive, and our time-to-hire dropped
            by 40%."
          </p>
          <div className="flex items-center gap-3">
            <img
              src="https://ui-avatars.com/api/?name=Sarah+Chen&background=008BDC&color=fff"
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-gray-700"
            />
            <div>
              <div className="text-white text-[13px] font-bold tracking-wide">
                Sarah Chen
              </div>
              <div className="text-gray-500 text-[12px] font-medium">
                VP of Human Resources, TechFlow
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-12 py-8 relative pb-safe">
        <div className="w-full max-w-[440px] mt-12 lg:mt-0 bg-white md:bg-transparent lg:bg-white md:rounded-2xl lg:rounded-none md:border lg:border-none border-[#EEE] md:shadow-[0_8px_40px_rgba(0,0,0,0.04)] lg:shadow-none p-4 sm:p-10 lg:p-0">
          <div className="mb-8 lg:mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#212121] tracking-tight mb-2">
              Employer Portal
            </h2>
            <p className="text-gray-500 font-medium text-[14px]">
              Log in to access your HR dashboard.
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-[13px] font-semibold text-red-700">{error}</p>
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogle}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border-2 border-[#EEE] rounded-lg text-[14px] font-bold text-[#484848] bg-white hover:bg-[#F8F9FA] transition-all active:scale-95">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Log in with Google
          </button>

          <div className="flex items-center my-7">
            <div className="flex-1 border-t border-[#EEE]"></div>
            <span className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Or log in with email
            </span>
            <div className="flex-1 border-t border-[#EEE]"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelStyle}>Work Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="admin@company.com"
                className={inputStyle}
              />
            </div>

            <div>
              <label className={labelStyle}>Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className={`${inputStyle} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3.5 rounded-lg text-[15px] font-bold text-white bg-[#008BDC] hover:bg-[#0073B6] transition-all active:scale-[0.98] disabled:opacity-70">
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Access Dashboard"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HRLogin;
