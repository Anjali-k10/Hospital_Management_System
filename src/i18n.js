import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import hi from "./locales/hi.json"; // Import Hindi translations

const savedLanguage = localStorage.getItem("language") || "en"; // Get saved language or default to English

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi }
  },
  lng: savedLanguage, // Set default language dynamically
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

// Function to change language dynamically
export const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
  localStorage.setItem("language", lng); // Save preference
};

export default i18n;

