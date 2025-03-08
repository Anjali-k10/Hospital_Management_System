import { Link } from "react-router-dom";
import { FaSun, FaMoon, FaGlobe, FaTextHeight, FaChevronDown } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext"; // Import authentication context
import { changeLanguage } from "../i18n"; // Import language function

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth(); // Get user state and logout function
  const { t, i18n } = useTranslation();
  const [fontSize, setFontSize] = useState(16);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Toggle dropdowns
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Change font size
  const increaseFontSize = () => {
    setFontSize((prev) => (prev < 24 ? prev + 2 : prev));
    document.documentElement.style.fontSize = `${fontSize + 2}px`;
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => (prev > 12 ? prev - 2 : prev));
    document.documentElement.style.fontSize = `${fontSize - 2}px`;
  };

  return (
    <nav className={`p-4 flex justify-between items-center ${theme === "dark" ? "bg-gray-950 text-white" : "bg-blue-600 text-white"}`}>
      {/* Left Section: Dynamic Branding */}
      <h1 className="text-xl font-bold">
        {user ? `Welcome ${user.name}` : "Welcome to Hospital Network"}
      </h1>

      {/* Middle Section: Navigation */}
      <div className="flex items-center space-x-4">
        <Link to="/dashboard" className="px-4 hover:underline">{t("dashboard")}</Link>
        {!user ? (
          <>
            <Link to="/login" className="px-4 hover:underline">{t("login")}</Link>
            <Link to="/signup" className="px-4 hover:underline">{t("signup")}</Link>
          </>
        ) : null}
      </div>

      {/* Right Section: Utilities */}
      <div className="flex items-center space-x-4">
        {/* Language Switcher */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown("language")}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
              theme === "dark" 
              ? "bg-gray-800 hover:bg-gray-700" 
              : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <FaGlobe className="text-lg" />
            <span>{i18n.language === "en" ? "English" : "हिन्दी"}</span>
            <FaChevronDown className={`transition-transform ${activeDropdown === "language" ? "rotate-180" : ""}`} />
          </button>

          {activeDropdown === "language" && (
            <div className={`absolute right-0 mt-2 w-40 shadow-lg rounded-lg transition-opacity duration-200 ${
              theme === "dark" 
              ? "bg-gray-900 text-white" 
              : "bg-white text-black border border-gray-300"
            }`}>
              <button 
                onClick={() => { changeLanguage("en"); setActiveDropdown(null); }} 
                className="block w-full px-4 py-2 text-left hover:bg-blue-200 dark:hover:bg-gray-700"
              >
                English
              </button>
              <button 
                onClick={() => { changeLanguage("hi"); setActiveDropdown(null); }} 
                className="block w-full px-4 py-2 text-left hover:bg-blue-200 dark:hover:bg-gray-700"
              >
                हिन्दी
              </button>
            </div>
          )}
        </div>

        {/* Font Size Controls */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown("font")}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
              theme === "dark" 
              ? "bg-gray-800 hover:bg-gray-700" 
              : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <FaTextHeight className="text-lg" />
            <FaChevronDown className={`transition-transform ${activeDropdown === "font" ? "rotate-180" : ""}`} />
          </button>

          {activeDropdown === "font" && (
            <div className={`absolute right-0 mt-2 w-40 shadow-lg rounded-lg transition-opacity duration-200 ${
              theme === "dark" 
              ? "bg-gray-900 text-white" 
              : "bg-white text-black border border-gray-300"
            }`}>
              <button 
                onClick={() => { decreaseFontSize(); setActiveDropdown(null); }} 
                className="block w-full px-4 py-2 text-left hover:bg-blue-200 dark:hover:bg-gray-700"
              >
                {t("decrease")}
              </button>
              <button 
                onClick={() => { increaseFontSize(); setActiveDropdown(null); }} 
                className="block w-full px-4 py-2 text-left hover:bg-blue-200 dark:hover:bg-gray-700"
              >
                {t("increase")}
              </button>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
          className={`focus:outline-none px-3 py-2 rounded-lg transition ${
            theme === "dark" 
            ? "bg-gray-800 hover:bg-gray-700" 
            : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-100" />}
        </button>

        {/* Logout Button (Only for Authenticated Users) */}
        {user && (
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
