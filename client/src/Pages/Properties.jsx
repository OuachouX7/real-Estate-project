import React from "react";
import { lazy } from "react";
const Navbar = lazy(() => import("../components/navbar"));

const Properties = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Properties</h1>
          <p className="text-lg text-gray-600">
            Here are the properties available
          </p>
        </div>
      </div>
    </>
  );
};

export default Properties;
