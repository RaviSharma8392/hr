import JobsEmptyState from "./JobsEmptyState";
import JobsLoadingState from "./JobsLoadingState";
import JobsLoadMore from "./JobsLoadMore";
import JobCard from "./JobCard";

export default function JobsList({
  jobs,
  loading,
  isInitialLoad,
  hasMore,
  activeTab,
  loadJobs,
}) {
  if (isInitialLoad) return <JobsLoadingState />;

  if (jobs.length === 0) return <JobsEmptyState activeTab={activeTab} />;

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {hasMore && <JobsLoadMore loading={loading} onLoadMore={loadJobs} />}
    </>
  );
}
