import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import RoleRedirect from "./RoleRedirect";

/* Auth */
import HRLoginContainer from "../../modules/auth/components/container/HRLoginContainer";
import CandidateLoginContainer from "../../modules/auth/components/container/CandidateLoginContainer";
import CandidateRegisterContainer from "../../modules/auth/components/container/CandidateRegisterContainer";

/* Public */
import MobileWelcomeScreen from "../../modules/public/pages/MobileWelcomeScreen";
import HRRegisterContainer from "../../modules/auth/components/container/HRRegisterContainer";

/* HR */
import HRDashContainer from "../../modules/hr/components/container/HRDashBoardContainer";

/* Jobs */
import JobPostPage from "../../modules/hr/pages/postJob/JobPostPage";
import UserSideJobsPage from "../../modules/public/pages/jobs/UserSideJobsPage";
import JobDetails from "../../modules/public/pages/jobs/JobDetailsPage";

/* Apply Funnel */
import GuestApplicationFlow from "../../modules/public/pages/jobapply/GuestApplicationFlow";
import ApplyLandingPage from "../../modules/public/pages/public/ApplyLandingPAge";
import GuestApplicationPage from "../../modules/public/pages/jobapply/GuestApplicationPage";
import ExploreJobLayout from "../../candidate/layout/ExploreJobLayout";

const HRDashboard = lazy(
  () => import("../../modules/hr/pages/dashboard/HRDashboard"),
);

/* ================= ROUTES ================= */

export default function AppRoutes() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<RoleRedirect />} />
      {/* Public */}
      <Route path="/welcome" element={<MobileWelcomeScreen />} />
      {/* Auth */}
      <Route path="/hr/login" element={<HRLoginContainer />} />
      <Route path="/hr/register" element={<HRRegisterContainer />} />
      <Route path="/candidate/login" element={<CandidateLoginContainer />} />
      <Route
        path="/candidate/register"
        element={<CandidateRegisterContainer />}
      />
      {/* Job Search */}
      <Route path="/company" element={<ExploreJobLayout />}>
        <Route path=":companyId" element={<UserSideJobsPage />} />
        <Route
          path=":companySlug/jobs/:jobId/:jobSlug"
          element={<JobDetails />}
        />
      </Route>
      {/* Job Details */}

      {/* ================= APPLY FLOW ================= */}
      <Route
        path="/apply/:jobId/:jobSlug/guest"
        element={<GuestApplicationFlow />}
      />
      {/* <Route
        path="/apply/:jobId/:jobSlug/form"
        element={<ApplyLandingPage />}
      /> */}
      <Route
        path="/apply/:jobId/:jobSlug/guest"
        element={<GuestApplicationFlow />}
      />
      <Route
        path="/apply/:jobId/:jobSlug/:mode/form"
        element={<GuestApplicationPage />}
      />
      {/* HR Dashboard */}
      <Route element={<PrivateRoute allowedRoles="hr" />}>
        <Route path="/hr" element={<HRDashContainer />}>
          <Route path="" element={<HRDashboard />} />
        </Route>
      </Route>
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
