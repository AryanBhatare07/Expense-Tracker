import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }

    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="fixed top-[61px] left-0 w-64 h-[calc(100vh-61px)] bg-[#0e192a] border-r border-slate-800 p-4 overflow-y-auto">
      {/* USER INFO */}
      <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-800">
        {/* Avatar */}
        <div className="w-11 h-11 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-semibold text-lg">
          {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
        </div>

        {/* User Name */}
        <h5 className="text-sm font-medium text-white">
          {user?.fullname || "User"}
        </h5>
      </div>

      {/* MENU */}
      <div>
        {SIDE_MENU_DATA.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={`menu_${index}`}
              className={`w-full flex items-center gap-4 text-[15px] py-3 px-5 rounded-lg mb-2 transition ${
                activeMenu === item.label
                  ? "text-white bg-indigo-600"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
              onClick={() => handleClick(item.path)}
            >
              <Icon className="text-xl" />

              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
