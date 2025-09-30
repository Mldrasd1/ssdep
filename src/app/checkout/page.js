'use client'
import React from 'react'
import Link from "next/link"
import { useContext , useState } from 'react'
import { CartProvider } from "../components/CartContext";
import { CartContext } from "../components/CartContext";
import {formatPrice} from "../../../utils/FormatePrices"
import dayjs from 'dayjs';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
        const { totalQuantity,paymentSummary ,deliveryOptions,totalPrice, cartItems} = useContext(CartContext)
       const router = useRouter()                                                                
       const  creatOrder = async () =>{
                 await axios.post('http://localhost:3000/api/orders')
                 router.push('http://localhost:4000//orders')
                 }
  return (
  <>
  <CartProvider>
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
         <Link href="/" className="logo-link">MOULOUD</Link>
        </div>
        
        <div className="checkout-header-middle-section">
          Checkout (<Link className="return-to-home-link"
            href="/">{totalQuantity}</Link>)
        </div>

        <div className="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png" />
        </div>
      </div>
    </div>
      <div className="checkout-page">
      <div className="page-title">Review your order</div>

      <div className="checkout-grid">
        <div className="order-summary">
          {deliveryOptions.length && cartItems.map((item, index) => {
              const selectedDeliveryOption = deliveryOptions.find((option) => {
              return option.id === item.deliveryOptionId;
              });
              const dleteCartItem = async() => {
               await  axios.delete( `http://localhost:3000/api/cart-items/${item.productId}`)
              }
              return (
              <div className="cart-item-container" key={item.id}>
            <div className="delivery-date">
              Delivery date:{dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
            </div>

            <div className="cart-item-details-grid">
              <img className="product-image" src={item.product.image}
               />

              <div className="cart-item-details">
                <div className="product-name">
                  {item.product.name}
                </div>
                <div className="product-price">
                   {formatPrice(item.product.priceCents)}
                </div>
                <div className="product-quantity">
                  <span>
                    Quantity: <span className="quantity-label">{item.quantity}</span>
                  </span>
                  <span className="update-quantity-link link-primary">
                    Update
                  </span>
                  <span className="delete-quantity-link link-primary" onClick={dleteCartItem}>
                    Delete
                  </span>
                </div>
              </div>

              <div className="delivery-options">
                <div className="delivery-options-title">
                  Choose a delivery option:
                </div>
                {
                  deliveryOptions.map((option) => { 
                    let priceString = "FREE Shipping";
                    if(option.priceCents > 0){
                      priceString = `${formatPrice(option.priceCents)} - Shipping`;
                    }
                    const updateDeliveryOption = async () => {
                      // Update the delivery option for the current cart item
                     await axios.put( `http://localhost:3000/api/cart-items/${item.productId}` , {
                     deliveryOptionId: option.id
                     }  )
                    }
                    return (
                         <div className="delivery-option" key={option.id}
                         onClick={updateDeliveryOption}
                         >
                  <input onChange={()=>{}}  type="radio" checked={option.id === item.deliveryOptionId}
                    className="delivery-option-input"
                    name={`delivery-option-${item.productId}`} />
                  <div>
                    <div className="delivery-option-date">
                      {
                        dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMMM D')
                      }
                    </div>
                    <div className="delivery-option-price">
                      {priceString}
                    </div>
                  </div>
                </div>
                    )})
                  
                }
              </div>
            </div>
          </div>
              );
            })}
        </div>

        <div className="payment-summary">
            <div className="payment-summary-title">
              Payment Summary
            </div>
         { paymentSummary && (
          <>
          <div className="payment-summary-row">
              <div>Items {paymentSummary.totalItems} </div>
              <div className="payment-summary-money">totalPrice {formatPrice(paymentSummary.productCostCents)}</div>
            </div>
            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">{formatPrice(paymentSummary.shippingCostCents)}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">{formatPrice(paymentSummary.totalCostBeforeTaxCents)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">{formatPrice(paymentSummary.taxCents)}</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">{formatPrice(paymentSummary.totalCostCents)}</div>
            </div>

            <button className="place-order-button button-primary" onClick={creatOrder}>
              Place your order
            </button>
          </>
         )
         
         }
            
        </div>
      </div>
    </div>
  </CartProvider>
   </>
  );
}    