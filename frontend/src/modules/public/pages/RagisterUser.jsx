import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signupUserWithEmail,
  loginWithGoogle,
} from "../../../app/services/auth/AuthService"; // Adjust path as needed
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Briefcase, // For generic logo
  // Google, // Uncomment if you have the Google icon from lucide-react
} from "lucide-react";

// You'd typically import your internal app branding from a central place
// For this example, it's defined here.
const INTERNAL_APP_BRANDING = {
  themeColor: "#008BDC", // Your app's primary blue
  backgroundColor: "#FFFFFF",
  surfaceColor: "#F8F9FA", // Light background for the page
  textColor: "#202124",
  headingColor: "#1F1F1F",
  mutedTextColor: "#5F6368",
  borderColor: "#DADCE0",
  borderRadius: "12px", // Slightly more rounded for app feel
  fontFamily: "'Inter', system-ui, sans-serif", // A modern app font
  name: "HRMastery", // Your app's name
  logo: null, // If your app has its own logo for auth pages
};

export default function CandidateRegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const emailInputRef = useRef(null);

  // Use fixed internal branding
  const branding = INTERNAL_APP_BRANDING;

  // Auto-focus on email field when component mounts
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const {
    themeColor,
    backgroundColor,
    headingColor,
    mutedTextColor,
    borderColor,
    borderRadius,
    fontFamily,
    name: appName,
    logo: appLogo,
  } = branding;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Client-side validation
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Hardcode role to 'candidate'
      await signupUserWithEmail(email, password, "candidate");
      alert(
        "Registration successful! Please check your email to verify your account.",
      );
      navigate("/login"); // Redirect to login after successful signup
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      // Hardcode role to 'candidate'
      await loginWithGoogle("candidate");
      navigate("/candidate/dashboard"); // Redirect to candidate dashboard
    } catch (err) {
      console.error("Google signup error:", err);
      setError(err.message || "Google registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    borderColor: borderColor,
    borderRadius: borderRadius,
    backgroundColor: backgroundColor,
    color: headingColor,
  };

  const primaryButtonStyle = {
    backgroundColor: themeColor,
    borderRadius: borderRadius,
  };

  const googleButtonStyle = {
    borderColor: borderColor,
    borderRadius: borderRadius,
    backgroundColor: backgroundColor,
    color: headingColor,
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8"
      style={{ fontFamily: fontFamily, background: branding.surfaceColor }}>
      <div
        className="w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300 flex flex-col items-center"
        style={{
          backgroundColor: backgroundColor,
          borderRadius: branding.borderRadius, // Use branding.borderRadius here
        }}>
        {/* Mobile Illustration Section - Always visible now, for candidate focus */}
        <div className="flex flex-col items-center mb-6 md:mb-8 text-center">
          <img
            src="https://static.licdn.com/aero-v1/sc/h/erpqui8q2h40xtierouep80bm"
            alt="Welcome Illustration"
            className="w-full max-w-[200px] h-auto object-contain mb-4" // Optimized size
          />
          <h2 className="text-xl font-bold" style={{ color: headingColor }}>
            Your Journey Starts Here
          </h2>
          <p className="text-sm mt-1" style={{ color: mutedTextColor }}>
            Create your free profile and unlock amazing opportunities.
          </p>
        </div>

        <div className="text-center mb-8 w-full">
          {appLogo ? (
            <img
              src={appLogo}
              alt={`${appName} Logo`}
              className="mx-auto h-10 w-auto object-contain mb-4"
            />
          ) : (
            <Briefcase
              size={40}
              className="mx-auto mb-4"
              style={{ color: themeColor }}
            />
          )}
          <h1
            className="text-2xl font-extrabold mb-2"
            style={{ color: headingColor }}>
            Join {appName}
          </h1>
          <p className="text-sm" style={{ color: mutedTextColor }}>
            Sign up in seconds, find a job for a lifetime.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 w-full">
          {error && (
            <div
              className="p-3 text-sm font-medium rounded-lg text-red-700 bg-red-50 border"
              style={{ borderColor: branding.borderColor }}>
              {error}
            </div>
          )}

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail size={20} style={{ color: mutedTextColor }} />
              </span>
              <input
                ref={emailInputRef}
                type="email"
                id="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border focus:ring-2 focus:ring-offset-0 focus:outline-none text-base"
                style={{
                  ...inputStyle,
                  borderColor: borderColor,
                  "--tw-ring-color": themeColor + "33",
                }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock size={20} style={{ color: mutedTextColor }} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-3 border focus:ring-2 focus:ring-offset-0 focus:outline-none text-base"
                style={{
                  ...inputStyle,
                  borderColor: borderColor,
                  "--tw-ring-color": themeColor + "33",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? (
                  <EyeOff size={20} style={{ color: mutedTextColor }} />
                ) : (
                  <Eye size={20} style={{ color: mutedTextColor }} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock size={20} style={{ color: mutedTextColor }} />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-3 border focus:ring-2 focus:ring-offset-0 focus:outline-none text-base"
                style={{
                  ...inputStyle,
                  borderColor: borderColor,
                  "--tw-ring-color": themeColor + "33",
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }>
                {showConfirmPassword ? (
                  <EyeOff size={20} style={{ color: mutedTextColor }} />
                ) : (
                  <Eye size={20} style={{ color: mutedTextColor }} />
                )}
              </button>
            </div>
          </div>

          {/* Terms and Privacy Policy (Placeholder) */}
          <p
            className="text-xs text-center px-2"
            style={{ color: mutedTextColor }}>
            By registering, you agree to our{" "}
            <Link
              to="/terms"
              className="hover:underline"
              style={{ color: themeColor }}>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="hover:underline"
              style={{ color: themeColor }}>
              Privacy Policy
            </Link>
            .
          </p>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3.5 flex items-center justify-center font-bold text-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
            style={primaryButtonStyle}
            disabled={loading}>
            {loading ? (
              <Loader2 className="animate-spin mr-2" size={24} />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="relative flex items-center justify-center my-6 w-full">
          <div
            className="flex-grow border-t"
            style={{ borderColor: branding.borderColor }}
          />
          <span
            className="flex-shrink mx-4 text-sm"
            style={{ color: mutedTextColor }}>
            OR
          </span>
          <div
            className="flex-grow border-t"
            style={{ borderColor: branding.borderColor }}
          />
        </div>

        {/* Google Sign-up Button */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full py-3.5 flex items-center justify-center gap-3 font-semibold text-lg border shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 focus:outline-none"
          style={googleButtonStyle}
          disabled={loading}>
          {/* <Google size={20} className="text-blue-500" /> */}{" "}
          {/* Uncomment and ensure Google icon is imported if available */}
          <img
            src="https://www.svgrepo.com/show/303109/google-logo.svg"
            alt="Google logo"
            className="h-5 w-5"
          />{" "}
          {/* Fallback Google icon */}
          Sign up with Google
        </button>

        {/* Login Link */}
        <p
          className="text-center text-sm mt-8"
          style={{ color: mutedTextColor }}>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 rounded-md"
            style={{ color: themeColor }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
