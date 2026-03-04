import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import {
  MapPin,
  Clock,
  User,
  Share2,
  Bookmark,
  Building2,
  Briefcase,
  Loader2,
  Tag,
  DollarSign,
  LayoutList,
  PenTool,
} from "lucide-react";

import { fetchCompanyBranding } from "../../services/branding/companyNavbarService";
import { jobDetailService } from "../../services/jobDetail/jobDetailService";

import { useJobNavigation } from "../../utils/jobNavigationHelper";
import { useAuth } from "../../../../app/context/AuthContext";

/* ================= DEFAULT FALLBACK THEME (App Style) ================= */
// These values define the base aesthetic of your application.
// Responsive adjustments will primarily use Tailwind's utility classes.
const DEFAULT_BRANDING = {
  primary: "#1a73e8", // Changed to a blue like in the image for buttons/highlights
  bg: "#f4f5f7", // Light grey background for the overall page
  cardBg: "#ffffff", // White background for cards/panels
  textColor: "#202124", // Dark grey for general text
  headingColor: "#1F1F1F", // Darker for headings
  mutedTextColor: "#5F6368", // Lighter grey for secondary text
  borderColor: "#DADCE0", // Light border color
  borderRadius: "8px", // Rounded corners for consistency
  fontFamily: "'Roboto', sans-serif", // Changed to Roboto like Google/Material Design
};

