'use client'
import Image from "next/image";
import axios from "axios";
import { useEffect ,  useState } from "react";
import Product from "./components/Product";


export default function Home() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios.get('https://backendmodules.onrender.com/api/products')
  .then((response) => 
    { setProduct(response.data); // here with axios we dont want to use json() we get the data from the response directly
    })
  }, []);
  
 
  /* the same thing as axios but this is harder to handle
  fetch('https://backendmodules.onrender.com/api/products')
  .then((response) => 
    {
return response.json() we use json to convert the response to json format
    }).then ((data) => {
       console.log(data); // we get the data from the response
})*/
  return (
   <>
    <div className="home-page">
      <div className="products-grid">
          { product.map((product) => ( 
             
            <Product key={product.id} product={product} />
            
          ) )}
          
        </div>
      </div>

   </>
  );
}
