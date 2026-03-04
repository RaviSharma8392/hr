import { useNavigate } from "react-router-dom";

export default function MobileWelcomeScreen() {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    navigate(`/${role}/register`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-5 pt-8 pb-6">
      {/* Logo */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-[#008BDC]">HRMastery</h1>
      </div>

      {/* Illustration (Smaller + Cleaner) */}
      <div className="flex justify-center mb-8">
        <svg width="220" height="160" viewBox="0 0 400 300">
          <circle cx="200" cy="150" r="110" fill="#008BDC" opacity="0.05" />

          {/* Screen */}
          <rect
            x="130"
            y="80"
            width="140"
            height="70"
            rx="12"
            fill="#fff"
            stroke="#E5E7EB"
          />
          <rect
            x="150"
            y="100"
            width="100"
            height="10"
            rx="5"
            fill="#008BDC"
            opacity="0.4"
          />
          <rect
            x="150"
            y="120"
            width="70"
            height="8"
            rx="4"
            fill="#008BDC"
            opacity="0.2"
          />

          {/* Person */}
          <circle cx="200" cy="185" r="25" fill="#008BDC" />
          <rect
            x="175"
            y="210"
            width="50"
            height="40"
            rx="12"
            fill="#008BDC"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* Heading */}
      <h2 className="text-xl font-bold text-gray-900 text-center">
        Connect Talent & Opportunity
      </h2>

      <p className="text-gray-500 text-center text-sm mt-2 mb-8 px-4">
        Smart hiring platform for recruiters and job seekers.
      </p>

      {/* Primary Button */}
      <button
        onClick={() => handleSelect("hr")}
        className="w-full bg-[#008BDC] text-white py-3.5 rounded-full font-medium shadow-sm active:scale-95 transition">
        Continue as HR
      </button>

      {/* Secondary Button */}
      <button
        onClick={() => handleSelect("candidate")}
        className="w-full mt-3 py-3.5 rounded-full border border-gray-300 font-medium text-gray-800 active:scale-95 transition">
        Continue as Job Seeker
      </button>

      {/* Footer */}
      <div className="mt-auto text-center text-sm text-gray-400 pt-8">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-[#008BDC] font-medium">
          Sign in
        </button>
      </div>
    </div>
  );
}
