import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import lottie from "lottie-web";
import { auth } from "./firebase/firebaseConfig";

import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Curtain from "./components/Curtain";
import Details from "./pages/Details";
import Assistant from "./pages/Assistant"; // ✅ NEW IMPORT

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [appLoading, setAppLoading] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    // 🔥 Firebase test (ADDED LINE)
    console.log("🔥 Firebase Auth connected:", auth);

    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!(loading || appLoading) || !loaderRef.current) return;
    const anim = lottie.loadAnimation({
      container: loaderRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/animations/capsule.json",
    });
    return () => anim?.destroy();
  }, [loading, appLoading]);

  // show a brief loading screen after login/signup
  useEffect(() => {
    if (isAuthenticated) {
      setAppLoading(true);
      const t = setTimeout(() => setAppLoading(false), 5000);
      return () => clearTimeout(t);
    }
  }, [isAuthenticated]);

  // Expose a trigger so pages can show a quick loader for 5s on actions
  const triggerLoading = () => {
    setAppLoading(true);
    setTimeout(() => setAppLoading(false), 5000);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <p className="text-lg text-slate-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800">
      {/* Full-screen loading overlay */}
      {appLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      )}

      {isAuthenticated ? (
        <Curtain>
          <Routes>
            <Route
              path="/"
              element={<Home onLogout={handleLogout} onNavigate={triggerLoading} />}
            />
            <Route
              path="/search/:query"
              element={<SearchResults onLogout={handleLogout} />}
            />
            <Route
              path="/details/:id"
              element={<Details onLogout={handleLogout} />}
            />

            {/* ✅ NEW ASSISTANT ROUTE */}
            <Route
              path="/assistant"
              element={<Assistant onLogout={handleLogout} />}
            />

            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/signup" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Curtain>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/signup"
            element={<Signup setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </div>
  );
}
