import { useNavigate } from "react-router-dom";

/* ---------------- SLUG GENERATOR ---------------- */

export const createSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-");

/* ---------------- NAVIGATION HOOK ---------------- */

export const useJobNavigation = () => {
  const navigate = useNavigate();

  const navigateToJobDetails = (job = {}) => {
    const companySlug = createSlug(job?.companyName || job?.company?.name);
    const jobSlug = createSlug(job?.title);

    navigate(
      `/company/${companySlug}/jobs/${job?.id}/${jobSlug}`
    );
  };

const navigateToApply = (job = {}) => {
  if (!job?.id) return;

  const companySlug = createSlug(
    job?.company?.name || job?.companyName || "company"
  );

  const jobSlug = createSlug(job?.title || "job");

  navigate(`/apply/${job.id}/${jobSlug}`, {
    state: {
      job,
      companySlug,
      from: window.location.pathname,
    },
  });
};
  const shareJob = (job = {}) => {
    const text = `Check this job: ${job?.title} at ${
      job?.companyName || job?.company?.name
    }`;

    if (navigator.share) {
      navigator
        .share({
          title: job?.title,
          text,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Job link copied!");
    }
  };

  return {
    navigateToJobDetails,
    navigateToApply,
    shareJob,
  };
};