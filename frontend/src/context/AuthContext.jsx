import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await api.get("/auth/check-auth");
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data.user);
      setIsAuthenticated(true);
      return res.data; // Return data so the component can handle success
    } catch (error) {
      // Throw error so the Login page can show an alert/toast
      throw error.response?.data?.message || "Login failed";
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await api.post("/auth/signup", { name, email, password });
      setUser(res.data.user);
      setIsAuthenticated(true);
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || "Signup failed";
    }
  };


const logout = async () => {
        try {

            await api.post("/auth/logout");
            

            setUser(null);
            setIsAuthenticated(false);
            
            navigate("/login");
            
            toast.success("Logged out successfully");
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
            navigate("/login");
        }
    };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isCheckingAuth, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
