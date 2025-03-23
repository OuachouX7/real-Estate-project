import React from "react";
import { lazy } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Navbar = lazy(() => import("../Components/Navbar"));
const Footer = lazy(() => import("../Components/Footer"));

const Contact = () => {
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
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-6xl font-bold">Contact Us</h1>
          <p className="text-gray-600">
            Reach out via email, phone, or the form below to get in touch with
            us.
          </p>
          <p className="text-gray-800 font-medium">SHestate@gmail.com</p>
          <p className="text-gray-800 font-medium">+212 6-77-17-2512</p>

          <div className="space-y-4">
            <div>
              <h2 className="font-bold">Customer Support</h2>
              <p className="text-gray-600">
                Our support team is available around the clock to address any
                concerns you may have.
              </p>
            </div>
            <div>
              <h2 className="font-bold">Feedback and Suggestions</h2>
              <p className="text-gray-600">
                We value your feedback and are continuously working to improve
                our services.<br></br> Please share your thoughts with us.
              </p>
            </div>
            <div></div>
          </div>
        </div>
        <div className="md:w-1/2 bg-white p-6 rounded-3xl shadow-lg w-full max-w-lg mt-6 md:mt-0">
          <h2 className="text-4xl font-bold">Get in Touch</h2>
          <br></br>
          <p className="text-gray-600">You can reach us anytime</p>
          <br></br>
          <form className="mt-4 space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First name"
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <input
              type="email"
              placeholder="Your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex gap-2">
              <select className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option>+212</option>
              </select>
              <input
                type="text"
                placeholder="Phone number"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <textarea
              placeholder="How can we help?"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              maxLength="120"
              rows="6"
            ></textarea>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              Submit
            </button>

            <p className="text-gray-500 text-sm text-center">
              By contacting us, you agree to our{" "}
              <Link to="/terms">Terms of Service</Link>
              <br></br>
              and acknowledge that you have read our{" "}
              <Link to="/privacy">Privacy Policy</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
