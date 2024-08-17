import { createContext, useContext, useState } from "react";

// Create the AuthContext with an initial undefined value
export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("token"));

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser(token);
    console.log('DONE!')
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
