// hooks/useHRDashboardData.js

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const useHRDashboardData = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplicants, setRecentApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // if (!user?.uid || !user?.companyId) {
    //   setLoading(false);
    //   setError("User or Company ID not available.");
    //   return;
    // }

    setLoading(true);
    setError(null);

    // Simulate API delay (optional)
    const timer = setTimeout(() => {
      try {
        // ==============================
        // 📊 Dashboard Stats (Static)
        // ==============================
        const staticStats = [
          {
            title: "Active Postings",
            value: "12",
            icon: "Briefcase",
            trend: "+2 this week",
            color: "text-[#008BDC]",
            bg: "bg-blue-50",
          },
          {
            title: "Total Applicants",
            value: "248",
            icon: "Users",
            trend: "+18 this week",
            color: "text-[#10b981]",
            bg: "bg-emerald-50",
          },
          {
            title: "Unreviewed",
            value: "34",
            icon: "Clock",
            trend: "5 new today",
            color: "text-amber-500",
            bg: "bg-amber-50",
          },
          {
            title: "Shortlisted",
            value: "16",
            icon: "CheckCircle2",
            trend: "+3 today",
            color: "text-purple-500",
            bg: "bg-purple-50",
          },
        ];

        // ==============================
        // 💼 Recent Jobs (Static)
        // ==============================
        const staticJobs = [
          {
            id: "job1",
            title: "Frontend Developer",
            location: "Remote",
            applicants: 42,
            new: 5,
            status: "Active",
            createdAt: new Date(),
          },
          {
            id: "job2",
            title: "Backend Engineer",
            location: "New York",
            applicants: 31,
            new: 2,
            status: "Active",
            createdAt: new Date(),
          },
          {
            id: "job3",
            title: "UI/UX Designer",
            location: "London",
            applicants: 18,
            new: 1,
            status: "Draft",
            createdAt: new Date(),
          },
        ];

        // ==============================
        // 👤 Recent Applicants (Static)
        // ==============================
        const staticApplicants = [
          {
            id: "app1",
            name: "John Smith",
            role: "Frontend Developer",
            time: "2 hours ago",
            status: "Unreviewed",
          },
          {
            id: "app2",
            name: "Sarah Johnson",
            role: "Backend Engineer",
            time: "5 hours ago",
            status: "Shortlisted",
          },
          {
            id: "app3",
            name: "David Lee",
            role: "UI/UX Designer",
            time: "Yesterday",
            status: "Interview Scheduled",
          },
          {
            id: "app4",
            name: "Emily Brown",
            role: "Frontend Developer",
            time: "2 days ago",
            status: "Rejected",
          },
        ];

        setStats(staticStats);
        setRecentJobs(staticJobs);
        setRecentApplicants(staticApplicants);

        setLoading(false);
      } catch (err) {
        console.error("Dashboard static load error:", err);
        setError("Failed to load static dashboard data.");
        setLoading(false);
      }
    }, 600); // simulate network latency

    return () => clearTimeout(timer);
  }, [user?.uid, user?.companyId]);

  return {
    stats,
    recentJobs,
    recentApplicants,
    loading,
    error,
  };
};

export default useHRDashboardData;