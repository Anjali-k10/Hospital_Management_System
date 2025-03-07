import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(); // ✅ Define context at the top level

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`min-h-screen transition-all duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// ✅ Define the hook as a named function (instead of inline export)
export function useTheme() {
  return useContext(ThemeContext);
}

