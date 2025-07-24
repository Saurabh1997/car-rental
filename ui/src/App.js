import React, { Fragment } from "react";
import "./App.css";
import Navbar from "components/Navbar";
import { Outlet } from "react-router-dom";
import { useAuth } from "components/AuthProvider";

function App() {
  const { token } = useAuth();

  const options = [
    {
      displayName: "Home",
      path: "/",
    },
    {
      displayName: "Cars",
      path: "/cars",
    },
    {
      displayName: "Bookings",
      path: "/bookings",
    },
    {
      displayName: "Login",
      path: "/login",
    },
    {
      displayName: "Sign up",
      path: "/signup",
    },
  ];

  const options_When_logged_in = [
    {
      displayName: "Home",
      path: "/",
    },
    {
      displayName: "Cars",
      path: "/cars",
    },
    {
      displayName: "Bookings",
      path: "/bookings",
    },
    {
      displayName: "Logout",
      path: "/logout",
    },
  ];

  return (
    <Fragment>
      <Navbar options={token ? options_When_logged_in : options}></Navbar>
      <Outlet />
    </Fragment>
  );
}

export default App;
