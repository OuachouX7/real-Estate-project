import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LocationMap = ({ location }) => {
  const [position, setPosition] = useState([31.7917, -7.0926]); // Default to London

  useEffect(() => {
    if (location) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
          }
        })
        .catch((error) => console.error("Error fetching location:", error));
    }
  }, [location]);

  return (
    <>
    {position &&
    <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{location || "Selected Location"}</Popup>
      </Marker>
    </MapContainer>
   }
    </>
  );
};

export default LocationMap;
