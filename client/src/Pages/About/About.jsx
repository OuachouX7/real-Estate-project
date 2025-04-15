import React from "react";
import aboutPic from "../../assets/aboutPic.webp";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const About = () => {
  const { t } = useTranslation();
  return (
    <>
      <nav className="flex items-center space-x-2 bg-white p-8 rounded-lg">
        <Link to="/" className="text-gray-600 font-semibold hover:underline">
          {t("Home")}
        </Link>
        <span className="text-gray-400">&gt;</span>
        <span className="text-blue-900 font-bold">{t("About")}</span>
      </nav>

      <div className="bg-gray-50 p-25">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h4 className="text-orange-500 font-semibold">{t("Our Story")}</h4>
            <h1 className="text-5xl font-bold mt-4">
              {t("Your Dream Home, Our Mission")}
            </h1>
            <p className="text-gray-600 mt-6">
              {t("About Description")}
            </p>
          </div>

          <div>
            <img
              src={aboutPic}
              alt={t("About Image Alt")}
              loading="lazy"
              className="w-full h-full rounded-xl object-cover"
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-3xl font-bold">15+</h2>
            <p className="text-gray-500">{t("Years Experience")}</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-3xl font-bold">800+</h2>
            <p className="text-gray-500">{t("Properties Rented")}</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-3xl font-bold">1.2K+</h2>
            <p className="text-gray-500">{t("Happy Clients")}</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-3xl font-bold">98%</h2>
            <p className="text-gray-500">{t("Customer Satisfaction")}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
