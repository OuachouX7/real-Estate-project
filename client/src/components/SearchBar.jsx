import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [location, setLocation] = useState("Jakarta, Indonesia");
  const [priceRange, setPriceRange] = useState("$106 - $948");

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ location, priceRange });
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-xl mx-auto">
      <div className="flex space-x-2 mb-4"></div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          className="p-2 border rounded"
          placeholder="Enter price range"
          onChange={(e) => setPriceRange(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-orange-500 text-white p-2 rounded col-span-3"
        >
          Search
        </button>
      </div>
    </div>
  );
}
