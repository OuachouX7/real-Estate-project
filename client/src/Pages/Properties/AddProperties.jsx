import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddProperty = () => {
  const [formData, setFormData] = useState({
      title: "",
      description: "",
      category: "",
      price: null,
      images: [],
      rentalFrequency: "",
      location: "",
    }),
    [images, setImages] = useState([]),
    [base64Image, setBase64Image] = useState(""),
    token = sessionStorage.getItem("token"),
    navigate = useNavigate();
  const handleImage = (e) => {
      let t = e.target.files[0],
        a = new FileReader();
      a.readAsDataURL(t),
        (a.onloadend = () => {
          setBase64Image(a.result), setImages([...images, a.result]);
        });
    },
    handleSubmit = (e) => {
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
              rentalFrequency: formData.rentalFrequency,
              category: formData.category,
              location: formData.location,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((response) => {
            console.log(response.data);
            navigate("/properties");
          })
          .catch((error) => {
            console.error(error.message);
          });
      } catch (t) {
        console.log(t);
      }
    };
  return (
    <>
      <div className="mt-2">
        <nav className="flex items-center space-x-2 bg-white p-8 rounded-lg">
          <Link to="/" className="text-gray-600 font-semibold hover:underline">
            Home
          </Link>
          <span className="text-gray-400">&gt;</span>
          <span className="text-blue-900 font-bold">Add Property</span>
        </nav>
      </div>
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
          <div className="flex space-x-4">
            <div className="w-2/3">
              <label className="block font-semibold">
                Property Rental Price
              </label>
              <input
                type="number"
                name="rentalPrice"
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
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
                <option value="">Select frequency</option>
                <option value="Monthly">Monthly</option>
                <option value="Weekly">Weekly</option>
                <option value="Yearly">Per Day</option>
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
              placeholder="Add images"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Property"
                className="h-32 w-full object-cover rounded-md"
              />
            ))}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProperty;
