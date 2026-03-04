import React, { useState } from "react";
import {
  loginWithEmail,
  loginWithGoogle,
} from "../../services/auth/AuthService";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Loader2, Briefcase, ChevronLeft, AlertCircle } from "lucide-react";

export default function LoginMobile() {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ FIXED

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

  /* ================= FORM CHANGE ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  /* ================= ROUTING ================= */
  const routeUserBasedOnRole = (user) => {
    if (user?.role === "hr") {
      navigate("/hr/dashboard");
    } else if (user?.role === "candidate") {
      navigate("/candidate/dashboard");
    } else if (user?.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  /* ================= GOOGLE LOGIN ================= */
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

  /* ================= EMAIL LOGIN ================= */
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

  /* ================= UI ================= */
  return (
    <div className="flex flex-col h-dvh bg-white font-sans overflow-hidden">
      {/* HEADER */}
      {/* <div className="flex items-center justify-between px-4 h-16 pt-safe border-b border-gray-100 shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-gray-600 hover:text-gray-900 active:bg-gray-100 rounded-md transition-colors">
          <ChevronLeft size={28} strokeWidth={2} />
        </button>

        <div className="flex items-center gap-1.5 font-bold text-[17px] text-gray-900">
          <Briefcase size={18} className="text-[#008BDC]" strokeWidth={2.5} />
          HRMastery
        </div>

        <div className="w-12" />
      </div> */}

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-safe">
        <div className="mb-8">
          <h1 className="text-[26px] font-semibold text-gray-900 tracking-tight leading-tight mb-2">
            Welcome back
          </h1>
          <p className="text-[15px] text-gray-600">
            Sign in to access your HRMastery account.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
            <p className="text-[14px] font-medium text-red-800 leading-snug">
              {error}
            </p>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* EMAIL */}
          <div>
            <label className="block text-[14px] font-semibold text-gray-800 mb-1.5">
              Email address
            </label>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full h-12 px-4 bg-white border border-gray-400 rounded-md text-[16px] text-gray-900 transition-all focus:outline-none hover:border-gray-600 focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC]"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-[14px] font-semibold text-gray-800 mb-1.5">
              Password
            </label>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                className="w-full h-12 pl-4 pr-16 bg-white border border-gray-400 rounded-md text-[16px] text-gray-900 transition-all focus:outline-none hover:border-gray-600 focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[14px] font-semibold text-[#008BDC] hover:bg-blue-50 px-2 py-1.5 rounded transition-colors">
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="flex justify-end mt-3">
              <Link
                to="/forgot-password"
                className="text-[14px] font-semibold text-[#008BDC] hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 mt-2 bg-[#008BDC] hover:bg-[#0073B6] text-white rounded-full font-semibold text-[16px] transition-colors duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? <Loader2 className="animate-spin w-6 h-6" /> : "Sign in"}
          </button>

          {/* DIVIDER */}
          <div className="flex items-center w-full my-3">
            <div className="flex-grow border-t border-gray-200" />
            <span className="mx-4 text-[13px] text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-200" />
          </div>

          {/* GOOGLE LOGIN */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex items-center justify-center w-full h-14 bg-white border border-gray-400 hover:border-gray-600 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            {/* Corrected Google SVG */}
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
            Sign in with Google
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-10 text-center text-[15px] text-gray-600 pb-6">
          New to HRMastery?{" "}
          <Link
            to={`/register/${role}`}
            className="text-[#008BDC] font-semibold hover:underline">
            Join now
          </Link>
        </div>
      </div>
    </div>
  );
}
