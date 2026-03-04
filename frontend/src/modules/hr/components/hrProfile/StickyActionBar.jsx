import { CheckCircle2, Loader2, Save } from "lucide-react";

const StickyActionBar = ({ isSaving, showSuccess }) => (
  <div className="fixed bottom-0 left-0 w-full md:sticky md:bottom-0 mt-8 bg-white/90 backdrop-blur-md border-t border-[#EEE] p-4 sm:px-8 flex items-center justify-between md:rounded-xl md:shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-40">
    {showSuccess ? (
      <span className="flex items-center gap-2 text-[14px] font-bold text-[#10b981] animate-in slide-in-from-left-4">
        <CheckCircle2 size={18} /> Saved to Firebase!
      </span>
    ) : (
      <span className="hidden sm:inline-block text-[13px] font-medium text-gray-500">
        All changes sync automatically to the cloud.
      </span>
    )}
    <button
      type="submit"
      disabled={isSaving}
      className="flex items-center justify-center gap-2 bg-[#008BDC] hover:bg-[#0073B6] text-white px-8 py-3 rounded-lg text-[14px] font-bold shadow-[0_4px_14px_rgba(0,139,220,0.3)] transition-all active:scale-95 disabled:opacity-70 disabled:shadow-none w-full sm:w-auto ml-auto">
      {isSaving ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" /> Saving...
        </>
      ) : (
        <>
          <Save size={18} /> Save Changes
        </>
      )}
    </button>
  </div>
);

export default StickyActionBar;
