import HRFooter from "../../../components/HRFooter";
import HRNavbar from "../../../components/HRNavbar";
import { Outlet } from "react-router-dom";

const HRLayout = () => {
  return (
    <div className=" min-h-screen bg-slate-50">
      <HRNavbar />
      <Outlet /> <HRFooter />
    </div>
  );
};

export default HRLayout;
