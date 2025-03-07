import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { FaBars } from "react-icons/fa";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className={`flex h-screen transition-all duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      {/* Sidebar for navigation */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role="admin" />

      <div className="flex-1 flex flex-col">
        {/* Header with profile, language switch, and notifications */}
        <Header role="Admin" />

        {/* Main Content */}
        <div className="p-6 md:p-10 flex-1">
          <button className="md:hidden text-2xl text-blue-600 dark:text-yellow-400 mb-4" onClick={() => setSidebarOpen(true)}>
            <FaBars />
          </button>

          <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-yellow-400" : "text-blue-600"}`}>
            {t("dashboardPage.admin.welcome")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{t("dashboardPage.admin.overview")}</p>

          {/* Admin-specific sections */}
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h2 className="text-lg font-semibold">{t("dashboardPage.admin.resources")}</h2>
              <p className="text-gray-500 dark:text-gray-400">{t("dashboardPage.admin.manageResources")}</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h2 className="text-lg font-semibold">{t("dashboardPage.admin.emergencyRequests")}</h2>
              <p className="text-gray-500 dark:text-gray-400">{t("dashboardPage.admin.handleEmergencies")}</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h2 className="text-lg font-semibold">{t("dashboardPage.admin.predictions")}</h2>
              <p className="text-gray-500 dark:text-gray-400">{t("dashboardPage.admin.stockAlerts")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
