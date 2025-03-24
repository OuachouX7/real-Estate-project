import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Property.webp";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const activePath = location.pathname;

  const token = sessionStorage.getItem("token");
  const profilePicture = localStorage.getItem("profilePicture");
  const userId = localStorage.getItem("userId");

  const handleLogOut = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      sessionStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="w-full flex justify-between items-center bg-white shadow-md px-10 py-5">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
      </div>

      <ul className="flex space-x-8 text-lg font-light">
        {["Home", "Explore", "Properties", "About", "Contact"].map((item) => {
          const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
          const isActive = activePath === path;

          return (
            <li key={item}>
              <Link
                to={path}
                className={`${
                  isActive
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                    : "text-gray-500  hover:text-blue-700"
                } transition-all pb-1`}
              >
                {item}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center space-x-6">
        {!token ? (
          <>
            <Link
              to="/sign-up"
              className="bg-blue-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-700 transition-all"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="border border-blue-600 text-blue-600 px-5 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all"
            >
              Login
            </Link>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            {profilePicture && (
              <img
                src={`http://localhost:8000/storage/images/${profilePicture}`}
                alt="Profile"
                loading="lazy"
                className="w-12 h-12 rounded-full object-cover shadow-md"
              />
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
