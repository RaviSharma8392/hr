import HRDesktopLayout from "../../layout/HRDesktopLayout";
import HRMobileLayout from "../../layout/HRMobileLayout";

export default function HRDashBoardContainer() {
  return (
    <>
      <div className="block md:hidden">
        <HRMobileLayout />
      </div>

      <div className="hidden md:block">
        <HRDesktopLayout />
      </div>
    </>
  );
}
