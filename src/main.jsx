import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom"; // ✅ Ensure Router is here

import "./index.css"; // Ensure Tailwind is imported

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter> {/* ✅ Move Router inside */}
        <AuthProvider> {/* ✅ Now, AuthProvider can use useNavigate */}
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
