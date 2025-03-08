import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // ❌ Don't import BrowserRouter here
import { ThemeProvider } from "./context/ThemeContext";
import { useAuth } from "./context/AuthContext"; // Import Auth Context
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // Import i18n instance
import RoleSidebar from "./Components/RoleSidebar";
import RoleMainContent from "./Components/RoleMainContent";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard"; // Import common dashboard
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import PatientDashboard from "./Components/PatientDashboard";
import DoctorDashboard from "./Components/DoctorDashboard";
import AdminDashboard from "./Components/AdminDashboard";
import CommonDashboard from "./Components/CommonDashboard";

function App() {
  const { user } = useAuth(); // Get logged-in user details
  const [storedUser, setStoredUser] = useState(null);

  // Retrieve user from localStorage on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setStoredUser(JSON.parse(savedUser));
    }
  }, []);

  // Persist theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900 text-black dark:text-white">
          <Navbar />
          <Routes>
            {/* Default route should show the common dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* Role-based Dashboard Routing */}
            <Route
          path="/dashboard/*"
          element={
            <div className="flex w-screen h-screen">
              <RoleSidebar />
              <RoleMainContent />
            </div>
          }
        />

            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/commondashboard" element={<CommonDashboard />} />
            <Route path="/signup" element={<Signup />} />
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

