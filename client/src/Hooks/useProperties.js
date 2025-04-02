import { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";

const useProperties = (url) => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    axiosInstance.get(url).then((res) => {
      setProperties(res.data);
    });
  }, [url]);
  return properties;
};

export default useProperties;
