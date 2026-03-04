import React, { lazy } from "react";
import LoginDeviceLayout from "../../layouts/LoginDeviceLayout.jsx";
import LoginDesktop from "../../pages/LoginDesktop.jsx";

const LoginMobile = lazy(() => import("../../pages/LoginMobile.jsx.jsx"));

const HRLoginDesktop = lazy(() => import("../../pages/HRLoginDesktop.jsx"));

export default function HRLoginContainer() {
  return (
    <LoginDeviceLayout
      MobileComponent={LoginMobile}
      DesktopComponent={LoginDesktop}
    />
  );
}
