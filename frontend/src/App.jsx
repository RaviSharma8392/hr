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
import UnauthorizedPage from "./pages/UnauthorizedPage";

/* ================= LAZY LOAD ================= */

/* Layouts */
const AppLayout = lazy(() => import("./user/layout/AppLayput"));
const HRLayout = lazy(() => import("./company/features/jobs/layout/HRLayout"));

/* Public */
const HRMHomepage = lazy(() => import("./pages/public/HRMHomepage"));
const CandidateLoginPage = lazy(() => import("./pages/CandidateLoginPage"));
const CandidateSignupPage = lazy(() => import("./pages/CandidateSignupPage"));
const HRLogin = lazy(() => import("./pages/public/HRLogin"));
const CompanyFreeTrial = lazy(() => import("./pages/public/CompanyFreeTrial"));
const ContactSales = lazy(() => import("./pages/public/ContactSales"));

/* Company / HR */
const CompanyDashboard = lazy(() => import("./company/pages/CompanyDashboard"));
const CompanyJobsPage = lazy(
  () => import("./company/features/jobs/pages/CompanyJobsPage"),
);
const JobDetailsPage = lazy(
  () => import("./company/features/jobs/pages/JobDetailsPage"),
);
const JobPostPage = lazy(
  () => import("./company/features/jobs/pages/JobPostPage"),
);
const JobApplicationForm = lazy(
  () => import("./company/features/jobs/pages/JobApplicationForm"),
);
const HRDashboard = lazy(
  () => import("./company/features/jobs/pages/HRDashboard"),
);
const HRSettingsPage = lazy(
  () => import("./company/features/setting/HRSettingsPage"),
);
const HROnboardingPage = lazy(() => import("./common/HROnboardingPage"));

/* Candidate */
const JobsPage = lazy(() => import("./user/features/jobs/pages/JobsPage"));
const JobLayout = lazy(() => import("./user/layout/JobLayout"));
const CandidateOnboarding = lazy(
  () => import("./candidate/pages/CandidateOnboarding"),
);

/* ================= GLOBAL LOADER ================= */

const GlobalLoader = () => (
  <div className="fixed inset-0 z-[999] bg-[#F8F9FA] flex flex-col items-center justify-center">
    <div className="flex flex-col items-center animate-in zoom-in-95 duration-500">
      <div className="bg-[#008BDC] p-3 rounded-xl shadow-lg mb-4 animate-pulse">
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

  if (loading) return <GlobalLoader />;

  if (!isAuthenticated) return <Navigate to="/candidate/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
};

/* ================= ROLE REDIRECT ================= */

const RoleRedirect = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <HRMHomepage />;

  switch (user.role) {
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
  const { loading } = useAuth();

  if (loading) return <GlobalLoader />;

  return (
    <BrowserRouter>
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          {/* ROOT */}
          <Route path="/" element={<RoleRedirect />} />

          {/* PUBLIC ROUTES */}
          <Route path="/contact-sales" element={<ContactSales />} />
          <Route path="/candidate/login" element={<CandidateLoginPage />} />
          <Route path="/candidate/signup" element={<CandidateSignupPage />} />
          <Route path="/hr/login" element={<HRLogin />} />
          <Route path="/free-trial" element={<CompanyFreeTrial />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/onboarding/hr" element={<HROnboardingPage />} />
          <Route
            path="/onboarding/candidate"
            element={<CandidateOnboarding />}
          />
          <Route path="jobs/:id/apply" element={<JobApplicationForm />} />

          {/* PUBLIC JOB LISTINGS */}
          <Route element={<AppLayout />}>
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
          </Route>

          {/* CANDIDATE PROTECTED */}
          <Route element={<PrivateRoute allowedRoles={["candidate"]} />}>
            <Route
              path="/candidate/dashboard"
              element={<div>Candidate Dashboard</div>}
            />
          </Route>

          {/* COMPANY ADMIN PROTECTED */}
          <Route element={<PrivateRoute allowedRoles={["company_admin"]} />}>
            <Route path="/company/dashboard" element={<CompanyDashboard />} />
            <Route path="/company/jobs" element={<CompanyJobsPage />} />
            <Route path="/company/jobs/create" element={<JobPostPage />} />
          </Route>

          {/* HR PROTECTED */}
          <Route element={<PrivateRoute allowedRoles={["hr"]} />}>
            <Route path="/hr" element={<HRLayout />}>
              <Route index element={<HRDashboard />} />
              <Route path="jobs" element={<CompanyJobsPage />} />
              <Route path="jobs/:id" element={<JobDetailsPage />} />
              <Route path="post-job" element={<JobPostPage />} />
              <Route path="settings" element={<HRSettingsPage />} />
            </Route>
          </Route>

          {/* ADMIN PROTECTED */}
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
