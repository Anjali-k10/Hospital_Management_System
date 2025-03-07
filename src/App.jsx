import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom"; // Import useLocation
import { ThemeProvider } from "./context/ThemeContext";
import { useAuth } from "./context/AuthContext"; 
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import PatientDashboard from "./Components/PatientDashboard";
import DoctorDashboard from "./Components/DoctorDashboard";
import AdminDashboard from "./Components/AdminDashboard";
import CommonDashboard from "./Components/CommonDashboard";

function App() {
  const { user } = useAuth();
  const [storedUser, setStoredUser] = useState(null);
  const location = useLocation(); // Get the current route

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setStoredUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  // ✅ Define pages where Navbar should NOT be displayed
  const noNavbarRoutes = ["/patient-dashboard", "/doctor-dashboard", "/admin-dashboard"];

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900 text-black dark:text-white">
          {/* ✅ Only show Navbar on pages that are NOT in noNavbarRoutes */}
          {!noNavbarRoutes.includes(location.pathname) && <Navbar />}

          <Routes>
            <Route path="/" element={<Dashboard />} />

            {/* Role-based Dashboard Routing */}
            <Route
              path="/dashboard"
              element={
                (user || storedUser) ? (
                  (user?.role || storedUser?.role) === "patient" ? <PatientDashboard /> :
                  (user?.role || storedUser?.role) === "doctor" ? <DoctorDashboard /> :
                  (user?.role || storedUser?.role) === "admin" ? <AdminDashboard /> :
                  <Navigate to="/" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/commondashboard" element={<CommonDashboard />} />

            {/* Direct dashboard routes */}
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;

