import React from "react";
import { useJobs } from "../../hooks/useJobs";

import JobsTabs from "../../components/hrJobs/JobsTabs";
import JobsLayout from "../../layout/JobsLayout";
import JobsFiltersSidebar from "../../components/hrJobs/JobsFiltersSidebar";
import JobsList from "../../components/hrJobs/JobsList";
import JobsMobileFAB from "../../components/hrJobs/JobsMobileFAB";

export default function HRJobsPage() {
  const companyId = "company123";

  const jobsState = useJobs(companyId);

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#484848] pb-24 lg:pb-12">
      <JobsTabs
        activeTab={jobsState.activeTab}
        onTabChange={jobsState.handleTabChange}
      />

      <JobsLayout
        sidebar={
          <JobsFiltersSidebar
            filters={jobsState.filters}
            setFilters={jobsState.setFilters}
          />
        }
        content={<JobsList {...jobsState} />}
      />

      <JobsMobileFAB />
    </div>
  );
}
