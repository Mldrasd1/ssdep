'use client';
import Link from "next/link";
import React from "react";
import { CartProvider } from "../components/CartContext";
import { CartContext } from "../components/CartContext";
import {formatPrice} from "../../../utils/FormatePrices"
import { useContext, Fragment } from "react";
import dayjs from "dayjs";
import axios from "axios";
export default function OrdersPage() {
  const {orders,cartItems} = useContext(CartContext);
  console.log("Orders in OrdersPage:", orders);
  return (
     <CartProvider>
    <div className="orders-page">
      <div className="page-title">Your Orders</div>

      <div className="orders-grid">
        {
          orders.map( (order,indx) => {
            return (
              <div className="order-container" key={indx}>

          <div className="order-header">
            <div className="order-header-left-section">
              <div className="order-date">
                <div className="order-header-label">Order Placed:</div>
                <div>{dayjs(order.orderTimeMs).format('MMM D')  }</div>
              </div>
              <div className="order-total">
                <div className="order-header-label">Total:</div>
                <div>{formatPrice(order.totalCostCents)}</div>
              </div>
            </div>

            <div className="order-header-right-section">
              <div className="order-header-label">Order ID:</div>
              <div>{order.id}</div>
            </div>
          </div>

          <div className="order-details-grid">
            {
              order.products.map( (pproduct,indx) => {
                return( <Fragment key={indx}>
                  <div className="product-image-container">
              <img src={pproduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">
                {pproduct.product.name}
              </div>
              <div className="product-delivery-date">
                Arriving on: {dayjs(pproduct.estimatedDeliveryTimeMs).format('MMMM D')}
              </div>
              <div className="product-quantity">
                Quantity: {pproduct.quantity}
              </div>
              <button className="buy-again-button button-primary" onClick={ async() => {
             await axios.post('http://localhost:3000/api/cart-items' ,
                 {
                productId: pproduct.product.id,
                quantity: pproduct.quantity}
            )
            }}>
                <img className="buy-again-icon" src="images/icons/buy-again.png" />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <Link href="/tracking">
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </Link>
            </div>
                </Fragment>

                )
            })}
          </div>
        </div>
            )
          }     )
        }
      </div>
    </div>
  </CartProvider>
  );
}