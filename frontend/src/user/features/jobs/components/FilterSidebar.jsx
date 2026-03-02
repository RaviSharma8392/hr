import React from "react";
import { ChevronDown } from "lucide-react";

const FilterSidebar = ({
  filters = {},
  setFilters,
  departments = [],
  locations = [],
  jobTypes = [],
}) => {
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
      search: "",
    });
  };

  const SelectBox = ({ label, name, options = [], value }) => (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-800 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-[#008bdc] rounded-full"></span>
        {label}
      </label>

      <div className="relative">
        <select
          value={value || "All"}
          onChange={(e) => handleSelect(name, e.target.value)}
          className="w-full bg-white border border-gray-200 text-gray-700
          text-sm py-3 px-4 rounded-lg
          focus:border-[#008bdc] focus:ring-1 focus:ring-[#008bdc]
          outline-none appearance-none transition-all
          hover:border-[#008bdc]/40 shadow-sm">
          {options.length > 0 ? (
            options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))
          ) : (
            <option value="All">All</option>
          )}
        </select>

        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#008bdc] pointer-events-none" />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header */}
      <div className="border-b border-blue-100 pb-4">
        <h3 className="text-lg font-bold text-[#008bdc] flex items-center gap-2">
          Filters
        </h3>
      </div>

      {/* Filters */}
      <div className="space-y-6 flex-1">
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

      {/* Footer */}
      <div className="pt-4 border-t border-blue-100">
        <button
          onClick={clearFilters}
          className="w-full text-sm font-semibold text-[#008bdc]
          hover:text-blue-800 hover:underline transition">
          Clear all filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
