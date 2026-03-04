import React from "react";

export default function MobileStep0({
  handleGoogleSignup,
  nextStep,
  loading,
  navigate,
}) {
  return (
    <div className="flex flex-col h-full font-sans">
      <div className="flex-1 flex flex-col justify-center items-center px-4">
        {/* Illustration */}
        <div className="w-full max-w-xs mb-8">
          <div className="relative h-44 flex items-center justify-center bg-blue-50 rounded-3xl">
            {/* Building SVG */}
            <div className="w-24 h-24 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 21H21"
                  stroke="#008BDC"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6 21V9L12 4L18 9V21"
                  stroke="#008BDC"
                  strokeWidth="2"
                />
                <path d="M10 21V17H14V21" stroke="#008BDC" strokeWidth="2" />
              </svg>
            </div>

            {/* Users SVG */}
            <div className="absolute bottom-3 left-6 w-12 h-12 bg-white rounded-full border border-gray-100 shadow-sm flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#059669" strokeWidth="2" />
                <path
                  d="M4 21C5.5 17 18.5 17 20 21"
                  stroke="#059669"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Hiring SVG */}
            <div className="absolute top-4 right-6 w-12 h-12 bg-white rounded-full border border-gray-100 shadow-sm flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 7H21" stroke="#2563eb" strokeWidth="2" />
                <rect
                  x="5"
                  y="5"
                  width="14"
                  height="14"
                  rx="2"
                  stroke="#2563eb"
                  strokeWidth="2"
                />
                <path d="M9 11H15" stroke="#2563eb" strokeWidth="2" />
              </svg>
            </div>

            {/* Job SVG */}
            <div className="absolute -bottom-4 right-10 w-12 h-12 bg-white rounded-full border border-gray-100 shadow-md flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 7H20V21H4V7Z" stroke="#7c3aed" strokeWidth="2" />
                <path d="M9 7V5H15V7" stroke="#7c3aed" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-[26px] font-semibold text-gray-900 text-center mb-3">
          Build your dream team
        </h1>

        <p className="text-[15px] text-gray-600 text-center max-w-[280px] mb-8 leading-relaxed">
          Create employer account to post jobs, manage candidates and grow your
          organization.
        </p>

        {/* Google Button */}
        <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className="flex items-center justify-center w-full h-14 bg-white border border-gray-300 text-gray-700 font-semibold rounded-full mb-5">
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77z"
            />
            <path fill="#FBBC05" d="M5.84 14.09V7.07H2.18z" />
            <path fill="#EA4335" d="M12 5.38l7.36-3.15z" />
          </svg>

          {loading ? "Connecting..." : "Continue with Google"}
        </button>

        {/* Divider */}
        <div className="flex items-center w-full mb-5">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-4 text-sm text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        {/* Email Button */}
        <button
          onClick={nextStep}
          className="w-full h-14 bg-[#008BDC] text-white font-semibold rounded-full">
          Sign up with Email
        </button>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 py-6">
        Already on HRMastery?{" "}
        <button
          onClick={() => navigate("/hr/login")}
          className="text-[#008BDC] font-semibold">
          Sign in
        </button>
      </div>
    </div>
  );
}
