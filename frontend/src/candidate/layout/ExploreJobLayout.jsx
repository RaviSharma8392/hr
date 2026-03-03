import React from "react";
import { Outlet } from "react-router-dom";
import PoweredBy from "../../user/features/jobs/components/PoweredBy";
import CareerNavbar from "../../user/features/jobs/components/CareerNavbar";

const ExploreJobLayout = () => {
  return (
    <div>
      <CareerNavbar />
      <Outlet />
      <PoweredBy />
    </div>
  );
};

export default ExploreJobLayout;
