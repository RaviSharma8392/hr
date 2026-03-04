import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import RoleRedirect from "./RoleRedirect";

/* ================= AUTH ================= */
import HRLoginContainer from "../../modules/auth/components/container/login/HRLoginContainer";
import CandidateLoginContainer from "../../modules/auth/components/container/login/CandidateLoginContainer";
import CandidateRegisterContainer from "../../modules/auth/components/container/register/CandidateRegisterContainer";
import HRRegisterContainer from "../../modules/auth/components/container/register/HRRegisterContainer";

/* ================= PUBLIC ================= */
import MobileWelcomeScreen from "../../modules/public/pages/MobileWelcomeScreen";

/* ================= JOBS ================= */
import UserSideJobsPage from "../../modules/public/pages/jobs/UserSideJobsPage";
import JobDetails from "../../modules/public/pages/jobs/JobDetailsPage";
import ExploreJobLayout from "../../modules/public/layout/ExploreJobLayout";

/* ================= APPLY FLOW ================= */
import GuestApplicationFlow from "../../modules/public/pages/jobapply/GuestApplicationFlow";
import GuestApplicationPage from "../../modules/public/pages/jobapply/GuestApplicationPage";

/* ================= HR ================= */
import HRDashContainer from "../../modules/hr/components/container/HRDashBoardContainer";

const HRDashboard = lazy(
  () => import("../../modules/hr/pages/dashboard/HRDashboard"),
);

/* ================= CANDIDATE ================= */
const CandidateDashboard = lazy(
  () => import("../../modules/candidate/pages/CandidateDashboard"),
);

/* ================= ROUTES ================= */

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <Routes>
        {/* ================= HOME ================= */}
        <Route path="/" element={<RoleRedirect />} />

        {/* ================= PUBLIC ================= */}
        <Route path="/welcome" element={<MobileWelcomeScreen />} />

        {/* ================= AUTH ================= */}
        <Route path="/hr/login" element={<HRLoginContainer />} />
        <Route path="/hr/register" element={<HRRegisterContainer />} />
        <Route path="/candidate/login" element={<CandidateLoginContainer />} />
        <Route
          path="/candidate/register"
          element={<CandidateRegisterContainer />}
        />

        {/* ================= JOB SEARCH ================= */}
        <Route path="/company" element={<ExploreJobLayout />}>
          <Route path=":companyId" element={<UserSideJobsPage />} />
          <Route
            path=":companySlug/jobs/:jobId/:jobSlug"
            element={<JobDetails />}
          />
        </Route>

        {/* ================= APPLY FLOW ================= */}
        <Route
          path="/apply/:jobId/:jobSlug/guest"
          element={<GuestApplicationFlow />}
        />
        <Route
          path="/apply/:jobId/:jobSlug/:mode/form"
          element={<GuestApplicationPage />}
        />

        {/* ================= HR DASHBOARD ================= */}
        <Route element={<PrivateRoute allowedRoles={["hr"]} />}>
          <Route path="/hr" element={<HRDashContainer />}>
            <Route index element={<HRDashboard />} />
          </Route>
        </Route>

        {/* ================= CANDIDATE DASHBOARD ================= */}
        <Route element={<PrivateRoute allowedRoles={["candidate"]} />}>
          <Route path="/candidate" element={<CandidateDashboard />}>
            <Route index element={<CandidateDashboard />} />
          </Route>
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}
