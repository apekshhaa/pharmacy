/*import BackButton from "../components/BackButton";

export default function Signup() {
  return (
    <>
      <BackButton />

      <div className="flex items-center justify-center h-screen">
        <form className="bg-white p-8 rounded-xl shadow w-80 space-y-4">
          <h2 className="text-xl font-semibold">Sign Up</h2>

          <input
            className="w-full p-2 border rounded"
            placeholder="Name"
          />

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
            Create Account
          </button>
        </form>
      </div>
    </>
  );
}
*/

import { useState } from "react";
import BackButton from "../components/BackButton";
import "../components/Signup.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name first");
      return;
    }

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please create a password");
      return;
    }

    setError("");
    console.log("Signup success", { name, email, password });
  };

  return (
    <>
      <BackButton />

      <div className="signup-page">
        <form className="signup-card" onSubmit={handleSubmit}>
          <h1 className="signup-title">Create Account</h1>
          <p className="signup-subtitle">Join SmartRX today</p>

          {error && <div className="error-box">{error}</div>}

          <div className="input-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder=" "
            />
            <label>Full Name</label>
          </div>

          <div className="input-group">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
            />
            <label>Email Address</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
            />
            <label>Password</label>
          </div>

          <button className="signup-btn">Create Account</button>
        </form>
      </div>
    </>
  );
}
