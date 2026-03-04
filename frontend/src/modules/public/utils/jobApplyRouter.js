export const getApplyRoute = (job, user) => {
  if (!job) return "/";

  const slug = job.title
    ? String(job.title).toLowerCase().replace(/[^a-z0-9]+/g, "-")
    : "job";

  /* Guest User */
  if (!user) {
    return `/apply/${job.id}/${slug}/guest`;
  }

  /* Non Candidate Users */
  if (user.role !== "candidate") {
    return null;
  }

  /* Profile Incomplete */
  if (!user.name || !user.email) {
    return "/candidate/profile?completeProfile=true";
  }

  /* Candidate Apply Form */
  return `/apply/${job.id}/${slug}/form`;
};