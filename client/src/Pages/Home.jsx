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
      axios.get("http://localhost:8000/api/properties",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
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
            <>
              // write here
            </>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;




