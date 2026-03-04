import { ChevronDown } from "lucide-react";

export default function JobsLoadMore({ loading, onLoadMore }) {
  return (
    <div className="flex justify-center pt-6 pb-4">
      <button
        onClick={() => onLoadMore(false)}
        disabled={loading}
        className="px-8 py-2.5 border text-[#008BDC] rounded-md text-sm font-semibold">
        {loading ? (
          "Loading..."
        ) : (
          <>
            Load More <ChevronDown size={16} />
          </>
        )}
      </button>
    </div>
  );
}
