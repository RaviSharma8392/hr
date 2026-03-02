import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginWithEmail,
  loginWithGoogle,
  signupUserWithEmail, // Import the signup function
} from "../../services/auth.service";
import { useAuth } from "../../../../context/AuthContext";

import {
  Briefcase,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  User, // Added for candidate specific icon/text
} from "lucide-react";

const CandidateAuthPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Form State for both login and signup
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "", // For signup
    lastName: "", // For signup
  });

  // UI States for Error & Loading
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // State to toggle between Login and Signup forms
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* Email Login */
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const user = await loginWithEmail(form.email, form.password);
      login(user);

      // Redirect logic for candidate
      if (user.role === "candidate") {
        navigate("/candidate/dashboard"); // Or wherever candidate dashboard is
      } else {
        // If a non-candidate logs in via this page
        setError(
          "You do not have candidate privileges. Please use the correct login page.",
        );
        // Optionally, log out the user if they're not supposed to be here
        // useAuth().logout();
        navigate("/unauthorized"); // Or redirect to a generic dashboard / unauthorized page
      }
    } catch (err) {
      setError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* Email Signup */
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const user = await signupUserWithEmail(
        form.email,
        form.password,
        "candidate", // Explicitly set role to 'candidate'
        { firstName: form.firstName, lastName: form.lastName }, // Additional data
      );
      login(user); // Update context
      navigate("/candidate/onboarding"); // Redirect to candidate onboarding or dashboard
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* Google Login/Signup */
  const handleGoogleAuth = async () => {
    setError("");
    setIsLoading(true);
    try {
      const user = await loginWithGoogle(); // This handles both login and new signup

      // After Google auth, we need to ensure the user has the 'candidate' role.
      // If a new Google user, our auth.service.js defaults to 'candidate'.
      // If an existing Google user, their role from Firestore will be loaded.
      if (user.role === "candidate" || user.role === "unknown") {
        // 'unknown' might mean new user awaiting full profile
        login(user);
        navigate("/candidate/dashboard");
      } else {
        setError(
          "Your account does not have candidate access. Please use the correct login page.",
        );
        // useAuth().logout(); // Logout if not the right role for this specific login page
        navigate("/unauthorized"); // Or a generic dashboard
      }
    } catch (err) {
      setError(err.message || "Google authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex font-sans bg-[#F5F5F6]">
      {/* LEFT PANEL - Branding & Value Prop */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#282C3F] relative flex-col justify-between p-12 overflow-hidden">
        {/* Decorative Background Accents */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#FF3F6C] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>

        {/* Top: Logo */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="bg-[#FF3F6C] p-2 rounded-sm text-white">
            <Briefcase className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black text-white tracking-tight">
            JobBoard<span className="text-[#FF3F6C]">.</span>{" "}
            {/* Renamed for candidate context */}
          </span>
        </div>

        {/* Middle: Value Proposition */}
        <div className="relative z-10 max-w-md mt-20">
          <h1 className="text-4xl xl:text-5xl font-black text-white mb-6 uppercase tracking-tight leading-[1.1]">
            Find Your Next <br />
            <span className="text-[#FF3F6C]">Opportunity.</span>
          </h1>
          <p className="text-[#8A8D9F] text-lg font-medium leading-relaxed mb-8">
            Discover thousands of jobs, connect with top companies, and land
            your dream role with our intuitive platform.
          </p>

          <div className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-widest">
            <ShieldCheck className="w-5 h-5 text-[#FF3F6C]" />
            Secure & Private Applications
          </div>
        </div>

        {/* Bottom: Testimonial/Trust */}
        <div className="relative z-10 border-t border-gray-700 pt-8 mt-20">
          <p className="text-[#8A8D9F] italic mb-4">
            "JobBoard helped me find a fantastic role in just a few weeks. The
            process was seamless and straightforward!"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
              <img
                src="https://ui-avatars.com/api/?name=John+Doe&background=FF3F6C&color=fff"
                alt="User"
              />
            </div>
            <div>
              <div className="text-white text-sm font-bold uppercase tracking-wider">
                John Doe
              </div>
              <div className="text-[#8A8D9F] text-xs">
                Senior Software Engineer, TechCorp
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Login/Signup Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-12 xl:px-24 bg-white relative">
        {/* Mobile Logo (Visible only on small screens) */}
        <div className="lg:hidden absolute top-8 left-6 flex items-center gap-2">
          <span className="text-xl font-black text-[#282C3F] tracking-tight">
            JobBoard<span className="text-[#FF3F6C]">.</span>
          </span>
        </div>

        <div className="w-full max-w-md">
          {/* Header */}
          <div className="md:grid hidden mb-10">
            <h2 className="text-3xl font-black text-[#282C3F] uppercase tracking-tight mb-2">
              {isLoginMode ? "Welcome Back" : "Join JobBoard"}
            </h2>
            <p className="text-[#535766] font-medium text-sm">
              {isLoginMode
                ? "Log in to your candidate account."
                : "Create your candidate profile to get started."}
            </p>
          </div>

          {/* 🚨 ERROR BANNER */}
          {error && (
            <div className="mb-6 bg-[#FFF0F4] border border-[#FF3F6C]/30 p-4 rounded-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle className="w-5 h-5 text-[#FF3F6C] shrink-0 mt-0.5" />
              <p className="text-xs font-bold text-[#FF3F6C] uppercase tracking-wider leading-relaxed">
                {error}
              </p>
            </div>
          )}

          <form
            className="space-y-6"
            onSubmit={isLoginMode ? handleLoginSubmit : handleSignupSubmit}>
            {/* First Name & Last Name (only for signup) */}
            {!isLoginMode && (
              <>
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-xs font-bold text-[#282C3F] uppercase tracking-widest mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={form.firstName}
                    onChange={handleChange}
                    required={!isLoginMode}
                    placeholder="John"
                    className="block w-full px-4 py-3.5 bg-[#F5F5F6] border border-transparent rounded-sm text-[#282C3F] text-sm font-medium placeholder-[#8A8D9F] focus:outline-none focus:border-[#FF3F6C] focus:bg-white focus:ring-1 focus:ring-[#FF3F6C] transition-colors duration-200"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-xs font-bold text-[#282C3F] uppercase tracking-widest mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={form.lastName}
                    onChange={handleChange}
                    required={!isLoginMode}
                    placeholder="Doe"
                    className="block w-full px-4 py-3.5 bg-[#F5F5F6] border border-transparent rounded-sm text-[#282C3F] text-sm font-medium placeholder-[#8A8D9F] focus:outline-none focus:border-[#FF3F6C] focus:bg-white focus:ring-1 focus:ring-[#FF3F6C] transition-colors duration-200"
                  />
                </div>
              </>
            )}

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-[#282C3F] uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                autoComplete={isLoginMode ? "email" : "new-email"}
                required
                placeholder="you@example.com"
                className="block w-full px-4 py-3.5 bg-[#F5F5F6] border border-transparent rounded-sm text-[#282C3F] text-sm font-medium placeholder-[#8A8D9F] focus:outline-none focus:border-[#FF3F6C] focus:bg-white focus:ring-1 focus:ring-[#FF3F6C] transition-colors duration-200"
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold text-[#282C3F] uppercase tracking-widest">
                  Password
                </label>
                {isLoginMode && ( // Only show forgot password in login mode
                  <a
                    href="/forgot-password"
                    className="text-xs font-bold text-[#535766] hover:text-[#FF3F6C] transition-colors">
                    FORGOT PASSWORD?
                  </a>
                )}
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                autoComplete={isLoginMode ? "current-password" : "new-password"}
                required
                placeholder="••••••••"
                className="block w-full px-4 py-3.5 bg-[#F5F5F6] border border-transparent rounded-sm text-[#282C3F] text-sm font-medium placeholder-[#8A8D9F] focus:outline-none focus:border-[#FF3F6C] focus:bg-white focus:ring-1 focus:ring-[#FF3F6C] transition-colors duration-200"
              />
            </div>

            {isLoginMode && ( // Only show remember me in login mode
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#FF3F6C] focus:ring-[#FF3F6C] border-gray-300 rounded-sm cursor-pointer accent-[#FF3F6C]"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-xs font-bold text-[#535766] uppercase tracking-wider cursor-pointer">
                  Remember me for 30 days
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-sm text-sm font-bold tracking-widest uppercase text-white bg-[#FF3F6C] hover:bg-[#E0355F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF3F6C] transition-all duration-200 shadow-sm hover:shadow-md group disabled:opacity-70 disabled:cursor-not-allowed">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isLoginMode ? "Authenticating..." : "Creating Account..."}
                </>
              ) : (
                <>
                  {isLoginMode ? "Log In to Account" : "Create My Account"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 mb-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-white text-[#8A8D9F] font-bold uppercase tracking-widest">
                Or Continue With
              </span>
            </div>
          </div>

          {/* Google SSO Button */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border-2 border-gray-200 rounded-sm text-xs font-bold uppercase tracking-widest text-[#282C3F] bg-white hover:border-[#282C3F] transition-all duration-200">
            <svg
              className="h-4 w-4"
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
            Google
          </button>

          {/* Toggle between Login and Signup */}
          <p className="mt-10 text-center text-xs font-bold text-[#535766] uppercase tracking-wider">
            {isLoginMode
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-[#FF3F6C] hover:text-[#E0355F] transition-colors ml-1 focus:outline-none">
              {isLoginMode ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CandidateAuthPage;
