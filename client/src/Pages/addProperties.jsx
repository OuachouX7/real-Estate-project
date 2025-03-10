import React, { useState } from "react";
import Navbar from "../components/navbar";

const CreateListingForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    listedIn: "",
    status: "Active",
    salesPrice: "",
    rentalPrice: "",
    taxRate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Ensure numeric fields are non-negative
    if (["salesPrice", "rentalPrice", "taxRate"].includes(name) && value < 0) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.description || !formData.category) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("Form Data Submitted:", formData);
    // You can now send `formData` to your Laravel API
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
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Add Listing Title"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Add Description"
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-semibold">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select property category</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Listed In</label>
            <select
              name="listedIn"
              value={formData.listedIn}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Listing Type</option>
              <option value="Sale">Sale</option>
              <option value="Rent">Rent</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Property Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Property Sales Price</label>
            <input
              type="number"
              name="salesPrice"
              value={formData.salesPrice}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Add sales price"
              min="0"
            />
          </div>

          <div>
            <label className="block font-semibold">Property Rental Price</label>
            <input
              type="number"
              name="rentalPrice"
              value={formData.rentalPrice}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Add rental price"
              min="0"
            />
          </div>

          <div>
            <label className="block font-semibold">Yearly Tax Rate</label>
            <input
              type="number"
              name="taxRate"
              value={formData.taxRate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Add property tax"
              min="0"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Next Step
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateListingForm;
