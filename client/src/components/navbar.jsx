import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Property.png";
import axios from "axios";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const profilePictureFromStorage = localStorage.getItem("profilePicture");

  const handleLogOut = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("profilePicture");
      axios
        .post(
          "http://localhost:8000/api/logout",
          {
            token: token,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .finally(() => {
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex justify-between items-center bg-white shadow-md">
      <div className="p-1 flex justify-center items-center">
        <img src={logo} alt="Logo" className="w-[100px] h-[100px]" />
      </div>
      <div>
        <ul className="flex space-x-4 p-2 rounded-full shadow-lg bg-gray-50">
          <Link to="/">
            <li className="inline-block mx-2 text-gray-700 hover:text-gray-900">
              Home
            </li>
          </Link>
          <Link to="/properties">
            <li className="inline-block mx-2 text-gray-700 hover:text-gray-900">
              Properties
            </li>
          </Link>
          <Link to="/about">
            <li className="inline-block mx-2 text-gray-700 hover:text-gray-900">
              About
            </li>
          </Link>
          <Link to="/contact">
            <li className="inline-block mx-2 text-gray-700 hover:text-gray-900">
              Contact
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex w-[150px] h-[100px] p-1 items-center justify-around">
        {!token && (
          <Link to="/sign-up" className="text-gray-700 hover:text-gray-900">
            Sign up
          </Link>
        )}
        {!token && (
          <Link to="/login" className="text-gray-700 hover:text-gray-900">
            Login
          </Link>
        )}
        {token && (
          <div className="flex items-center justify-around">
            <img
              src={`http://localhost:8000/storage/images/${profilePictureFromStorage}`}
              alt={profilePictureFromStorage}
              className="w-8 h-8 object-cover"
            />
            <button className="ml-1" onClick={handleLogOut}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
