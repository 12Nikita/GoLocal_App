import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [address, setAddress] = useState("Add delivery address");

  return (
    <UserContext.Provider value={{ address, setAddress }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
