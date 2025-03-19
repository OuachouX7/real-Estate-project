import React, { useState, useEffect } from "react";
import { lazy } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const getProperties = async (page) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/properties?page=${page}`
      );
      setProperties(res.data.data);
      setCurrentPage(res.data.current_page);
      setTotalPages(res.data.last_page);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProperties(currentPage);
  }, [currentPage]);

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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = (id) => {
    try {
      axios
        .delete(`http://localhost:8000/api/deleteProperty/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          getProperties(currentPage);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const isAdmin = users.find(
    (user) => user.role == "admin" && user.id == userId
  );

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Properties</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((listing, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={`http://localhost:8000/storage/images/${listing.images[0].image_url}`}
                alt={listing.title}
                className="w-full h-48 object-cover"
                onClick={() => navigate(`/property/${listing.id}`)}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <span className="mr-1">📍</span> {listing.location}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">{listing.price}</span>
                  {isAdmin && (
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      onClick={() => handleDelete(listing.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Properties;
