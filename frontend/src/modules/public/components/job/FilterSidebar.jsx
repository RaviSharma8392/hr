import React, { useMemo, useCallback } from "react";
import { ChevronDown, Building2, MapPin, Briefcase, X } from "lucide-react"; // Added X icon for potential future use

/* ================= INTERNSHALA-STYLE BRANDING ================= */
const DEFAULT_BRANDING = {
  primary: "#1295D8", // Internshala Blue
  bg: "#FFFFFF", // Changed from backgroundColor for overall consistency (usually 'bg' is outside, 'cardBg' inside)
  cardBg: "#FFFFFF", // White background for cards/panels
  textColor: "#333333",
  headingColor: "#444444",
  mutedTextColor: "#777777",
  borderColor: "#E5E7EB",
  borderRadius: "6px",
  fontFamily: "'Inter', 'Roboto', system-ui, sans-serif",
};

const FilterSidebar = ({
  filters = { department: "All", location: "All", type: "All" }, // Ensure default structure
  setFilters,
  departments = [],
  locations = [],
  jobTypes = [],
  branding = {}, // Default to empty object, then merge with DEFAULT_BRANDING
  onClearFilters, // New prop to allow parent to clear filters externally (e.g., from "No matches found" button)
}) => {
  // Merge default branding with any passed branding props
  const currentBrand = useMemo(
    () => ({ ...DEFAULT_BRANDING, ...branding }),
    [branding],
  );

  /* ---------------- FILTER HELPERS ---------------- */
  const updateFilter = useCallback(
    (key, value) => {
      if (!setFilters) {
        console.warn("setFilters function not provided to FilterSidebar.");
        return;
      }
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [setFilters],
  );

  const clearAll = useCallback(() => {
    if (!setFilters) {
      console.warn("setFilters function not provided to FilterSidebar.");
      return;
    }
    setFilters({
      department: "All",
      location: "All",
      type: "All",
    });
    if (onClearFilters) {
      // Call parent's clear function if provided
      onClearFilters();
    }
  }, [setFilters, onClearFilters]);

  const hasFilters = useMemo(() => {
    return (
      filters.department !== "All" ||
      filters.location !== "All" ||
      filters.type !== "All"
    );
  }, [filters]);

  /* ---------------- SELECT BOX COMPONENT (Internal Helper) ---------------- */
  // It's good practice to keep such helper components internal if they are tightly coupled
  const SelectBox = ({ label, name, options, value, icon: Icon }) => {
    const isActive = value && value !== "All";
    const selectId = `filter-${name}`; // Unique ID for accessibility

    return (
      <div className="mb-5">
        <label
          htmlFor={selectId} // Link label to select box
          className="flex items-center gap-1.5 text-[12px] sm:text-[13px] font-semibold mb-2 tracking-wide uppercase" // Smaller text on mobile
          style={{ color: currentBrand.mutedTextColor }}>
          {Icon && (
            <Icon size={14} style={{ color: currentBrand.mutedTextColor }} />
          )}
          {label}
        </label>

        <div className="relative group">
          <select
            id={selectId}
            name={name}
            value={value || "All"}
            onChange={(e) => updateFilter(name, e.target.value)}
            className="w-full h-10 sm:h-11 pl-3 pr-9 text-[14px] appearance-none cursor-pointer outline-none transition-all duration-200 focus:ring-2 focus:ring-offset-0" // Adjusted height, focus ring
            style={{
              borderRadius: currentBrand.borderRadius,
              color: isActive
                ? currentBrand.primary // Use primary for active filter text
                : currentBrand.textColor,
              fontWeight: isActive ? 600 : 500,
              backgroundColor: isActive
                ? currentBrand.themeColorLight // Light background for active
                : currentBrand.cardBg, // Use cardBg for non-active background
              border: `1px solid ${isActive ? currentBrand.primary : currentBrand.borderColor}`, // Primary border for active
              // Override default focus outline and apply custom shadow
              boxShadow: isActive
                ? `0 0 0 1px ${currentBrand.primary}`
                : "none",
            }}
            // Custom focus styles using onFocus/onBlur for better control
            onFocus={(e) => {
              e.target.style.borderColor = currentBrand.primary;
              e.target.style.boxShadow = `0 0 0 2px ${currentBrand.primary}20`; // Subtle focus ring
            }}
            onBlur={(e) => {
              e.target.style.borderColor = isActive
                ? currentBrand.primary
                : currentBrand.borderColor;
              e.target.style.boxShadow = "none";
            }}>
            <option value="All">All {label}s</option>
            {options
              .filter((opt) => opt !== "All") // Filter out "All" if it comes from the options list
              .map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
          </select>

          <ChevronDown
            size={16}
            aria-hidden="true" // Decorative icon, hide from screen readers
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 group-focus-within:rotate-180"
            style={{
              color: isActive
                ? currentBrand.primary // Primary color for active icon
                : currentBrand.mutedTextColor,
            }}
          />
        </div>
      </div>
    );
  };

  /* ---------------- MAIN RENDER ---------------- */
  return (
    <div
      style={{ fontFamily: currentBrand.fontFamily }}
      className="flex flex-col h-full w-full antialiased">
      {" "}
      {/* Added antialiased */}
      {/* HEADER for the filter sidebar */}
      <div
        className="flex justify-between items-center pb-3 mb-4 border-b min-h-[40px]"
        style={{ borderColor: currentBrand.borderColor }}>
        <span
          className="text-sm font-bold uppercase tracking-wider"
          style={{ color: currentBrand.headingColor }}>
          Refine Search
        </span>

        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs sm:text-[13px] font-semibold hover:underline transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-300 rounded px-1" // Added focus styles
            style={{ color: currentBrand.primary }}>
            {" "}
            {/* Use primary for Clear All link */}
            Clear All
          </button>
        )}
      </div>
      {/* FILTER GROUPS */}
      <div className="flex-1">
        <SelectBox
          label="Department"
          name="department"
          value={filters.department}
          options={departments}
          icon={Building2}
        />
        <SelectBox
          label="Location"
          name="location"
          value={filters.location}
          options={locations}
          icon={MapPin}
        />
        <SelectBox
          label="Job Type"
          name="type"
          value={filters.type}
          options={jobTypes}
          icon={Briefcase}
        />
      </div>
    </div>
  );
};

export default FilterSidebar;
