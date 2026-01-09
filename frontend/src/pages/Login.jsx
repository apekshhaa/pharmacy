// import { useState } from "react";
// import { Link } from "react-router-dom";
// import "../components/Login.css";

// export default function Login({ setIsAuthenticated }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email) {
//       setError("Please enter your email first");
//       return;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     if (!password) {
//       setError("Please enter your password");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setError("");
//         localStorage.setItem("user", JSON.stringify(data.user));
//         setIsAuthenticated(true);
//       } else {
//         setError(data.message || "Login failed");
//       }
//     } catch (err) {
//       setError("❌ Server error. Please try again later.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <form className="login-card" onSubmit={handleSubmit}>
//         <h1 className="login-title">Login</h1>
//         <p className="login-subtitle">Welcome back to SmartRX</p>

//         {error && <div className="error-box">{error}</div>}

//         <div className="input-group">
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             placeholder=" "
//           />
//           <label>Email Address</label>
//         </div>

//         <div className="input-group">
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             placeholder=" "
//           />
//           <label>Password</label>
//         </div>

//         <button className="login-btn" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <p className="signup-link">
//           Don't have an account? <Link to="/signup">Sign up here</Link>
//         </p>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { Link } from "react-router-dom";
import "../components/Login.css";
import { loginWithEmail, loginWithGoogle } from "../services/firebaseAuth";
import { resetPassword } from "../services/firebaseAuth";


export default function Login({ setIsAuthenticated, onNavigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) return setError("Please enter your email first");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError("Please enter a valid email address");
    if (!password) return setError("Please enter your password");

    setLoading(true);

    try {
      await loginWithEmail(email, password);
      onNavigate?.(() => setIsAuthenticated(true)); // 🔥 Show loading, then authenticate
    } catch (err) {
      if (err.code === "auth/wrong-password")
        setError("Incorrect password");
      else if (err.code === "auth/user-not-found")
        setError("User not found. Please sign up.");
      else setError("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await loginWithGoogle();
      onNavigate?.(() => setIsAuthenticated(true)); // 🔥 Show loading, then authenticate
    } catch (err) {
      setError("Google login failed");
    }
  };

  const handleForgotPassword = async () => {
  if (!email) {
    setError("Please enter your email to reset password");
    return;
  }

  try {
    await resetPassword(email);
    setError("");
    alert("📩 Password reset link sent to your email");
  } catch (err) {
    console.error(err);
    setError("❌ Failed to send reset email");
  }
};


  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">Welcome back to SmartRX</p>

        {error && <div className="error-box">{error}</div>}

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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=" "
          />
          <label>Password</label>
        </div>

        {/* 🔐 Forgot Password link */}
        <span
          className="forgot-password-link"
          onClick={handleForgotPassword}
        >
          Forgot password?
        </span>


        <button className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* 🔹 Google Login */}
        <button
          type="button"
          className="google-btn"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="google-icon"
          />
          <span>Continue with Google</span>
        </button>


        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
}
