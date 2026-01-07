import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/Signup.css";

export default function Signup({ setIsAuthenticated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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

    if (!phone) {
      setError("Please enter your phone number");
      return;
    }

    if (!password) {
      setError("Please create a password");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setError("");
        // Save user data to localStorage
        const userData = { name, email, id: Date.now() };
        localStorage.setItem("user", JSON.stringify(userData));
        setIsAuthenticated(true);
        navigate("/"); // Redirect to home or desired page
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("❌ Server error. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
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
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=" "
          />
          <label>Email Address</label>
        </div>

        <div className="input-group">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder=" "
          />
          <label>Phone Number</label>
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

        <button className="signup-btn" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="signup-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}
