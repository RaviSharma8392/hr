// components/dashboard/QuickActions.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const QuickActions = () => {
  return (
    <Link
      to="/hr/post-job"
      className="flex items-center justify-center gap-2 bg-[#008BDC] hover:bg-[#0073B6] text-white px-6 py-3 rounded-md text-sm font-semibold shadow-sm transition-all active:scale-95">
      <Plus size={18} /> Post a New Job
    </Link>
  );
};

export default QuickActions;
