import HRRegisterDesktop from "../../../pages/register/HRRegisterDesktop";
import HRRegisterMobile from "../../../pages/register/HRRegisterMobile";

export default function HRRegisterContainer() {
  return (
    <>
      <div className="block md:hidden">
        <HRRegisterMobile />
      </div>

      <div className="hidden md:block">
        <HRRegisterDesktop />
      </div>
    </>
  );
}
