// src/pages/auth/HRRegisterDesktop.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUserWithEmail } from "../../../services/auth/AuthService"; // Adjust path as needed
import {
  Chrome,
  Mail,
  Lock,
  Building2,
  UsersRound,
  ArrowRight,
} from "lucide-react"; // Icons

export default function HRRegisterDesktop() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    companySize: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGoogleSignup = () => {
    // Implement Google OAuth logic here
    console.log("Signing up with Google...");
    alert("Google Sign-up not implemented yet!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signupUserWithEmail(form.email, form.password, "hr", {
        fullName: form.fullName,
        companyName: form.companyName,
        companySize: form.companySize,
      });
      navigate("/hr/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            HRMastery<span className="text-blue-600">.</span>
          </h1>
          <p className="text-gray-600 text-lg mt-2">Create Your HR Account</p>
        </div>

        {/* Social Sign-up */}
        <button
          onClick={handleGoogleSignup}
          className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl shadow-sm hover:bg-gray-50 transition-colors duration-200 mb-6">
          <Chrome size={20} className="mr-3" />
          Sign up with Google
        </button>

        <div className="flex items-center mb-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">
            Or continue with email
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="John Doe"
                value={form.fullName}
                onChange={handleChange}
                required
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1">
              Work Email
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="your.email@company.com"
                value={form.email}
                onChange={handleChange}
                required
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <div className="relative">
              <Building2
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="companyName"
                id="companyName"
                placeholder="Acme Corp"
                value={form.companyName}
                onChange={handleChange}
                required
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="companySize"
              className="block text-sm font-medium text-gray-700 mb-1">
              Company Size
            </label>
            <div className="relative">
              <UsersRound
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <select
                name="companySize"
                id="companySize"
                value={form.companySize}
                onChange={handleChange}
                required
                className="input-field pl-10 appearance-none" // Add appearance-none for custom arrow
              >
                <option value="" disabled>
                  Select company size
                </option>
                <option value="1-10">1-10 Employees</option>
                <option value="11-50">11-50 Employees</option>
                <option value="51-200">51-200 Employees</option>
                <option value="200+">200+ Employees</option>
              </select>
              <ArrowRight
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center mt-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
            {loading ? "Creating Account..." : "Create HR Account"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-8">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/hr/login")}
            className="text-blue-600 font-medium cursor-pointer hover:underline">
            Sign In
          </span>
        </div>
      </div>

      {/* Reusable Styles for Desktop */}
      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #d1d5db; /* gray-300 */
          border-radius: 12px;
          outline: none;
          background-color: #fff;
          transition:
            border-color 0.2s,
            box-shadow 0.2s;
        }
        .input-field:focus {
          border-color: #2563eb; /* blue-600 */
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3); /* blue-600 with opacity */
        }
      `}</style>
    </div>
  );
}
