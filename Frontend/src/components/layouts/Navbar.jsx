import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu, aiOpen, setAiOpen, messages, setMessages }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex gap-5 bg-[#08111f] border-b border-slate-800/80 backdrop-blur-[2px] py-4 px-7">
      <button
        className="block lg:hidden text-slate-200 hover:text-white transition"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <h2 className="text-lg font-medium text-white">FinTrack</h2>

      {openSideMenu && (
        <div className="fixed top-15.25 left-0 bg-[#0e192a] border-r border-slate-800 shadow-2xl z-40">
          <SideMenu
            activeMenu={activeMenu}
            aiOpen={aiOpen}
            setAiOpen={setAiOpen}
            messages={messages}
            setMessages={setMessages}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
