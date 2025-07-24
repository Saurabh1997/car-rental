import React, { Fragment, useState } from "react";
import axios from "axios";
import { useAuth } from "components/AuthProvider";
import ValidationError from "components/ValidationError";
import { useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrorText, setValidationErrorText] = useState(null);
  const location = useLocation();

  const { login } = useAuth();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        { email, password }
      );
      console.log(" coming here", res.data.data.userId);
      login(res.data.data.token, location, res.data.data.userId);
    } catch (err) {
      if (err && err.response && err.response?.data?.data) {
        setValidationErrorText(err.response?.data?.data);
      } else {
        alert(err.response?.data?.error || "Login failed");
      }
    }
  };

  return (
    <div
      className={
        "flex flex-col w-3/5 p-8 rounded-md bg-slate-800 xl:w-1/3 lg:w-1/2 md:w-3/4 sm:w-full"
      }
    >
      {/* {ResetPasswordFormActive ? (
        <ResetPassword />
      ) : ( */}
      <Fragment>
        {validationErrorText && (
          <ValidationError validationErrorText={validationErrorText} />
        )}
        <input
          type="text"
          name="email"
          className={"m-2 p-2 text-black rounded-sm"}
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          className={"m-2 p-2 text-black rounded-sm"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={"border"} onClick={handleSubmit}>
          Submit
        </button>
      </Fragment>
    </div>
  );
};

export default Login;
