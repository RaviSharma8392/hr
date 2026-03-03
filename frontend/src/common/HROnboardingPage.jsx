import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUserWithEmail } from "../services/auth/AuthService";

import { Briefcase, Loader2, ArrowRight } from "lucide-react";

export default function HROnboardingPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    phone: "",
    companyName: "",
    location: "",
    about: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signupUserWithEmail(
        form.email,
        form.password,
        "hr", // 🔐 strict role
        {
          firstName: form.firstName,
          lastName: form.lastName,
          designation: form.designation,
          phone: form.phone,
          companyName: form.companyName,
          location: form.location,
          about: form.about,
        },
      );

      navigate("/hr", { replace: true });
    } catch (err) {
      setError(err.message || "Failed to create HR account.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008BDC] focus:border-[#008BDC] transition";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e8f3ff] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden grid md:grid-cols-2">
        {/* LEFT DESIGN */}
        <div className="bg-[#008BDC] text-white p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase size={28} />
            <h1 className="text-2xl font-bold">HRMastery</h1>
          </div>

          <h2 className="text-3xl font-extrabold mb-4">
            Create Your HR Account
          </h2>

          <p className="text-sm opacity-90 leading-relaxed">
            Start posting jobs, manage candidates, and grow your organization
            with a powerful hiring system.
          </p>
        </div>

        {/* FORM */}
        <div className="p-8 md:p-10">
          <h3 className="text-xl font-bold mb-6 text-gray-800">
            HR Registration
          </h3>

          {error && (
            <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                name="firstName"
                placeholder="First Name"
                required
                value={form.firstName}
                onChange={handleChange}
                className={inputStyle}
              />
              <input
                name="lastName"
                placeholder="Last Name"
                required
                value={form.lastName}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <input
              name="designation"
              placeholder="Designation"
              required
              value={form.designation}
              onChange={handleChange}
              className={inputStyle}
            />

            <input
              name="phone"
              placeholder="Phone Number"
              required
              value={form.phone}
              onChange={handleChange}
              className={inputStyle}
            />

            <input
              name="companyName"
              placeholder="Company Name"
              required
              value={form.companyName}
              onChange={handleChange}
              className={inputStyle}
            />

            <input
              name="location"
              placeholder="Company Location"
              required
              value={form.location}
              onChange={handleChange}
              className={inputStyle}
            />

            <textarea
              name="about"
              rows="3"
              placeholder="About Company"
              required
              value={form.about}
              onChange={handleChange}
              className={inputStyle}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={handleChange}
              className={inputStyle}
            />

            <input
              type="password"
              name="password"
              placeholder="Create Password (min 6 characters)"
              required
              minLength={6}
              value={form.password}
              onChange={handleChange}
              className={inputStyle}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#008BDC] hover:bg-[#0073B6] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition">
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create HR Account <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-[#008BDC] font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
