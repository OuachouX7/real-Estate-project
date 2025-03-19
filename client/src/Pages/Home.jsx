import { lazy } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const Navbar = lazy(() => import("../components/Navbar"));
const SearchBar = lazy(() => import("../components/SearchBar"));
const Footer = lazy(() => import("../components/Footer"));

const Home = () => {
  const [properties, setProperties] = useState([]);
  const userName = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getProperties = () => {
    try {
      axios.get("http://localhost:8000/api/properties").then((res) => {
        setProperties(res.data.data);
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <>
      <Navbar />
      <SearchBar />

      <div className="p-10">
        <div className="mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Listings</h2>
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              onClick={() => navigate("/properties")}
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {properties.map((listing, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-sm"
                onClick={() => navigate(`/property/${listing.id}`)}
              >
                <img
                  src={`http://localhost:8000/storage/images/${listing.images[0].image_url}`}
                  alt={listing.title}
                  className="w-full h-40 object-contain rounded-lg"
                />
                <h3 className="text-lg font-semibold">{listing.title}</h3>
                <div className="flex items-center text-gray-600 text-sm">
                  <span className="mr-1">📍</span> {listing.location}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xl font-bold">{listing.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-green-500 text-white p-10 py-25 flex items-center justify-between mt-10 w-full">
        <div className="max-w-lg ml-10">
          <h2 className="text-3xl font-bold">
            Nice And Comfortable House For Family
          </h2>
          <p className="mt-4 text-sm opacity-90">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </p>
          <div className="flex items-center mt-4">
            <span className="text-yellow-400 text-lg">⭐ ⭐ ⭐ ⭐ ⭐</span>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-lg">Park Tea Hyung</h3>
            <p className="text-sm opacity-80">Pedagang Bakso</p>
          </div>
          <div className="flex gap-4 mt-6">
            <button className="text-white text-xl hover:opacity-80">←</button>
            <button className="text-white text-xl hover:opacity-80">→</button>
          </div>
        </div>
        <div className="bg-gray-200 w-80 h-80 rounded-lg mr-10"></div>
      </div>

      <div className="bg-gray-600 text-white text-center py-35  w-full ">
        <h2 className="text-3xl font-bold">
          Get Luxury And Cheap Housing <br /> And Guaranteed Forever
        </h2>
        <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">
          Contact Now
        </button>
      </div>

      <Footer />
    </>
  );
};

export default Home;
