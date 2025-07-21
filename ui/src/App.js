import React, { Fragment } from "react";
import "./App.css";
import Navbar from "components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  let options = [
    {
      displayName: "Home",
      path: "/",
    },
    {
      displayName: "Cars",
      path: "/cars",
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

  return (
    <Fragment>
      <Navbar options={options}></Navbar>
      <Outlet />
    </Fragment>
  );
}

export default App;
