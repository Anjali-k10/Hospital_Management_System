import { useAuth } from "../context/AuthContext";
import PatientSidebar from "./PatientSidebar";
import DoctorSidebar from "./DoctorSidebar";
import AdminSidebar from "./AdminSidebar";

const RoleSidebar = () => {
  const { user } = useAuth();

  if (!user) return null; // If no user is logged in, return nothing

  // Render the appropriate sidebar based on user role
  switch (user.role) {
    case "patient":
      return <PatientSidebar />;
    case "doctor":
      return <DoctorSidebar />;
    case "admin":
      return <AdminSidebar />;
    default:
      return null; // No sidebar for undefined roles
  }
};

export default RoleSidebar;
