import { useEffect, useState } from "react";
import axios from "axios";

const useProperties = (url) => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    axios.get(url).then((res) => {
      setProperties(res.data);
    });
  }, [url]);
  return properties;
};

export default useProperties;
