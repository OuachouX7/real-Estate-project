import React from "react";
import { lazy } from "react";
const Navbar = lazy(() => import("../components/Navbar"));

const Explore = () => {
  return (
    <>
      <Navbar />
      <div>Explore</div>
    </>
  );
};

export default Explore;
