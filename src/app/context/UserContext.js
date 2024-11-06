"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("sessionToken");
    if (token) {
      // Puedes hacer una verificación para asegurarte de que el token es válido
      Parse.User.become(token).then((user) => {
        setUserData(user.toJSON());
      }).catch((error) => {
        console.error("Invalid session token", error);
      });
    }
  }, []);  

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
