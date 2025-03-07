import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import { FaBell, FaSignOutAlt, FaSun, FaMoon, FaGlobe } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = ({ role }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className={`w-full px-6 py-4 flex justify-between items-center shadow-md 
      ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>

      {/* Left - Role & Greeting */}
      <h2 className="text-lg font-semibold">
        {t("dashboardPage.header.welcome")}, {user?.name || "User"} ({role})
      </h2>

      {/* Right - Icons & Actions */}
      <div className="flex items-center space-x-4">
        {/* Language Switcher */}
        <button onClick={() => changeLanguage(i18n.language === "en" ? "es" : "en")} className="text-xl">
          <FaGlobe />
        </button>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="text-xl">
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>

        {/* Notifications */}
        <button className="relative text-xl">
          <FaBell />
          {/* Example Notification Count */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">3</span>
        </button>

        {/* Logout */}
        <button onClick={() => { logout(); navigate("/"); }} className="text-xl text-red-500">
          <FaSignOutAlt />
        </button>
      </div>
    </header>
  );
};

export default Header;
