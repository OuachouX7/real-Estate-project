import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUsers from "../../Hooks/useUsers";
import { useTranslation } from "react-i18next";

const Users = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const users = useUsers("/users");

  const filteredUsers = users.filter((user) => user.role === "user");

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-[600px]">
    <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
      {t("User Directory")}
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {filteredUsers.map((user) => (
        <div
          key={user.id}
          className="bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl overflow-hidden"
        >
          <div className="relative">
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={`http://localhost:8000/storage/images/${user.profile_picture}`}
              alt={user.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
            <div className="absolute bottom-4 left-4 text-white font-semibold text-xl z-10">
              {user.name}
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-600">{user.email}</p>
            <button
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => navigate(`/chat/${user.id}`)}
            >
              {t("Start Chat")}
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Users;
