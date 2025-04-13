import axiosInstance from "../../axios/axiosInstance";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useProperties from "../../Hooks/useProperties";
import { useTranslation } from "react-i18next";

const EditProperty = () => {
  const [select, setSelect] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: null,
    location: "",
    is_available: true,
    rentalFrequency: "",
    category: "",
  });
  const { t } = useTranslation();

  const token = sessionStorage.getItem("token");
  const { id } = useParams();

  const properties = useProperties(`/properties/${id}`);

  const handleSelectChange = (e) => {
    e.target.value === "true" ? setSelect(true) : setSelect(false);
  };

  const updateProperty = async (e) => {
    e.preventDefault();
    try {
      axiosInstance
        .put(
          `/properties/${id}`,
          {
            title: formData.title,
            description: formData.description,
            price: formData.price,
            location: formData.location,
            is_available: select,
            rentalFrequency: formData.rentalFrequency,
            category: formData.category,
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
    } catch (r) {
      console.log(r);
    }
  };

  return (
    <div>
      <div className="mt-2">
        <nav className="flex items-center space-x-2 bg-white p-8 rounded-lg">
          <Link to="/" className="text-gray-600 font-semibold hover:underline">
            {t("Home")}
          </Link>
          <span className="text-gray-400">&gt;</span>
          <span className="text-blue-900 font-bold">{t("Edit Property")}</span>
          <span className="text-gray-400">&gt;</span>
          <span className="text-blue-900 font-bold">{properties.title}</span>
        </nav>
      </div>
      <div className="max-w-4xl m-5 mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
        <h1 className="text-2xl font-bold mb-6">{t("Edit Property")}</h1>
        <form onSubmit={updateProperty} className="space-y-4 py-2">
          <div>
            <label className="block font-semibold">
              {t("Property Title")} *
            </label>
            <input
              type="text"
              name="title"
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder={t("Add Listing Title")}
              defaultValue={properties.title}
              required
            />
          </div>

          <div>
            <label className="block font-semibold">{t("Description")} *</label>
            <textarea
              name="description"
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder={t("Add Description")}
              defaultValue={properties.description}
              required
            ></textarea>
          </div>
          <div>
            <label className="block font-semibold">
              {t("Property Sales Price")}
            </label>
            <input
              type="number"
              name="salesPrice"
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder={t("Add sales price")}
              defaultValue={properties.price}
              min="0"
            />
          </div>
          <div>
            <label className="block font-semibold">{t("Location")}</label>
            <input
              type="text"
              name="rentalPrice"
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder={t("Add location")}
              defaultValue={properties.location}
              min="0"
            />
          </div>
          <div>
            <label className="block font-semibold">{t("Available")}</label>
            <select
              name="available"
              className="w-full p-2 border rounded"
              onChange={handleSelectChange}
            >
              <option disabled value="true">
                {t("this is old value")}:{" "}
                {properties.is_available ? t("yes") : t("no")}
              </option>
              <option value="true">{t("yes")}</option>
              <option value="false">{t("no")}</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">{t("Category")}</label>
            <select
              name="category"
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option disabled value="both">
                {t("this is old value")}: {properties.category}
              </option>
              <option value="Apartment">{t("Apartment")}</option>
              <option value="House">{t("House")}</option>
              <option value="Garage">{t("Garage")}</option>
              <option value="Bureau">{t("Bureau")}</option>
            </select>
          </div>
          <div>
            <label htmlFor="">{t("Rental Frequency")}</label>
            <select
              name="rentalFrequency"
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, rentalFrequency: e.target.value })
              }
            >
              <option disabled value="both">
                {t("this is old value")}: {properties.rentalFrequency}
              </option>
              <option value="Monthly">{t("Monthly")}</option>
              <option value="Weekly">{t("Weekly")}</option>
              <option value="Per Day">{t("Per Day")}</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {t("Update")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;
