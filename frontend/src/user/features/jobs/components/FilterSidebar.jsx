import React, { useState, useEffect } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { fetchCompanyBranding } from "../../../../candidate/service/companyNavbarService";

const FilterSidebar = ({
  filters = {},
  setFilters,
  departments = [],
  locations = [],
  jobTypes = [],
}) => {
  const [brand, setBrand] = useState(null);

  // Fetch the dynamic brand data
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

  const handleSelect = (name, value) => {
    if (!setFilters) return;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    if (!setFilters) return;
    setFilters({
      department: "All",
      location: "All",
      type: "All",
      search: filters.search || "", // preserve search text if it exists
    });
  };

  // Smart UI: Only show "Clear" if a filter is actually applied
  const hasFilters =
    (filters.department && filters.department !== "All") ||
    (filters.location && filters.location !== "All") ||
    (filters.type && filters.type !== "All");

  // Skeleton Loader
  if (!brand) {
    return (
      <div className="flex flex-col space-y-6 animate-pulse">
        <div className="h-5 w-20 bg-gray-200 rounded"></div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-16 bg-gray-200 rounded"></div>
              <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Minimalist Select Box
  const SelectBox = ({ label, name, options = [], value }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-semibold text-gray-700">{label}</label>

      <div className="relative">
        <select
          value={value || "All"}
          onChange={(e) => handleSelect(name, e.target.value)}
          className="brand-select w-full bg-white border border-gray-300 text-gray-900 text-[14px] py-2.5 pl-3.5 pr-10 rounded-lg outline-none appearance-none transition-all cursor-pointer hover:border-gray-400 shadow-sm">
          <option value="All">All {label}s</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );

  return (
    <div className="flex h-90 flex-col font-sans">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-gray-900">
          <SlidersHorizontal size={18} strokeWidth={2.5} />
          <h3 className="text-[16px] font-bold tracking-tight">Filters</h3>
        </div>

        {/* Smart Clear Button - Only appears when needed */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-[13px] font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Clear all
          </button>
        )}
      </div>

      {/* Filter Inputs */}
      <div className="space-y-5">
        <SelectBox
          label="Department"
          name="department"
          options={departments}
          value={filters.department}
        />
        <SelectBox
          label="Location"
          name="location"
          options={locations}
          value={filters.location}
        />
        <SelectBox
          label="Job Type"
          name="type"
          options={jobTypes}
          value={filters.type}
        />
      </div>

      {/* Dynamic CSS for precise, brand-colored focus rings */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .brand-select:focus {
          border-color: ${brand.themeColor};
          box-shadow: 0 0 0 1px ${brand.themeColor};
        }
      `,
        }}
      />
    </div>
  );
};

export default FilterSidebar;
