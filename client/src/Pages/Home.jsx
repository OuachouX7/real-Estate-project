import { lazy } from "react";
const Navbar = lazy(() => import("../components/navbar"));
const SearchBar = lazy(() => import("../components/searchBar"));

const Home = () => {
  const userName = localStorage.getItem("user");

  const listings = [
    { name: "Grand Family House", location: "Ohio St. South Gate, California", price: "$350", rating: 4.8 },
    { name: "The Elements", location: "Jakarta Selatan, DKI Jakarta", price: "$620", rating: 4.8 },
    { name: "Triraksa Village 2", location: "Tangerang, Banten", price: "$682", rating: 4.8 },
    { name: "Nuvasa Bay", location: "Batam, Kepulauan Riau", price: "$969", rating: 4.8 },
  ];
  

  return (
    <>
      <Navbar />
      <SearchBar/>
      

  
      <div className="p-10">
      <div className="mb-10">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Listings</h2>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">View All</button>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {listings.map((listing, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-sm">
              <div className="h-40 bg-gray-200 rounded mb-4"></div>
              <h3 className="text-lg font-semibold">{listing.name}</h3>
              <div className="flex items-center text-gray-600 text-sm">
                <span className="mr-1">📍</span> {listing.location}
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xl font-bold">{listing.price}</span>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">⭐</span> {listing.rating}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;




