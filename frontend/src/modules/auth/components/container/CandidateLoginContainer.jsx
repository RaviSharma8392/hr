import LoginDeviceLayout from "../../layouts/LoginDeviceLayout.jsx";
import LoginMobile from "../../pages/LoginMobile.jsx.jsx";
// import CandidateLoginPage from "../../../../candidate/pages/auth/CandidateLoginPage.jsx";

export default function CandidateLoginContainer() {
  return (
    <LoginDeviceLayout
      MobileComponent={LoginMobile}
      // DesktopComponent={CandidateLoginPage}
    />
  );
}
