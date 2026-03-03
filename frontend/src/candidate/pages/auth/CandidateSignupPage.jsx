import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signupUserWithEmail,
  loginWithGoogle,
} from "../../../services/auth/AuthService";
import {
  Briefcase,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

const CandidateSignupPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    currentStatus: "student",
    preferredRole: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ================= EMAIL SIGNUP ================= */
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signupUserWithEmail(
        form.email,
        form.password,
        "candidate", // 🔐 force role
        {
          firstName: form.firstName,
          lastName: form.lastName,
          currentStatus: form.currentStatus,
          preferredRole: form.preferredRole,
        },
      );

      // Redirect after Firebase auth listener updates state
      navigate("/candidate/onboarding", { replace: true });
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= GOOGLE SIGNUP ================= */
  const handleGoogleAuth = async () => {
    setError("");
    setIsLoading(true);

    try {
      const user = await loginWithGoogle();

      // 🔐 STRICT CHECK
      if (user.role !== "candidate") {
        throw new Error(
          "This Google account is not registered as a candidate.",
        );
      }

      navigate("/candidate/onboarding", { replace: true });
    } catch (err) {
      setError(err.message || "Google authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle =
    "w-full px-4 py-3.5 bg-[#F8F9FA] border border-[#DDD] rounded-lg text-[#212121] text-[15px] font-medium placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC] transition-all";

  const labelStyle =
    "block text-[12px] font-bold text-[#484848] mb-1.5 uppercase tracking-wider";

  return (
    <div className="min-h-screen bg-white md:bg-[#F8F9FA] flex flex-col justify-center items-center px-4 py-8 font-sans pb-safe">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 mb-6 hover:opacity-90 transition-opacity">
        <div className="bg-[#008BDC] p-1.5 rounded-md text-white shadow-sm">
          <Briefcase className="w-6 h-6" />
        </div>
        <span className="text-2xl font-black text-[#212121] tracking-tight">
          HRMastery<span className="text-[#008BDC]">.</span>
        </span>
      </Link>

      <div className="bg-white w-full max-w-[480px] md:rounded-2xl md:border border-[#EEE] md:shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-2 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-[#212121] mb-2">
            Create an account
          </h1>
          <p className="text-[14px] text-gray-500 font-medium">
            Find jobs, build your resume, and get hired.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-[13px] font-semibold text-red-700">{error}</p>
          </div>
        )}

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border-2 border-[#EEE] rounded-lg text-[14px] font-bold text-[#484848] bg-white hover:bg-[#F8F9FA] transition-all shadow-sm">
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

        {/* Form */}
        <form onSubmit={handleSignupSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>First Name *</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                placeholder="John"
                className={inputStyle}
              />
            </div>
            <div>
              <label className={labelStyle}>Last Name *</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
                className={inputStyle}
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Password *</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength="6"
                placeholder="At least 6 characters"
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

          <div>
            <label className={labelStyle}>Preferred Role</label>
            <input
              name="preferredRole"
              value={form.preferredRole}
              onChange={handleChange}
              placeholder="Frontend Developer, Marketing Intern"
              className={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-lg font-bold text-white bg-[#008BDC] hover:bg-[#0073B6] transition-all shadow-sm">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>

      <p className="mt-8 text-center text-[14px] font-medium text-gray-500">
        Already have an account?{" "}
        <Link
          to="/candidate/login"
          className="text-[#008BDC] font-bold hover:underline">
          Log in
        </Link>
      </p>

      <style
        dangerouslySetInnerHTML={{
          __html: `.pb-safe { padding-bottom: max(2rem, env(safe-area-inset-bottom)); }`,
        }}
      />
    </div>
  );
};

export default CandidateSignupPage;
