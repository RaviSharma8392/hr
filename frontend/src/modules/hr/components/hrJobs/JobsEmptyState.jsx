import { Search, Plus } from "lucide-react";

export default function JobsEmptyState({ activeTab }) {
  return (
    <div className="text-center py-28 bg-white border rounded-lg flex flex-col items-center">
      <Search className="w-8 h-8 text-[#8A8A8A] mb-4" />
      <h3 className="text-xl font-bold">No {activeTab} Postings Found</h3>
      <button className="mt-6 flex items-center gap-2 border border-[#008BDC] text-[#008BDC] px-6 py-2.5 rounded-md">
        <Plus size={18} /> Post a Job
      </button>
    </div>
  );
}
