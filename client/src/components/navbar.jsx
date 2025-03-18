import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Property.png";
import axios from "axios";

const Navbar = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const profilePictureFromStorage = localStorage.getItem("profilePicture");
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUsers(res.data.data);
        })
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
          <Link
            to="/"
            className="text-gray-800 font-semibold hover:text-gray-900 transition-all"
          >
            Home
          </Link>
          <Link
            to="/properties"
            className="text-gray-800 font-semibold hover:text-gray-900 transition-all"
          >
            Properties
          </Link>
          <Link
            to="/about"
            className="text-gray-800 font-semibold hover:text-gray-900 transition-all"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-800 font-semibold hover:text-gray-900 transition-all"
          >
            Contact
          </Link>
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
            {profilePictureFromStorage && (
              <img
                src={
                  profilePictureFromStorage
                    ? `http://localhost:8000/storage/images/${profilePictureFromStorage}`
                    : "https://via.placeholder.com/40"
                }
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            {isAdmin ? (
              <>
                <Link
                  to="/add"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                >
                  Admin
                </Link>
                <Link
                  to="/users"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                >
                  users
                </Link>
              </>
            ) : (
              <Link
                to="/wishlist"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
              >
                {isAdmin ? "Add" : "Wishlist"}
              </Link>
            )}
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

export default Navbar;
