import React, { lazy, useState } from "react";
import axios from "axios";

const Navbar = lazy(() => import("../components/Navbar"));
const LocationMap = lazy(() => import("../components/LocationMap"));
const SearchBar = lazy(() => import("../components/SearchBar"));

const Explore = () => {
  const [properties, setProperties] = useState([]);

  // Function to fetch properties based on search filters
  const fetchProperties = async (filters) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/properties`, {
        params: {
          type: filters.selectedOption.toLowerCase(), // 'sell' or 'rent'
          location: filters.location,
          property_type: filters.propertyType,
          price_range: filters.priceRange,
        },
      });

      setProperties(response.data.data); // Update the state with search results
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  return (
    <>
      <Navbar />
      <LocationMap />
      <SearchBar onSearch={fetchProperties} />
      
      <div className="p-10">
        <h2 className="text-3xl font-bold mb-4">Search Results</h2>
        <div className="grid grid-cols-4 gap-4">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div key={property.id} className="p-4 border rounded-lg shadow-sm">
                <img
                  src={`http://localhost:8000/storage/images/${property.images[0]?.image_url}`}
                  alt={property.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold">{property.title}</h3>
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
