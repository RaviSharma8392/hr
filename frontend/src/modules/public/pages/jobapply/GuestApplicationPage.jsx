const PAGE_BRANDING = {
  themeColor: "#0A66C2", // LinkedIn Blue

  themeColorLight: "#E8F3FF",

  backgroundColor: "#FFFFFF",

  surfaceColor: "#F3F4F6", // Professional gray background

  textColor: "#374151",

  headingColor: "#111827",

  mutedTextColor: "#6B7280",

  borderColor: "#E5E7EB",

  borderRadius: "8px",

  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",

  dangerColor: "#EF4444",

  successColor: "#057642",
};
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../app/context/AuthContext";

import CandidateForm from "../public/CandidateForm";
import { CandidateService } from "../../services/jobApply/candidateJobApplyService";
import { jobDetailService } from "../../services/jobDetail/jobDetailService";

import {
  Loader2,
  ChevronLeft,
  Briefcase,
  MapPin,
  Building2,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function CandidateApplicationPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { jobId, jobSlug, mode } = useParams();

  /* ---------------- STATE ---------------- */
  const [job, setJob] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const [form, setForm] = useState({
    name: user?.displayName || user?.name || "",
    email: user?.email || "",
    mobileNumber: "",
    resume: "",
    skills: [],
    experienceLevel: "",
    education: "",
    coverLetter: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState("");
  const [answers, setAnswers] = useState([]);

  /* ---------------- BRANDING ---------------- */
  const {
    themeColor,
    surfaceColor,
    borderColor,
    headingColor,
    mutedTextColor,
    fontFamily,
    dangerColor,
  } = PAGE_BRANDING;

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    const loadJob = async () => {
      try {
        const res = await jobDetailService.getJobById(jobId);
        if (res?.success) setJob(res.data);
      } catch (err) {
        console.error("Job load error:", err);
      } finally {
        setLoadingJob(false);
      }
    };
    loadJob();
  }, [jobId]);

  // Track scroll for the progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mode) navigate(`/apply/${jobId}/${jobSlug}/form`, { replace: true });
    if (user && user.role !== "candidate") navigate("/candidate/login");
  }, [user, mode, navigate, jobId, jobSlug]);

  /* ---------------- HANDLERS ---------------- */
  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!job || loading) return;

    setLoading(true);
    setSubmitError("");

    try {
      let finalResumeUrl = form.resume;

      // Step 1: Handle Resume (Mocked for now)
      if (resumeFile) {
        const uploadRes = await CandidateService.uploadResume(
          user ? user.uid : `guest_${Date.now()}`,
          resumeFile,
        );
        if (!uploadRes.success) throw new Error(uploadRes.message);
        finalResumeUrl = uploadRes.url;
      }

      if (!finalResumeUrl) throw new Error("Resume is required.");

      // Step 2: Prepare the unified data object
      const applicationData = {
        ...form, // Name, Email, Phone, Skills, Education, etc.
        resume: finalResumeUrl,
        answers, // Screening answers
        jobId,
        jobTitle: job.title,
        companyId: job.company?.id || "unknown",
        userId: user?.uid || `guest_${Date.now()}`,
        applicationType: user ? "member" : "guest",
      };

      // Step 3: SINGLE API CALL
      // We use a combined key (UserID_JobID) to prevent duplicate applications
      const applicationId = user
        ? `${user.uid}_${jobId}`
        : `guest_${Date.now()}`;
      const response = await CandidateService.applyJobApplication(
        applicationId,
        applicationData,
      );

      if (response.success) {
        navigate(
          user
            ? "/application/success"
            : `/apply/${jobId}/${jobSlug}/guest-success`,
        );
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setSubmitError(
        err.message || "Failed to submit. Please check your connection.",
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- RENDER HELPERS ---------------- */
  if (loadingJob) {
    return (
      <div
        className="min-h-[100dvh] flex flex-col justify-center items-center bg-white"
        style={{ fontFamily }}>
        <Loader2
          className="w-12 h-12 animate-spin mb-4"
          style={{ color: themeColor }}
        />
        <p
          className="text-[16px] font-bold animate-pulse"
          style={{ color: headingColor }}>
          Securing Connection...
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-[100dvh] flex flex-col antialiased bg-white md:bg-gray-50"
      style={{ fontFamily }}>
      {/* --- 1. PROGRESS NAV (Mobile & Desktop App Header) --- */}
      <nav
        className="sticky top-0 z-50 bg-white border-b shadow-sm pt-safe"
        style={{ borderColor }}>
        <div className="max-w-[800px] mx-auto px-3 sm:px-6 h-[60px] md:h-[70px] flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-1.5 p-2 -ml-2 text-[15px] font-bold transition-all active:opacity-50"
            style={{ color: mutedTextColor }}>
            <ChevronLeft
              size={24}
              className="md:group-hover:-translate-x-1 transition-transform"
            />
            <span className="hidden sm:inline">Exit Application</span>
          </button>

          <div className="flex flex-col items-center">
            <p
              className="text-[10px] md:text-[11px] font-black uppercase tracking-widest mb-0.5"
              style={{ color: mutedTextColor }}>
              Applying To
            </p>
            <h2
              className="text-[14px] md:text-[15px] font-black max-w-[150px] md:max-w-[250px] truncate"
              style={{ color: headingColor }}>
              {job.company?.name || "Company"}
            </h2>
          </div>

          <div className="flex items-center gap-2 p-2 pr-0">
            <div
              className="hidden sm:flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-full bg-slate-50 border"
              style={{ color: mutedTextColor, borderColor }}>
              <Lock size={14} /> Encrypted
            </div>
            <ShieldCheck size={26} className="text-green-600" />
          </div>
        </div>

        {/* Visual Progress Indicator */}
        <div className="w-full h-[3px] bg-gray-100">
          <div
            className="h-full transition-all duration-300 ease-out rounded-r-full"
            style={{ backgroundColor: themeColor, width: `${scrollProgress}%` }}
          />
        </div>
      </nav>

      {/* --- 2. MAIN CONTENT AREA --- */}
      <main className="flex-1 w-full max-w-[800px] mx-auto md:py-8 md:px-6 pb-safe">
        {/* JOB INFO SUMMARY (Edge-to-edge on mobile, rounded card on desktop) */}
        <div
          className="bg-white md:rounded-xl md:border md:shadow-sm p-5 sm:p-8 border-b md:mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{ borderColor }}>
          <div className="flex items-start md:items-center gap-4 mb-4 md:mb-6">
            {job.company?.logo ? (
              <img
                src={job.company.logo}
                alt="Logo"
                className="w-14 h-14 md:w-16 md:h-16 object-contain rounded-xl border p-1.5 bg-white shrink-0"
                style={{ borderColor }}
              />
            ) : (
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-xl border bg-slate-50 flex items-center justify-center shrink-0"
                style={{ borderColor }}>
                <Building2 size={28} style={{ color: mutedTextColor }} />
              </div>
            )}
            <div>
              <h1
                className="text-xl md:text-3xl font-black leading-tight mb-1"
                style={{ color: headingColor }}>
                {job.title}
              </h1>
              <p
                className="text-[14px] md:text-[16px] font-bold"
                style={{ color: themeColor }}>
                {job.company?.name}
              </p>
            </div>
          </div>

          <div
            className="flex flex-wrap gap-x-4 gap-y-2 text-[13px] md:text-[14px] font-medium"
            style={{ color: mutedTextColor }}>
            <div className="flex items-center gap-1.5">
              <MapPin size={16} /> {job.location}
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase size={16} /> {job.employmentType}
            </div>
            <div className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
              <CheckCircle2 size={14} /> Actively Hiring
            </div>
          </div>
        </div>

        {/* Native Mobile Section Divider (Only visible on mobile) */}
        <div
          className="w-full h-2 bg-gray-100 border-y md:hidden"
          style={{ borderColor }}></div>

        {/* ERROR NOTIFICATION */}
        {submitError && (
          <div
            className="mx-4 md:mx-0 my-4 md:mb-8 p-4 rounded-xl flex items-start gap-3 shadow-sm border-l-4 animate-in zoom-in-95"
            style={{ backgroundColor: "#FEF2F2", borderColor: dangerColor }}>
            <AlertCircle
              size={20}
              color={dangerColor}
              className="shrink-0 mt-0.5"
            />
            <div>
              <p
                className="text-[13px] font-black uppercase tracking-wider"
                style={{ color: dangerColor }}>
                Submission Failed
              </p>
              <p
                className="text-[14px] font-medium mt-1"
                style={{ color: headingColor }}>
                {submitError}
              </p>
            </div>
          </div>
        )}

        {/* THE MAIN APPLICATION FORM (Edge-to-edge on mobile, elevated card on desktop) */}
        <div
          className="bg-white md:border md:shadow-xl p-5 sm:p-10 md:rounded-[24px] md:mb-12 relative"
          style={{ borderColor }}>
          {/* Form Context Info */}
          <div
            className="mb-8 md:mb-10 text-left border-b pb-6 md:pb-8"
            style={{ borderColor }}>
            <h3
              className="text-xl md:text-2xl font-black mb-1.5"
              style={{ color: headingColor }}>
              Application Details
            </h3>
            <p
              className="text-[14px] md:text-[15px]"
              style={{ color: mutedTextColor }}>
              Please review your profile and provide the necessary documents
              below.
            </p>
          </div>

          <CandidateForm
            form={form}
            updateField={updateField}
            job={job}
            brand={PAGE_BRANDING}
            onSubmit={handleSubmit}
            resumeFile={resumeFile}
            setResumeFile={setResumeFile}
            resumeError={resumeError}
            setResumeError={setResumeError}
            answers={answers}
            setAnswers={setAnswers}
            loading={loading}
            isLoggedInCandidate={!!user}
          />
        </div>

        {/* TRUST BANNER */}
        <div
          className="flex flex-col items-center gap-3 py-8 px-4 md:border-t md:bg-transparent bg-gray-50"
          style={{ borderColor }}>
          <div
            className="flex items-center gap-2 text-[12px] md:text-[13px] font-bold"
            style={{ color: mutedTextColor }}>
            <ShieldCheck size={16} /> Verified Employer • Data Encrypted
          </div>
          <p
            className="text-[11px] md:text-[12px] text-center max-w-sm"
            style={{ color: mutedTextColor }}>
            Your application is sent directly to{" "}
            <strong>{job.company?.name}</strong>. We never share your data with
            unauthorized third parties.
          </p>
        </div>
      </main>

      {/* Global iOS Safe Area CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .pt-safe { padding-top: max(0rem, env(safe-area-inset-top)); }
        .pb-safe { padding-bottom: max(0rem, env(safe-area-inset-bottom)); }
      `,
        }}
      />
    </div>
  );
}
