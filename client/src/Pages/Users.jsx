import React from "react";
import { lazy } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Navbar = lazy(() => import("../Components/Navbar"));
const SearchBar = lazy(() => import("../Components/SearchBar"));
const Footer = lazy(() => import("../Components/Footer"));

const Users = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const getUser = () => {
    try {
      axios
        .get("http://localhost:8000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUsers(res.data.data);
        })
        .catch((err) => console.error("Error fetching users:", err));
    } catch (error) {
      console.log(error);
    }
  };

  const Users = users.filter((user) => user.role === "user");

  useEffect(() => {
    getUser();
  }, []);

  console.log(users);

  return (
    <>
      <Navbar />
      <SearchBar />
      <div>
        {Users.map((user) => (
          <>
            <div key={user.id}></div>
            <p>{user.name}</p>
            <img
              className="w-10 h-10 rounded-full"
              src={`http://localhost:8000/storage/images/${user.profile_picture}`}
              alt={user.name}
            />
            <button onClick={() => navigate(`/chat/${user.id}`)}>Chat</button>
          </>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Users;
