import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "Routes/Signup";
import ErrorPage from "Routes/ErrorPage";
import BlockView from "./components/BlockView";
import Login from "./Routes/Login";
import MainPage from "Routes/MainPage";
import CarsPage from "Routes/CarsPage";
import AllBookingsPage from "Routes/AllBookingsPage";
import { AuthProvider } from "components/AuthProvider";
import Logout from "Routes/Logout";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <BlockView>
            <MainPage />
          </BlockView>
        ),
      },
      {
        path: "/signup",
        element: (
          <BlockView>
            <Signup />
          </BlockView>
        ),
      },
      {
        path: "/login",
        element: (
          <BlockView>
            <Login />
          </BlockView>
        ),
      },
      {
        path: "/cars",
        element: (
          <BlockView>
            <CarsPage />
          </BlockView>
        ),
      },
      {
        path: "/bookings",
        element: (
          <BlockView>
            <AllBookingsPage />
          </BlockView>
        ),
      },
      {
        path: "/logout",
        element: (
          <BlockView>
            <Logout />
          </BlockView>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
