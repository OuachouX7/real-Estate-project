import React from "react";
import { useState } from "react";
import axiosInstance from "../../axios/axiosInstance";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    name: "",
  });
  const [res, setRes] = useState([]);
  const handleForgetPassword = (e) => {
    e.preventDefault();
    try {
      const { email, phone, name } = form;
      if (!email || !phone || !name) {
        return alert("Please fill all fields");
      }
      axiosInstance
        .post("/forgotPassword", {
          email: email,
          phone: phone,
          name: name,
        })
        .then((res) => {
          setRes(res.data);
          console.log(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Forgot Password
          </h1>
          <form onSubmit={handleForgetPassword} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 mt-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 mt-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label
                htmlFor="number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="number"
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 mt-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Enter your phone number"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 font-semibold text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 transition"
            >
              Send Reset Link
            </button>
            <div className="text-center mt-4">
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-800 transition"
              >
                Have an account? Login
              </Link>
            </div>
          </form>
          {res.password && (
            <div className="text-green-500 text-center mt-4">
              your password : {res.password}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
