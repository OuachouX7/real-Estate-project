import React from "react";
import { lazy } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Contact SHestate" />
        <meta name="keywords" content="Contact, Email, Phone, Form" />
        <meta name="og:title" content="Contact Us" />
        <meta name="og:description" content="Contact SHestate" />
        <meta name="og:image" content="/src/assets/home-image.jpg" />
        <title>Contact Us</title>
      </Helmet>
      <nav className="flex items-center space-x-2 bg-white p-8 rounded-lg">
        <Link to="/" className="text-gray-600 font-semibold hover:underline">
          {t("Home")}
        </Link>
        <span className="text-gray-400">&gt;</span>
        <span className="text-blue-900 font-bold">{t("Contact")}</span>
      </nav>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-6xl font-bold">Contact Us</h1>
          <p className="text-gray-600">
            Reach out via email, phone, or the form below to get in touch with
            us.
          </p>
          <p className="text-gray-800 font-medium">salimimmobilier@gmail.com</p>

          <p className="text-gray-800 font-medium">+212 6-77-17-2512</p>

          <div className="space-y-4">
            <div>
              <h2 className="font-bold">{t("Customer Support")}</h2>
              <p className="text-gray-600">{t("Support Description")}</p>
            </div>
            <div>
              <h2 className="font-bold">{t("Feedback and Suggestions")}</h2>
              <p className="text-gray-600">{t("Feedback Description")}</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 bg-white p-6 rounded-3xl shadow-lg w-full max-w-lg mt-6 md:mt-0">
          <h2 className="text-4xl font-bold">{t("Get in Touch")}</h2>
          <br />
          <p className="text-gray-600">{t("Reach Us Anytime")}</p>
          <br />
          <form className="mt-4 space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder={t("First name")}
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder={t("Last name")}
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <input
              type="email"
              placeholder={t("Your email")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex gap-2">
              <select className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option>+212</option>
              </select>
              <input
                type="text"
                placeholder={t("Phone number")}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <textarea
              placeholder={t("How can we help?")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              maxLength="120"
              rows="6"
            ></textarea>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              {t("Submit")}
            </button>

            <p className="text-gray-500 text-sm text-center">
              {t("Contact Disclaimer 1")}{" "}
              <Link to="/terms">{t("Terms of Service")}</Link>
              <br />
              {t("Contact Disclaimer 2")}{" "}
              <Link to="/privacy">{t("Privacy Policy")}</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
