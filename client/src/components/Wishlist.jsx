import React, { lazy, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = lazy(() => import("./Navbar"));
const Footer = lazy(() => import("./Footer"));

const Wishlist = () => {
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const getFavorites = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishList(res.data);
      } catch (err) {
        setError("Failed to fetch wishlist. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getFavorites();
  }, [token, navigate]);

  const handleRemoveFavorite = async (propertyId) => {
    try {
      await axios.delete(`http://localhost:8000/api/removeFavorite/${propertyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishList((prev) => prev.filter((item) => item.id !== propertyId));
    } catch (err) {
      console.error("Failed to remove property from wishlist");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h1>

        {loading && <p className="text-gray-500">Loading wishlist...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {wishList.length === 0 && !loading && !error ? (
          <p className="text-gray-500">No properties in your wishlist yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishList.map((property) => (
              <div key={property.id} className="bg-white shadow-lg p-4 rounded-md">
                <img
                  src={`http://localhost:8000/storage/images/${property.image}`}
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold mt-2">{property.title}</h3>
                <p className="text-gray-500">{property.location}</p>
                <p className="text-gray-700 font-bold mt-2">${property.price}</p>
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => navigate(`/property/${property.id}`)}
                  >
                    View Details
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleRemoveFavorite(property.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
