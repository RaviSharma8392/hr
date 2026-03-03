import { Plus } from "lucide-react";

export default function JobsMobileFAB() {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
      <button className="w-full flex items-center justify-center gap-2 bg-[#008BDC] text-white h-12 rounded-md font-bold">
        <Plus size={20} /> Post New Job
      </button>
    </div>
  );
}
