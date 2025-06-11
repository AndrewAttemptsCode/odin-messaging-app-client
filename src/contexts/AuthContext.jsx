import { createContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const isAuthorized = () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const { exp } = jwtDecode(storedToken);
        const now = Date.now() / 1000;
        if (exp < now) {
          logout();
        }
      } catch (error) {
        console.error("Jwt decode error:", error);
      }
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
  }

  const values = {
    isAuthorized,
    logout,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
