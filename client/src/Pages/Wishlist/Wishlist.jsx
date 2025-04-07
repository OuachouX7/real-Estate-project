import React, { lazy, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
const Wishlist = () => {
  const [wishList, setWishList] = useState([]),
    [loading, setLoading] = useState(!0),
    [error, setError] = useState(null),
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h1>
        {wishList.length === 0 ? (
          <p className="text-gray-500">No items in wishlist.</p>
        ) : (
          <ul className="w-full flex justify-start flex-wrap">
            {wishList.map((listing, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg shadow-lg w-[20%] mx-2 h-1/2 my-2 overflow-hidden border-gray-200 "
              >
                <img
                  key={index}
                  src={`http://localhost:8000/storage/images/${listing.property.images[0].image_url}`}
                  alt={`Gallery ${index}`}
                  loading="lazy"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3
                    className="text-lg font-semibold mb-2 "
                    style={{ color: "#123763" }}
                  >
                    {listing.property.title}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <span className="mr-1">📍</span> {listing.property.location}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                      {listing.property.price}
                    </span>
                    <div className="flex space-x-4">
                      <button
                        className=" text-white px-1 py-1 rounded-md "
                        onClick={() => viewDetails(listing.property.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          color="#000000"
                          fill="none"
                        >
                          <path
                            d="M19.4 19.4L22 22M20.7 14.85C20.7 11.6191 18.0809 9 14.85 9C11.6191 9 9 11.6191 9 14.85C9 18.0809 11.6191 20.7 14.85 20.7C18.0809 20.7 20.7 18.0809 20.7 14.85Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M19.075 19.075L22 22M12.9 14.85H14.85M14.85 14.85H16.8M14.85 14.85V12.9M14.85 14.85V16.8M20.7 14.85C20.7 11.6191 18.0809 9 14.85 9C11.6191 9 9 11.6191 9 14.85C9 18.0809 11.6191 20.7 14.85 20.7C18.0809 20.7 20.7 18.0809 20.7 14.85Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2 6C2.1305 4.6645 2.4262 3.7663 3.09625 3.09625C3.7663 2.4262 4.6645 2.1305 6 2M6 22C4.6645 21.8695 3.7663 21.5738 3.09625 20.9037C2.4262 20.2337 2.1305 19.3355 2 18M22 6C21.8695 4.6645 21.5738 3.7663 20.9037 3.09625C20.2337 2.4262 19.3355 2.1305 18 2M2 10L2 14M14 2L10 2"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                        </svg>
                      </button>
                      <button
                        className=" text-white px-1 py-1 rounded-md"
                        onClick={() => deleteFavorite(listing.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          color="#ff0000"
                          fill="none"
                        >
                          <path
                            d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                          <path
                            d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                          <path
                            d="M9.5 16.5L9.5 10.5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                          <path
                            d="M14.5 16.5L14.5 10.5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                        </svg>
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
