import { useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Authentication Context
import { Link, useNavigate } from "react-router-dom";
import { FaUserMd, FaPlus, FaUsers, FaList, FaExchangeAlt, FaPowerOff } from "react-icons/fa";

const PatientDashboard = () => {
  const { user } = useAuth(); // Get logged-in user
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-blue-300 to-blue-500 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-48 h-full bg-blue-700 text-white flex flex-col items-center py-8 space-y-8">
        <img src="/assets/profile.png" alt="User Profile" className="w-24 h-24 rounded-full" />
        <h3 className="text-base font-medium text-gray-200">{user?.name || "User"}</h3>

        <nav className="flex flex-col space-y-10 mt-6">
          <Link to="#" className="hover:text-gray-200 flex flex-col items-center">
            <FaUserMd size={32} />
            <span className="text-sm mt-2">Profile</span>
          </Link>
          <Link to="#" className="hover:text-gray-200 flex flex-col items-center">
            <FaPlus size={32} />
            <span className="text-sm mt-2">Add</span>
          </Link>
          <Link to="#" className="hover:text-gray-200 flex flex-col items-center">
            <FaUsers size={32} />
            <span className="text-sm mt-2">Users</span>
          </Link>
          <Link to="#" className="hover:text-gray-200 flex flex-col items-center">
            <FaList size={32} />
            <span className="text-sm mt-2">Records</span>
          </Link>
          <Link to="#" className="hover:text-gray-200 flex flex-col items-center">
            <FaExchangeAlt size={32} />
            <span className="text-sm mt-2">Transactions</span>
          </Link>
        </nav>

        <button className="mt-auto text-red-400 hover:text-red-600 flex flex-col items-center">
          <FaPowerOff size={32} />
          <span className="text-sm mt-2">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 bg-white rounded-l-3xl shadow-lg flex justify-center items-center">
        <div className="bg-white p-12 rounded-lg shadow-lg w-[80%]">
          <h2 className="text-3xl font-bold text-gray-700 mb-6">Patient</h2>
          <h3 className="font-semibold mb-4">Add Patient Information</h3>
          
          <form className="grid grid-cols-2 gap-6">
            <input type="text" placeholder="First Name *" className="p-4 border rounded-lg" required />
            <input type="text" placeholder="Last Name *" className="p-4 border rounded-lg" required />
            <input type="email" placeholder="Email Id *" className="p-4 border rounded-lg" required />
            <input type="text" placeholder="Mobile Number *" className="p-4 border rounded-lg" required />
            <input type="number" placeholder="Age *" className="p-4 border rounded-lg" required />
            <input type="text" placeholder="Blood Group *" className="p-4 border rounded-lg" required />
            <input type="date" className="p-4 border rounded-lg" required />
            <select className="p-4 border rounded-lg">
              <option>Gender *</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            <select className="p-4 border rounded-lg">
              <option>Marital Status *</option>
              <option>Single</option>
              <option>Married</option>
            </select>
            <input type="text" placeholder="Address" className="p-4 border rounded-lg" />
            <input type="file" className="p-4 border rounded-lg" />
            <input type="text" placeholder="Sugger" className="p-4 border rounded-lg" />

            <button type="submit" className="col-span-2 bg-green-500 text-white p-4 rounded-lg hover:bg-green-600">
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;

