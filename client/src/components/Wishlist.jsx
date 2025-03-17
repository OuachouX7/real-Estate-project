import React, { lazy } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
const Navbar = lazy(() => import("./Navbar"));

const Wishlist = () => {
  const [wishList, setWishList] = useState([]);

  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("userId");

  const getFavorite = () => {
    try {
      axios
        .get("http://localhost:8000/api/favorites", {
          params: {
            user_id: user_id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setWishList(res.data.favorites);
          console.log(res.data.favorites);
        })
        .catch((error) => {
          console.error("Error fetching favorites:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFavorite = async (propertyId) => {
    try {
      await axios.delete(`http://localhost:8000/api/favorites/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishList(wishList.filter((favorite) => favorite.property.id !== propertyId));
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };

  useEffect(() => {
    getFavorite();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishList.map((favorite, index) => (
          <div key={favorite.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
            <img
              src={`http://localhost:8000/storage/images/${favorite.property.images[0].image_url}`}
              alt={favorite.property.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{favorite.property.title}</h2>
            <p className="text-gray-700 mb-4">{favorite.property.description}</p>
            <p className="text-gray-900 font-semibold">Price: ${favorite.property.price}</p>
            <p className="text-gray-900 font-semibold">Location: {favorite.property.location}</p>
            <button
              onClick={() => deleteFavorite(favorite.property.id)}
              className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Wishlist;