export default function JobsLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 bg-white border rounded-lg gap-4">
      <div className="w-10 h-10 border-4 border-blue-100 border-t-[#008BDC] rounded-full animate-spin"></div>
      <p className="text-sm font-semibold text-[#8A8A8A]">
        Loading your dashboard...
      </p>
    </div>
  );
}
