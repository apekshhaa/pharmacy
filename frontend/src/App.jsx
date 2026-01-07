// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import SearchResults from "./pages/SearchResults";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Curtain from "./components/Curtain";


// export default function App() {
// return (
// <Curtain>
// <Routes>
// <Route path="/" element={<Home />} />
// <Route path="/search/:query" element={<SearchResults />} />
// <Route path="/login" element={<Login />} />
// <Route path="/signup" element={<Signup />} />
// </Routes>
// </Curtain>
// );
// }

// ----------------------------


/*import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Curtain from "./components/Curtain";
export default function App() {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800">
      <Curtain>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Curtain>
    </div>
  );
}
*/

import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Curtain from "./components/Curtain";
import Details from "./pages/Details";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

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
      {isAuthenticated ? (
        <Curtain>
          <Routes>
            <Route path="/" element={<Home onLogout={handleLogout} />} />
            <Route path="/search/:query" element={<SearchResults onLogout={handleLogout} />} />
            <Route path="/details/:id" element={<Details onLogout={handleLogout} />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/signup" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Curtain>
      ) : (
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </div>
  );
}

