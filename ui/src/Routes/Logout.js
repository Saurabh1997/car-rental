import React, { useEffect } from "react";
import { useAuth } from "components/AuthProvider";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/");
  }, []);
  return <div>Logging out</div>;
}

export default Logout;
