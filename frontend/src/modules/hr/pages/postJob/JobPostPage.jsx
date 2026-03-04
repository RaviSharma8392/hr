import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ADDED useParams
import { defaultJobForm } from "../../schema/job.schema";
import { JobService } from "../../services/hrJobService";
import {
  ChevronLeft,
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Save,
  Loader2,
} from "lucide-react";

import StepBasicInfo from "../../components/post-job/StepBasicInfo";
import StepContent from "../../components/post-job/StepContent";
import StepCompensation from "../../components/post-job/StepCompensation";
import StepScreening from "../../components/post-job/StepScreening";
import StepApplication from "../../components/post-job/StepApplication";
import StepReview from "../../components/post-job/StepReview";
import Stepper from "../../components/post-job/Stepper";
import Notification from "../../../../shared/components/Notification";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../../app/services/firebase/firebase";

const JobPostPage = () => {
  const navigate = useNavigate();

  // === EDIT MODE DETECTION ===
  const { jobId } = useParams();
  const isEditing = Boolean(jobId);

  const TOTAL_STEPS = 6;

  // Step Titles for Mobile Header Context
  const stepTitles = {
    1: "Basic Details",
    2: "Job Content",
    3: "Compensation",
    4: "Screening Questions",
    5: "Application Flow",
    6: "Review & Publish",
  };

  const [step, setStep] = useState(1);
  const [form, setForm] = useState(() => ({ ...defaultJobForm }));
  const [loading, setLoading] = useState(false);
  const [initialFetchLoading, setInitialFetchLoading] = useState(isEditing); // True if we need to load old data
  const [notification, setNotification] = useState({ type: "", message: "" });

  const companyData = {
    id: "company123",
    name: "Nexus Systems Inc.",
    logo: "NX",
    verified: true,
  };

  // Check Firebase Connection
  const checkConnection = async () => {
    try {
      const snapshot = await getDocs(collection(db, "jobs"));
      console.log("Firebase working. Documents:", snapshot.size);
    } catch (error) {
      console.error("Firebase error:", error.message);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  // === FETCH EXISTING DATA IF EDITING ===
  useEffect(() => {
    const fetchExistingJob = async () => {
      try {
        const response = await JobService.getJobById(jobId);
        if (response.success && response.data) {
          // Merge default structure with fetched data to prevent missing field errors
          setForm({ ...defaultJobForm, ...response.data });
        } else {
          setNotification({
            type: "error",
            message: "Failed to load job data.",
          });
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        setNotification({
          type: "error",
          message: "Error loading job details.",
        });
      } finally {
        setInitialFetchLoading(false);
      }
    };

    if (isEditing) {
      fetchExistingJob();
    }
  }, [jobId, isEditing]);

  // Scroll to top instantly on mobile, smoothly on desktop when step changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: window.innerWidth < 768 ? "instant" : "smooth",
    });
  }, [step]);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // === DYNAMIC SUBMIT HANDLER ===
  const handleSubmit = async () => {
    setLoading(true);
    try {
      let response;

      if (isEditing) {
        // UPDATE EXISTING JOB
        response = await JobService.updateJob(jobId, form);
      } else {
        // CREATE NEW JOB
        response = await JobService.createJob(form, companyData);
      }

      if (response.success) {
        setNotification({
          type: "success",
          message: isEditing
            ? "Job updated successfully! 🛠️"
            : "Job published successfully! 🚀",
        });
        setTimeout(() => navigate("/hr/jobs"), 2000); // Redirect after success
      } else {
        setNotification({
          type: "error",
          message:
            response.message ||
            `Failed to ${isEditing ? "update" : "publish"} job.`,
        });
      }
    } catch (error) {
      console.error("JobPostPage Submit Error:", error);
      setNotification({
        type: "error",
        message: "Unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // === LOADING SCREEN (PREVENTS EMPTY FORM FLASH) ===
  if (initialFetchLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#F8F9FA] gap-4">
        <Loader2 className="w-10 h-10 text-[#008BDC] animate-spin" />
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest animate-pulse">
          Loading Job Data...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#484848] pb-24 md:pb-12 selection:bg-blue-100 selection:text-[#008BDC]">
      <Notification
        type={notification.type}
        message={notification.message}
        onClose={() => setNotification({ type: "", message: "" })}
      />

      {/* ================= NATIVE APP-STYLE HEADER ================= */}
      <div className="bg-white sticky top-0 z-50 shadow-sm transition-all">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-4 h-14">
          <button
            onClick={() => (step === 1 ? navigate(-1) : prevStep())}
            className="p-2 -ml-2 text-gray-500 hover:text-[#212121] transition-colors">
            {step === 1 ? <X size={24} /> : <ChevronLeft size={24} />}
          </button>

          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Step {step} of {TOTAL_STEPS}
            </span>
            <span className="text-sm font-bold text-[#212121]">
              {stepTitles[step]}
            </span>
          </div>

          <button
            onClick={handleSubmit}
            type="button"
            aria-label="Save changes"
            className="
    p-2
    text-[#008BDC]
    hover:bg-blue-50
    active:scale-95
    rounded-full
    transition-all
    duration-200
    focus:outline-none
    focus:ring-2
    focus:ring-blue-300
  ">
            <Save size={20} />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex max-w-5xl mx-auto px-6 h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-[#008BDC] font-semibold hover:text-[#0073B6] transition-colors">
              <ChevronLeft size={20} /> Back to Dashboard
            </button>
            <div className="w-px h-6 bg-[#EEE]"></div>
            <h1 className="text-lg font-bold text-[#212121]">
              {isEditing ? "Edit Job Requisition" : "Create Job Requisition"}
            </h1>
          </div>
          <button
            onClick={handleSubmit}
            type="button"
            className="
    flex items-center gap-2
    px-3 py-2
    text-sm font-semibold
    text-gray-500
    hover:text-[#008BDC]
    hover:bg-blue-50
    rounded-lg
    transition-all duration-200
    focus:outline-none
    focus:ring-2 focus:ring-blue-200
  ">
            <Save size={16} />
            Save as Draft
          </button>
        </div>

        {/* Thin App-Style Progress Bar */}
        <div className="h-[2px] bg-gray-100 w-full relative">
          <div
            className="absolute top-0 left-0 h-full bg-[#008BDC] transition-all duration-500 ease-out rounded-r-full"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-5xl mx-auto md:px-6  md:pt-8">
        {/* Desktop Stepper (Hidden on Mobile for App Feel) */}
        <div className="hidden md:block mb-8">
          <Stepper step={step} setStep={setStep} totalSteps={TOTAL_STEPS} />
        </div>

        {/* Form Container */}
        <div className="bg-white md:border md:border-[#EEE] md:rounded-xl md:shadow-[0_2px_10px_rgba(0,0,0,0.02)] min-h-[60vh] relative overflow-hidden">
          <div
            key={step}
            className="p-5 sm:p-8 animate-in slide-in-from-right-8 fade-in duration-300">
            {step === 1 && <StepBasicInfo form={form} setForm={setForm} />}
            {step === 2 && <StepContent form={form} setForm={setForm} />}
            {step === 3 && <StepCompensation form={form} setForm={setForm} />}
            {step === 4 && <StepScreening form={form} setForm={setForm} />}
            {step === 5 && <StepApplication form={form} setForm={setForm} />}
            {step === 6 && (
              <StepReview
                form={form}
                onPublish={handleSubmit}
                loading={loading}
                isEditing={isEditing}
              />
            )}
          </div>

          {/* DESKTOP Action Bar (Inside the card) */}
          <div className="hidden md:flex items-center justify-between p-6 sm:px-8 border-t border-[#EEE] bg-[#F8F9FA]">
            <button
              onClick={prevStep}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-semibold text-sm transition-all ${
                step === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-[#484848] hover:text-[#008BDC] hover:bg-white border border-transparent hover:border-[#008BDC]"
              }`}
              disabled={step === 1}>
              <ArrowLeft size={16} /> Previous
            </button>

            {step < TOTAL_STEPS ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-8 py-2.5 bg-[#008BDC] text-white rounded-md font-bold text-sm hover:bg-[#0073B6] shadow-sm transition-all active:scale-95">
                Next Step <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-10 py-2.5 bg-[#10b981] text-white rounded-md font-bold text-sm hover:bg-[#0ea5e9] shadow-sm transition-all active:scale-95 disabled:opacity-70">
                {loading ? (
                  isEditing ? (
                    "Saving..."
                  ) : (
                    "Publishing..."
                  )
                ) : (
                  <>
                    {isEditing ? "Save Changes" : "Publish Job"}{" "}
                    <Check size={18} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= MOBILE BOTTOM ACTION BAR ================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#EEE] p-4 z-50 flex gap-3 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] pb-safe">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="w-14 h-12 flex items-center justify-center border border-[#DDD] text-gray-600 rounded-lg active:bg-gray-50 transition-colors">
            <ArrowLeft size={20} />
          </button>
        )}

        {step < TOTAL_STEPS ? (
          <button
            onClick={nextStep}
            className="flex-1 h-12 bg-[#008BDC] text-white rounded-lg font-bold text-[15px] shadow-sm active:bg-[#0073B6] transition-colors flex items-center justify-center gap-2">
            Continue <ArrowRight size={18} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 h-12 bg-[#10b981] text-white rounded-lg font-bold text-[15px] shadow-sm active:bg-[#0ea5e9] transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
            {loading
              ? isEditing
                ? "Saving..."
                : "Publishing..."
              : isEditing
                ? "Save Changes"
                : "Publish Job"}
          </button>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .pb-safe { padding-bottom: max(1rem, env(safe-area-inset-bottom)); }
      `,
        }}
      />
    </div>
  );
};

export default JobPostPage;
