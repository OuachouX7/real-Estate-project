import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../Hooks/useUser";
import useUsers from "../../Hooks/useUsers";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const Users = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [matchedUsers, setMatchedUsers] = useState([]);

  const users = useUser();

  const users2 = useUsers("/users");
  useEffect(() => {
    const filteredUsers = users.filter((user) => user.role === "user");
    const filteredUsers2 = users2.filter((user) => user.role === "user");

    const matches = filteredUsers
      .map((user1) => {
        const match = filteredUsers2.find(
          (user2) => user2.email === user1.email && user2.name === user1.name
        );
        if (match) {
          return {
            _id: user1._id,
            profile_picture: match.profile_picture,
            email: match.email,
            name: match.name,
          };
        }
        return null;
      })
      .filter(Boolean);

    setMatchedUsers(matches);
  }, [users, users2]);

  return (
    <>
      <Helmet>
        <title>{t("User Directory")}</title>
        <meta name="description" content={t("User Directory")} />
        <meta name="keywords" content="user, directory, chat" />        
      </Helmet>
      <div className="max-w-7xl mx-auto p-6 min-h-[600px]">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          {t("User Directory")}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {matchedUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl overflow-hidden"
            >
              <div className="relative">
                <img
                  className="w-full h-48 object-contain rounded-t-lg"
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
                  type="button"
                  aria-label="Start Chat"
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => navigate(`/chat/${user._id}`)}
                >
                  {t("Start Chat")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Users;
