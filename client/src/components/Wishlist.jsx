import React, { lazy } from 'react'
import axios from 'axios'
import {useState,useEffect} from 'react'
const Navbar = lazy(() => import("./Navbar"));


const Wishlist = () => {
    const [wishList, setWishList] = useState([]);

    const token = localStorage.getItem("token");
    const getFavorite = () => {
        axios.get("http://localhost:8000/api/favorites", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setWishList(res.data);
            console.log(res.data);
        });
    }

    useEffect(() => {
        getFavorite();
    }, []);
    console.log(wishList);

    return (
        <>
          <Navbar />
          <div></div>
        </>
    )
}

export default Wishlist