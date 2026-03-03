import React, { useState } from "react";

const CompanyFreeTrial = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Trial Account Created:", formData);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex bg-[#FCFCFD] font-sans text-[#161621] selection:bg-[#DCDCE5]">
      {/* LEFT COLUMN: Value Proposition & Marketing (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-5/12 bg-[#161621] text-[#F4F4F9] flex-col justify-between p-12 xl:p-16">
        <div>
          {/* Logo */}
          <div className="text-2xl font-serif tracking-tight mb-16 text-white">
            Nexus HRM
          </div>

          <h1 className="text-4xl xl:text-5xl font-serif font-normal leading-[1.15] mb-6">
            Experience the future of HR management.
          </h1>
          <p className="text-[#A0A0B2] text-lg font-light mb-12 max-w-md leading-relaxed">
            Join thousands of forward-thinking companies that use Nexus to
            automate payroll, track attendance, and grow their teams.
          </p>

          {/* Feature Checklist */}
          <div className="space-y-5">
            {[
              "Full access to all Enterprise features",
              "Unlimited employee onboarding",
              "Automated payroll & tax compliance",
              "24/7 priority customer support",
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 text-[15px] font-medium text-[#DCDCE5]">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2C2C3D] flex items-center justify-center text-white">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="pt-12 border-t border-[#2C2C3D] mt-12">
          <blockquote className="text-[15px] text-[#DCDCE5] italic leading-relaxed mb-4">
            "We moved from a messy spreadsheet system to Nexus in just two days.
            It has completely transformed how our HR team operates."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2C2C3D] border border-[#5A5A6B]"></div>
            <div>
              <div className="text-sm font-semibold text-white">
                Sarah Jenkins
              </div>
              <div className="text-xs text-[#A0A0B2]">
                VP of People, GlobalTech
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Signup Form */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-6 sm:p-12 xl:p-20 overflow-y-auto">
        <div className="w-full max-w-[480px]">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-serif font-normal text-[#161621] tracking-tight mb-3">
              Start your 14-day free trial
            </h2>
            <p className="text-[15px] text-[#5A5A6B] font-light">
              No credit card required. Setup takes less than 2 minutes.
            </p>
          </div>

          {/* Google SSO */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-[#DCDCE5] rounded-xl text-[15px] font-medium text-[#161621] bg-transparent hover:border-[#B2B2C2] hover:bg-[#F4F4F9] transition-all duration-200 mb-6">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
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

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#DCDCE5]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-[#FCFCFD] text-[#6B6B8A] font-light">
                Or sign up with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#161621] mb-1.5">
                  Full name
                </label>
                <input
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 bg-transparent border border-[#DCDCE5] rounded-xl text-[#161621] text-[15px] placeholder-[#A0A0B2] focus:outline-none focus:border-[#161621] focus:ring-1 focus:ring-[#161621] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#161621] mb-1.5">
                  Company name
                </label>
                <input
                  name="companyName"
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Acme Corp"
                  className="w-full px-4 py-3 bg-transparent border border-[#DCDCE5] rounded-xl text-[#161621] text-[15px] placeholder-[#A0A0B2] focus:outline-none focus:border-[#161621] focus:ring-1 focus:ring-[#161621] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#161621] mb-1.5">
                Work email
              </label>
              <input
                name="workEmail"
                type="email"
                required
                value={formData.workEmail}
                onChange={handleChange}
                placeholder="jane@company.com"
                className="w-full px-4 py-3 bg-transparent border border-[#DCDCE5] rounded-xl text-[#161621] text-[15px] placeholder-[#A0A0B2] focus:outline-none focus:border-[#161621] focus:ring-1 focus:ring-[#161621] transition-colors"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-[#161621] mb-1.5">
                Password
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-transparent border border-[#DCDCE5] rounded-xl text-[#161621] text-[15px] placeholder-[#A0A0B2] focus:outline-none focus:border-[#161621] focus:ring-1 focus:ring-[#161621] transition-colors pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-[#A0A0B2] hover:text-[#161621] transition-colors">
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-full text-[15px] font-medium text-[#F4F4F9] bg-[#161621] hover:bg-[#2C2C3D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#161621] transition-colors duration-200 disabled:opacity-70">
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  "Start your free trial"
                )}
              </button>
            </div>

            <p className="text-xs text-center text-[#6B6B8A] mt-4">
              By starting your trial, you agree to our{" "}
              <a href="#" className="underline hover:text-[#161621]">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline hover:text-[#161621]">
                Privacy Policy
              </a>
              .
            </p>
          </form>

          <p className="mt-8 text-center text-[15px] text-[#5A5A6B]">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-[#161621] hover:underline decoration-[#DCDCE5] underline-offset-4 transition-all duration-200">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyFreeTrial;
