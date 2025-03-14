import { useEffect, useState, lazy } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { FaMapMarkerAlt, FaBed, FaBath, FaCar } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Footer = lazy(() => import("../Components/Footer"));

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/properties/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleFavorite = (id) => {
    if (!token) {
      navigate("/login");
    }
    try {
      axios
        .post(
          "http://localhost:8000/api/addFavorite",
          {
            user_id: userId,
            property_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(property);

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800">{property.title}</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => handleFavorite(property.id)}
          >
            Add to Favorites
          </button>
        </div>
        <p className="text-gray-600 flex items-center mt-2">
          <FaMapMarkerAlt className="text-blue-500 mr-2" /> {property.location}
        </p>
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-4 mt-4">
            {property.images?.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:8000/storage/images/${img.image_url}`}
                alt={`Gallery ${index}`}
                className="rounded-md"
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 mt-8">
          <div className="col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Description
            </h2>
            <p className="text-gray-600">{property.description}</p>
            <button className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600 mt-4" onClick={() => navigate(`/chat/${"9e36109f-9563-4d05-95e2-c9f1a92e78t9"}`)}>Chat</button>
            <h3 className="text-xl font-semibold mt-6">Overview</h3>
            <div className="flex items-center space-x-6 mt-2">
              <span className="flex items-center text-gray-700">
                <FaBed className="text-blue-500 mr-2" /> {property.bedrooms}{" "}
                Bedrooms
              </span>
              <span className="flex items-center text-gray-700">
                <FaBath className="text-blue-500 mr-2" /> {property.bathrooms}{" "}
                Bathrooms
              </span>
              <span className="flex items-center text-gray-700">
                <FaCar className="text-blue-500 mr-2" /> {property.garage}{" "}
                Garage
              </span>
            </div>
            <h3 className="text-xl font-semibold mt-6">Details</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <p className="text-gray-700">
                <strong>Property ID:</strong> {property.id}
              </p>
              <p className="text-gray-700">
                <strong>Price:</strong> ${property.price}
              </p>
            </div>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold text-gray-900">
                ${property.price} / Night
              </p>
              <div className="flex items-center text-yellow-500">
                <AiFillStar className="mr-1" />{" "}
                <span className="font-semibold">{property.rating}</span>
                <span className="text-gray-500 text-sm ml-1">
                  ({property.reviews} Reviews)
                </span>
              </div>
            </div>
            <form className="mt-4">
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                placeholder="Your Full Name"
                className="w-full p-2 border rounded mt-1"
              />

              <label className="block text-gray-700 font-medium mt-3">
                Email
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 border rounded mt-1"
              />

              <label className="block text-gray-700 font-medium mt-3">
                Date
              </label>
              <input type="date" className="w-full p-2 border rounded mt-1" />

              <button
                type="submit"
                className="w-full bg-orange-500 text-white px-4 py-2 rounded mt-4 hover:bg-orange-600 transition"
              >
                Reserve
              </button>
            </form>

            <p className="text-gray-500 text-sm mt-3">
              Certain reservations may also require a security deposit.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PropertyDetails;
