import React, { lazy, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = lazy(() => import("../Components/Navbar"));
const Footer = lazy(() => import("../Components/Footer"));

const CreateListingForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    listedIn: "",
    status: "Active",
    price: "",
    rentalPrice: "",
    rentalFrequency: "Monthly",
    images: [],
    location: "",
  });

  const [images, setImages] = useState([]);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) {
    navigate("/");
  }

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    const updatedImages = [...images];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedImages.push(reader.result);
        setImages(updatedImages);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/addProperty",
        { ...formData, images },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
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
            <label className="block font-semibold">Category</label>
            <select
              name="category"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full p-2 border rounded"
            >
              <option value="">Select property category</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Condo">Bureau</option>
              <option value="Condo">Garage</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Listed In</label>
            <input
              type="text"
              name="listedIn"
              onChange={(e) =>
                setFormData({ ...formData, listedIn: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="e.g., MLS, Zillow, Local Listing"
            />
          </div>

          <div>
            <label className="block font-semibold">Property Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full p-2 border rounded"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Sold">Sold</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Property Sales Price</label>
            <input
              type="number"
              name="price"
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="Add sales price"
              min="0"
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-2/3">
              <label className="block font-semibold">Property Rental Price</label>
              <input
                type="number"
                name="rentalPrice"
                onChange={(e) =>
                  setFormData({ ...formData, rentalPrice: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Add rental price"
                min="0"
              />
            </div>
            <div className="w-1/3">
              <label className="block font-semibold">Frequency</label>
              <select
                name="rentalFrequency"
                onChange={(e) =>
                  setFormData({ ...formData, rentalFrequency: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="Monthly">Monthly</option>
                <option value="Weekly">Weekly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold">Images</label>
            <input
              type="file"
              name="images"
              onChange={handleImage}
              multiple
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
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
