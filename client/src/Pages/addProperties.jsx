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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <>
    <Navbar/>


    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create A Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Property Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Add Listing Title" />
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Add Description"></textarea>
        </div>

        <div>
          <label className="block font-semibold">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select property category</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Listed In</label>
          <input type="text" name="listedIn" value={formData.listedIn} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-semibold">Property Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Property Sales Price</label>
          <input type="number" name="salesPrice" value={formData.salesPrice} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Add sales price" />
        </div>

        <div>
          <label className="block font-semibold">Property Rental Price</label>
          <input type="number" name="rentalPrice" value={formData.rentalPrice} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Add rental price" />
        </div>

        <div>
          <label className="block font-semibold">Yearly Tax Rate</label>
          <input type="number" name="taxRate" value={formData.taxRate} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Add property tax" />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Next Step</button>
      </form>
    </div>
    </>
  );
};



export default CreateListingForm;
