import axiosInstance from "../../axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, lazy } from "react";
import homeimg from "../../assets/home-image.webp";
import { Helmet } from "react-helmet-async";
import property2 from "../../assets/property2.webp";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
const Skeleton = lazy(() => import("../../Components/Loading/Skeleton"));

const Home = () => {
  const [properties, setProperties] = useState([]),
    [number, setNumber] = useState(0),
    [images, setImages] = useState([]),
    { t } = useTranslation(),
    navigate = useNavigate();
  useEffect(() => {
    let a = () => {
      try {
        axiosInstance.get("/properties").then((a) => {
          setProperties([
            a.data?.data[0],
            a.data?.data[1],
            a.data?.data[2],
            a.data?.data[3],
          ]),
            setImages([
              `http://localhost:8000/storage/images/${a.data?.data[0].images[0]?.image_url}`,
              `http://localhost:8000/storage/images/${a.data?.data[1].images[0]?.image_url}`,
              `http://localhost:8000/storage/images/${a.data?.data[2].images[0]?.image_url}`,
              a.data?.data[3]?.images[0]?.image_url !== void 0 &&
                `http://localhost:8000/storage/images/${a.data.data[3].images[0].image_url}`,
            ]);
        });
      } catch (a) {
        console.log(a);
      }
    };
    a();
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
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full h-[600px]"
      >
        <motion.img
          initial={{
            opacity: 0,
            y: 100,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          src={homeimg}
          alt="home_image"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-6xl font-bold text-center">
            {t("Discover Your Perfect Home")}
          </h1>
        </div>
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
        }}
        className="p-10"
      >
        <div className="mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">{t("Newest Listings")}</h2>
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              onClick={() => navigate("/properties")}
            >
              {t("View All")}
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
              <div className="grid">
                <div className="p-4">
                  <Skeleton />
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      <div>
        <div className="flex w-full justify-around items-center">
          <div className="text-[#123763] font-[700] text-[46px] leading-[64px] w-[45%] flex justify-end text-start">
            {t("We help you to find your dream house")}
          </div>
          <div className="w-[45%] text-[#666666] leading-[26px] font-[400] px-5">
            {t("Feature Text")}
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
                    {t("Lifetime Warranty")}
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
                {t("Warranty Description")}
              </details>
            </div>
            <div className="py-2.5 radius-[8px] box-border">
              <details className="bg-white py-1 px-3 box-border shadow-lg border-1 border-solid border-[#E5E5E5] rounded-[8px] hover:shadow-xl">
                <summary className="bg-white relative flex items-center">
                  <p className="text-[#123763] font-[600] text-[20px] leading-[38px]">
                    {t("Cheapest")}
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
                    {t("Strategic Location")}
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
                    {t("Low Tax")}
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
            {t("Need Loan")}
          </h2>
          <p className="text-[#666666] leading-[26px] text-wrap font-[400]">
            {t("Loan Description 1")}
          </p>
          <p className="text-[#666666] leading-[26px] font-[400] mt-5">
            {t("Loan Description 2")}
          </p>
          <button className="bg-[#FF8A20] text-white rounded-[8px] p-2.5 mt-3 w-fit">
            {t("Read More")}
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
          <h2 className="text-3xl font-bold">{t("Nice House")}</h2>
          <p className="mt-4 text-sm opacity-90">{t("Review Text")}</p>
          <div className="flex items-center mt-4">
            <span className="text-yellow-400 text-lg">⭐ ⭐ ⭐ ⭐ ⭐</span>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-lg">{t("Reviewer Name")}</h3>
            <p className="text-sm opacity-80">{t("Reviewer Title")}</p>
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
        <h2 className="text-3xl font-bold">{t("Get Luxury")}</h2>
        <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">
          {t("Contact Now")}
        </button>
      </div>
    </div>
  );
};

export default Home;
