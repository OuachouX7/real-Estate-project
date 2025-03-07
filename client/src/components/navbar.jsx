import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Property.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="navbar w-full flex justify-between items-center p-6 bg-white shadow-md">
      <div>
        <img src={logo} alt="Logo" width={100} />
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
      <div className="flex space-x-4">
        {!token && <Link to="/sign-up" className="text-gray-700 hover:text-gray-900">
          Sign up
        </Link>}
        {!token && (
          <Link to="/login" className="text-gray-700 hover:text-gray-900">
            Login
          </Link>
        )}
        {
          token && (
            <button onClick={handleLogOut}>Logout</button>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
