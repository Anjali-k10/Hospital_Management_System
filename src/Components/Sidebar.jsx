import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

const Sidebar = ({ sidebarOpen, setSidebarOpen, role }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className={`w-64 p-6 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} fixed md:relative 
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-blue-500 text-white"} h-full shadow-lg`}>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{t("dashboardPage.title")}</h2>
        <button className="md:hidden text-white text-2xl" onClick={() => setSidebarOpen(false)}>
          <FaTimes />
        </button>
      </div>

      <ul className="space-y-4">
        {role === "patient" && (
          <>
            <li><Link to="/patients">{t("dashboardPage.sidebar.patients")}</Link></li>
            <li><Link to="/appointments">{t("dashboardPage.sidebar.appointments")}</Link></li>
          </>
        )}

        {role === "doctor" && (
          <>
            <li><Link to="/patients">{t("dashboardPage.sidebar.patients")}</Link></li>
            <li><Link to="/consultations">{t("dashboardPage.sidebar.consultations")}</Link></li>
          </>
        )}

        {role === "admin" && (
          <>
            <li><Link to="/doctors">{t("dashboardPage.sidebar.doctors")}</Link></li>
            <li><Link to="/manage-resources">{t("dashboardPage.sidebar.medicines")}</Link></li>
          </>
        )}

        <li><Link to="/settings">{t("dashboardPage.sidebar.settings")}</Link></li>
        <li><Link to="/" className="block hover:bg-red-600 p-2 rounded transition">{t("dashboardPage.sidebar.logout")}</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
