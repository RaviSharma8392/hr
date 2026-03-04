import LoginDeviceLayout from "../../../layouts/LoginDeviceLayout.jsx";
// import CandidateSignupDesktop from "../../../pages/CandidateSignupDesktop.jsx";
import CandidateRegisterDesktop from "../../../pages/register/CandidateRegisterDesktop.jsx";
import CandidateSignupMobile from "../../../pages/register/CandidateSignupMobile.jsx";
// import CandidateSignupMobile from "../../pages/CandidateSignupPage.jsx";

export default function CandidateRegisterContainer() {
  return (
    <LoginDeviceLayout
      MobileComponent={CandidateSignupMobile}
      DesktopComponent={CandidateRegisterDesktop}
    />
  );
}
