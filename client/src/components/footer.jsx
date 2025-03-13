import React from "react";
const Footer = () => {
    return (
      <footer className="bg-[#1D3557] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-bold">Make Your Home More Modern</h2>
            <p className="mt-3 text-gray-300">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
              sint. Velit officia consequat duis enim.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Our Services</h3>
            <ul className="mt-3 space-y-2">
              <li>Home Rent</li>
              <li>Appartement Sell</li>
              <li>Villa Rent</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Support</h3>
            <ul className="mt-3 space-y-2">
              <li>Customer Services</li>
              <li>Email Us</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Social Media</h3>
            <ul className="mt-3 space-y-2">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-4 text-center">
          <nav className="flex justify-center space-x-6">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Explore</a>
            <a href="#" className="hover:underline">Agency</a>
            <a href="#" className="hover:underline">Blog</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Contact</a>
          </nav>
          <p className="mt-4 text-gray-400">Copyright Tanah Air Studio</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;