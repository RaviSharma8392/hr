// pages/HRDashboard.jsx

import React from "react";
// Import all necessary Lucide icons here
import { Users, Briefcase, Clock, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import useHRDashboardData from "../../hooks/useHRDashboardData";

// Import your modular components
import StatCard from "../../components/dashboard/StatCard";
import ActiveRequisitions from "../../components/dashboard/ActiveRequisitions";
import RecentActivity from "../../components/dashboard/RecentActivity";
import QuickActions from "../../components/dashboard/QuickActions";

// Map string icon names to Lucide React components
const lucideIcons = {
  Briefcase: Briefcase,
  Users: Users,
  Clock: Clock,
  CheckCircle2: CheckCircle2,
};

export default function HRDashboard() {
  const { user } = useAuth();
  const { stats, recentJobs, recentApplicants, loading, error } =
    useHRDashboardData();

  const getUserDisplayName = () => {
    if (user) {
      if (user.firstName && user.lastName)
        return `${user.firstName} ${user.lastName}`;
      if (user.email) return user.email.split("@")[0];
    }
    return "HR Admin";
  };

  // Map the string icon name from the hook data to the actual Lucide component
  const enrichedStats = stats.map((stat) => {
    const IconComponent = lucideIcons[stat.icon] || Briefcase; // Fallback to Briefcase if icon name is not found
    return {
      ...stat,
      icon: <IconComponent size={20} />, // Now it's JSX, valid in this React component
    };
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-600">
        <Clock size={24} className="animate-spin mr-2" /> Loading dashboard
        data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-700 bg-red-100 border border-red-200 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 pb-24 md:pb-12 pb-safe animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6 sm:space-y-8">
        {/* 2. DASHBOARD HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div>
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-[#212121] tracking-tight leading-tight">
              Welcome back, {getUserDisplayName()} 👋
            </h1>
            <p className="text-[14px] sm:text-[15px] font-medium text-gray-500 mt-1">
              Here is what's happening with your hiring pipeline today.
            </p>
          </div>

          <div className="shrink-0 mt-2 sm:mt-0">
            <QuickActions />
          </div>
        </div>

        {/* 3. METRICS GRID */}
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 hide-scrollbar snap-x snap-mandatory">
          {enrichedStats.map((stat, index) => (
            <div key={index} className="snap-center shrink-0 w-[85%] sm:w-auto">
              <StatCard {...stat} />
            </div>
          ))}
        </div>

        {/* 4. MAIN CONTENT: 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-4">
            <ActiveRequisitions jobs={recentJobs} />
          </div>

          <div className="space-y-4">
            <RecentActivity applicants={recentApplicants} />
          </div>
        </div>
      </div>

      {/* GLOBAL CSS OVERRIDES */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
      .hide-scrollbar::-webkit-scrollbar { display: none; }
      .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

      .pb-safe { padding-bottom: max(6rem, env(safe-area-inset-bottom)); }
      `,
        }}
      />
    </div>
  );
}
