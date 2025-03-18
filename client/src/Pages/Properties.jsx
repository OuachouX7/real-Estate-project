import React, { useState, useEffect } from "react";
import { lazy } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Navbar = lazy(() => import("../Components/Navbar"));
const Footer = lazy(() => import("../Components/Footer"));

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const getProperties = async (page) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/properties?page=${page}`);
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

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-4 gap-4 mt-4 p-3">
        {properties.map((listing, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-sm"
            onClick={() => navigate(`/property/${listing.id}`)}
          >
            <img
              src={`http://localhost:8000/storage/images/${listing.images[0].image_url}`}
              alt={listing.title}
              className="w-full h-40 object-contain mb-2"
            />
            <h3 className="text-lg font-semibold">{listing.title}</h3>
            <div className="flex items-center text-gray-600 text-sm">
              <span className="mr-1">📍</span> {listing.location}
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xl font-bold">{listing.price}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end items-center mt-4 p-3 w-[100%]">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700 px-2">
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
      <Footer />
    </>
  );
};

export default Properties;