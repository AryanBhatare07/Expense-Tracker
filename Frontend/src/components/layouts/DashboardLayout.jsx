import React from "react";
import { useContext } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { UserContext } from "../../context/UserContext";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-[#08111f]">
      <Navbar activeMenu={activeMenu} />

      <div className="pt-[61px]">
        <div className="hidden min-[1081px]:block">
          <SideMenu activeMenu={activeMenu} />
        </div>

        <div className="px-5 py-5 min-[1081px]:ml-64">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
