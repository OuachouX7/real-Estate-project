import { lazy } from "react";
const Navbar = lazy(() => import("../components/navbar"));

const Home = () => {
  const userName = localStorage.getItem("user");

  return (
    <>
      <Navbar />
      {userName && (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome, {userName}!
            </h1>
            <p className="text-lg text-gray-600">
              You are now connected to our platform.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
