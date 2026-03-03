import React from "react";
import { Outlet } from "react-router-dom";
import HRMobileTopNav from "../components/navbar/HRMobileTopNav";
import HRMobileBottomNavbar from "../components/navbar/HRMobileBottomNav";
import { useAuth } from "../../context/AuthContext";

const HRMobileLayout = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col h-dvh w-full bg-[#F2F4F7] font-sans">
      <HRMobileTopNav user={user} />

      <main className="flex-1 overflow-y-auto pb-20">
        <div className=" min-h-full">
          <Outlet />
        </div>
      </main>

      <HRMobileBottomNavbar />
    </div>
  );
};

export default HRMobileLayout;
