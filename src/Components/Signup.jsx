import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Import AuthContext
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { login } = useAuth(); // ✅ Use AuthContext for authentication

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError(t("error.allFieldsRequired"));
      return;
    }
    if (password !== confirmPassword) {
      setError(t("error.passwordMismatch"));
      return;
    }

    // ✅ Store user details in localStorage (simulating backend response)
    const newUser = { name, email, role };
    localStorage.setItem("user", JSON.stringify(newUser));

    alert(`${t("signupPage.success")} ${t(`roles.${role}`)}`);

    login(name, email, role); // ✅ Call AuthContext login function
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen transition-all duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`p-8 rounded-2xl shadow-lg w-96 transition-all duration-300 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h2
          className={`text-2xl font-bold text-center mb-6 ${
            theme === "dark" ? "text-yellow-400" : "text-blue-600"
          }`}
        >
          {t("signupPage.title")}
        </h2>

        <div className="mb-4">
          <label className="block">{t("signupPage.name")}</label>
          <div className="flex items-center border rounded-lg p-2 bg-transparent">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              className="w-full outline-none bg-transparent"
              placeholder={t("signupPage.enterName")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block">{t("signupPage.email")}</label>
          <div className="flex items-center border rounded-lg p-2 bg-transparent">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              className="w-full outline-none bg-transparent"
              placeholder={t("signupPage.enterEmail")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block">{t("signupPage.role")}</label>
          <select
            className="w-full p-2 border rounded-lg bg-transparent"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="patient">{t("signupPage.patient")}</option>
            <option value="doctor">{t("signupPage.doctor")}</option>
            <option value="admin">{t("signupPage.admin")}</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block">{t("signupPage.password")}</label>
          <div className="flex items-center border rounded-lg p-2 bg-transparent">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              className="w-full outline-none bg-transparent"
              placeholder={t("signupPage.enterPassword")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block">{t("signupPage.confirmPassword")}</label>
          <div className="flex items-center border rounded-lg p-2 bg-transparent">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              className="w-full outline-none bg-transparent"
              placeholder={t("signupPage.enterConfirmPassword")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          className={`w-full p-2 rounded-lg transition-all duration-300 ${
            theme === "dark"
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
          onClick={handleSignup}
        >
          {t("signupPage.button")}
        </button>

        <p className="mt-4 text-sm text-center">
          {t("signupPage.alreadyAccount")}{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            {t("signupPage.login")}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

