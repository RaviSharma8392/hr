import React, { useState, useMemo, useEffect } from "react";
import FilterSidebar from "../components/FilterSidebar";
import AppJobCard from "../components/AppJobCard";
import { Filter, X, SearchX } from "lucide-react";
import { fetchCompanyBranding } from "../../../../candidate/service/companyNavbarService"; // Adjust path if needed

const JobsPage = () => {
  const [brand, setBrand] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    department: "All",
    location: "All",
    type: "All",
    search: "",
  });

  /* =====================================================
     1. FETCH BRANDING DATA
  ===================================================== */
  useEffect(() => {
    const loadBrand = async () => {
      try {
        const data = await fetchCompanyBranding();
        setBrand(data);
      } catch (error) {
        console.error("Failed to load branding", error);
      }
    };
    loadBrand();
  }, []);

  /* =====================================================
     2. MOBILE SCROLL LOCK
  ===================================================== */
  useEffect(() => {
    if (mobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileFilterOpen]);

  // --- MOCK DATA ---
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

  // Skeleton Loader while brand is fetching
  if (!brand) {
    return <div className="min-h-screen bg-gray-50 animate-pulse" />;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans pb-24 md:pb-20">
      {/* MAIN CONTENT */}
      {/* max-w-[1200px] gives it a slightly wider, modern SaaS feel */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-5 sm:px-8 pt-8 md:pt-12">
        {/* ========================================== */}
        {/* DESKTOP SIDEBAR                            */}
        {/* ========================================== */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="bg-white rounded-2xl p-6 sticky top-28 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              departments={departments}
              locations={locations}
              jobTypes={jobTypes}
            />
          </div>
        </aside>

        {/* ========================================== */}
        {/* JOB FEED                                   */}
        {/* ========================================== */}
        <main className="lg:col-span-9">
          {/* Header */}
          <div className="flex flex-row justify-between items-center mb-6 gap-4">
            <div>
              <h2 className="text-[20px] md:text-[24px] font-md text-gray-900 tracking-tight">
                Open Roles
              </h2>
              <p className="text-[14px] text-gray-500 font-medium mt-1">
                Showing {filteredJobs.length}{" "}
                {filteredJobs.length === 1 ? "job" : "jobs"}
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-full text-[14px] font-bold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all shadow-sm">
              <Filter className="w-4 h-4" />
              Filters
              {/* Notification dot if filters are active */}
              {(filters.department !== "All" ||
                filters.location !== "All" ||
                filters.type !== "All") && (
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: brand.themeColor }}></span>
              )}
            </button>
          </div>

          {/* Jobs List */}
          <div className="flex flex-col gap-4">
            {filteredJobs.map((job) => (
              <AppJobCard key={job.id + job.title} job={job} />
            ))}

            {/* Empty State */}
            {filteredJobs.length === 0 && (
              <div className="text-center py-24 bg-white border border-gray-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5 ring-4 ring-white shadow-inner">
                  <SearchX className="w-8 h-8 text-gray-400" strokeWidth={2} />
                </div>
                <h3 className="text-[18px] font-bold text-gray-900 mb-2">
                  No matching jobs found
                </h3>
                <p className="text-gray-500 text-[14px] font-medium mb-6 max-w-sm">
                  Try adjusting your filters or expanding your search to see
                  more results.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-full font-bold text-[14px] transition-all bg-gray-50 hover:bg-gray-100 active:scale-95 text-gray-700">
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ========================================== */}
      {/* MOBILE DRAWER (Native App Style)             */}
      {/* ========================================== */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-opacity duration-300 ${
          mobileFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300 ${
            mobileFilterOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileFilterOpen(false)}
        />

        {/* Drawer Panel (Slides in from Right) */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-full max-w-[320px] bg-white shadow-2xl flex flex-col transform transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            mobileFilterOpen ? "translate-x-0" : "translate-x-full"
          }`}>
          {/* Drawer Header */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
            <h3 className="text-[18px] font-black text-gray-900 tracking-tight">
              Filters
            </h3>
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="p-2 -mr-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-full transition-colors">
              <X className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-6 flex-1 overflow-y-auto">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              departments={departments}
              locations={locations}
              jobTypes={jobTypes}
            />
          </div>

          {/* Drawer Footer (White-labeled CTA) */}
          <div className="p-5 border-t border-gray-100 bg-gray-50 pb-safe">
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3.5 rounded-xl font-bold text-[15px] shadow-md transition-transform active:scale-[0.98] text-white"
              style={{ backgroundColor: brand.themeColor }}>
              Show {filteredJobs.length} Results
            </button>
          </div>
        </div>
      </div>

      {/* Global CSS for PWA Safe Areas */}
      <style
        dangerouslySetInnerHTML={{
          __html: `.pb-safe { padding-bottom: max(1.25rem, env(safe-area-inset-bottom)); }`,
        }}
      />
    </div>
  );
};

export default JobsPage;
