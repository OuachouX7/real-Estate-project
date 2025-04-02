import { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";

const useProperties = (url) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get(url, { signal });
        setProperties(response.data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchProperties();

    return () => {
      controller.abort();
    };
  }, [url]);

  return properties;
};

export default useProperties;