export default function JobDetails() {
  const { jobId, companySlug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { shareJob } = useJobNavigation();

  const [job, setJob] = useState(null);
  const [branding, setBranding] = useState(DEFAULT_BRANDING);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setLoading(true);
      try {
        const [jobRes, brandRes] = await Promise.all([
          jobDetailService.getJobById(jobId),
          fetchCompanyBranding(companySlug),
        ]);

        if (isMounted) {
          if (jobRes?.success) {
            setJob(jobRes.data);
          } else {
            setJob(null);
          }
          setBranding((prevBranding) => ({
            ...prevBranding,
            ...brandRes, // Apply fetched branding, overwriting defaults
            primary: brandRes?.themeColor || DEFAULT_BRANDING.primary,
            bg: brandRes?.surfaceColor || DEFAULT_BRANDING.bg,
            cardBg: brandRes?.backgroundColor || DEFAULT_BRANDING.cardBg,
          }));
        }
      } catch (err) {
        console.error("Failed to load job details or branding:", err);
        if (isMounted) setJob(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadData();

    return () => {
      isMounted = false;
    };
  }, [jobId, companySlug]);

  /* ---------------- APPLY ROUTER ---------------- */
  const handleApplyClick = useCallback(() => {
    if (!job) return;

    const slug = job.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    // If user is not logged in, redirect to login page with a redirect back to the application form
    if (!user) {
      navigate(`/candidate/login?redirect=/apply/${job.id}/${slug}/form`);
      return; // Important: return after navigation to stop further execution
    }

    // If user is logged in but not a candidate
    if (user.role !== "candidate") {
      alert("Only candidates can apply.");
      return;
    }

    // If user is logged in as a candidate but profile is incomplete
    if (!user.name || !user.email) {
      navigate("/candidate/profile?completeProfile=true");
      return;
    }

    // If user is logged in as a candidate and profile is complete, proceed to form
    navigate(`/apply/${job.id}/${slug}/form`);
  }, [job, user, navigate]); // Ensure all external dependencies are listed here

  /* ---------------- FORMATTERS ---------------- */
  const getFormattedDate = useCallback((dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    // Ensure 2-digit day and month for consistent formatting like 04-03-2026
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }, []);

  /* ---------------- CONDITIONAL RENDERING (Early Exits) ---------------- */
  if (loading) {
    return (
      <div
        role="status" // Accessibility improvement
        className="min-h-screen flex flex-col justify-center items-center p-4" // Added padding for smaller screens
        style={{ backgroundColor: branding.bg }}>
        <Loader2
          className="w-10 h-10 sm:w-12 sm:h-12 animate-spin mb-4" // Slightly larger loader on larger screens
          style={{ color: branding.primary }}
        />
        <p
          className="text-lg text-center"
          style={{ color: branding.mutedTextColor }}>
          Loading job details...
        </p>
      </div>
    );
  }

  if (!job) {
    return (
      <div
        role="alert" // Accessibility improvement
        className="min-h-screen flex flex-col justify-center items-center text-center p-4" // Added padding for smaller screens
        style={{ backgroundColor: branding.bg }}>
        <h2
          className="text-2xl sm:text-3xl font-bold mb-2" // Slightly larger heading on larger screens
          style={{ color: branding.headingColor }}>
          Position Closed or Not Found
        </h2>
        <p
          className="mb-8 text-base sm:text-lg"
          style={{ color: branding.mutedTextColor }}>
          This role is no longer accepting applications or the job ID is
          invalid.
        </p>
        <Link
          to={`/company/${companySlug}`}
          className="inline-flex items-center justify-center px-6 py-2.5 text-white text-base font-medium rounded transition-colors hover:opacity-90 active:scale-95" // Added active state for button
          style={{
            backgroundColor: branding.primary,
            borderRadius: branding.borderRadius,
          }}>
          View Other Open Roles
        </Link>
      </div>
    );
  }

  /* ---------------- MAIN COMPONENT RENDER ---------------- */
  return (
    <div
      className="min-h-screen flex flex-col antialiased" // Added antialiased for smoother fonts
      style={{
        fontFamily: branding.fontFamily,
        backgroundColor: branding.bg,
        color: branding.textColor,
      }}>
      {/* Breadcrumbs (App Style + Responsive Adjustment) */}
      <nav
        aria-label="Breadcrumb" // Accessibility improvement
        className="bg-white border-b px-4 sm:px-8 py-3 text-sm"
        style={{ borderColor: branding.borderColor }}>
        <ol className="flex flex-wrap items-center space-x-1 sm:space-x-2">
          {" "}
          {/* flex-wrap for small screens */}
          <li>
            <Link
              to={`/company/${companySlug}`}
              className="text-blue-600 hover:underline transition-colors"
              style={{ color: branding.primary }}>
              Open Jobs
            </Link>
          </li>
          <li>
            <span
              aria-hidden="true" // Accessibility for separator
              className="text-gray-400 mx-0.5 sm:mx-1"
              style={{ color: branding.mutedTextColor }}>
              &gt;
            </span>
          </li>
          {/* Example breadcrumb. Adapt 'job.category' or similar for a more robust solution */}
          <li className="max-w-[120px] sm:max-w-xs truncate">
            {" "}
            {/* Max-width and truncate for small screens */}
            <Link
              to={`/company/${companySlug}?category=${job.department}`}
              className="text-blue-600 hover:underline transition-colors"
              style={{ color: branding.primary }}>
              {job.department || "Category"}
            </Link>
          </li>
          <li>
            <span
              aria-hidden="true" // Accessibility for separator
              className="text-gray-400 mx-0.5 sm:mx-1"
              style={{ color: branding.mutedTextColor }}>
              &gt;
            </span>
          </li>
          <li
            aria-current="page" // Accessibility improvement
            className="text-gray-600 truncate max-w-[150px] sm:max-w-md" // Max-width and truncate for small screens
            style={{ color: branding.headingColor }}>
            {job.title}
          </li>
        </ol>
      </nav>

      {/* Hero Section (App Style + Responsive Adjustments) */}
      <div
        className="py-8 sm:py-10 px-4 sm:px-8" // Adjusted vertical padding
        style={{
          background: `linear-gradient(135deg, #e0f2f7, #f0f8ff)`, // Light blue gradient
          backgroundColor: branding.cardBg, // Fallback background from branding
          borderBottom: `1px solid ${branding.borderColor}`,
        }}>
        <div className="max-w-[1100px] mx-auto">
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4" // Finer control over text sizes
            style={{ color: branding.headingColor }}>
            {job.title}
          </h1>
          <div
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm sm:text-base mb-6" // Slightly adjusted gaps, text size
            style={{ color: branding.mutedTextColor }}>
            <div className="flex items-center gap-1.5">
              <MapPin size={16} />
              <span>{job.location || "Remote"}</span>
              {job.additionalLocations && (
                <span className="ml-0.5">
                  +{job.additionalLocations.length}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={16} />
              <span>{job.experience || "Not Specified"}</span>{" "}
              {/* Changed to be more generic like original */}
            </div>
            <div className="flex items-center gap-1.5">
              <User size={16} />
              <span>{job.employmentType || "Employee"}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-6">
            {" "}
            {/* Buttons stack on mobile */}
            <button
              onClick={handleApplyClick}
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-white text-base font-semibold rounded-md shadow-md hover:opacity-90 transition-all active:scale-95" // Adjusted padding, added active state
              style={{
                backgroundColor: branding.primary,
                borderRadius: branding.borderRadius,
              }}>
              Apply Now
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className="p-2.5 sm:p-3 border rounded-md flex items-center justify-center transition-all hover:bg-gray-100 active:scale-95" // Adjusted padding, added hover/active
              style={{
                borderColor: branding.borderColor,
                color: branding.mutedTextColor,
              }}>
              <Bookmark
                size={20}
                className={saved ? "fill-current" : ""}
                style={{
                  color: saved ? branding.primary : branding.mutedTextColor,
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Job Description and Job Snapshot (App Style + Responsive Adjustments) */}
      <main
        className="flex-1 w-full max-w-[1100px] mx-auto p-4 sm:p-8 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8" // Adjusted padding, finer gap control
      >
        {/* Left Column: Job Description (App Style + Responsive Adjustments) */}
        <div className="lg:col-span-2">
          <div
            className="p-5 sm:p-6 rounded-lg shadow-sm" // Adjusted padding
            style={{
              backgroundColor: branding.cardBg,
              borderColor: branding.borderColor,
              borderRadius: branding.borderRadius,
            }}>
            <h2
              className="text-xl font-bold mb-5 sm:mb-6" // Adjusted margin
              style={{ color: branding.headingColor }}>
              Job Description
            </h2>
            <div
              className="prose max-w-none text-base sm:text-lg leading-relaxed"
              style={{ color: branding.textColor }}>
              {" "}
              {/* Adjusted text size */}
              <h3
                className="text-lg font-bold mb-3 sm:mb-4" // Adjusted margin
                style={{ color: branding.headingColor }}>
                JOB DESCRIPTION
              </h3>
              <p className="mb-4">
                {job.description || "No description provided."}
              </p>{" "}
              {/* Wrapped job.description in <p> */}
              {/* If you add dynamic sections here, ensure they are also responsive */}
              {job.department && (
                <div
                  className="mt-6 pt-5 border-t" // Adjusted padding/margin
                  style={{ borderColor: branding.borderColor }}>
                  <p
                    className="text-sm font-medium"
                    style={{ color: branding.mutedTextColor }}>
                    <strong>Department:</strong> {job.department}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Job Snapshot (App Style + Responsive Adjustments) */}
        <aside className="lg:col-span-1">
          <div
            className="sticky top-6 lg:top-8 p-5 sm:p-6 rounded-lg shadow-sm border" // Adjusted top sticky position, padding
            style={{
              backgroundColor: branding.cardBg,
              borderColor: branding.borderColor,
              borderRadius: branding.borderRadius,
            }}>
            <h3
              className="text-xl font-bold mb-5 sm:mb-6" // Adjusted margin
              style={{ color: branding.headingColor }}>
              Job Snapshot
            </h3>

            <div
              className="space-y-4 text-sm sm:text-base" // Adjusted text size
              style={{ color: branding.textColor }}>
              {/* Individual Snapshot Items (App Style) */}
              <div>
                <p
                  className="font-semibold text-xs" // Smaller label for better hierarchy
                  style={{ color: branding.mutedTextColor }}>
                  Updated Date
                </p>
                <p className="mt-0.5">
                  {getFormattedDate(job.updatedAt || job.createdAt)}
                </p>
              </div>

              <div>
                <p
                  className="font-semibold text-xs"
                  style={{ color: branding.mutedTextColor }}>
                  Job ID
                </p>
                <p className="mt-0.5">{job.id || "N/A"}</p>
              </div>

              <div>
                <p
                  className="font-semibold text-xs"
                  style={{ color: branding.mutedTextColor }}>
                  Department
                </p>
                <p className="mt-0.5">{job.department || "N/A"}</p>
              </div>

              <div>
                <p
                  className="font-semibold text-xs"
                  style={{ color: branding.mutedTextColor }}>
                  Job Type
                </p>
                <p className="mt-0.5">{job.employmentType || "N/A"}</p>
              </div>

              <div>
                <p
                  className="font-semibold text-xs"
                  style={{ color: branding.mutedTextColor }}>
                  Location
                </p>
                <p className="mt-0.5">{job.location || "N/A"}</p>
              </div>

              <div>
                <p
                  className="font-semibold text-xs"
                  style={{ color: branding.mutedTextColor }}>
                  Experience
                </p>
                <p className="mt-0.5">{job.experience || "N/A"}</p>
              </div>

              {job.salary && (
                <div>
                  <p
                    className="font-semibold text-xs"
                    style={{ color: branding.mutedTextColor }}>
                    Salary
                  </p>
                  <p className="mt-0.5 flex items-center">
                    <DollarSign
                      size={14}
                      className="inline-block mr-1 flex-shrink-0"
                    />
                    {job.salary}
                  </p>
                </div>
              )}

              {job.jobLevel && (
                <div>
                  <p
                    className="font-semibold text-xs"
                    style={{ color: branding.mutedTextColor }}>
                    Job Level
                  </p>
                  <p className="mt-0.5 flex items-center">
                    <LayoutList
                      size={14}
                      className="inline-block mr-1 flex-shrink-0"
                    />
                    {job.jobLevel}
                  </p>
                </div>
              )}

              {job.skills && job.skills.length > 0 && (
                <div>
                  <p
                    className="font-semibold text-xs"
                    style={{ color: branding.mutedTextColor }}>
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {" "}
                    {/* Adjusted top margin */}
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full text-xs font-medium inline-flex items-center" // Added inline-flex and items-center for skill icon alignment
                        style={{
                          backgroundColor: branding.bg,
                          color: branding.textColor,
                          border: `1px solid ${branding.borderColor}`,
                        }}>
                        <PenTool
                          size={12}
                          className="inline-block mr-1 flex-shrink-0"
                        />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Button (App Style) */}
              <div
                className="border-t pt-4 mt-6"
                style={{ borderColor: branding.borderColor }}>
                <button
                  onClick={() => shareJob(job)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium border rounded-md hover:bg-gray-100 transition-colors active:scale-95" // Added active state
                  style={{
                    borderColor: branding.borderColor,
                    color: branding.textColor,
                    backgroundColor: branding.cardBg,
                  }}>
                  <Share2
                    size={16}
                    style={{ color: branding.mutedTextColor }}
                  />
                  Share Job
                </button>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
