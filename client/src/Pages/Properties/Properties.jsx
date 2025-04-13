import React, { useState, useEffect } from "react";
import { lazy } from "react";
import { useNavigate, Link } from "react-router-dom";
import useUsers from "../../Hooks/useUsers";
import axiosInstance from "../../axios/axiosInstance";
import { useTranslation } from "react-i18next";

const Spinner = lazy(() => import("../../Components/Loading/Spinner"));

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = sessionStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const {t,i18n} = useTranslation();
  const navigate = useNavigate();

  const getProperties = async (page) => {
    try {
      const response = await axiosInstance.get(
        `/properties?page=${page}`
      );
      setProperties(response.data.data);
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProperties(currentPage);
  }, [currentPage]);

  const users = useUsers("http://localhost:8000/api/users");

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

  const handleDelete = async (propertyId) => {
    try {
      await axiosInstance.delete(`/deleteProperty/${propertyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getProperties(currentPage);
    } catch (error) {
      console.log(error);
    }
  };

  const isAdmin = users.find((user) => user.role === "admin" && user.id === userId);

  return (
    <>
  <nav className="flex items-center space-x-2 p-8 rounded-lg">
    <Link to="/" className="text-gray-600 font-semibold hover:underline">
      {t('Home')}
    </Link>
    <span className="text-gray-400">&gt;</span>
    <span className="text-blue-900 font-bold">{t('Properties')}</span>
  </nav>

  <div className="max-w-8xl mx-auto p-6 bg-gray-50">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">{t('Properties')}</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {properties.length > 0 ? (
        properties.map((listing, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow-lg overflow-hidden border-gray-200"
          >
            <img
              src={`http://localhost:8000/storage/images/${listing.images[0].image_url}`}
              alt={listing.title}
              className="w-full h-48 object-cover"
              onClick={() => navigate(`/property/${listing.id}`)}
            />
            <div className="p-4">
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#123763" }}
              >
                {listing.title}
              </h3>

              <div className="flex items-center text-gray-600 text-sm mb-2">
                <span className="mr-1">{t('Location Prefix')}</span> {listing.location}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">
                  {listing.price} {t('Price Unit')}
                </span>

                {isAdmin && (
                  <div className="flex justify-end w-[70%]">
                    <button
                      className="px-4 py-2 mr-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      onClick={() => handleDelete(listing.id)}
                    >
                      {t('Delete')}
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      onClick={() => navigate(`/edit/${listing.id}`)}
                    >
                      {t('Edit')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-[600px] flex">
          <Spinner />
        </div>
      )}
    </div>

    <div className="flex justify-between items-center mt-6">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
      >
        {t('Previous')}
      </button>

      <span className="text-gray-700">
        {t('Page')} {currentPage} {t('of')} {totalPages}
      </span>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
      >
        {t('Next')}
      </button>
    </div>
  </div>
</>

  );
};

export default Properties;