import React from "react";
import { lazy } from "react";
import aboutPic from "../assets/aboutPic.webp";
const Navbar = lazy(() => import("../Components/Navbar"));
const Footer = lazy(() => import("../Components/Footer"));
const About = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 p-25">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h4 className="text-orange-500 font-semibold">Our Story</h4>
            <h1 className="text-5xl font-bold mt-4">
              Your Dream Home, Our Mission
            </h1>
            <p className="text-gray-600 mt-6">
              At DreamNest Realty, we believe that finding the perfect home
              should be an exciting and seamless experience. Founded by Mohammad
              Salimi, our mission is to connect people with properties that
              truly feel like home. With years of expertise in the real estate
              industry, our dedicated team offers personalized guidance to make
              your dreams a reality.
            </p>
          </div>

          <div>
            <img
              src={aboutPic}
              alt="Happy couple in their new home"
              loading="lazy"
              className="w-full rounded-xl object-cover"
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-3xl font-bold">15+</h2>
            <p className="text-gray-500">Years Experience</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-3xl font-bold">800+</h2>
            <p className="text-gray-500">Properties Rented</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-3xl font-bold">1.2K+</h2>
            <p className="text-gray-500">Happy Clients</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-3xl font-bold">98%</h2>
            <p className="text-gray-500">Customer Satisfaction</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
