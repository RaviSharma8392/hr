import React from "react";
import { Outlet } from "react-router-dom";
import CompanyCareerNavbar from "../../../modules/public/components/job/CompanyCareerNavbar";
import PoweredBy from "../../../modules/public/components/job/PoweredBy";

const ExploreJobLayout = () => {
  return (
    <div>
      <CompanyCareerNavbar />
      <Outlet />
      <PoweredBy />
    </div>
  );
};

export default ExploreJobLayout;
