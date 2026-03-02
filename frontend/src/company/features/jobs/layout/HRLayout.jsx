import React from "react";
import { Outlet } from "react-router-dom";
import HRNavbar from "../../../components/HRNavbar";
import HRFooter from "../../../components/HRFooter";

const HRLayout = () => {
  return (
    // 'flex flex-col min-h-screen' ensures the layout spans the full height of the viewport
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] font-sans text-[#484848]">
      {/* Top Navigation */}
      <HRNavbar />

      {/* Main Content Area */}
      {/* 'flex-1' forces this container to grow and push the footer to the bottom */}
      <main className="flex-1 w-full relative">
        <Outlet />
      </main>

      {/* Desktop Footer */}
      {/* Hidden on mobile to prevent clashing with native-feeling mobile app UIs */}
      <div className="hidden md:block mt-auto">
        <HRFooter />
      </div>
    </div>
  );
};

export default HRLayout;
