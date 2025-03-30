import React, { use } from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Property.webp";
import axios from "axios";

const AdminNavbar = () => {
  const [arrow, SetArrow] = useState(false);
  const location = useLocation();
  const activePath = location.pathname;
  const token = sessionStorage.getItem("token");
  const profilePicture = localStorage.getItem("profilePicture");

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
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="w-full flex justify-between items-center bg-white shadow-md px-10  py-2 ">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
      </div>

      <ul className="flex space-x-8 text-lg font-{font-poppins}">
        {["Home", "Explore", "Properties", "About", "Contact"].map((item) => {
          const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
          const isActive = activePath === path;

          return (
            <li key={item}>
              <Link
                to={path}
                className={`${
                  isActive
                    ? "text-blue-900 font-semibold "
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
            <button onClick={() => SetArrow(!arrow)}>
              <svg
                className="translate-x-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
              >
                <path
                  d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <div className="z-10 relative">
              {arrow && (
                <div className="absolute top-7 right-0">
                  <div className=" bg-gray-50 shadow-md p-4 border-1 border-gray-200  px-4">
                    <Link
                      to="/add"
                      className="flex justify-start text-start px-4 hover:text-blue-600"
                    >
                      Add
                    </Link>
                  </div>
                  <div className="bg-gray-50 shadow-md p-4  border-1 border-gray-200 px-4">
                    <Link
                      to="/users"
                      className="flex justify-start text-start px-4 hover:text-blue-600"
                    >
                      Users
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
