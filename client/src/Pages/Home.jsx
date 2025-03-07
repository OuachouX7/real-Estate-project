import { lazy } from "react";
const Navbar = lazy(() => import("../components/navbar"));

const Home = () => {
  

  return (
    <>
      <Navbar />
    </>
  );
};

export default Home;
