import { useState, useEffect } from "react";
import axios from 'axios'

const useUser = () => {
  const [users, setUsers] = useState([]);
  const token = sessionStorage.getItem("jwt_token");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users", {
          headers: { Authorization: `Bearer ${token}` },
          signal,
        });
        setUsers(response.data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [ token]);

  return users;
};

export default useUser;
