import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser(null);
  };

  // Refresh ke baad user ko dobara fetch karega
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");

      // Token hi nahi hai toh API call mat karo
      if (!token) return;

      try {
        const response = await axiosInstance.get(
          API_PATHS.AUTH.GET_USER_INFO
        );

        setUser(response.data);
      } catch (error) {
        console.log("Error fetching user:", error);
        setUser(null);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;