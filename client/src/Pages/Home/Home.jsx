import axiosInstance from "../../axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import homeimg from "../../assets/home-image.webp";
import { Helmet } from "react-helmet-async";
import property2 from "../../assets/property2.webp";

const Home = () => {
  const [properties, setProperties] = useState([]),
    [number, setNumber] = useState(0),
    [images, setImages] = useState([]),
    [sourceImage, setSourceImage] = useState(),
    navigate = useNavigate();
  useEffect(() => {
    const getProperties = () => {
      try {
        axiosInstance.get("/properties").then((e) => {
          setProperties([
            e.data?.data[0],
            e.data?.data[1],
            e.data?.data[2],
            e.data?.data[3],
          ]);
          setImages([
            `http://localhost:8000/storage/images/${e.data?.data[0].images[0]?.image_url}`,
            `http://localhost:8000/storage/images/${e.data?.data[1].images[0]?.image_url}`,
            `http://localhost:8000/storage/images/${e.data?.data[2].images[0]?.image_url}`,
            e.data?.data[3]?.images[0]?.image_url !== undefined &&
              `http://localhost:8000/storage/images/${e.data.data[3].images[0].image_url}`,
          ]);
        });
      } catch (e) {
        console.log(e);
      }
    };
    getProperties();
  }, []);

  return (
    <div className="bg-[#fff]">
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
                  className={
                    listing
                      ? "p-4 bg-white border rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-all border-gray-200"
                      : "hidden"
                  }
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

                  <h3
                    className="text-lg font-semibold mt-3"
                    style={{ color: "#123763" }}
                  >
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
      <div>
        <div className="flex w-full justify-around items-center">
          <div className="text-[#123763] font-[700] text-[46px] leading-[64px] w-[45%] flex justify-end text-start">
            We help you to find your dream house
          </div>
          <div className="w-[45%] text-[#666666] leading-[26px] font-[400] px-5">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </div>
        </div>
        <div className="w-full flex justify-around items-center mt-10">
          <div className="w-[45%] flex justify-center">
            <div className="h-[450px] w-full">
              <img
                className="w-full h-full rounded-[8px]"
                src={property2}
                loading="lazy"
                alt="ttt"
              />
            </div>
          </div>
          <div className="w-[45%]">
            <div className="py-2.5 radius-[8px] box-border">
              <details className="bg-white py-1 px-3 box-border shadow-lg border-1 border-solid border-[#E5E5E5] rounded-[8px] hover:shadow-xl">
                <summary className="bg-white relative flex items-center">
                  <p className="text-[#123763] font-[600] text-[20px] leading-[38px]">
                    Lifetime Warranty
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 absolute right-0 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </summary>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat.
              </details>
            </div>
            <div className="py-2.5 radius-[8px] box-border">
              <details className="bg-white py-1 px-3 box-border shadow-lg border-1 border-solid border-[#E5E5E5] rounded-[8px] hover:shadow-xl">
                <summary className="bg-white relative flex items-center">
                  <p className="text-[#123763] font-[600] text-[20px] leading-[38px]">
                    cheapest compared to other competitors
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 absolute right-0 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </summary>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat.
              </details>
            </div>
            <div className="py-2.5 radius-[8px] box-border">
              <details className="bg-white py-1 px-3 box-border shadow-lg border-1 border-solid border-[#E5E5E5] rounded-[8px] hover:shadow-xl">
                <summary className="bg-white relative flex items-center">
                  <p className="text-[#123763] font-[600] text-[20px] leading-[38px]">
                    Strategic location
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 absolute right-0 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </summary>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat.
              </details>
            </div>
            <div className="py-2.5 radius-[8px] box-border">
              <details className="bg-white py-1 px-3 box-border shadow-lg border-1 border-solid border-[#E5E5E5] rounded-[8px] hover:shadow-xl">
                <summary className="bg-white relative flex items-center">
                  <p className="text-[#123763] font-[600] text-[20px] leading-[38px]">
                    Low tax
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 absolute right-0 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </summary>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat.
              </details>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-between items-center">
        <div className="flex flex-col w-[35%] h-[400px] justify-around ml-10">
          <h2 className="text-[#123763] font-[700] text-wrap text-[46px] leading-[64px] flex text-start">
            Need a home loan? Get pre-approved
          </h2>
          <p className="text-[#666666] leading-[26px] text-wrap font-[400]">
            Creating a very beautiful website design in accordance with the
            fundamental user experience which is examined more deeply by the UX
            Designers that we have.{" "}
          </p>
          <p className="text-[#666666] leading-[26px] font-[400] mt-5">
            And make good visuals so that clients are satisfied and easy when
            viewing the website. First impressions are our tricks to attract a
            customer who has seen the website that we are going to create
          </p>
          <button className="bg-[#FF8A20] text-white rounded-[8px] p-2.5 mt-3 w-fit">
            Read More
          </button>
        </div>
        <div className="w-[55%] h-[500px] flex justify-end">
          <div className="bg-[#27AD77] w-[60%] h-full rounded-l-[70px] flex items-center">
            <div className="w-[100%] h-[70%] translate-x-[-15%]">
              <img
                className="h-full rounded-4xl w-full"
                src={property2}
                loading="lazy"
                alt="hoem_img"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#27AD77] text-white p-10 h-[600px] flex items-center justify-around mt-10 w-full">
        <div className="w-[50%]">
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
            <button
              className="text-white text-xl hover:opacity-80"
              onClick={() => {
                number >= 0 ? setNumber(0) : setNumber(number - 1);
              }}
            >
              ←
            </button>
            <button
              className="text-white text-xl hover:opacity-80"
              onClick={() => {
                number < images.length - 1
                  ? setNumber(number + 1)
                  : setNumber(images.length - 1);
              }}
            >
              →
            </button>
          </div>
        </div>
        <div className="w-[550px] h-[398px] rounded-lg mr-10">
          <img
            loading="lazy"
            className="w-full object-fill h-full rounded-lg transition duration-500 ease-in-out transform hover:scale-105"
            src={images.length > 0 && images[number]}
            alt="property"
          />
        </div>
      </div>
      <div className="bg-gray-400 text-white text-center py-35  w-full ">
        <h2 className="text-3xl font-bold">
          Get Luxury And Cheap Housing <br /> And Guaranteed Forever
        </h2>
        <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">
          Contact Now
        </button>
      </div>
    </div>
  );
};

export default Home;
