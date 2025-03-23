import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [selectedOption, setSelectedOption] = useState("Sell");
  const [location, setLocation] = useState("Jakarta, Indonesia");
  const [propertyType, setPropertyType] = useState("Type 21/24");
  const [priceRange, setPriceRange] = useState("$106 - $948");

  const handleSearch = () => {
    if (onSearch) {
      // Send selected filters to the parent component (Explore.js)
      onSearch({ selectedOption, location, propertyType, priceRange });
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-xl mx-auto">
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-4 py-2 rounded ${selectedOption === "Sell" ? "bg-green-500 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedOption("Sell")}
        >
          Sell
        </button>
        <button
          className={`px-4 py-2 rounded ${selectedOption === "Rent" ? "bg-green-500 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedOption("Rent")}
        >
          Rent
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <select className="p-2 border rounded" value={location} onChange={(e) => setLocation(e.target.value)}>
          <option>Jakarta, Indonesia</option>
          <option>Bandung, Indonesia</option>
          <option>Bali, Indonesia</option>
        </select>
        <select className="p-2 border rounded" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
          <option>Type 21/24</option>
          <option>Type 36/45</option>
          <option>Type 54/60</option>
        </select>
        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Enter price range"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        />
        <button onClick={handleSearch} className="bg-orange-500 text-white p-2 rounded col-span-3">
          Search
        </button>
      </div>
    </div>
  );
}
