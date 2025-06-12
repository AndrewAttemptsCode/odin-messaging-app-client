import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ id: 0, username: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setLoading(false);
      return;
    }

    if (storedToken) {
      try {
        const { id, username, exp } = jwtDecode(storedToken);
        const now = Date.now() / 1000;
        if (exp < now) {
          logout();
        }
        
        setUser({ id, username });

        const timeUntilExpiry = (exp - now) * 1000;
        const logoutTimeout = setTimeout(() => {
          logout();
        }, timeUntilExpiry);

        return () => clearTimeout(logoutTimeout);

      } catch (error) {
        console.error("Jwt decode error:", error);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const isAuthorized = user.id !== 0;

  const logout = () => {
    localStorage.removeItem("token");
    setUser({ id: 0, username: "" });
  }

  const values = {
    isAuthorized,
    logout,
    user,
    loading,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
