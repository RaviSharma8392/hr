import LoginDeviceLayout from "../../../layouts/LoginDeviceLayout.jsx";
import LoginMobile from "../../../pages/login/LoginMobile.jsx.jsx";
import CandidateLoginDesktop from "../../../pages/login/CandidateLoginDesktop.jsx";

export default function CandidateLoginContainer() {
  return (
    <LoginDeviceLayout
      MobileComponent={LoginMobile}
      DesktopComponent={CandidateLoginDesktop}
    />
  );
}
