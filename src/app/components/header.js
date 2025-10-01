'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Header() {
     /*
     this code fetch the cart items and calculate total quantity from backend and it will be replaced by context api
     because we want to use the cart items in multiple components not only in header we want to load it one time and use it everywhere
     so we will use context api to store the cart items and total quantity and use it in header and checkout page
     const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        // This will run only once when the component mounts
      axios.get('https://backendmodules.onrender.com/api/cart-items')
  .then((response) => 
    {  
      setCartItems(response.data); // here with axios we dont want to use json() we get the data from the response directly
    })
      }, []);
      let totalQuantity = 0;
      cartItems.forEach(item => {
        totalQuantity += item.quantity;
      });*/
      const { totalQuantity } = useContext(CartContext)


    return ( <>
    <div className="header">
      <div className="left-section">
        <Link href="/" className="logo-link">MOULOUD</Link>
      </div>

      <div className="middle-section">
        <input className="search-bar"  placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" href="/orders">

          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" href="checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
        </>
    )
}