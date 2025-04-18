import { useState, useEffect } from "react";
import { nodeAxiosInstance } from "../axios/axiosInstance";

const useUser = () => {
  const [users, setUsers] = useState([]);
  const token = sessionStorage.getItem("jwt_token");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await nodeAxiosInstance.get("/users", {
          headers: { Authorization: `Bearer ${token}` },
          signal,
        });
        setUsers(response.data.data);
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
