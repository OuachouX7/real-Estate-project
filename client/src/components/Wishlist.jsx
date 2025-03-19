import React, { lazy, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Navbar = lazy(() => import("./Navbar"));

const Wishlist = () => {
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const getFavorite = () => {
    axios
      .get("http://localhost:8000/api/favorites", {
        params: {
          user_id: userId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setWishList(res.data.favorites);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteFavorite = (id) => {
    axios
      .delete(`http://localhost:8000/api/deleteFavorite/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getFavorite();

      })
      .catch((error) => {
        console.error("Error deleting favorite:", error);
        setError(error.message);
      });
  };

  const viewDetails = (id) => {
    navigate(`/property/${id}`);
  };

  useEffect(() => {
    getFavorite();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h1>
        {wishList.length === 0 ? (
          <p className="text-gray-500">No items in wishlist.</p>
        ) : (
          <ul className="space-y-4">
            {wishList.map((w) => (
              <li
                key={w.id}
                className="border p-4 rounded-lg shadow-lg flex flex-col bg-white"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {w.property.title}
                </h2>
                <p className="text-gray-600 mb-2">{w.property.location}</p>
                <p className="text-gray-600 mb-2">${w.property.price}</p>
                <p className="text-gray-600 mb-4">{w.property.description}</p>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {w.property.images.map((img, index) => (
                    <img
                      key={index}
                      src={`http://localhost:8000/storage/images/${img.image_url}`}
                      alt={`Gallery ${index}`}
                      className="rounded-md"
                    />
                  ))}
                </div>
                <div className="flex space-x-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={() => viewDetails(w.property.id)}
                  >
                    View Details
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={() => deleteFavorite(w.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Wishlist;
