import React from "react";
import { lazy } from "react";
const Navbar = lazy(() => import("../components/Navbar"));
const LocationMap = lazy(() => import("../components/LocationMap"));

const Explore = () => {
  return (
    <>
      <Navbar />
      <LocationMap/>
      <div>Explore</div>
    </>
  );
};

export default Explore;
