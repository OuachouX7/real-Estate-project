import { useEffect, useState, lazy } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaBed, FaBath, FaCar } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
import { useTranslation } from "react-i18next";
const LocationMap = lazy(() => import("../../Components/Map/LocationMap"));

const PropertyDetails = () => {
  const { id } = useParams(),
    [property, setProperty] = useState(null),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(null),
    [description, setDescription] = useState([]),
    [selectedImageIndex, setSelectedImageIndex] = useState(null),
    { t } = useTranslation(),
    token = sessionStorage.getItem("token"),
    userId = localStorage.getItem("userId"),
    navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axiosInstance.get(`/properties/${id}`);
        setProperty(response.data);
        setDescription(response.data.description.split(/ {2,}/));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleFavorite = (propertyId) => {
    if (!token) {
      navigate("/login");
      return;
    }
    axiosInstance
      .post(
        "/addFavorite",
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
    navigate("/chat/67fe94bc4a1b171b2e850d56");
  };

  const openImageModal = (index) => {
    setSelectedImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
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
      <nav className="flex items-center space-x-2 bg-white p-8 rounded-lg">
        <Link to="/" className="text-gray-600 font-semibold hover:underline">
          {t("Home")}
        </Link>
        <span className="text-gray-400">&gt;</span>
        <Link
          to="/properties"
          className="text-gray-600 font-semibold hover:underline"
        >
          {t("Properties")}
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
              className=" text-white px-4 py-2 rounded-md"
              onClick={() => handleFavorite(property.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="w-8 h h-8"
              >
                <path d="M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16z" />
              </svg>
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
          <div className="flex justify-between w-full items-end mt-8">
            <div className="w-[45%]">
              <h2
                className="text-3xl font-semibold"
                style={{ color: "#123763" }}
              >
                {t("Description")}
              </h2>
              <br></br>
              {description?.map((desc, index) => (
                <p key={index} className="text-gray-700">
                  {desc}
                </p>
              ))}
              <div className="flex flex-col justify-between fixed bottom-10 right-10 z-10">
                <button
                  className="bg-blue-500 text-white px-4 py-3 rounded-full"
                  onClick={handleChat}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    color="#fff"
                    fill="none"
                  >
                    <path
                      d="M8.5 14.5H15.5M8.5 9.5H12"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <a
                  href="https://wa.me/+212677172512"
                  target="_blank"
                  className="bg-green-400 text-white px-4 py-3 rounded-full mt-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    color="#ffffff"
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
                </a>
              </div>
              <h3
                className="text-3xl font-semibold mt-6"
                style={{ color: "#123763" }}
              >
                {t("Details")}
              </h3>
              <br></br>
              <div className="grid grid-cols-1 gap-4 mt-2">
                <p className="text-gray-700">
                  <strong>{t("Price")} :</strong> {property.price} DH
                </p>

                <p className="text-gray-700">
                  <strong>{t("Available")} :</strong>{" "}
                  {property.available ? "No" : "Yes"}
                </p>
                <p className="text-gray-700">
                  <strong>{t("Category")} :</strong> {property.category}
                </p>
                <p className="text-gray-700">
                  <strong>{t("Frequency")} :</strong> {property.rentalFrequency}
                </p>
                <p className="text-gray-700">
                  <strong>{t("Contact")} :</strong> {"0677172512"}
                </p>
              </div>
            </div>
            <div className={selectedImageIndex !== null ? "hidden" : "w-[50%]"}>
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
    </>
  );
};

export default PropertyDetails;
