import { useState, useEffect } from "react";
import axiosInstance from "../axios/axiosInstance";

const useUsers = (url) => {
  const [users, setUsers] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axiosInstance
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUsers(res.data.data);
      });
  }, [url]);

  return users;
};
export default useUsers;
