import React from "react";
import { Outlet } from "react-router-dom";
import PoweredBy from "../features/jobs/components/PoweredBy";
import CareerNavbar from "../features/jobs/components/CareerNavbar";

const JobLayout = () => {
  return (
    <div>
      <CareerNavbar />
      <Outlet />
      <PoweredBy />
    </div>
  );
};

export default JobLayout;
