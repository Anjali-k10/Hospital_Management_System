import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext"; // Theme support
import { useTranslation } from "react-i18next"; // i18n translation
import { useAuth } from "../context/AuthContext"; // Auth context

const CommonDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useTheme(); // Get current theme
  const { t, i18n } = useTranslation(); // i18n instance
  const { user } = useAuth(); // Check if user is logged in
  const navigate = useNavigate();

  // Function to switch language
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className={`flex h-screen transition-all duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      {/* Sidebar */}
      <div className={`w-64 p-6 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} fixed md:relative 
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-blue-500 text-white"} h-full shadow-lg`}>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{t("dashboardPage.title")}</h2>
          <button className="md:hidden text-white text-2xl" onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <ul className="space-y-4">
          {user ? (
            <>
              <li><Link to="/dashboard" className="block hover:bg-opacity-80 p-2 rounded transition">{t("dashboardPage.sidebar.dashboard")}</Link></li>
              <li><Link to="/settings" className="block hover:bg-opacity-80 p-2 rounded transition">{t("dashboardPage.sidebar.settings")}</Link></li>
              <li><Link to="/" className="block hover:bg-red-600 p-2 rounded transition">{t("dashboardPage.sidebar.logout")}</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/signup" className="block hover:bg-opacity-80 p-2 rounded transition">{t("dashboardPage.sidebar.signup")}</Link></li>
              <li><Link to="/login" className="block hover:bg-opacity-80 p-2 rounded transition">{t("dashboardPage.sidebar.login")}</Link></li>
            </>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 flex flex-col items-center justify-center text-center">
        {/* Menu button for mobile */}
        <button className="md:hidden text-2xl text-blue-600 dark:text-yellow-400 mb-4" onClick={() => setSidebarOpen(true)}>
          <FaBars />
        </button>

        <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-yellow-400" : "text-blue-600"}`}>
          {t("dashboardPage.welcomeMessage")}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md">
          {t("dashboardPage.content.overview")}
        </p>

        {!user && (
          <button
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => navigate("/login")}
          >
           {t("dashboardPage.getStarted")}
          </button>
        )}
      </div>
    </div>
  );
};

export default CommonDashboard;