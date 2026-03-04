import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";

import AppJobCard from "../../components/job/AppJobCard";
import FilterSidebar from "../../components/job/FilterSidebar"; // Assuming FilterSidebar now handles both desktop and mobile

import { JobSearchService } from "../../services/jobSearchService";
import { fetchCompanyBranding } from "../../services/branding/companyNavbarService";

import {
  SlidersHorizontal,
  Loader2,
  SearchX,
  X,
  Building2,
} from "lucide-react";

/* ================= DEFAULT FALLBACK THEME ================= */
const FALLBACK_THEME = {
  primary: "#1a73e8",
  bg: "#f4f5f7",
  cardBg: "#ffffff",
  borderRadius: "8px",
  fontFamily: "'Roboto', sans-serif",
  textColor: "#202124",
  headingColor: "#1F1F1F",
  mutedTextColor: "#5F6368",
  borderColor: "#DADCE0",
};

/* ================= PAGE ================= */

const UserSideJobsPage = () => {
  const { companyId } = useParams();

  // State to hold dynamic branding information
  const [branding, setBranding] = useState(FALLBACK_THEME);
  const [companyName, setCompanyName] = useState("Company");
  const [companyLogo, setCompanyLogo] = useState(null);

  const [allJobs, setAllJobs] = useState([]);

  // Single source of truth for filters
  const [filters, setFilters] = useState({
    department: "All",
    location: "All",
    type: "All",
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH BRANDING DATA ================= */
  useEffect(() => {
    const getBranding = async () => {
      try {
        const data = await fetchCompanyBranding();
        if (data) {
          setBranding({
            primary: data.themeColor || FALLBACK_THEME.primary,
            bg: data.surfaceColor || FALLBACK_THEME.bg,
            cardBg: data.backgroundColor || FALLBACK_THEME.cardBg,
            borderRadius: data.borderRadius || FALLBACK_THEME.borderRadius,
            fontFamily: data.fontFamily || FALLBACK_THEME.fontFamily,
            textColor: data.textColor || FALLBACK_THEME.textColor,
            headingColor: data.headingColor || FALLBACK_THEME.headingColor,
            mutedTextColor:
              data.mutedTextColor || FALLBACK_THEME.mutedTextColor,
            borderColor: data.borderColor || FALLBACK_THEME.borderColor,
          });
          if (data.name) setCompanyName(data.name);
          if (data.logo) setCompanyLogo(data.logo);
        }
      } catch (error) {
        console.error("Failed to load branding", error);
      }
    };
    getBranding();
  }, [companyId]);

  /* ================= FETCH ALL JOBS ================= */
  useEffect(() => {
    const fetchAllJobs = async () => {
      if (!companyId) return;

      setLoading(true);
      try {
        const res = await JobSearchService.searchJobs(companyId);
        if (res.success) {
          setAllJobs(res.jobs);
          if (
            (companyName === "Company" || companyName === "Our") &&
            res.jobs.length > 0 &&
            res.jobs[0].company?.name
          ) {
            setCompanyName(res.jobs[0].company.name);
          }
        } else {
          setAllJobs([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, [companyId, companyName]);

  /* ================= FILTERING LOGIC ================= */
  const filteredJobs = useMemo(() => {
    let data = [...allJobs];

    if (filters.department !== "All") {
      data = data.filter((j) => j.department === filters.department);
    }
    if (filters.location !== "All") {
      data = data.filter((j) => j.location === filters.location);
    }
    if (filters.type !== "All") {
      data = data.filter((j) => j.employmentType === filters.type);
    }

    return data;
  }, [allJobs, filters]);

  /* ================= DYNAMIC FILTER OPTIONS ================= */
  const availableDepartments = useMemo(() => {
    const departments = new Set(
      allJobs.map((j) => j.department).filter(Boolean),
    );
    return ["All", ...Array.from(departments)].sort();
  }, [allJobs]);

  const availableLocations = useMemo(() => {
    const locations = new Set(allJobs.map((j) => j.location).filter(Boolean));
    return ["All", ...Array.from(locations)].sort();
  }, [allJobs]);

  const availableJobTypes = useMemo(() => {
    const jobTypes = new Set(
      allJobs.map((j) => j.employmentType).filter(Boolean),
    );
    return ["All", ...Array.from(jobTypes)].sort();
  }, [allJobs]);

  const clearAllFilters = useCallback(() => {
    setFilters({
      department: "All",
      location: "All",
      type: "All",
    });
  }, []);

  return (
    <div
      style={{
        fontFamily: branding.fontFamily,
        background: branding.bg,
        minHeight: "100vh",
        color: branding.textColor,
      }}
      className="antialiased pb-20">
      {/* ================= 1. ABSTRACT HERO BACKGROUND ================= */}
      <div
        className="h-[180px] sm:h-[220px] w-full relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${branding.primary}15, ${branding.primary}33)`,
        }}>
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          {companyLogo ? (
            <img
              src={companyLogo}
              alt={companyName}
              className="h-16 w-auto mix-blend-multiply filter grayscale opacity-20"
            />
          ) : (
            <Building2 size={80} style={{ color: branding.primary }} />
          )}
        </div>
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full opacity-70">
          <path
            fill="white"
            fillOpacity="0.4"
            d="M0,256L80,245.3C160,235,320,213,480,218.7C640,224,800,256,960,250.7C1120,245,1280,203,1360,181.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>

      {/* OVERLAPPING SPACE - no horizontal filters here anymore */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative -mt-8 sm:-mt-10 z-10 mb-8 sm:mb-12">
        {/* This div was previously for the horizontal filter bar, now it's just a spacer/positioning for the content below */}
      </div>

      {/* ================= 2. MAIN LAYOUT ================= */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div className="flex items-baseline gap-2">
            <span
              className="text-[28px] sm:text-[32px] font-bold"
              style={{ color: branding.headingColor }}>
              {loading ? "-" : filteredJobs.length}
            </span>
            <span
              className="text-[18px] sm:text-[22px] font-medium"
              style={{ color: branding.headingColor }}>
              Open jobs available
            </span>
          </div>

          <div className="flex w-full sm:w-auto items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-2.5 border rounded-md shadow-sm"
              style={{
                borderColor: branding.borderColor,
                backgroundColor: branding.cardBg,
                color: branding.headingColor,
              }}>
              <SlidersHorizontal size={16} />{" "}
              <span className="font-medium text-[14px]">More Filters</span>
            </button>

            {/* Visual Dropdown (for sorting, assuming it's not a filter) */}
            <div
              className="hidden sm:flex items-center gap-3 px-4 py-2.5 border rounded-md cursor-pointer shadow-sm transition-colors hover:opacity-80"
              style={{
                borderColor: branding.borderColor,
                backgroundColor: branding.cardBg,
              }}>
              <span
                className="text-[14px] font-medium"
                style={{ color: branding.textColor }}>
                Newest First
              </span>
              {/* Removed ChevronDown if it's not needed, or keep if for a sort dropdown */}
              {/* <ChevronDown size={16} style={{ color: branding.mutedTextColor }} /> */}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* FILTER SIDEBAR (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-6">
              <h3
                className="font-semibold text-[16px] mb-4"
                style={{ color: branding.headingColor }}>
                Refine by category
              </h3>
              <div
                className="p-5 border shadow-sm"
                style={{
                  backgroundColor: branding.cardBg,
                  borderColor: branding.borderColor,
                  borderRadius: branding.borderRadius,
                }}>
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  departments={availableDepartments}
                  locations={availableLocations}
                  jobTypes={availableJobTypes}
                  theme={branding}
                  // Pass clearAllFilters function to FilterSidebar
                  onClearFilters={clearAllFilters}
                />
              </div>
            </div>
          </aside>

          {/* JOB FEED */}
          <main className="lg:col-span-9 flex flex-col gap-4">
            {/* STATES: LOADING, EMPTY */}
            {loading && allJobs.length === 0 && (
              <div
                className="text-center py-20 border shadow-sm"
                style={{
                  borderRadius: branding.borderRadius,
                  borderColor: branding.borderColor,
                  backgroundColor: branding.cardBg,
                }}>
                <Loader2
                  className="w-10 h-10 animate-spin mx-auto mb-4"
                  style={{ color: branding.primary }}
                />
                <p
                  className="text-[15px] font-medium"
                  style={{ color: branding.mutedTextColor }}>
                  Loading opportunities...
                </p>
              </div>
            )}

            {!loading && allJobs.length === 0 && (
              <div
                className="text-center py-20 border shadow-sm px-4"
                style={{
                  borderRadius: branding.borderRadius,
                  borderColor: branding.borderColor,
                  backgroundColor: branding.cardBg,
                }}>
                <Building2
                  className="w-12 h-12 mx-auto mb-4 opacity-20"
                  style={{ color: branding.textColor }}
                />
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: branding.headingColor }}>
                  No Openings Found
                </h3>
                <p
                  className="text-[15px]"
                  style={{ color: branding.mutedTextColor }}>
                  Please check back later for new roles.
                </p>
              </div>
            )}

            {!loading && allJobs.length > 0 && filteredJobs.length === 0 && (
              <div
                className="text-center py-20 border shadow-sm px-4"
                style={{
                  borderRadius: branding.borderRadius,
                  borderColor: branding.borderColor,
                  backgroundColor: branding.cardBg,
                }}>
                <SearchX
                  className="w-12 h-12 mx-auto mb-4 opacity-20"
                  style={{ color: branding.textColor }}
                />
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: branding.headingColor }}>
                  No matches found
                </h3>
                <p
                  className="text-[15px] mb-6"
                  style={{ color: branding.mutedTextColor }}>
                  Try clearing some filters to see more results.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 rounded text-white font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: branding.primary }}>
                  Clear all filters
                </button>
              </div>
            )}

            {/* JOB LIST GRID */}
            {!loading && filteredJobs.length > 0 && (
              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredJobs.map((job) => (
                  <AppJobCard key={job.id} job={job} branding={branding} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ================= MOBILE FILTER DRAWER ================= */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div
            className="relative ml-auto w-full max-w-[320px] h-full shadow-2xl flex flex-col"
            style={{
              backgroundColor: branding.cardBg,
              fontFamily: branding.fontFamily,
            }}>
            <div
              className="flex justify-between items-center p-5 border-b"
              style={{ borderColor: branding.borderColor }}>
              <h3
                className="font-bold text-[18px]"
                style={{ color: branding.headingColor }}>
                More Filters
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-md hover:bg-gray-100">
                <X size={22} style={{ color: branding.mutedTextColor }} />
              </button>
            </div>
            <div className="p-5 grow overflow-y-auto">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                departments={availableDepartments}
                locations={availableLocations}
                jobTypes={availableJobTypes}
                theme={branding}
                // Pass clearAllFilters function to FilterSidebar
                onClearFilters={clearAllFilters}
              />
            </div>
            <div
              className="p-5 border-t"
              style={{ borderColor: branding.borderColor }}>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3.5 text-white text-[15px] font-semibold rounded-md shadow-sm active:scale-95 transition-transform"
                style={{ backgroundColor: branding.primary }}>
                Show {filteredJobs.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSideJobsPage;
