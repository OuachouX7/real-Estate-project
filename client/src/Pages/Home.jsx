import { lazy } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
const Navbar = lazy(() => import("../components/navbar"));
const SearchBar = lazy(() => import("../components/searchBar"));

const Home = () => {
  const [properties, setProperties] = useState([]);
  const userName = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getProperties = () => {
    try {
      axios.get("http://localhost:8000/api/properties").then((res) => {
        setProperties(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getProperties();
  }, []);

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
          {properties.map((listing, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-sm" onClick={() => navigate(`/property/${listing.id}`)}>
              <img src={`http://localhost:8000/storage/images/${listing.images[1].image_url}`} alt={listing.name} className="w-full h-48 object-cover rounded-lg" />
              <h3 className="text-lg font-semibold">{listing.name}</h3>
              <div className="flex items-center text-gray-600 text-sm">
                <span className="mr-1">📍</span> {listing.location}
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xl font-bold">{listing.price}</span>
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




