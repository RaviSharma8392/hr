import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUserWithEmail, loginWithGoogle } from "../services/AuthService";
import { useAuth } from "../context/AuthContext";
import {
  Briefcase,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

const CandidateSignupPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    currentStatus: "student", // default Internshala audience
    preferredRole: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const user = await signupUserWithEmail(
        form.email,
        form.password,
        "candidate",
        {
          firstName: form.firstName,
          lastName: form.lastName,
          currentStatus: form.currentStatus,
          preferredRole: form.preferredRole,
        },
      );
      login(user);
      navigate("/candidate/onboarding"); // Route to build their resume
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
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
        navigate("/candidate/onboarding");
      } else {
        setError("Your account does not have candidate access.");
      }
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
    <div className="min-h-screen bg-white md:bg-[#F8F9FA] flex flex-col justify-center items-center px-4 py-8 font-sans selection:bg-blue-100 selection:text-[#008BDC] pb-safe">
      {/* Brand Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 mb-6 sm:mb-8 hover:opacity-90 transition-opacity">
        <div className="bg-[#008BDC] p-1.5 rounded-md text-white shadow-sm">
          <Briefcase className="w-6 h-6" />
        </div>
        <span className="text-2xl font-black text-[#212121] tracking-tight">
          HRMastery<span className="text-[#008BDC]">.</span>
        </span>
      </Link>

      {/* Signup Card / Mobile Full Screen */}
      <div className="bg-white w-full max-w-[480px] md:rounded-2xl md:border border-[#EEE] md:shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-2 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-[#212121] mb-2 tracking-tight">
            Create an account
          </h1>
          <p className="text-[14px] text-gray-500 font-medium">
            Find jobs, build your resume, and get hired.
          </p>
        </div>

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
          className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border-2 border-[#EEE] rounded-lg text-[14px] font-bold text-[#484848] bg-white hover:bg-[#F8F9FA] hover:border-[#DDD] transition-all duration-200 shadow-sm active:scale-95">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign up with Google
        </button>

        <div className="flex items-center my-7">
          <div className="flex-1 border-t border-[#EEE]"></div>
          <span className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Or sign up with email
          </span>
          <div className="flex-1 border-t border-[#EEE]"></div>
        </div>

        <form onSubmit={handleSignupSubmit} className="space-y-5">
          {/* Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className={labelStyle}>
                First Name *
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
                required
                placeholder="John"
                className={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="lastName" className={labelStyle}>
                Last Name *
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
                className={inputStyle}
              />
            </div>
          </div>

          {/* Email Row */}
          <div>
            <label htmlFor="email" className={labelStyle}>
              Email Address *
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

          {/* Password Row with Native Reveal Toggle */}
          <div>
            <label htmlFor="password" className={labelStyle}>
              Password *
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                required
                placeholder="At least 6 characters"
                minLength="6"
                className={`${inputStyle} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#008BDC] focus:outline-none">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Job Platform Specifics: Current Status & Preferred Role */}
          <div className="pt-2 pb-2 border-t border-[#EEE] mt-2">
            <label className={labelStyle}>I am currently a... *</label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <label
                className={`flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition-all font-bold text-[13px] ${form.currentStatus === "student" ? "border-[#008BDC] bg-blue-50/50 text-[#008BDC]" : "border-[#EEE] text-[#484848] hover:bg-[#F8F9FA]"}`}>
                <input
                  type="radio"
                  name="currentStatus"
                  value="student"
                  checked={form.currentStatus === "student"}
                  onChange={handleChange}
                  className="sr-only"
                />
                {form.currentStatus === "student" && <CheckCircle2 size={16} />}{" "}
                College Student
              </label>
              <label
                className={`flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition-all font-bold text-[13px] ${form.currentStatus === "professional" ? "border-[#008BDC] bg-blue-50/50 text-[#008BDC]" : "border-[#EEE] text-[#484848] hover:bg-[#F8F9FA]"}`}>
                <input
                  type="radio"
                  name="currentStatus"
                  value="professional"
                  checked={form.currentStatus === "professional"}
                  onChange={handleChange}
                  className="sr-only"
                />
                {form.currentStatus === "professional" && (
                  <CheckCircle2 size={16} />
                )}{" "}
                Professional
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="preferredRole" className={labelStyle}>
              What role are you looking for?
            </label>
            <input
              id="preferredRole"
              name="preferredRole"
              type="text"
              value={form.preferredRole}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer, Marketing Intern"
              className={inputStyle}
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-lg text-[15px] font-bold text-white bg-[#008BDC] hover:bg-[#0073B6] shadow-[0_4px_14px_rgba(0,139,220,0.3)] transition-all active:scale-[0.98] disabled:opacity-70 disabled:shadow-none">
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
            <p className="text-[11px] text-gray-400 text-center leading-tight mt-4 font-medium">
              By signing up, you agree to our{" "}
              <a
                href="/terms"
                className="text-gray-500 underline hover:text-[#008BDC]">
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="text-gray-500 underline hover:text-[#008BDC]">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </form>
      </div>

      {/* Login Redirect */}
      <p className="mt-8 text-center text-[14px] font-medium text-gray-500 pb-8">
        Already have an account?{" "}
        <Link
          to="/candidate/login"
          className="text-[#008BDC] font-bold hover:underline">
          Log in
        </Link>
      </p>

      {/* Native App Safe Area padding */}
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

export default CandidateSignupPage;
