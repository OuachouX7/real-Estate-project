import { useState } from "react";
import React from "react";
import {MapPin} from "lucide-react";
import "./searchBar.css";


export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("Agadir");
  const [transactionType, setTransactionType] = useState("buy");

  return (

    <div className="flex items-center justify-between p-2.5 border border-gray-300 rounded-md w-full">
      <div className="flex gap-2">
        <button
          className={`px-4 py-2 rounded-lg ${transactionType === "buy" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setTransactionType("buy")}
        >
          Buy
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${transactionType === "rent" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setTransactionType("rent")}
        >
          Rent
        </button>
      </div>
      
      <input className="bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        type="text"
        placeholder="What are you looking for ?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        <MapPin/>
        <span>{location}</span>
      </div>
      
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Search
      </button>
    </div>
  );
}
