import React, { lazy, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Navbar = lazy(() => import("../Components/Navbar"));
const LocationMap = lazy(() => import("../Components/LocationMap"));
const SearchBar = lazy(() => import("../Components/SearchBar"));


const Explore = () => {
  const [properties, setProperties] = useState([]);

  const navigate = useNavigate();

  const fetchProperties = async (filters) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/propertiesSearch`, {
        params: {
          location: filters.location,
          price: filters.priceRange,
        },
      });
      setProperties(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  return (
    <>
      <Navbar />
      <LocationMap location={properties&&properties[0]?.location} />
      <SearchBar onSearch={fetchProperties} />

      <div className="p-10">
        <h2 className="text-3xl font-bold mb-4">Search Results</h2>
        <div className="grid grid-cols-4 gap-4">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div
                key={property.id}
                className="p-4 border rounded-lg shadow-sm"
              >
                <img
                  src={`http://localhost:8000/storage/images/${property.images[0].image_url}`}
                  loading="lazy"
                  onClick={() => navigate(`/property/${property.id}`)}
                  alt={property.title}
                  className="w-full h-40 object-contain mb-2"
                />
                <p className="font-bold">{property.title}</p>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-xl font-bold">{property.price}</p>
              </div>
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Explore;
