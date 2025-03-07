import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext"; // ✅ Import AuthContext
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { login } = useAuth(); // ✅ Use AuthContext for authentication
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = () => {
    setEmailError(!email);
    setPasswordError(!password);

    if (!email || !password) {
      setError(t("error.fillAllFields"));
      return;
    }

    // ✅ Retrieve stored user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.email !== email) {
      setError(t("error.invalidCredentials"));
      return;
    }

    // ✅ Authenticate user
    if (storedUser.password === password) {
      alert(t("success.login"));
      login(storedUser.name, storedUser.email, storedUser.role); // ✅ Store user data in context

      // Redirect based on role
      if (storedUser.role === "patient") navigate("/dashboard/patient");
      else if (storedUser.role === "doctor") navigate("/dashboard/doctor");
      else if (storedUser.role === "admin") navigate("/dashboard/admin");
    } else {
      setError(t("error.invalidCredentials"));
    }
  };

  return (
    <div
      className={`flex items-center justify-center h-screen transition-all duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-blue-100 text-black"
      }`}
    >
      <div
        className={`p-6 rounded-2xl shadow-lg w-96 text-center transition-all duration-300 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-4 ${
            theme === "dark" ? "text-yellow-400" : "text-blue-600"
          }`}
        >
          {t("loginPage.title")}
        </h2>

        {/* Email Input */}
        <div className="mb-4 text-left">
          <label className="block">{t("loginPage.email")}</label>
          <div
            className={`flex items-center border rounded-lg p-2 transition-all duration-300 ${
              emailError
                ? "border-red-500"
                : theme === "dark"
                ? "border-gray-600 bg-gray-700"
                : "border-gray-300 bg-white"
            }`}
          >
            <FaUser
              className={`mr-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-500"
              }`}
            />
            <input
              type="email"
              className="w-full outline-none bg-transparent"
              placeholder={t("loginPage.enterEmail")}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
                setError("");
              }}
            />
          </div>
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{t("error.emailRequired")}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4 text-left">
          <label className="block">{t("loginPage.password")}</label>
          <div
            className={`flex items-center border rounded-lg p-2 transition-all duration-300 ${
              passwordError
                ? "border-red-500"
                : theme === "dark"
                ? "border-gray-600 bg-gray-700"
                : "border-gray-300 bg-white"
            }`}
          >
            <FaLock
              className={`mr-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-500"
              }`}
            />
            <input
              type="password"
              className="w-full outline-none bg-transparent"
              placeholder={t("loginPage.enterPassword")}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
                setError("");
              }}
            />
          </div>
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{t("error.passwordRequired")}</p>
          )}
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Remember Me & Forgot Password */}
        <div className="flex justify-between items-center text-sm mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="mr-2"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember">{t("loginPage.rememberMe")}</label>
          </div>
          <a href="#" className="text-blue-500 hover:underline">
            {t("loginPage.forgotPassword")}
          </a>
        </div>

        {/* Login Button */}
        <button
          className={`w-full p-2 rounded-lg transition-all duration-300 ${
            theme === "dark"
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
          onClick={handleLogin}
        >
          {t("loginPage.button")}
        </button>

        {/* Signup Link */}
        <p className="mt-4 text-sm">
          {t("loginPage.noAccount")}{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            {t("loginPage.signup")}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
