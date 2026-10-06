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
  return (
    <div className="min-h-screen bg-[#08111f]">
      <Navbar
        activeMenu={activeMenu}
        aiOpen={aiOpen}
        setAiOpen={setAiOpen}
        messages={messages}
        setMessages={setMessages}
      />

      <div className="pt-[61px] flex">
        {/* SIDEBAR */}

        <div
          className={`hidden min-[1081px]:block shrink-0 transition-all duration-300 ${
            aiOpen ? "w-100" : "w-64"
          }`}
        >
          <SideMenu
            activeMenu={activeMenu}
            aiOpen={aiOpen}
            setAiOpen={setAiOpen}
            messages={messages}
            setMessages={setMessages}
          />
        </div>

        {/* MAIN CONTENT */}

        <main
          className={`
            flex-1
            min-w-0
            px-5
            py-5
            transition-all
            duration-300
          `}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
