import { useState, useEffect } from "react";
import axios from "axios";

const useUsers = (url) => {
  const [users, setUsers] = useState([]);
  const token = sessionStorage.getItem("token")

  useEffect(() => {
    axios.get(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
      setUsers(res.data.data);
    });
  }, [url]);

  return users;
};
export default useUsers;
