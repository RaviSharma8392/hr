import EmployerSignupDesktop from "../../pages/EmployerSignupDesktop";
import HRRegisterMobile from "../../pages/HRRegisterMobile";

export default function HRRegisterContainer() {
  return (
    <>
      <div className="block md:hidden">
        <HRRegisterMobile />
      </div>

      <div className="hidden md:block">
        <EmployerSignupDesktop />
      </div>
    </>
  );
}
