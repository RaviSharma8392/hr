import React, { Suspense } from "react";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";

export default function LoginDeviceLayout({
  MobileComponent,
  DesktopComponent,
}) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {/* Mobile + Tablet */}
      <div className="block lg:hidden">
        {MobileComponent && <MobileComponent />}
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        {DesktopComponent && <DesktopComponent />}
      </div>
    </Suspense>
  );
}
