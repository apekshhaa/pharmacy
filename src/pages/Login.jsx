/*import BackButton from "../components/BackButton";

export default function Login() {
  return (
    <>
      <BackButton />

      <div className="flex items-center justify-center h-screen">
        <form className="bg-white p-8 rounded-xl shadow w-80 space-y-4">
          <h2 className="text-xl font-semibold">Login</h2>

          <input
            className="w-full p-2 border rounded"
            placeholder="Email"
          />

          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Password"
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
*/

import { useState } from "react";
import BackButton from "../components/BackButton";
import "../components/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email first");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError("");
    console.log("Login success", { email, password });
  };

  return (
    <>
      <BackButton />

      <div className="login-page">
        <form className="login-card" onSubmit={handleSubmit}>
          <h1 className="login-title">Login</h1>
          <p className="login-subtitle">Welcome back to SmartRX</p>

          {error && <div className="error-box">{error}</div>}

          <div className="input-group">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email Address</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>

          <button className="login-btn">Login</button>
        </form>
      </div>
    </>
  );
}
