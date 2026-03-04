import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signupUserWithEmail,
  loginWithGoogle,
} from "../../../../app/services/auth/AuthService";

import MobileStep0 from "../../components/hrRegisterSteps/MobileStep0";
import MobileStep1 from "../../components/hrRegisterSteps/MobileStep1";
import MobileStep2 from "../../components/hrRegisterSteps/MobileStep2";
import MobileStep3 from "../../components/hrRegisterSteps/MobileStep3";

import { ChevronLeft, Briefcase } from "lucide-react";

export default function HRRegisterMobile() {
  const navigate = useNavigate();

  const ROLE = "hr";

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    companyName: "",
    companySize: "",
  });

  /* -------------------- Helpers -------------------- */

  const routeToDashboard = () => {
    navigate("/hr/dashboard");
  };

  const validateStep1 = () => {
    if (!form.fullName.trim()) return "Full name is required.";

    if (!form.email.trim()) return "Email is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return "Invalid email format.";

    if (!form.password) return "Password is required.";

    if (form.password.length < 6)
      return "Password must be at least 6 characters.";

    return null;
  };

  const validateStep2 = () => {
    if (!form.companyName.trim()) return "Company name is required.";
    if (!form.companySize) return "Company size is required.";
    return null;
  };

  /* -------------------- Handlers -------------------- */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    setError("");

    if (step === 1) {
      const validationError = validateStep1();
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    if (step === 2) {
      const validationError = validateStep2();
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setStep((prev) => prev - 1);
  };

  /* -------------------- Google Signup -------------------- */

  const handleGoogleSignup = async () => {
    if (loading) return;

    try {
      setLoading(true);
      setError("");

      const user = await loginWithGoogle(ROLE);

      if (user.role !== ROLE) {
        throw new Error(`This Google account is registered as ${user.role}.`);
      }

      routeToDashboard();
    } catch (err) {
      setError(err.message || "Google signup failed.");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- Email Signup -------------------- */

  const handleSubmit = async () => {
    if (loading) return;

    const validationError = validateStep1() || validateStep2();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      await signupUserWithEmail(form.email.trim(), form.password, ROLE, {
        fullName: form.fullName.trim(),
        companyName: form.companyName.trim(),
        companySize: form.companySize,
      });

      routeToDashboard();
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- Render Step -------------------- */

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <MobileStep0
            handleGoogleSignup={handleGoogleSignup}
            nextStep={nextStep}
            loading={loading}
            navigate={navigate}
          />
        );

      case 1:
        return (
          <MobileStep1
            form={form}
            handleChange={handleChange}
            nextStep={nextStep}
            error={error}
            setError={setError}
          />
        );

      case 2:
        return (
          <MobileStep2
            form={form}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
            error={error}
            setError={setError}
          />
        );

      case 3:
        return (
          <MobileStep3
            form={form}
            handleSubmit={handleSubmit}
            prevStep={prevStep}
            loading={loading}
            error={error}
          />
        );

      default:
        return null;
    }
  };

  const progressPercentage = step === 0 ? 0 : (step / 3) * 100;

  return (
    <div className="flex flex-col h-[100dvh] bg-white font-sans overflow-hidden">
      {/* HEADER */}
      <div className="relative z-20 bg-white pt-safe border-b border-gray-100">
        <div className="flex items-center justify-between px-3 h-[56px]">
          <div className="w-12 flex justify-start">
            <button
              onClick={step > 0 ? prevStep : () => navigate("/")}
              className="p-2 -ml-1 text-gray-600 hover:text-gray-900 active:bg-gray-100 rounded-md transition-colors"
              aria-label="Go back">
              <ChevronLeft size={28} strokeWidth={2} />
            </button>
          </div>

          <h2 className="text-[17px] font-semibold text-gray-900 tracking-tight flex items-center justify-center gap-1.5 flex-1">
            {step === 0 && (
              <>
                <Briefcase
                  size={18}
                  className="text-[#008BDC]"
                  strokeWidth={2.5}
                />
                HRMastery
              </>
            )}
            {step === 1 && "Create your account"}
            {step === 2 && "Company details"}
            {step === 3 && "Almost done"}
          </h2>

          <div className="w-12 flex justify-end text-[13px] font-semibold text-gray-500 pr-2">
            {step > 0 && `${step} / 3`}
          </div>
        </div>

        {step > 0 && (
          <div className="w-full h-1 bg-gray-100">
            <div
              className="h-full bg-[#008BDC] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white">
        <div
          key={step}
          className="px-5 pb-safe pt-4 animate-in slide-in-from-right-8 fade-in duration-300 ease-out fill-mode-both min-h-full">
          {renderStep()}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .pt-safe { padding-top: max(0.5rem, env(safe-area-inset-top)); }
          .pb-safe { padding-bottom: max(2rem, env(safe-area-inset-bottom)); }
        `,
        }}
      />
    </div>
  );
}
