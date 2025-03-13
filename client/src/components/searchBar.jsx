import { useState } from "react";
import React from "react";
import { MapPin } from "lucide-react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("Agadir");
  const [transactionType, setTransactionType] = useState("buy");

  return (
    <div className="flex items-center justify-between p-3 border border-gray-300 rounded-md w-full gap-2 shadow-sm">
      <div className="flex gap-2">
        <button
          className={`px-4 py-2 rounded-lg transition ${
            transactionType === "buy"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setTransactionType("buy")}
          aria-label="Buy properties"
        >
          Buy
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition ${
            transactionType === "rent"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setTransactionType("rent")}
          aria-label="Rent properties"
        >
          Rent
        </button>
      </div>

      <input
        className="flex-1 bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition focus:outline-none focus:border-blue-400 hover:border-slate-300 shadow-sm"
        type="text"
        placeholder="What are you looking for ?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex items-center gap-2 text-gray-700">
        <MapPin size={20} />
        <span className="text-sm">{location}</span>
      </div>

      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Search
      </button>
    </div>
  );
}
