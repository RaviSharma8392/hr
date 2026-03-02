import React from "react";
import {
  Search,
  ChevronDown,
  Building2,
  Briefcase,
  Clock,
  RotateCcw,
} from "lucide-react";

export default function JobFilters({ filters, setFilters }) {
  const departments = [
    "Engineering",
    "Human Resources",
    "Finance",
    "Marketing",
    "Sales",
    "Product",
    "Design",
  ];

  const jobTypes = ["Full-Time", "Part-Time", "Contract", "Internship"];

  const experiences = ["0-2 Years", "2-5 Years", "5-10 Years", "10+ Years"];

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      department: "all",
      type: "all",
      experience: "all",
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.department !== "all" ||
    filters.type !== "all" ||
    filters.experience !== "all";

  return (
    // Uses CSS Grid for Tablet, Flex Column for Mobile & Desktop Sidebar
    <div className="flex flex-col gap-5 sm:grid sm:grid-cols-2 lg:flex lg:flex-col">
      {/* Active Filters Header & Clear Button */}
      {hasActiveFilters && (
        <div className="sm:col-span-2 lg:col-span-1 flex justify-end mb-[-10px]">
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-[12px] font-bold text-red-500 hover:text-red-700 transition-colors">
            <RotateCcw size={12} /> Clear All
          </button>
        </div>
      )}

      {/* Search Input */}
      <FilterGroup label="Search Postings">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search
              size={16}
              className="text-gray-400 group-focus-within:text-[#008BDC] transition-colors"
            />
          </div>
          <input
            type="text"
            placeholder="e.g. Frontend Developer"
            value={filters.search || ""}
            onChange={(e) => handleChange("search", e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#DDD] rounded-md text-sm font-medium text-[#212121] placeholder-gray-400 focus:outline-none focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC] transition-all"
          />
        </div>
      </FilterGroup>

      {/* Department Select */}
      <FilterGroup label="Department">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Building2
              size={16}
              className="text-gray-400 group-focus-within:text-[#008BDC] transition-colors"
            />
          </div>
          <select
            value={filters.department || "all"}
            onChange={(e) => handleChange("department", e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#DDD] rounded-md text-sm font-medium text-[#212121] appearance-none cursor-pointer focus:outline-none focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC] transition-all">
            <option value="all">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <DropdownArrow />
        </div>
      </FilterGroup>

      {/* Job Type Select */}
      <FilterGroup label="Employment Type">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Clock
              size={16}
              className="text-gray-400 group-focus-within:text-[#008BDC] transition-colors"
            />
          </div>
          <select
            value={filters.type || "all"}
            onChange={(e) => handleChange("type", e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#DDD] rounded-md text-sm font-medium text-[#212121] appearance-none cursor-pointer focus:outline-none focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC] transition-all">
            <option value="all">All Job Types</option>
            {jobTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <DropdownArrow />
        </div>
      </FilterGroup>

      {/* Experience Select */}
      <FilterGroup label="Experience Level">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Briefcase
              size={16}
              className="text-gray-400 group-focus-within:text-[#008BDC] transition-colors"
            />
          </div>
          <select
            value={filters.experience || "all"}
            onChange={(e) => handleChange("experience", e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#DDD] rounded-md text-sm font-medium text-[#212121] appearance-none cursor-pointer focus:outline-none focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC] transition-all">
            <option value="all">Any Experience</option>
            {experiences.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
          <DropdownArrow />
        </div>
      </FilterGroup>
    </div>
  );
}

/* --- Reusable Sub-Components --- */

const FilterGroup = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[13px] font-bold text-[#484848]">{label}</label>
    {children}
  </div>
);

const DropdownArrow = () => (
  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
    <ChevronDown size={16} className="text-gray-400" />
  </div>
);
