import React, { lazy, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../Components/Footer"));

const CreateListingForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: null,
    images: [],
    location: "",
  });
  const [images, setImages] = useState([]);
  const [base64Image, setBase64Image] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) {
    navigate("/");
    return null;
  }

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBase64Image(reader.result);
      setImages([...images, reader.result]);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(
          "http://localhost:8000/api/addProperty",
          {
            title: formData.title,
            description: formData.description,
            price: formData.price,
            images: images,
            location: formData.location,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Create A Listing</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Property Title *</label>
            <input
              type="text"
              name="title"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="Add Listing Title"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Description *</label>
            <textarea
              name="description"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="Add Description"
              required
            ></textarea>
          </div>
          <div>
            <label className="block font-semibold">Property Sales Price</label>
            <input
              type="number"
              name="salesPrice"
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="Add sales price"
              min="0"
            />
          </div>
          <div>
            <label className="block font-semibold">Location</label>
            <input
              type="text"
              name="rentalPrice"
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="Add location"
              min="0"
            />
          </div>
          <div>
            <label className="block font-semibold">Images</label>
            <input
              type="file"
              name="images"
              onChange={handleImage}
              multiple
              className="w-full p-2 border rounded"
              placeholder="Add images"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateListingForm;
