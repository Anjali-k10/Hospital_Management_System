import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Load user from localStorage on initial render
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (name, email, role) => {
    const userData = { name, email, role }; // ✅ Store name in user state
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    // Redirect based on role
    if (role === "patient") navigate("/patient-dashboard");
    else if (role === "doctor") navigate("/doctor-dashboard");
    else if (role === "admin") navigate("/admin-dashboard");
  };

  const logout = () => {
    localStorage.removeItem("user"); // ✅ Remove from localStorage first
    setUser(null); // ✅ Then update state

    window.location.href = "/login"; // ✅ Hard redirect for consistency
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


