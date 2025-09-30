'use client'
import axios from "axios";
import React from 'react'
import { createContext, useState , useEffect} from 'react'
export const CartContext = createContext()
export const CartProvider = ({children}) => {
     const [cartItems, setCartItems] = useState([]);
     const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null)
  const [orders, setOrders] = useState([]);

      /*******************************/
      // Fetch delivery options when the component mounts
    useEffect(() => {
       axios.get('http://localhost:3000/api/delivery-Options?expand=estimatedDeliveryTime')
  .then((response) => { 
      setDeliveryOptions(response.data); // here with axios we dont want to use json() we get the data from the response directly
    })
      }, []);

      /*******************************/
   
        // This will run only once when the component mounts
    /*useEffect(() => {
        axios.get('http://localhost:3000/api/cart-items?expand=product')
  .then((response) => { 
      setCartItems(response.data); // here with axios we dont want to use json() we get the data from the response directly
    })
      }, []); this is fetching data using promise get then in next it prefered to use async await */
      // mehthod of fetching data using async await (preferred)
      useEffect(() => {
        const HelpgettingData = async () => { // here when we use async await we need to create a function inside useEffect and call it
          const response = await axios.get('http://localhost:3000/api/cart-items?expand=product')
      setCartItems(response.data); // here with axios we dont want to use json() we get the data from the response directly
      }
      HelpgettingData(); // calling the async function it help us usiing useEffect with async await
    }, [cartItems]);
      /*******************************/
      // method of fetching data using get then (not preferred) 
      useEffect(() => {
        axios.get('http://localhost:3000/api/payment-summary')
  .then((response) => { 
      setPaymentSummary(response.data); // here with axios we dont want to use json() we get the data from the response directly
    })
      }, [cartItems]);
      /*******************************/
       useEffect(() => {
        axios.get('http://localhost:3000/api/orders?expand=products')
  .then((response) => { 
      setOrders(response.data); // here with axios we dont want to use json() we get the data from the response directly
    })
      }, [orders]);

      /*******************************/
      // Calculate total quantity of items in the cart
      let totalQuantity = 0;
      cartItems.forEach(item => {
        totalQuantity += item.quantity;

      });
      /*******************************/
    return (
    <CartContext.Provider value={{cartItems,orders,paymentSummary, setCartItems,deliveryOptions, totalQuantity}}>
        {children}
    </CartContext.Provider>
    )
}
