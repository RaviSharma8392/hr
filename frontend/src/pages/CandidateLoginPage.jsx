import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginWithEmail, loginWithGoogle } from "../services/AuthService";
import { useAuth } from "../context/AuthContext";
import { Briefcase, AlertCircle, Loader2 } from "lucide-react";

const CandidateLoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const user = await loginWithEmail(form.email, form.password);
      login(user);
      if (user.role === "candidate") {
        navigate("/candidate/dashboard");
      } else {
        setError(
          "You do not have candidate privileges. Please use the employer portal.",
        );
        navigate("/unauthorized");
      }
    } catch (err) {
      setError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError("");
    setIsLoading(true);
    try {
      const user = await loginWithGoogle();
      if (user.role === "candidate" || user.role === "unknown") {
        login(user);
        navigate("/candidate/dashboard");
      } else {
        setError("Your account does not have candidate access.");
      }
    } catch (err) {
      setError(err.message || "Google authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle =
    "w-full px-4 py-3 bg-white border border-[#DDD] rounded-md text-[#212121] text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC] transition-all";
  const labelStyle = "block text-[13px] font-bold text-[#484848] mb-1.5";

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center items-center px-4 font-sans selection:bg-blue-100 selection:text-[#008BDC]">
      {/* Brand Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 mb-8 hover:opacity-90 transition-opacity">
        <div className="bg-[#008BDC] p-1.5 rounded-md text-white">
          <Briefcase className="w-6 h-6" />
        </div>
        <span className="text-2xl font-black text-[#212121] tracking-tight">
          HRMastery<span className="text-[#008BDC]">.</span>
        </span>
      </Link>

      {/* Login Card */}
      <div className="bg-white w-full max-w-[440px] rounded-xl border border-[#EEE] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#212121] mb-2">
            Welcome back
          </h1>
          <p className="text-[14px] text-gray-500">
            Log in to track your applications.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-md flex items-start gap-3">
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
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-[#DDD] rounded-md text-[14px] font-bold text-[#484848] bg-white hover:bg-[#F8F9FA] hover:border-gray-300 transition-all duration-200 shadow-sm">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-[#EEE]"></div>
          <span className="px-4 text-[12px] font-semibold text-gray-400 uppercase tracking-widest">
            Or
          </span>
          <div className="flex-1 border-t border-[#EEE]"></div>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-5">
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
              required
              placeholder="you@example.com"
              className={inputStyle}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-[13px] font-bold text-[#484848]">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-[12px] font-bold text-[#008BDC] hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-md text-[15px] font-bold text-white bg-[#008BDC] hover:bg-[#0073B6] focus:ring-2 focus:ring-offset-2 focus:ring-[#008BDC] transition-all shadow-sm active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Log In"
            )}
          </button>
        </form>

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
  );
};

export default CandidateLoginPage;
