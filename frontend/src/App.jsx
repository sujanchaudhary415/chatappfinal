import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import SignUpPage from "./page/SignUpPage";
import { ToastContainer } from "react-toastify";
import { UserContext } from "./context/UserContext";

const App = () => {
  const { user, checkAuth, isCheckingAuth } = useContext(UserContext);

  useEffect(() => {
    checkAuth();
  }, []);
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-4xl bg-black text-white">
        Loading...
      </div>
    );
  }
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
