import React, { useState, useEffect } from "react";
import { lazy } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));

const Properties = () => {
  const [properties, setProperties] = useState([]),
    [users, setUsers] = useState([]),
    [currentPage, setCurrentPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    token = sessionStorage.getItem("token"),
    userId = localStorage.getItem("userId"),
    navigate = useNavigate(),
    getProperties = async (e) => {
      try {
        let t = await axios.get(
          `http://localhost:8000/api/properties?page=${e}`
        );
        setProperties(t.data.data),
          setCurrentPage(t.data.current_page),
          setTotalPages(t.data.last_page),
          console.log(t.data);
      } catch (r) {
        console.log(r);
      }
    };
  useEffect(() => {
    getProperties(currentPage);
  }, [currentPage]),
    useEffect(() => {
      token &&
        axios
          .get("http://localhost:8000/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((e) => {
            setUsers(e.data.data);
          })
          .catch((e) => console.error("Error fetching users:", e));
    }, [token]);
  const handleNextPage = () => {
      currentPage < totalPages && setCurrentPage(currentPage + 1);
    },
    handlePreviousPage = () => {
      currentPage > 1 && setCurrentPage(currentPage - 1);
    },
    handleDelete = (e) => {
      try {
        axios
          .delete(`http://localhost:8000/api/deleteProperty/${e}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            getProperties(currentPage);
          });
      } catch (t) {
        console.log(t);
      }
    },
    isAdmin = users.find((e) => "admin" == e.role && e.id == userId);
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
                    <div className="flex justify-between w-[45%]">
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        onClick={() => handleDelete(listing.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        onClick={() => navigate(`/edit/${listing.id}`)}
                      >
                        Edit
                      </button>
                    </div>
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
