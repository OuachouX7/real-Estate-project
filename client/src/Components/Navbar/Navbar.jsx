import React, { use } from "react";
import { useState , useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Property.webp";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const activePath = location.pathname;

  const token = sessionStorage.getItem("token");
  const profilePicture = localStorage.getItem("profilePicture");

  const [arrow , SetArrow] = useState(false);
  const [users, setUsers] = useState([]);

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
  const getUsers = async () => {  
    try {
      axios
        .get("http://localhost:8000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((e) => {
          localStorage.setItem("userId", e.data.data.id);
          setUsers(e.data.data);
        })
        .catch((e) => console.error("Error fetching users:", e));
    } catch (e) {
      console.log(e);
    }
  };
  const isAdmin = users.find((user) => user.role === "admin");

  useEffect(() => {
    getUsers();
  }, []);

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
            <button  onClick={() => SetArrow(!arrow)}>

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
              {arrow && isAdmin && (
                <div className={!isAdmin ? "absolute top-5 right-0 bg-white shadow-md p-4" : "hidden"}>
                  <Link to="/add" className="block hover:text-blue-600">
                    Add Property
                  </Link>
                </div>
              )}
              {arrow && (
                <div className={isAdmin ? "absolute top-5 right-0 bg-white shadow-md p-4" : "hidden"}>
                  <Link to="/wishlist" className="block hover:text-blue-600">
                    Wishlist
                  </Link>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
