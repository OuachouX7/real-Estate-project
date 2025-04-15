import React, { lazy, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
import { useTranslation } from "react-i18next";
const Wishlist = () => {
  const [wishList, setWishList] = useState([]),
    [loading, setLoading] = useState(!0),
    [error, setError] = useState(null),
    {t} = useTranslation(),
    navigate = useNavigate(),
    token = sessionStorage.getItem("token"),
    userId = localStorage.getItem("userId"),
    getFavorite = () => {
      axiosInstance
        .get("/favorites", {
          params: { user_id: userId },
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((e) => {
          setWishList(e.data.favorites), console.log(e.data);
        })
        .catch((e) => {
          console.error("Error fetching favorites:", e), setError(e.message);
        })
        .finally(() => {
          setLoading(!1);
        });
    },
    deleteFavorite = (e) => {
      axiosInstance
        .delete(`/deleteFavorite/${e}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          getFavorite();
        })
        .catch((e) => {
          console.error("Error deleting favorite:", e), setError(e.message);
        });
    },
    viewDetails = (e) => {
      navigate(`/property/${e}`);
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
      <div className="p-6 min-h-[500px]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {t("My Wishlist")}
      </h1>
      {wishList.length === 0 ? (
        <p className="text-gray-500">{t("No items in wishlist.")}</p>
      ) : (
        <ul className="w-full flex justify-start flex-wrap">
          {wishList.map((listing, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg shadow-lg w-[20%] mx-2 h-1/2 my-2 overflow-hidden border-gray-200"
            >
              <img
                src={`http://localhost:8000/storage/images/${listing.property.images[0].image_url}`}
                alt={`${t("Property image")} ${index}`}
                loading="lazy"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2" style={{ color: "#123763" }}>
                  {listing.property.title}
                </h3>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <span className="mr-1">{t("Location Prefix")}</span>
                  {listing.property.location}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">
                    {listing.property.price} {t("Price Unit")}
                  </span>
                  <div className="flex space-x-4">
                    <button
                      className="text-white px-1 py-1 rounded-md"
                      onClick={() => viewDetails(listing.property.id)}
                      aria-label={t("View Details")}
                    >
                      {/* view icon */}
                      {/* ... SVG code ... */}
                    </button>
                    <button
                      className="text-white px-1 py-1 rounded-md"
                      onClick={() => deleteFavorite(listing.id)}
                      aria-label={t("Delete")}
                    >
                      {/* delete icon */}
                      {/* ... SVG code ... */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
    </>
  );
};

export default Wishlist;
