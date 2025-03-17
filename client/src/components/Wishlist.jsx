import React, { lazy, useState, useEffect } from "react";
import axios from "axios";

const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));

const Wishlist = () => {
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("userId");

  const getFavorite = async () => {
    try {
      console.log("Token:", token);
      console.log("User ID:", user_id);

      const response = await axios.get("http://localhost:8000/api/favorites", {
        params: { user_id },
        headers: { Authorization: `Bearer ${token}` },
      });

      // Ensure response.data is an array
      setWishList(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setError("Failed to fetch wishlist. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user_id && token) {
      getFavorite();
    } else {
      setError("User not authenticated.");
      setLoading(false);
    }
  }, [user_id, token]);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h1>

        {loading ? (
          <p>Loading wishlist...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : wishList.length === 0 ? (
          <p>No items in wishlist.</p>
        ) : (
          <ul className="space-y-4">
            {wishList.map((item) => (
              <li key={item.id} className="border p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold">{item.property_name}</h2>
                <p>{item.location}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
