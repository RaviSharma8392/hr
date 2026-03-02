import React, { useState, useMemo } from "react";
import FilterSidebar from "../components/FilterSidebar";
import AppJobCard from "../components/AppJobCard";
import { Filter, X, SearchX } from "lucide-react";

const JobsPage = () => {
  const [filters, setFilters] = useState({
    department: "All",
    location: "All",
    type: "All",
    search: "",
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const MOCK_JOBS = [
    {
      id: 1,
      title: "Engagement Manager (HCM Implementation)",
      company: "Nexus HRM",
      department: "Human Resources",
      location: "Houston, Texas, US",
      type: "Full-Time",
      experience: "8-12 Years",
      salary: "$12k - $18k",
      posted: "2d ago",
    },
    {
      id: 2,
      title: "HR Business Partner",
      company: "Global Tech",
      department: "Human Resources",
      location: "Bangalore, India",
      type: "Full-Time",
      experience: "5-8 Years",
      salary: "$10k - $15k",
      posted: "1w ago",
    },
    {
      id: 3,
      title: "Senior React Engineer",
      company: "Creative Labs",
      department: "Engineering",
      location: "Remote",
      type: "Contract",
      experience: "4-6 Years",
      salary: "$50/hr",
      posted: "3h ago",
    },
    {
      id: 4,
      title: "Financial Analyst",
      company: "FinCorp",
      department: "Finance",
      location: "New York, USA",
      type: "Full-Time",
      experience: "2-4 Years",
      salary: "$80k - $100k",
      posted: "5d ago",
    },
  ];

  const departments = ["All", ...new Set(MOCK_JOBS.map((j) => j.department))];
  const locations = ["All", ...new Set(MOCK_JOBS.map((j) => j.location))];
  const jobTypes = ["All", ...new Set(MOCK_JOBS.map((j) => j.type))];

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter((job) => {
      const searchMatch =
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase());

      const deptMatch =
        filters.department === "All" || job.department === filters.department;

      const locMatch =
        filters.location === "All" || job.location === filters.location;

      const typeMatch = filters.type === "All" || job.type === filters.type;

      return searchMatch && deptMatch && locMatch && typeMatch;
    });
  }, [filters]);

  const resetFilters = () =>
    setFilters({
      department: "All",
      location: "All",
      type: "All",
      search: "",
    });

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-20">
      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 sm:px-6 lg:px-8 py-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24 h-fit">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              departments={departments}
              locations={locations}
              jobTypes={jobTypes}
            />
          </div>
        </aside>

        {/* Job Feed */}
        <main className="lg:col-span-9">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-gray-900">
              {filteredJobs.length} jobs matching your preferences
            </h2>

            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded text-sm font-semibold">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Jobs List */}
          <div className="flex flex-col gap-4">
            {filteredJobs.map((job) => (
              <AppJobCard key={job.id + job.title} job={job} />
            ))}

            {filteredJobs.length === 0 && (
              <div className="text-center py-20 bg-white border rounded-lg shadow-sm flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <SearchX className="w-10 h-10 text-gray-500" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No matching jobs found
                </h3>

                <p className="text-gray-500 text-sm mb-6 max-w-sm">
                  Try changing your filters or search keywords.
                </p>

                <button
                  onClick={resetFilters}
                  className="border px-6 py-2.5 rounded font-semibold text-sm hover:bg-gray-50">
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />

          <div className="relative bg-white w-full max-w-md h-full shadow-xl flex flex-col">
            {/* Drawer Header */}
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-lg font-semibold">Filters</h3>

              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-5 flex-1 overflow-y-auto">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                departments={departments}
                locations={locations}
                jobTypes={jobTypes}
              />
            </div>

            {/* Drawer Footer */}
            <div className="p-5 border-t">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-gray-900 text-white py-3 rounded font-semibold">
                Apply Filters ({filteredJobs.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
