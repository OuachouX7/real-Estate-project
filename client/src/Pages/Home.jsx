import { lazy } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import homeimg from "../assets/home-image.webp";
import { Helmet } from "react-helmet-async";
const Navbar = lazy(() => import("../Components/Navbar"));
const Footer = lazy(() => import("../Components/Footer"));
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
          <div className="grid grid-cols-4 gap-4 mt-4">
            {properties ? (
              properties.map((listing, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg shadow-sm"
                  onClick={() => navigate(`/property/${listing?.id}`)}
                >
                  <img
                    src={`http://localhost:8000/storage/images/${listing?.images[0]?.image_url}`}
                    alt={listing?.title}
                    loading="lazy"
                    className="w-full h-40 object-contain rounded-lg"
                  />
                  <h3 className="text-lg font-semibold">{listing?.title}</h3>
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="mr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        color="#000000"
                        fill="none"
                      >
                        <path
                          d="M14.5 9C14.5 10.3807 13.3807 11.5 12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9Z"
                          stroke="currentColor"
                          stroke-width="1.5"
                        />
                        <path
                          d="M13.2574 17.4936C12.9201 17.8184 12.4693 18 12.0002 18C11.531 18 11.0802 17.8184 10.7429 17.4936C7.6543 14.5008 3.51519 11.1575 5.53371 6.30373C6.6251 3.67932 9.24494 2 12.0002 2C14.7554 2 17.3752 3.67933 18.4666 6.30373C20.4826 11.1514 16.3536 14.5111 13.2574 17.4936Z"
                          stroke="currentColor"
                          stroke-width="1.5"
                        />
                        <path
                          d="M18 20C18 21.1046 15.3137 22 12 22C8.68629 22 6 21.1046 6 20"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </span>{" "}
                    {listing?.location}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xl font-bold">{listing?.price}</span>
                  </div>
                </div>
              ))
            ) : (
              <Spinner />
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
