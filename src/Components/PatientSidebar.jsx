import { Link } from "react-router-dom";
import { FaUserMd, FaPlus, FaUsers, FaList, FaExchangeAlt, FaPowerOff } from "react-icons/fa";

const PatientSidebar = () => {
  return (
    <aside className="w-52 bg-blue-400 text-white flex flex-col justify-between py-6 items-center h-[calc(98vh-4rem)]">
      {/* Top Section */}
      <div className="flex flex-col items-center space-y-6">
        {/* Profile */}
        <Link to="/patient/profile" className="hover:text-gray-200 flex flex-col items-center">
          <FaUserMd size={28} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
        <Link to="/patient/appointments" className="hover:text-gray-200 flex flex-col items-center">
          <FaPlus size={28} />
          <span className="text-xs mt-1">Appointments</span>
        </Link>
        <Link to="/patient/reports" className="hover:text-gray-200 flex flex-col items-center">
          <FaList size={28} />
          <span className="text-xs mt-1">Reports</span>
        </Link>
      </div>

      {/* Logout */}
      <button className="text-white-400 hover:text-red-600 flex flex-col items-center">
        <FaPowerOff size={28} />
        <span className="text-xs">Logout</span>
      </button>
    </aside>
  );
};

export default PatientSidebar;
