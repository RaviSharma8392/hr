// components/navbar/HRNavbar.jsx

import React from "react";
import DesktopNav from "./DesktopNav"; // Import the DesktopNav component
import MobileBottomNav from "./HRMobileBottomNav"; // Import the MobileBottomNav component

export default function HRNavbar() {
  return (
    <>
      {/* 
        This HRNavbar component is a wrapper.
        It renders both the DesktopNav and MobileBottomNav.
        These sub-components will use CSS (e.g., Tailwind's `hidden md:flex`)
        to control their visibility based on screen size, ensuring only one is visible at a time.
      */}
      <DesktopNav />
      <MobileBottomNav />

      {/* 
        Global CSS for Mobile Safe Area padding and to prevent content
        from being hidden behind the fixed mobile bottom nav.
        This ensures better PWA/Mobile app experience.
      */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* PWA Safe Area for iPhones */
           .pb-safe { padding-bottom: max(0.5rem, env(safe-area-inset-bottom)); }
            
            /* Add bottom padding to body on mobile to prevent content from hiding behind nav */
            @media (max-width: 767px) { /* Tailored for \`md\` breakpoint, adjust if needed */
              body {
                padding-bottom: 5rem; /* Adjust this value based on your actual mobile nav height */
              }
            }
          `,
        }}
      />
    </>
  );
}
