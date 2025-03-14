import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Property.png";
import axios from "axios";

const Navbar = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const profilePictureFromStorage = localStorage.getItem("profilePicture");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUsers(res.data))
        .catch((err) => console.error("Error fetching users:", err));
    }
  }, [token]);

  const handleLogOut = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/logout",
        { token },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.clear();
      window.location.reload();
    }
  };

  const isAdmin = users.find(
    (user) => user.role == "admin" && user.id == userId
  );

  return (
    <div className="w-full flex justify-between items-center bg-white shadow-lg px-8 py-4">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
      </div>
      <div>
        <ul className="flex space-x-8">
          <NavItem to="/" label="Home" />
          <NavItem to="/properties" label="Properties" />
          <NavItem to="/about" label="About" />
          <NavItem to="/contact" label="Contact" />

          {isAdmin && <NavItem to="/add" label="Add Property" />}
          {!isAdmin && <NavItem to="/wishlist" label="Wishlist" />}
        </ul>
      </div>
      <div className="flex items-center space-x-6">
        {!token ? (
          <>
            <Link
              to="/sign-up"
              className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-all"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all"
            >
              Login
            </Link>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <img
              src={
                profilePictureFromStorage
                  ? `http://localhost:8000/storage/images/${profilePictureFromStorage}`
                  : "https://via.placeholder.com/40"
              }
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
const NavItem = ({ to, label }) => (
  <Link
    to={to}
    className="text-gray-800 font-semibold hover:text-gray-900 transition-all"
  >
    {label}
  </Link>
);

export default Navbar;
