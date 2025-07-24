import { useState } from "react";
import axios from "axios";
import ValidationError from "components/ValidationError";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrorText, setValidationErrorText] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!userId || !email || !password || !confirmPassword) {
      setValidationErrorText("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setValidationErrorText("Passwords do not match.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        name,
        userId,
        email,
        password,
      });

      alert("Signup successful. You can now log in.");
      navigate("/login"); // Optional callback for redirect
    } catch (err) {
      setValidationErrorText(err?.response?.data?.data || "Signup failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-slate-800 text-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create an Account</h2>

      {validationErrorText && (
        <ValidationError validationErrorText={validationErrorText} />
      )}

      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="px-3 py-2 border border-blue-400 rounded bg-slate-700 text-white"
        />
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
          className="px-3 py-2 border border-blue-400 rounded bg-slate-700 text-white"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="px-3 py-2 border border-blue-400 rounded bg-slate-700 text-white"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="px-3 py-2 border border-blue-400 rounded bg-slate-700 text-white"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="px-3 py-2 border border-blue-400 rounded bg-slate-700 text-white"
        />

        <button
          onClick={handleSignup}
          className="bg-green-600 text-white py-2 rounded mt-2 hover:bg-green-700"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
