import React from 'react'
import axios from 'axios'
import {useState,useEffect} from 'react'

const Wishlist = () => {
    const [wishList, setWishList] = useState([]);

    const token = localStorage.getItem("token");
    const getFavorite = () => {
        axios.get("http://localhost:8000/api/user",[
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ]).then((res) => {
            setWishList(res.data);
        });
    }

    useEffect(() => {
        getFavorite();
    }, []);
    console.log(wishList);


  return (
    <div></div>
  )
}

export default Wishlist