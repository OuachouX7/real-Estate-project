import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditProperty = () => {
  const [properties, setProperties] = useState([]);
  const [select, setSelect] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: null,
    location: "",
    is_available: true,
  });

  const token = localStorage.getItem("token");
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
        .put(`http://localhost:8000/api/properties/${id}`,{
          title: formData.title,
          description: formData.description,
          price: formData.price,
          location: formData.location,
          is_available: select
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((e) => {
          console.log(e);
        });
    } catch (r) {
      console.log(r);
    }
  };

  useEffect(() => {
    getProperty();
  }, []);

  return (
    <>
      <form onSubmit={updateProperty} className="space-y-4">
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
            <option value="true">yes</option>
            <option value="false">no</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Update
        </button>
      </form>
    </>
  );
};

export default EditProperty;
