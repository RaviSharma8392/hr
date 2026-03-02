import React from "react";
import { Outlet } from "react-router-dom"; // 1. Import Outlet
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

const AppLayout = () => {
  // 2. Remove { children } from props
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F4F9] font-sans text-[#161621] selection:bg-[#DCDCE5]">
      <Navbar />

      <main className="flex-grow">
        {/* 3. Replace {children} with <Outlet /> */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default AppLayout;
