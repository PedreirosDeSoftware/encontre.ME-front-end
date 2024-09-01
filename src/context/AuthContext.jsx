import { createContext, useContext, useState } from "react";

// Create the AuthContext with an initial undefined value
export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [account, setAccount] = useState(localStorage.getItem("token"));

  const login = (token) => {
    localStorage.setItem("token", token);
    setAccount(token);
    console.log('DONE!')
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAccount(null);
  };

  return (
    <AuthContext.Provider value={{ account, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
