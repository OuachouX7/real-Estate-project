import { lazy } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import homeimg from "../assets/home-image.webp";
import { Helmet } from "react-helmet-async";
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));
const Spinner = lazy(() => import("../Components/Spinner"));
const Home = () => {
  const [properties, setProperties] = useState([]),
    userName = localStorage.getItem("user"),
    token = sessionStorage.getItem("token"),
    navigate = useNavigate(),
    getProperties = () => {
      try {
        axios.get("http://localhost:8000/api/properties").then((e) => {
          setProperties([
            e.data?.data[0],
            e.data?.data[1],
            e.data?.data[2],
            e.data?.data[3],
          ]),
            console.log(e.data);
        });
      } catch (e) {
        console.log(e);
      }
    };
  useEffect(() => {
    getProperties();
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <meta
          name="keywords"
          content="Real Estate, Properties, Houses, Apartments"
        />
        <meta name="og:title" content="Real Estate" />
        <meta
          name="og:description"
          content="Web site created using create-react-app"
        />
        <meta name="og:image" content="/src/assets/home-image.jpg" />
        <title>Home</title>
      </Helmet>
      <Navbar />
      <div className="relative w-full h-[600px]">
        <img
          src={homeimg}
          alt="home_image"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-6xl font-bold text-center">
            Discover Your Perfect Home
          </h1>
        </div>
      </div>
      <div className="p-10">
        <div className="mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Newest Listings</h2>
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              onClick={() => navigate("/properties")}
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6 mt-6">
            {properties?.length > 0 ? (
              properties.map((listing, index) => (
                <div
                  key={index}
                  className="p-4 bg-white border rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-all border-gray-200"
                  onClick={() => navigate(`/property/${listing?.id}`)}
                >
                  <div className="w-full h-48 bg-gray-200 rounded-xl overflow-hidden">
                    <img
                      src={`http://localhost:8000/storage/images/${listing?.images[0]?.image_url}`}
                      alt={listing?.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="text-lg font-semibold mt-3" style={{ color: "#123763" }}>
                    {listing?.title}
                  </h3>

                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <span className="text-green-600 mr-1">📍</span>
                    {listing?.location}
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xl font-bold">
                      {listing?.price} DH
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-4 text-center">
                No properties found.
              </p>
            )}
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



