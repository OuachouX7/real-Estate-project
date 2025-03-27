import { useEffect, useState, lazy } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaBed, FaBath, FaCar } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Footer = lazy(() => import("../../Components/Footer/Footer"));
const Navbar = lazy(() => import("../../Components/Navbar/Navbar"));
const LocationMap = lazy(() => import("../../Components/Map/LocationMap"));

const PropertyDetails = () => {
  const { id: t } = useParams(),
    [property, setProperty] = useState(null),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(null),
    [description, setDescription] = useState([]),
    [selectedImageIndex, setSelectedImageIndex] = useState(null), // Track the index of the selected image
    token = sessionStorage.getItem("token"),
    userId = localStorage.getItem("userId"),
    navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/properties/${t}`
        );
        if (!response.ok) throw new Error("Failed to fetch property details");
        const data = await response.json();
        setProperty(data);
        setDescription(data.description.split(/\s+/));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [t]);

  const handleFavorite = (propertyId) => {
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .post(
        "http://localhost:8000/api/addFavorite",
        { user_id: userId, property_id: propertyId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChat = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    navigate("/chat/9e36109f-9563-4d05-95e2-c9f1a92e78t9");
  };

  const openImageModal = (index) => {
    setSelectedImageIndex(index); // Set the index of the selected image
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null); // Close the modal
  };

  const showNextImage = () => {
    if (property.images && selectedImageIndex !== null) {
      setSelectedImageIndex(
        (prevIndex) => (prevIndex + 1) % property.images.length
      );
    }
  };

  const showPreviousImage = () => {
    if (property.images && selectedImageIndex !== null) {
      setSelectedImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + property.images.length) % property.images.length
      );
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <>
      <Navbar />
      <nav className="flex items-center space-x-2 bg-white p-8 rounded-lg">
        <Link to="/" className="text-gray-600 font-semibold hover:underline">
          Home
        </Link>
        <span className="text-gray-400">&gt;</span>
        <Link
          to="/properties"
          className="text-gray-600 font-semibold hover:underline"
        >
          Properties
        </Link>
        <span className="text-gray-400">&gt;</span>
        <span className="text-blue-600 font-semibold hover:underline">
          {property.title}
        </span>
      </nav>
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex w-full justify-between items-center">
            <h1 className="text-4xl font-bold" style={{ color: "#123763" }}>
              {property.title}
            </h1>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => handleFavorite(property.id)}
            >
              Add to Favorites
            </button>
          </div>
          <p className="text-gray-600 flex items-center mt-2">
            <FaMapMarkerAlt className="text-blue-500 mr-2" />{" "}
            {property.location}
          </p>
          <div className="mt-6">
            <div className="grid grid-cols-3 gap-4 mt-4">
              {property.images?.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:8000/storage/images/${img.image_url}`}
                  alt={`Gallery ${index + 1}`}
                  className="h-64 object-cover rounded-md cursor-pointer"
                  onClick={() => openImageModal(index)}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8 mt-8">
            <div className="col-span-2 w-fit">
              <h2
                className="text-3xl font-semibold"
                style={{ color: "#123763" }}
              >
                Description
              </h2>
              {description?.map((desc, index) => (
                <p key={index} className="text-gray-700">
                  {desc}
                </p>
              ))}
              <button
                className="bg-green-500 text-white px-3 py-2 rounded-full fixed bottom-10 right-10 z-10"
                onClick={handleChat}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  color="white"
                  fill="none"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.3789 2.27907 14.6926 2.78382 15.8877C3.06278 16.5481 3.20226 16.8784 3.21953 17.128C3.2368 17.3776 3.16334 17.6521 3.01642 18.2012L2 22L5.79877 20.9836C6.34788 20.8367 6.62244 20.7632 6.87202 20.7805C7.12161 20.7977 7.45185 20.9372 8.11235 21.2162C9.30745 21.7209 10.6211 22 12 22Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.58815 12.3773L9.45909 11.2956C9.82616 10.8397 10.2799 10.4153 10.3155 9.80826C10.3244 9.65494 10.2166 8.96657 10.0008 7.58986C9.91601 7.04881 9.41086 7 8.97332 7C8.40314 7 8.11805 7 7.83495 7.12931C7.47714 7.29275 7.10979 7.75231 7.02917 8.13733C6.96539 8.44196 7.01279 8.65187 7.10759 9.07169C7.51023 10.8548 8.45481 12.6158 9.91948 14.0805C11.3842 15.5452 13.1452 16.4898 14.9283 16.8924C15.3481 16.9872 15.558 17.0346 15.8627 16.9708C16.2477 16.8902 16.7072 16.5229 16.8707 16.165C17 15.8819 17 15.5969 17 15.0267C17 14.5891 16.9512 14.084 16.4101 13.9992C15.0334 13.7834 14.3451 13.6756 14.1917 13.6845C13.5847 13.7201 13.1603 14.1738 12.7044 14.5409L11.6227 15.4118"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
              </button>
              <h3
                className="text-3xl font-semibold mt-6"
                style={{ color: "#123763" }}
              >
                Details
              </h3>
              <div className="grid grid-cols-1 gap-4 mt-2">
                <p className="text-gray-700">
                  <strong>Price :</strong> {property.price} DH
                </p>

                <p className="text-gray-700">
                  <strong>Available :</strong>{" "}
                  {property.available ? "No" : "Yes"}
                </p>
                <p className="text-gray-700">
                  <strong>Category :</strong> {property.category}
                </p>
                <p className="text-gray-700">
                  <strong>Frequency :</strong> {property.rentalFrequency}
                </p>
              </div>
            </div>
            <div className="w-full">
              <LocationMap location={property.location} />
            </div>
          </div>
        </div>
      </div>

      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeImageModal}
        >
          <div className="relative">
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black px-3 py-2 ml-1 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                showPreviousImage();
              }}
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
                  d="M3.99982 11.9998L19.9998 11.9998"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.99963 17C8.99963 17 3.99968 13.3176 3.99966 12C3.99965 10.6824 8.99966 7 8.99966 7"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <img
              src={`http://localhost:8000/storage/images/${property.images[selectedImageIndex].image_url}`}
              alt="Zoomed"
              className="max-w-full max-h-full rounded-md"
            />
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black px-3 py-2 mr-1 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                showNextImage();
              }}
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
                  d="M20.0001 11.9998L4.00012 11.9998"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.0003 17C15.0003 17 20.0002 13.3176 20.0002 12C20.0002 10.6824 15.0002 7 15.0002 7"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default PropertyDetails;
