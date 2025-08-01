// src/context/AuthContext.js
import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      return { token, user };
    }
    return { token: null, user: null };
  });

  const login = (token) => {
    const user = jwtDecode(token);
    console.log('me trae el usuario', user);
    localStorage.setItem("token", token);
    setAuth({ token, user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
