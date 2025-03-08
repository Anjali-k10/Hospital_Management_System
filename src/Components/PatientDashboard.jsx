import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaUserMd, FaPlus, FaUsers, FaList, FaExchangeAlt, FaPowerOff } from "react-icons/fa";
import profileImg from "../assets/profile.png";

const PatientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [showForm2, setShowForm2] = useState(false); // State to toggle form visibility

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="flex w-screen bg-gradient-to-br from-blue-300 to-blue-500">
      {/* Sidebar */}
      <aside className="w-52 bg-blue-400 text-white flex flex-col justify-between py-6 items-center h-[calc(98vh-4rem)]">
        {/* Top Section */}
        <div className="flex flex-col items-center space-y-6">
          {/* Profile (Click to show form) */}
          <img
            src={profileImg}
            alt="User Profile"
            className="w-12 h-12 rounded-full cursor-pointer"
            onClick={() => setShowForm(true)}
          />

          {/* Navigation Icons */}
          <nav className="flex flex-col space-y-8">
            <Link to="#" className="hover:text-gray-200 flex flex-col items-center">
              <FaUserMd  onClick={() => setShowForm2(true)} size={28} />
              <span className="text-xs mt-1">Profile</span>
            </Link>
            <Link to="#" className="hover:text-gray-200 flex flex-col items-center">
              <FaPlus size={28} />
              <span className="text-xs mt-1">Appointment</span>
            </Link>
            <Link to="#" className="hover:text-gray-200 flex flex-col items-center">
              <FaUsers size={28} />
              <span className="text-xs mt-1">Patients</span>
            </Link>
            <Link to="#" className="hover:text-gray-200 flex flex-col items-center">
              <FaList size={28} />
              <span className="text-xs mt-1">Reports</span>
            </Link>
            <Link to="#" className="hover:text-gray-200 flex flex-col items-center">
              <FaExchangeAlt size={28} />
              <span className="text-xs mt-1">Transactions</span>
            </Link>
          </nav>
        </div>

        {/* Logout at the Bottom */}
        <button className="text-white-400 hover:text-red-600 flex flex-col items-center">
          <FaPowerOff size={28} />
          <span className="text-xs">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 bg-white shadow-lg flex justify-center items-center h-[calc(98vh-4rem)]">
        {showForm ? (
          <div className="bg-white p-6 rounded-lg shadow-lg w-[70%] border border-gray-200 max-h-[80vh] overflow-y-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Patient</h2>
            <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">Add Patient Information</h3>

            <form className="grid grid-cols-2 gap-6">
      {/* First Row */}
      <div className="flex flex-col">
        <label className="text-gray-600 font-medium mb-1">First Name *</label>
        <input type="text" className="p-2 border-gray-400 border rounded-lg w-full bg-white text-gray-900" required />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-600 font-medium mb-1">Last Name *</label>
        <input type="text" className="p-2 border-gray-400 border rounded-lg w-full bg-white text-gray-900" required />
      </div>

      {/* Second Row */}
      <div className="flex flex-col">
        <label className="text-gray-600 font-medium mb-1">Email Id *</label>
        <input type="email" className="p-2 border-gray-400 border rounded-lg w-full bg-white text-gray-900" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">Mobile Number *</label>
          <input type="text" className="p-2 border-gray-400 border rounded-lg w-full bg-white text-gray-900" required />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">Age *</label>
          <input type="number" className="p-2 border-gray-400 border rounded-lg w-full bg-white text-gray-900" required />
        </div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">Gender *</label>
          <select className="p-2 border-gray-400 border rounded-lg w-full bg-white text-gray-900">
            {/* <option>Select Gender</option> */}
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">Marital Status *</label>
          <select className="p-2 border-gray-400 border  rounded-lg w-full bg-white text-gray-900">
            {/* <option>Select Status</option> */}
            <option>Single</option>
            <option>Married</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">Blood Group *</label>
          <input type="text" className="p-2 border-gray-400 border rounded-lg w-full bg-white text-gray-900" required />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">Date of Birth *</label>
          <input type="date" className="p-2 border-gray-400 border rounded-lg w-full bg-white text-gray-900" required />
        </div>
      </div>

      {/* Fourth Row (Full Width Address Field) */}
      <div className="col-span-2 flex flex-col">
        <label className="text-gray-600 font-medium mb-1">Address *</label>
        <input className="p-2 border-gray-400 border rounded-lg w-full bg-white text-gray-900" ></input>
      </div>

      {/* Fifth Row */}
      <div className="flex flex-col">
        <label className="text-gray-600 font-medium mb-1">Upload Image</label>
        <input type="file" className="p-2 border-gray-400 border rounded-lg w-full bg-white text-gray-900" />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-600 font-medium mb-1">Sugger</label>
        <input type="text" className="p-2 border-gray-400 border rounded-lg w-full bg-white text-gray-900" />
      </div>

      {/* Submit Button */}
      <div className="col-span-2 flex justify-center">
        <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg w-full max-w-xs hover:bg-green-600">
          Save
        </button>
      </div>
    </form>
          </div>
        ) : (
          <h2 className="text-2xl text-gray-700 font-semibold">Hope you are fine 😊</h2>
        )},
        
      </main>
    </div>
  );
};

export default PatientDashboard;










