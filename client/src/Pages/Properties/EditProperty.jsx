import axios from "axios";
import React, { lazy, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EditProperty = () => {
  const [properties, setProperties] = useState([]);
  const [select, setSelect] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: null,
    location: "",
    is_available: true,
    rentalFrequency : "",
    category : ""
  });

  const token = sessionStorage.getItem("token");
  const { id } = useParams();

  const getProperty = async () => {
    try {
      axios.get(`http://localhost:8000/api/properties/${id}`).then((e) => {
        setProperties(e.data);
      });
    } catch (r) {
      console.log(r);
    }
  };

  const handleSelectChange = (e) => {
    e.target.value === "true" ? setSelect(true) : setSelect(false);
  };

  const updateProperty = async (e) => {
    e.preventDefault();
    try {
      axios
        .put(
          `http://localhost:8000/api/properties/${id}`,
          {
            title: formData.title,
            description: formData.description,
            price: formData.price,
            location: formData.location,
            is_available: select,
            rentalFrequency : formData.rentalFrequency,
            category : formData.category
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((e) => {
          getProperty();
        });
    } catch (r) {
      console.log(r);
    }
  };

  useEffect(() => {
    getProperty();
  }, []);

  return (
    <div>
      <div className="mt-2">
        <nav className="flex items-center space-x-2 bg-white p-8 rounded-lg">
          <Link to="/" className="text-gray-600 font-semibold hover:underline">
            Home
          </Link>
          <span className="text-gray-400">&gt;</span>
          <span className="text-blue-900 font-bold">Edit Property</span>
          <span className="text-gray-400">&gt;</span>
          <span className="text-blue-900 font-bold">{properties.title}</span>
        </nav>
      </div>
      <div className="max-w-4xl m-5 mx-auto p-6 bg-white shadow-md rounded-lg mt-6  ">
        <h1 className="text-2xl font-bold mb-6">Edit Property</h1>
        <form onSubmit={updateProperty} className="space-y-4 py-2">
          <div>
            <label className="block font-semibold">Property Title *</label>
            <input
              type="text"
              name="title"
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Add Listing Title"
              defaultValue={properties.title}
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Description *</label>
            <textarea
              name="description"
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Add Description"
              defaultValue={properties.description}
              required
            ></textarea>
          </div>
          <div>
            <label className="block font-semibold">Property Sales Price</label>
            <input
              type="number"
              name="salesPrice"
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="Add sales price"
              defaultValue={properties.price}
              min="0"
            />
          </div>
          <div>
            <label className="block font-semibold">Location</label>
            <input
              type="text"
              name="rentalPrice"
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Add location"
              defaultValue={properties.location}
              min="0"
            />
          </div>
          <div>
            <label className="block font-semibold">Available</label>
            <select
              name="available"
              className="w-full p-2 border rounded"
              onChange={handleSelectChange}
            >
              <option disabled value="true">this is old value: {properties.is_available ? "yes" : "no"}</option>
              <option value="true">yes</option>
              <option value="false">no</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Category</label>
            <select
              name="category"
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option disabled value="both">this is old value: {properties.category}</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Garage">Garage</option>
              <option value="Bureau">Bureau</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Rental Frequency</label>
            <select
              name="rentalFrequency"
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, rentalFrequency: e.target.value })
              }
            >
              <option disabled value="both">this is old value: {properties.rentalFrequency}</option>
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
              <option value="Per Day">Per Day</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;
