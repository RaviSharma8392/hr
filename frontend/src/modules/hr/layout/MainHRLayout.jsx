import React, { useEffect, useState } from "react";
import HRDesktopLayout from "./HRDesktopLayout";
import HRMobileLayout from "./HRMobileLayout";
import { Outlet } from "react-router-dom";

const BREAKPOINT = 1024; // Tailwind lg breakpoint

const MainHRLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < BREAKPOINT);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <HRMobileLayout>
      <Outlet />
    </HRMobileLayout>
  ) : (
    <HRDesktopLayout>
      <Outlet />
    </HRDesktopLayout>
  );
};

export default MainHRLayout;
