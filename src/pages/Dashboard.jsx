// src/pages/Dashboard.jsx
import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div className="bg-primary text-white d-flex flex-column p-3" style={{ width: "250px" }}>
        <h3 className="text-center mb-4">My Dashboard</h3>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">
              <FaHome className="me-2" /> Home
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">
              <FaUser className="me-2" /> Profile
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">
              <FaChartBar className="me-2" /> Analytics
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">
              <FaCog className="me-2" /> Settings
            </a>
          </li>
          <li className="nav-item mt-auto">
            <button onClick={handleLogout} className="btn btn-danger w-100">
              <FaSignOutAlt className="me-2" /> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-grow-1 p-4">
        <h2>Welcome, {auth.currentUser?.displayName || auth.currentUser?.email}</h2>
        <p>This is your amazing dashboard with sidebar navigation.</p>

        <div className="row mt-4">
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm p-3">
              <h5>Users</h5>
              <p>Manage all users here.</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm p-3">
              <h5>Analytics</h5>
              <p>View website stats.</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm p-3">
              <h5>Reports</h5>
              <p>Generate reports easily.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
