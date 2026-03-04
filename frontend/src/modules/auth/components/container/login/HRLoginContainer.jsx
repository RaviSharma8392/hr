import LoginDeviceLayout from "../../../layouts/LoginDeviceLayout.jsx";
import HRLoginDesktop from "../../../pages/login/HRLoginDesktop.jsx";
import LoginMobile from "../../../pages/login/LoginMobile.jsx.jsx";

export default function HRLoginContainer() {
  return (
    <LoginDeviceLayout
      MobileComponent={LoginMobile}
      DesktopComponent={HRLoginDesktop}
    />
  );
}
