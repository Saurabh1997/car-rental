// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }, props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [locationToGo, setLocationToGo] = useState(null);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      if (locationToGo) {
        navigate(locationToGo);
      } else {
        navigate("/");
      }
    }
  }, [token, locationToGo, navigate]);

  const login = (t, location, Id) => {
    console.log(" id ", Id);
    localStorage.setItem("token", t);
    setToken(t);
    setUserId(Id);
    if (location && location?.state?.path) {
      setLocationToGo(location?.state?.path);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserId(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
