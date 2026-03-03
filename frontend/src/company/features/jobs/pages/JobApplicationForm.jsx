import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  MapPin,
  Building2,
  Briefcase,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Lock,
} from "lucide-react";

import { JobService } from "../../../../hr/services/job.service";
import ApplicationStepper from "../../application/components/ApplicationStepper";
import ApplicationStep1 from "../../application/components/ApplicationStep1";
import ApplicationStep2 from "../../application/components/ApplicationStep2";
import ApplicationStep3 from "../../application/components/ApplicationStep3";

export default function InternshalaJobApplication() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // Wizard State
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Resume State
  const [resume, setResume] = useState(null);

  // Comprehensive Form State (Matching Step 1, 2, and 3)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    dob: "",
    gender: "Male",
    experience: "",
    expectedSalary: "",
    noticePeriod: "Immediate",
    skills: "",
    linkedin: "",
    portfolio: "",
    coverLetter: "",
    consent: false,
  });

  const [customAnswers, setCustomAnswers] = useState({});

  useEffect(() => {
    const loadJob = async () => {
      const res = await JobService.getJobById(id);
      if (res.success) {
        setJob(res);
        if (res.screeningQuestions?.length) {
          const ans = {};
          res.screeningQuestions.forEach((_, i) => {
            ans[i] = "";
          });
          setCustomAnswers(ans);
        }
      }
      setLoading(false);
    };
    loadJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errorMsg) setErrorMsg("");
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Resume size must be under 5MB");
      return;
    }
    setResume(file);
    if (errorMsg) setErrorMsg("");
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (
        !formData.firstName ||
        !formData.email ||
        !formData.phone ||
        !formData.location
      ) {
        setErrorMsg("Please fill all required personal details");
        return;
      }
    }
    if (currentStep === 2 && !resume) {
      setErrorMsg("Please upload your resume to continue");
      return;
    }
    setErrorMsg("");
    setCurrentStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setErrorMsg("");
    setCurrentStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitApplication = () => {
    if (!formData.consent) {
      setErrorMsg("Please agree to the terms and conditions");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/jobs/success");
    }, 1500);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-[#008BDC] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#484848]">
      {/* 1. INTERNSHALA TOP NAV */}
      <nav className="bg-white border-b border-[#EEE] sticky top-0 z-50 h-16 flex items-center shadow-sm">
        <div className="max-w-6xl mx-auto w-full px-4 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-[#008BDC] font-semibold hover:text-[#0073B6] transition-colors">
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2 text-[12px] font-bold text-gray-400 uppercase tracking-widest">
            <Lock size={14} className="mb-0.5" />
            <span>Secure Application</span>
          </div>
        </div>
      </nav>

      {/* 2. PAGE CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-12 gap-8">
        {/* LEFT SIDEBAR: Stepper & Job Info */}
        <aside className="lg:col-span-4 hidden lg:block space-y-6">
          {/* Job Summary Card */}
          <div className="bg-white p-6 rounded-lg border border-[#EEE] shadow-sm">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              Applying for
            </p>
            <h1 className="text-xl font-bold text-[#212121] leading-tight mb-2">
              {job?.title}
            </h1>
            <p className="text-[#008BDC] font-semibold mb-6">
              {job?.company?.name}
            </p>

            <div className="space-y-3 pt-4 border-t border-[#F5F5F5] text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" /> {job?.location}
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-gray-400" />{" "}
                {job?.employmentType || "Full-time"}
              </div>
            </div>
          </div>

          <ApplicationStepper currentStep={currentStep} />
        </aside>

        {/* MAIN FORM AREA */}
        <main className="lg:col-span-8">
          {/* MOBILE ONLY: Progress Header */}
          <div className="lg:hidden mb-6 bg-white p-5 rounded-lg border border-[#EEE] shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-bold text-[#212121]">
                  {job?.title}
                </h2>
                <p className="text-sm text-[#008BDC] font-semibold">
                  {job?.company?.name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  Step {currentStep}/3
                </p>
              </div>
            </div>
            <div className="w-full bg-[#EEE] h-1.5 rounded-full">
              <div
                className="bg-[#008BDC] h-full rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* DYNAMIC ERROR MESSAGE */}
          {errorMsg && (
            <div className="mb-4 bg-red-50 border border-red-100 p-4 rounded-lg flex items-center gap-3 text-red-600 text-sm font-semibold">
              <AlertCircle size={18} />
              {errorMsg}
            </div>
          )}

          {/* MAIN CARD CONTAINER */}
          <div className="bg-white border border-[#EEE] rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="p-6 sm:p-10">
              {currentStep === 1 && (
                <ApplicationStep1
                  formData={formData}
                  handleChange={handleChange}
                />
              )}
              {currentStep === 2 && (
                <ApplicationStep2
                  formData={formData}
                  handleChange={handleChange}
                  resume={resume}
                  handleResumeUpload={handleResumeUpload}
                  removeResume={() => setResume(null)}
                />
              )}
              {currentStep === 3 && (
                <ApplicationStep3
                  job={job}
                  formData={formData}
                  handleChange={handleChange}
                  customAnswers={customAnswers}
                  handleCustomAnswerChange={(i, v) =>
                    setCustomAnswers((prev) => ({ ...prev, [i]: v }))
                  }
                />
              )}
            </div>

            {/* DESKTOP NAVIGATION BAR */}
            <div className="hidden sm:flex items-center justify-between p-6 bg-[#F8F9FA] border-t border-[#EEE]">
              {currentStep > 1 ? (
                <button
                  onClick={prevStep}
                  className="px-6 py-2.5 text-[#484848] font-bold text-sm hover:text-black transition-all">
                  <ArrowLeft className="w-4 h-4 inline mr-1" /> Previous
                </button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  className="bg-[#008BDC] hover:bg-[#0073B6] text-white px-10 py-2.5 rounded font-bold text-sm shadow-sm transition-all flex items-center gap-2">
                  Next Step <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  onClick={submitApplication}
                  disabled={isSubmitting}
                  className="bg-[#008BDC] hover:bg-[#0073B6] text-white px-12 py-2.5 rounded font-bold text-sm shadow-md transition-all disabled:opacity-50">
                  {isSubmitting
                    ? "Submitting Application..."
                    : "Submit Application"}
                </button>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* 3. MOBILE STICKY FOOTER */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#EEE] p-4 z-50 flex gap-3 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] pb-safe">
        {currentStep > 1 && (
          <button
            onClick={prevStep}
            className="w-14 h-12 border border-[#DDD] rounded-lg text-gray-500 flex items-center justify-center bg-white active:bg-gray-50 transition-all">
            <ArrowLeft size={22} />
          </button>
        )}
        <button
          onClick={currentStep < 3 ? nextStep : submitApplication}
          disabled={isSubmitting}
          className="flex-1 bg-[#008BDC] text-white h-12 rounded-lg font-bold text-[15px] shadow-sm active:scale-[0.98] transition-all disabled:opacity-50">
          {isSubmitting
            ? "Sending..."
            : currentStep < 3
              ? "Proceed Next"
              : "Submit Now"}
        </button>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .pb-safe { padding-bottom: max(1rem, env(safe-area-inset-bottom)); }
        
        /* Internshala Clean Input Styles */
        .form-input {
          width: 100%;
          border: 1px solid #DDD;
          border-radius: 4px;
          padding: 10px 12px;
          font-size: 14px;
          color: #484848;
          transition: border 0.2s ease;
          background: #FFF;
        }
        .form-input:focus {
          border-color: #008BDC;
          outline: none;
          box-shadow: 0 0 0 1px #008BDC;
        }
        .form-input::placeholder {
          color: #AAA;
        }
      `,
        }}
      />
    </div>
  );
}
