import { Routes, Route } from "react-router-dom";
import PatientProfile from "../pages/PatientProfile";
import DoctorProfile from "../pages/DoctorProfile";
import AdminProfile from "../pages/AdminProfile";
import DashBoardHome from "../pages/DashBoardHome";// Default page

const RoleMainContent = () => {
  return (
    <main className="flex-grow p-8 bg-white shadow-lg">
      <Routes>
        {/* Default Home Page for Dashboard */}
        <Route path="/dashboardHome" element={<DashBoardHome />} />

        {/* Profile Pages Based on Role */}
        <Route path="/patient/profile" element={<PatientProfile />} />
        <Route path="/doctor/profile" element={<DoctorProfile />} />
        <Route path="/admin/profile" element={<AdminProfile />} />

        {/* Add More Pages for Each Role as Needed */}
      </Routes>
    </main>
  );
};

export default RoleMainContent;
