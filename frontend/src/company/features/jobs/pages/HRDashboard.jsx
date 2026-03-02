import React from "react";
import {
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  Plus,
  ChevronRight,
  UserPlus,
  CheckCircle2,
  MoreHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HRDashboard() {
  // --- MOCK DATA ---
  const stats = [
    {
      title: "Active Postings",
      value: "12",
      icon: <Briefcase size={20} />,
      trend: "+2 this week",
      color: "text-[#008BDC]",
      bg: "bg-blue-50",
    },
    {
      title: "Total Applicants",
      value: "1,284",
      icon: <Users size={20} />,
      trend: "+145 this week",
      color: "text-[#10b981]",
      bg: "bg-emerald-50",
    },
    {
      title: "Unreviewed",
      value: "342",
      icon: <Clock size={20} />,
      trend: "Needs attention",
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      title: "Shortlisted",
      value: "86",
      icon: <CheckCircle2 size={20} />,
      trend: "Across 5 roles",
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
  ];

  const recentJobs = [
    {
      id: 1,
      title: "Senior React Developer",
      type: "Job",
      applicants: 145,
      new: 12,
    },
    {
      id: 2,
      title: "Product Marketing Intern",
      type: "Internship",
      applicants: 320,
      new: 45,
    },
    { id: 3, title: "UI/UX Designer", type: "Job", applicants: 89, new: 3 },
  ];

  const recentApplicants = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Senior React Developer",
      time: "2 hours ago",
      status: "Unreviewed",
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Product Marketing Intern",
      time: "4 hours ago",
      status: "Shortlisted",
    },
    {
      id: 3,
      name: "Aman Gupta",
      role: "Senior React Developer",
      time: "5 hours ago",
      status: "Unreviewed",
    },
    {
      id: 4,
      name: "Neha Singh",
      role: "UI/UX Designer",
      time: "1 day ago",
      status: "Rejected",
    },
  ];

  return (
    // pb-24 ensures content doesn't hide behind the mobile bottom nav bar
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#484848] pb-24 md:pb-12">
      {/* 1. WELCOME HEADER */}
      <div className="bg-white border-b border-[#EEE] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-bold text-[#8A8A8A] uppercase tracking-wider mb-1">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#212121] leading-tight">
              Welcome back, Admin 👋
            </h1>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Here is what's happening with your hiring pipeline today.
            </p>
          </div>

          <Link
            to="/hr/post-job"
            className="hidden sm:flex items-center justify-center gap-2 bg-[#008BDC] hover:bg-[#0073B6] text-white px-6 py-3 rounded-md text-sm font-semibold shadow-sm transition-all active:scale-95">
            <Plus size={18} /> Post a New Job
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* 2. TOP METRICS GRID (Horizontal scroll on mobile, Grid on desktop) */}
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 hide-scrollbar snap-x">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white border border-[#EEE] rounded-lg p-5 shadow-sm min-w-[240px] sm:min-w-0 snap-start">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-md ${stat.bg} ${stat.color}`}>
                  {stat.icon}
                </div>
                <button className="text-gray-300 hover:text-gray-500">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <h3 className="text-3xl font-black text-[#212121] tracking-tight">
                {stat.value}
              </h3>
              <p className="text-[13px] font-bold text-[#8A8A8A] mt-1">
                {stat.title}
              </p>
              <p className="text-[11px] font-semibold text-[#008BDC] mt-2.5 bg-blue-50/50 inline-block px-2 py-1 rounded">
                {stat.trend}
              </p>
            </div>
          ))}
        </div>

        {/* 3. MAIN CONTENT: 2-COLUMN LAYOUT */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* LEFT COLUMN: Active Job Postings */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#212121] flex items-center gap-2">
                <Briefcase size={20} className="text-[#008BDC]" /> Active
                Requisitions
              </h2>
              <Link
                to="/hr/jobs"
                className="text-[13px] font-bold text-[#008BDC] hover:underline">
                View All
              </Link>
            </div>

            <div className="bg-white border border-[#EEE] rounded-lg shadow-sm overflow-hidden">
              {recentJobs.map((job, index) => (
                <div
                  key={job.id}
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-[#F8F9FA] ${index !== recentJobs.length - 1 ? "border-b border-[#EEE]" : ""}`}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[15px] font-bold text-[#212121]">
                        {job.title}
                      </h3>
                      <span className="text-[10px] font-bold bg-[#F8F9FA] border border-[#DDD] px-2 py-0.5 rounded text-gray-500 uppercase tracking-widest">
                        {job.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-[13px] text-gray-500 font-medium mt-2">
                      <span className="flex items-center gap-1.5">
                        <Users size={14} /> {job.applicants} Total
                      </span>
                      <span className="flex items-center gap-1.5 text-[#10b981] bg-emerald-50 px-2 py-0.5 rounded">
                        <UserPlus size={14} /> {job.new} New Today
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/hr/jobs/${job.id}/pipeline`}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 border border-[#DDD] text-[#484848] text-[13px] font-bold rounded-md hover:border-[#008BDC] hover:text-[#008BDC] transition-colors">
                    Pipeline <ChevronRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Recent Applicant Activity */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#212121] flex items-center gap-2">
                <TrendingUp size={20} className="text-[#008BDC]" /> Recent
                Activity
              </h2>
            </div>

            <div className="bg-white border border-[#EEE] rounded-lg shadow-sm p-4 sm:p-5">
              <div className="space-y-5">
                {recentApplicants.map((applicant, index) => (
                  <div key={applicant.id} className="flex gap-3 relative">
                    {/* Connecting line for timeline effect */}
                    {index !== recentApplicants.length - 1 && (
                      <div className="absolute top-8 bottom-[-20px] left-[19px] w-px bg-[#EEE]"></div>
                    )}

                    <img
                      src={`https://ui-avatars.com/api/?name=${applicant.name.replace(" ", "+")}&background=F8F9FA&color=008BDC&rounded=true`}
                      alt={applicant.name}
                      className="w-10 h-10 rounded-full border border-[#EEE] z-10 bg-white"
                    />
                    <div>
                      <p className="text-[14px] font-bold text-[#212121] leading-tight">
                        {applicant.name}
                      </p>
                      <p className="text-[12px] text-gray-500 font-medium mt-0.5">
                        Applied for{" "}
                        <span className="text-[#008BDC] font-semibold">
                          {applicant.role}
                        </span>
                      </p>
                      <p className="text-[11px] text-gray-400 font-semibold mt-1 uppercase tracking-wider flex items-center gap-1.5">
                        <Clock size={12} /> {applicant.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/hr/candidates"
                className="mt-5 block w-full text-center py-2.5 bg-[#F8F9FA] border border-[#EEE] rounded-md text-[13px] font-bold text-[#484848] hover:text-[#008BDC] hover:border-[#008BDC] transition-colors">
                View All Candidates
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Global Style for hiding scrollbars on mobile metric cards */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />
    </div>
  );
}
