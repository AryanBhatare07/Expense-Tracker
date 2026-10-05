import React, { useContext } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { UserContext } from "../../context/UserContext";

const DashboardLayout = ({
  children,
  activeMenu,
  aiOpen,
  setAiOpen,
  messages,
  setMessages,
}) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-[#08111f]">
      <Navbar activeMenu={activeMenu} />

      <div className="pt-[61px]">
        <div className="hidden min-[1081px]:block">
          <SideMenu
            activeMenu={activeMenu}
            aiOpen={aiOpen}
            setAiOpen={setAiOpen}
            messages={messages}
            setMessages={setMessages}
          />
        </div>

        <div
          className={`px-5 py-5 transition-all duration-300 ${
            aiOpen ? "min-[1081px]:ml-[400px]" : "min-[1081px]:ml-64"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
