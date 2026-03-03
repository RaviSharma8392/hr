import React, { Suspense, lazy } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Briefcase } from "lucide-react";

import AppLayout from "./user/layout/AppLayput";
import HRMHomepage from "./public/pages/HRMHomepage";
import CandidateLoginPage from "./candidate/pages/auth/CandidateLoginPage";
import CandidateSignupPage from "./candidate/pages/auth/CandidateSignupPage";
import HRLogin from "./hr/pages/auth/HRLogin";
import UnauthorizedPage from "./public/pages/UnauthorizedPage";
import ContactSales from "./public/pages/ContactSales";
import CompanyFreeTrial from "./hr/pages/auth/CompanyFreeTrial";
import MainHRLayout from "./hr/layout/MainHRLayout";
import ExploreJobLayout from "./candidate/layout/ExploreJobLayout";

/* ========================================================= */
/* 🐢 LAZY LOADING (NON-CRITICAL / PROTECTED ROUTES)         */
/* These load in the background only when needed.            */
/* ========================================================= */
const CompanyJobsPage = lazy(() => import("./hr/pages/job/HRJobsPage"));
const JobDetailsPage = lazy(
  () => import("./company/features/jobs/pages/JobDetailsPage"),
);
const JobPostPage = lazy(() => import("./hr/pages/postJob/JobPostPage"));
const JobApplicationForm = lazy(
  () => import("./company/features/jobs/pages/JobApplicationForm"),
);
const HRDashboard = lazy(() => import("./hr/pages/dashboard/HRDashboard"));
const HRSettingsPage = lazy(() => import("./hr/pages/setting/HRSettingsPage"));
const HROnboardingPage = lazy(() => import("./common/HROnboardingPage"));
const HRProfilePage = lazy(() => import("./hr/pages/profile/HRProfilePage"));

const JobsPage = lazy(() => import("./user/features/jobs/pages/JobsPage"));
// const JobLayout = lazy(() => import("./user/layout/JobLayout"));
const CandidateOnboarding = lazy(
  () => import("./candidate/pages/CandidateOnboarding"),
);

/* ================= GLOBAL LOADER ================= */
const GlobalLoader = () => (
  <div className="fixed inset-0 z-[999] bg-[#F8F9FA] flex flex-col items-center justify-center">
    <div className="flex flex-col items-center animate-in zoom-in-95 duration-300">
      <div className="bg-[#008BDC] p-3 rounded-xl shadow-[0_8px_30px_rgba(0,139,220,0.3)] mb-4 animate-pulse">
        <Briefcase className="w-8 h-8 text-white" />
      </div>
      <span className="text-3xl font-black text-[#212121]">
        HRMastery<span className="text-[#008BDC]">.</span>
      </span>
    </div>
  </div>
);

/* ================= PRIVATE ROUTE ================= */
const PrivateRoute = ({ allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();

  // Only block rendering if checking auth state for a PROTECTED route
  if (loading) return <GlobalLoader />;

  if (!isAuthenticated) return <Navigate to="/candidate/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

/* ================= ROLE REDIRECT ================= */
const RoleRedirect = () => {
  const { user, isAuthenticated, loading } = useAuth();

  // Wait for Firebase to figure out who the user is
  if (loading) return <GlobalLoader />;

  // If not logged in, show the homepage instantly
  if (!isAuthenticated) return <HRMHomepage />;

  // If logged in, redirect them to their specific dashboard
  switch (user?.role) {
    case "candidate":
      return <Navigate to="/candidate/dashboard" replace />;
    case "hr":
      return <Navigate to="/hr" replace />;
    case "company_admin":
      return <Navigate to="/company/dashboard" replace />;
    case "admin":
      return <Navigate to="/admin" replace />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
};

/* ================= MAIN APP ================= */
const App = () => {
  // ⚡ REMOVED Global Loading block here!
  // Public pages will now render instantly while Firebase loads in the background.

  return (
    <BrowserRouter>
      {/* Suspense only wraps the routes now, handling lazy-loaded chunks */}
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          {/* ROOT - Intelligent Redirect */}
          <Route path="/" element={<RoleRedirect />} />

          {/* ================= PUBLIC ROUTES (INSTANT LOAD) ================= */}
          <Route path="/contact-sales" element={<ContactSales />} />
          <Route path="/candidate/login" element={<CandidateLoginPage />} />
          <Route path="/candidate/signup" element={<CandidateSignupPage />} />
          <Route path="/hr/login" element={<HRLogin />} />
          <Route path="/free-trial" element={<CompanyFreeTrial />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* PUBLIC JOB LISTINGS */}
          <Route
            path="/company/jobs/:id/apply"
            element={<JobApplicationForm />}
          />
          <Route element={<ExploreJobLayout />}>
            <Route path="/company/jobs" element={<JobsPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route
              path="/companyName/:id/:title"
              element={<JobDetailsPage />}
            />{" "}
          </Route>

          <Route path="jobs/:id/apply" element={<JobApplicationForm />} />

          {/* ================= PROTECTED ROUTES (LAZY LOADED) ================= */}

          {/* CANDIDATE */}
          <Route element={<PrivateRoute allowedRoles={["candidate"]} />}>
            <Route
              path="/onboarding/candidate"
              element={<CandidateOnboarding />}
            />
            <Route
              path="/candidate/dashboard"
              element={<div>Candidate Dashboard</div>}
            />
          </Route>

          {/* COMPANY ADMIN */}
          <Route
            element={
              <PrivateRoute allowedRoles={["company_admin", "admin"]} />
            }>
            {/* <Route path="/company/dashboard" element={<CompanyDashboard />} /> */}
            <Route path="/company/jobs" element={<CompanyJobsPage />} />
            <Route path="/company/jobs/create" element={<JobPostPage />} />
          </Route>

          {/* HR */}
          <Route
            element={
              <PrivateRoute allowedRoles={["hr", "company_admin", "admin"]} />
            }>
            <Route path="/hr/profile" element={<HRProfilePage />} />
            <Route path="/hr/post-job" element={<JobPostPage />} />
            <Route path="/hr/jobs" element={<CompanyJobsPage />} />
            <Route path="/hr/settings" element={<HRSettingsPage />} />

            <Route path="/onboarding/hr" element={<HROnboardingPage />} />
            <Route path="/hr" element={<MainHRLayout />}>
              <Route index element={<HRDashboard />} />
              <Route path="jobs" element={<CompanyJobsPage />} />
              <Route path="profile" element={<HRProfilePage />} />

              <Route path="jobs/:id" element={<JobDetailsPage />} />
            </Route>
          </Route>

          {/* SYSTEM ADMIN */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<div>Admin Dashboard</div>} />
            <Route
              path="/admin/companies"
              element={<div>Companies List</div>}
            />
            <Route path="/admin/users" element={<div>Users List</div>} />
          </Route>

          {/* 404 FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
