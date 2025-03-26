import React from "react";
import { lazy } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Navbar = lazy(() => import("../Components/Navbar"));
const Footer = lazy(() => import("../Components/Footer"));

const Users = () => {
  const [users, setUsers] = useState([]),
    token = sessionStorage.getItem("token"),
    userId = localStorage.getItem("userId"),
    navigate = useNavigate(),
    getUser = () => {
      try {
        axios
          .get("http://localhost:8000/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((e) => {
            setUsers(e.data.data);
          })
          .catch((e) => console.error("Error fetching users:", e));
      } catch (e) {
        console.log(e);
      }
    },
    Users = users.filter((e) => "user" === e.role);
  useEffect(() => {
    getUser();
  }, []),
    console.log(users);
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Users</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Users.map((user) => (
            <div
              key={user.id}
              className="border p-4 rounded-lg shadow-lg flex flex-col items-center bg-white"
            >
              <img
                className="w-24 h-24 rounded-full mb-4"
                src={`http://localhost:8000/storage/images/${user.profile_picture}`}
                alt={user.name}
              />
              <p className="text-lg font-semibold mb-2">{user.name}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={() => navigate(`/chat/${user.id}`)}
              >
                Chat
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Users;
