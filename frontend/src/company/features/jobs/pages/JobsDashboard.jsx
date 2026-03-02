import JobsPipeline from "../../../components/JobsPipeline";
import JobsStatsCards from "../../../components/JobsStatsCards";
import JobsTable from "../../../components/JobsTable";

const JobsDashboard = () => {
  return (
    // <DashboardLayout title="Jobs & Recruitment">
    <div className="space-y-8">
      <JobsStatsCards />
      <JobsPipeline />
      <JobsTable />
    </div>
    // </DashboardLayout>
  );
};

export default JobsDashboard;
