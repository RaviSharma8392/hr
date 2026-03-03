import { Filter } from "lucide-react";
import JobFilters from "./JobFilters";

export default function JobsFiltersSidebar({ filters, setFilters }) {
  return (
    <div className="bg-white p-5 rounded-lg border border-[#EEE] shadow-sm">
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-[#F5F5F5]">
        <Filter size={18} className="text-[#8A8A8A]" />
        <h3 className="text-sm font-bold text-[#212121]">Filters</h3>
      </div>
      <JobFilters filters={filters} setFilters={setFilters} />
    </div>
  );
}
