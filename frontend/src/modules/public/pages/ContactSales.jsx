import React, { useState } from "react";
import { Link } from "react-router-dom";
// Import your initialized Firestore instance (adjust the path as needed)
import { db } from "../../services/firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import {
  Briefcase,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Users,
  Globe,
  AlertCircle,
  Loader2,
} from "lucide-react";

const ContactSales = () => {
  // Form State
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    companySize: "",
    role: "",
    message: "",
  });

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const inquiriesRef = collection(db, "inquiries");
      await addDoc(inquiriesRef, {
        ...form,
        status: "new",
        createdAt: serverTimestamp(),
      });

      setIsSuccess(true);
    } catch (err) {
      console.error("Error adding document: ", err);
      setError(
        "Failed to send your request. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- STYLES ---
  const inputStyle =
    "w-full px-4 py-3 bg-[#F8F9FA] border border-[#DDD] rounded-lg text-[#212121] text-[14px] font-medium placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC] transition-all";
  const labelStyle =
    "block text-[12px] font-bold text-[#484848] mb-1.5 uppercase tracking-wider";

  return (
    <div className="min-h-screen w-full flex font-sans bg-white md:bg-[#F8F9FA] lg:bg-white">
      {/* ========================================================= */}
      {/* LEFT PANEL - Sales/Demo Value Prop (Hidden on Mobile) */}
      {/* ========================================================= */}
      <div className="hidden lg:flex lg:w-5/12 bg-[#0F172A] relative flex-col justify-between p-12 xl:p-16 overflow-hidden">
        {/* Decorative Background Accents */}
        <div className="absolute top-0 left-0 -ml-20 -mt-20 w-96 h-96 bg-[#008BDC] opacity-20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 bg-blue-400 opacity-10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top: Logo */}
        <Link
          to="/"
          className="relative z-10 flex items-center gap-2 hover:opacity-90 transition-opacity w-max">
          <div className="bg-[#008BDC] p-2 rounded-md text-white shadow-lg shadow-blue-500/20">
            <Briefcase className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black text-white tracking-tight">
            HRMastery<span className="text-[#008BDC]">.</span>
          </span>
        </Link>

        {/* Middle: Value Proposition */}
        <div className="relative z-10 max-w-md mt-12">
          <h1 className="text-4xl xl:text-5xl font-black text-white mb-6 tracking-tight leading-[1.1]">
            See The Platform <br />
            <span className="text-[#008BDC]">In Action.</span>
          </h1>
          <p className="text-gray-400 text-lg font-medium leading-relaxed mb-10">
            Discover how top companies use HRMastery to scale their hiring,
            automate onboarding, and engage their workforce.
          </p>

          {/* Feature List */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-[#1E293B] p-3 rounded-lg text-[#008BDC] border border-gray-800 shadow-sm">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white text-[14px] font-bold tracking-wide mb-1">
                  Global Reach
                </h3>
                <p className="text-gray-400 text-[13px] leading-relaxed">
                  Source and hire talent from anywhere in the world with
                  localized compliance.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#1E293B] p-3 rounded-lg text-[#008BDC] border border-gray-800 shadow-sm">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white text-[14px] font-bold tracking-wide mb-1">
                  Talent Acquisition
                </h3>
                <p className="text-gray-400 text-[13px] leading-relaxed">
                  Track and hire the best candidates with our intuitive
                  Applicant Tracking System.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#1E293B] p-3 rounded-lg text-[#008BDC] border border-gray-800 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white text-[14px] font-bold tracking-wide mb-1">
                  Enterprise Security
                </h3>
                <p className="text-gray-400 text-[13px] leading-relaxed">
                  Bank-level encryption, SOC 2 compliance, and custom role-based
                  access control.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Trust Marker */}
        <div className="relative z-10 pt-12 mt-12 border-t border-gray-800">
          <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-4">
            Trusted by modern teams
          </p>
          <div className="flex items-center gap-6 opacity-40 grayscale">
            <span className="text-lg font-black text-white uppercase tracking-wider">
              Acme Corp
            </span>
            <span className="text-lg font-black text-white uppercase tracking-wider">
              GlobalTech
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT PANEL - Contact Form */}
      {/* ========================================================= */}
      <div className="w-full lg:w-7/12 flex flex-col justify-center items-center px-4 sm:px-12 py-12 relative overflow-y-auto pb-safe">
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-6 left-6 sm:top-8 sm:left-8">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90">
            <div className="bg-[#008BDC] p-1.5 rounded-md text-white shadow-sm">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-[#212121] tracking-tight">
              HRMastery<span className="text-[#008BDC]">.</span>
            </span>
          </Link>
        </div>

        <div className="w-full max-w-xl mt-12 lg:mt-0 bg-white md:bg-transparent lg:bg-white md:rounded-2xl lg:rounded-none md:border lg:border-none border-[#EEE] md:shadow-[0_8px_40px_rgba(0,0,0,0.04)] lg:shadow-none p-4 sm:p-10 lg:p-0">
          {isSuccess ? (
            /* SUCCESS STATE */
            <div className="bg-[#F8F9FA] border border-[#EEE] p-10 rounded-xl text-center animate-in fade-in zoom-in-95 duration-500 shadow-sm">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-[#008BDC]" />
              </div>
              <h2 className="text-2xl font-black text-[#212121] mb-3 tracking-tight">
                Request Received!
              </h2>
              <p className="text-gray-500 font-medium leading-relaxed max-w-sm mx-auto mb-8 text-[15px]">
                Thank you, {form.firstName}. Our enterprise team has received
                your details and will reach out to{" "}
                <strong className="text-[#212121]">{form.email}</strong> within
                24 hours to schedule your personalized demo.
              </p>
              <button
                onClick={() => {
                  setForm({
                    firstName: "",
                    lastName: "",
                    email: "",
                    companyName: "",
                    companySize: "",
                    role: "",
                    message: "",
                  });
                  setIsSuccess(false);
                }}
                className="inline-flex items-center justify-center px-8 py-3 text-[13px] font-bold text-[#484848] bg-white border border-[#DDD] rounded-lg hover:border-[#008BDC] hover:text-[#008BDC] transition-all shadow-sm active:scale-95">
                Submit Another Request
              </button>
            </div>
          ) : (
            /* FORM STATE */
            <>
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-black text-[#212121] tracking-tight mb-2">
                  Talk to our Sales Team
                </h2>
                <p className="text-gray-500 font-medium text-[15px]">
                  Fill out the form below and an expert will get in touch to
                  schedule a personalized walkthrough.
                </p>
              </div>

              {/* 🚨 ERROR BANNER */}
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-[13px] font-semibold text-red-700 leading-relaxed">
                    {error}
                  </p>
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Grid: First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="firstName" className={labelStyle}>
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Jane"
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
                      required
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className={inputStyle}
                    />
                  </div>
                </div>

                {/* Work Email */}
                <div>
                  <label htmlFor="email" className={labelStyle}>
                    Work Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@yourcompany.com"
                    className={inputStyle}
                  />
                </div>

                {/* Grid: Company Name & Company Size */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="companyName" className={labelStyle}>
                      Company Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Building2 className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        required
                        value={form.companyName}
                        onChange={handleChange}
                        placeholder="Acme Corp"
                        className={`${inputStyle} pl-10`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="companySize" className={labelStyle}>
                      Company Size *
                    </label>
                    <select
                      id="companySize"
                      name="companySize"
                      required
                      value={form.companySize}
                      onChange={handleChange}
                      className={`${inputStyle} cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238A8D9F%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[right_16px_center] bg-no-repeat pr-10`}>
                      <option value="" disabled>
                        Select size...
                      </option>
                      <option value="1-10">1 - 10 employees</option>
                      <option value="11-50">11 - 50 employees</option>
                      <option value="51-200">51 - 200 employees</option>
                      <option value="201-500">201 - 500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                  </div>
                </div>

                {/* Job Role */}
                <div>
                  <label htmlFor="role" className={labelStyle}>
                    Your Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    value={form.role}
                    onChange={handleChange}
                    className={`${inputStyle} cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238A8D9F%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[right_16px_center] bg-no-repeat pr-10`}>
                    <option value="" disabled>
                      Select your function...
                    </option>
                    <option value="HR Admin / Manager">
                      HR Admin / HR Manager
                    </option>
                    <option value="VP / Director of HR">
                      VP / Director of HR
                    </option>
                    <option value="Founder / CEO">Founder / CEO</option>
                    <option value="IT / Operations">IT / Operations</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={labelStyle}>
                    How can we help? (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your current hiring challenges..."
                    className={`${inputStyle} resize-y`}></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-lg text-[15px] font-bold text-white bg-[#008BDC] hover:bg-[#0073B6] shadow-[0_4px_14px_rgba(0,139,220,0.3)] transition-all active:scale-[0.98] disabled:opacity-70 disabled:shadow-none">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Submitting
                        Request...
                      </>
                    ) : (
                      <>
                        <ArrowRight className="w-5 h-5" /> Request Demo
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] font-medium text-gray-400 mt-4">
                    By submitting this form, you agree to our{" "}
                    <Link
                      to="/privacy"
                      className="underline hover:text-[#008BDC]">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Safe area padding for mobile */}
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

export default ContactSales;
