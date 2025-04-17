import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-[#1D3557] text-white py-12 px-6">
    <div>
      <h2 className="text-3xl font-bold text-center">
        {t("Make Your Home More Modern")}
      </h2>
      <br />
    </div>
    <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center md:text-left">
      <div>
        <h3 className="font-semibold text-lg">{t("Our Services")}</h3>
        <ul className="mt-3 space-y-2">
          <li>{t("Home Rent")}</li>
          <li>{t("Appartement Sell")}</li>
          <li>{t("Villa Rent")}</li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-lg">{t("Support")}</h3>
        <ul className="mt-3 space-y-2">
          <li>{t("Customer Services")}</li>
          <li>{t("Contact us")}</li>
          <li>{t("Privacy Policy")}</li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-lg">{t("Company")}</h3>
        <ul className="mt-3 space-y-2">
          <li>{t("About Us")}</li>
          <li>{t("Our Team")}</li>
          <li>{t("Join Us")}</li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-lg">{t("Social Media")}</h3>
        <ul className="mt-3 space-y-2">
          <li>{t("Facebook")}</li>
          <li>{t("Twitter")}</li>
          <li>{t("Instagram")}</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-gray-600 mt-8 pt-4 text-center">
      <nav className="flex justify-center space-x-6">
        <Link to="/" className="hover:underline">
          {t("Home")}
        </Link>
        <Link to="/explore" className="hover:underline">
          {t("Explore")}
        </Link>
        <Link to="/about" className="hover:underline">
          {t("About")}
        </Link>
        <Link to="/contact" className="hover:underline">
          {t("Contact")}
        </Link>
      </nav>
      <p className="mt-4 text-gray-400">{t("Copyright")}</p>
    </div>
  </footer>
  );
};

export default Footer;
