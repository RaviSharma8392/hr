import React from "react";
import {
  Briefcase,
  Plus,
  ChevronDown,
  Search,
  Filter,
  Building2,
} from "lucide-react";
import { useJobs } from "../hooks/useJobs";
import JobCard from "../components/JobCard";
import JobFilters from "../components/JobFilters";

export default function CompanyJobsPage() {
  const companyId = "company123"; // Usually fetched from context/auth

  const {
    jobs,
    loading,
    isInitialLoad,
    hasMore,
    activeTab,
    filters,
    setFilters,
    handleTabChange,
    loadJobs,
  } = useJobs(companyId);

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#484848] pb-24 lg:pb-12">
      {/* 2. TAB NAVIGATION (Classic Underline Style) */}
      <div className="bg-white border-b border-[#EEE] sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 sm:gap-12 overflow-x-auto hide-scrollbar">
            {["active", "drafts", "closed"].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`relative py-4 text-[14px] font-semibold capitalize transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-[#008BDC]"
                      : "text-[#8A8A8A] hover:text-[#484848]"
                  }`}>
                  {tab} Postings
                  {/* Active Tab Indicator Line */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#008BDC] rounded-t-md" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. MAIN DASHBOARD CONTENT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Filters (Sticky on Desktop) */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24">
            <div className="bg-white p-5 rounded-lg border border-[#EEE] shadow-sm">
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-[#F5F5F5]">
                <Filter size={18} className="text-[#8A8A8A]" />
                <h3 className="text-[15px] font-bold text-[#212121]">
                  Filters
                </h3>
              </div>
              <JobFilters filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          {/* RIGHT COLUMN: Job Feed */}
          <main className="lg:col-span-9 space-y-6">
            {/* Conditional Rendering Logic */}
            {isInitialLoad ? (
              /* STATE A: Loading Spinner */
              <div className="flex flex-col items-center justify-center py-32 bg-white border border-[#EEE] rounded-lg shadow-sm gap-4">
                <div className="w-10 h-10 border-4 border-blue-100 border-t-[#008BDC] rounded-full animate-spin"></div>
                <p className="text-sm font-semibold text-[#8A8A8A]">
                  Loading your dashboard...
                </p>
              </div>
            ) : jobs.length === 0 ? (
              /* STATE B: Empty State */
              <div className="text-center py-28 px-6 bg-white border border-[#EEE] rounded-lg flex flex-col items-center shadow-sm">
                <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mb-5 border border-[#EEE]">
                  <Search className="w-8 h-8 text-[#8A8A8A]" />
                </div>
                <h3 className="text-xl text-[#212121] font-bold mb-2">
                  No {activeTab} Postings Found
                </h3>
                <p className="text-[#484848] text-[15px] max-w-md leading-relaxed mb-6">
                  You currently don't have any jobs matching this criteria.
                  Clear your filters or create a new requisition to start
                  hiring.
                </p>
                <button className="flex items-center gap-2 bg-white border border-[#008BDC] text-[#008BDC] hover:bg-blue-50 px-6 py-2.5 rounded-md font-semibold text-sm transition-colors">
                  <Plus size={18} /> Post a Job
                </button>
              </div>
            ) : (
              /* STATE C: Rendered Jobs Grid */
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onEdit={(selectedJob) =>
                      console.log("Edit:", selectedJob.title)
                    }
                    onDuplicate={(selectedJob) =>
                      console.log("Duplicate:", selectedJob.title)
                    }
                    onToggleStatus={(selectedJob) =>
                      console.log("Toggle Status:", selectedJob.title)
                    }
                    onShare={(selectedJob) => {
                      navigator.clipboard.writeText(
                        `https://yourdomain.com/jobs/${selectedJob.id}`,
                      );
                      alert("Job link copied to clipboard!");
                    }}
                    onReview={(selectedJob) =>
                      console.log("Review candidates:", selectedJob.id)
                    }
                  />
                ))}
              </div>
            )}

            {/* Load More Pagination */}
            {hasMore && jobs.length > 0 && (
              <div className="flex justify-center pt-6 pb-4">
                <button
                  onClick={() => loadJobs(false)}
                  disabled={loading}
                  className="px-8 py-2.5 bg-white border border-[#DDD] text-[#008BDC] hover:bg-blue-50 rounded-md text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#008BDC] border-t-transparent rounded-full animate-spin" />{" "}
                      Loading...
                    </>
                  ) : (
                    <>
                      Load More Postings <ChevronDown size={18} />
                    </>
                  )}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* 4. MOBILE STICKY FLOATING ACTION BUTTON (FAB) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#EEE] z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] pb-safe">
        <button className="w-full flex items-center justify-center gap-2 bg-[#008BDC] text-white h-12 rounded-md font-bold text-[15px] active:bg-[#0073B6] transition-colors shadow-sm">
          <Plus size={20} /> Post New Job
        </button>
      </div>

      {/* Utilities */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .pb-safe { padding-bottom: max(1rem, env(safe-area-inset-bottom)); }
      `,
        }}
      />
    </div>
  );
}
