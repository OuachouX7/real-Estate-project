import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import { FaMapMarkerAlt, FaBed, FaBath, FaCar } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
const Footer = lazy(() => import("../components/footer"));

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/properties/${id}`);
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

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        {/* Title & Location */}
        <h1 className="text-4xl font-bold text-gray-800">{property.title}</h1>
        <p className="text-gray-600 flex items-center mt-2">
          <FaMapMarkerAlt className="text-blue-500 mr-2" /> {property.location}
        </p>

        {/* Image Gallery */}
        <div className="mt-6">
          <img
            src={property.image_url}
            alt={property.title}
            className="w-full h-[400px] object-cover rounded-lg border-2 border-blue-500"
          />
          <div className="grid grid-cols-3 gap-4 mt-4">
            {property.gallery_images?.map((img, index) => (
              <img key={index} src={img} alt={`Gallery ${index}`} className="w-full h-24 object-cover rounded-md" />
            ))}
          </div>
        </div>

        {/* Description & Booking Section */}
        <div className="grid grid-cols-3 gap-8 mt-8">
          {/* Left - Description & Details */}
          <div className="col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
            <p className="text-gray-600">{property.description}</p>

            {/* Overview */}
            <h3 className="text-xl font-semibold mt-6">Overview</h3>
            <div className="flex items-center space-x-6 mt-2">
              <span className="flex items-center text-gray-700">
                <FaBed className="text-blue-500 mr-2" /> {property.bedrooms} Bedrooms
              </span>
              <span className="flex items-center text-gray-700">
                <FaBath className="text-blue-500 mr-2" /> {property.bathrooms} Bathrooms
              </span>
              <span className="flex items-center text-gray-700">
                <FaCar className="text-blue-500 mr-2" /> {property.garage} Garage
              </span>
              <span className="text-gray-700">{property.size} Sqft</span>
            </div>

            {/* Property Details */}
            <h3 className="text-xl font-semibold mt-6">Details</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <p className="text-gray-700"><strong>Property ID:</strong> {property.id}</p>
              <p className="text-gray-700"><strong>Price:</strong> ${property.price}</p>
              <p className="text-gray-700"><strong>Size:</strong> {property.size} Sqft</p>
              <p className="text-gray-700"><strong>Year Built:</strong> {property.year_built}</p>
              <p className="text-gray-700"><strong>Category:</strong> {property.category}</p>
              <p className="text-gray-700"><strong>Status:</strong> {property.status}</p>
            </div>
          </div>

          {/* Right - Booking Box */}
          <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold text-gray-900">${property.price} / Night</p>
              <div className="flex items-center text-yellow-500">
                <AiFillStar className="mr-1" /> <span className="font-semibold">{property.rating}</span>
                <span className="text-gray-500 text-sm ml-1">({property.reviews} Reviews)</span>
              </div>
            </div>

            {/* Booking Form */}
            <form className="mt-4">
              <label className="block text-gray-700 font-medium">Name</label>
              <input type="text" placeholder="Your Full Name" className="w-full p-2 border rounded mt-1" />

              <label className="block text-gray-700 font-medium mt-3">Email</label>
              <input type="email" placeholder="Your Email" className="w-full p-2 border rounded mt-1" />

              <label className="block text-gray-700 font-medium mt-3">Date</label>
              <input type="date" className="w-full p-2 border rounded mt-1" />

              <button
                type="submit"
                className="w-full bg-orange-500 text-white px-4 py-2 rounded mt-4 hover:bg-orange-600 transition"
              >
                Reserve
              </button>
            </form>

            <p className="text-gray-500 text-sm mt-3">Certain reservations may also require a security deposit.</p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default PropertyDetails;
