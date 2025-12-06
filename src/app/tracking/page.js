"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/CartContext";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";

export default function TrackingPage() {
  const { orders } = useContext(CartContext);
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const productId = searchParams.get("productId");

  const [trackingInfo, setTrackingInfo] = useState(null);

  useEffect(() => {
    if (orders.length > 0 && orderId && productId) {
      const order = orders.find((o) => o.id === orderId);
      if (order) {
        const product = order.products.find((p) => p.product.id === productId);
        if (product) {
          setTrackingInfo({
            order,
            product,
          });
        }
      }
    }
  }, [orders, orderId, productId]);

  if (!trackingInfo) {
    return (
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </Link>
          <div className="delivery-date">Loading tracking information...</div>
        </div>
      </div>
    );
  }

  const { product, order } = trackingInfo;
  const currentTime = dayjs();
  const orderTime = dayjs(order.orderTimeMs);
  const deliveryTime = dayjs(product.estimatedDeliveryTimeMs);

  const totalTime = deliveryTime.diff(orderTime);
  const elapsedTime = currentTime.diff(orderTime);
  let progressPercent = Math.min(
    100,
    Math.max(0, (elapsedTime / totalTime) * 100)
  );

  let currentStatus = "Preparing";
  let progressBarWidth = "0%";

  if (currentTime.isAfter(deliveryTime)) {
    currentStatus = "Delivered";
    progressBarWidth = "100%";
    progressPercent = 100;
  } else if (progressPercent > 50) {
    currentStatus = "Shipped";
    progressBarWidth = "50%";
  } else if (progressPercent > 0) {
    currentStatus = "Preparing";
    progressBarWidth = "0%";
  }

  return (
    <>
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on {deliveryTime.format("dddd, MMMM D")}
          </div>

          <div className="product-info">{product.product.name}</div>

          <div className="product-info">Quantity: {product.quantity}</div>

          <img
            className="product-image"
            src={product.product.image}
            alt={product.product.name}
          />

          <div className="progress-labels-container">
            <div
              className={`progress-label ${
                currentStatus === "Preparing" ? "current-status" : ""
              }`}
            >
              Preparing
            </div>
            <div
              className={`progress-label ${
                currentStatus === "Shipped" ? "current-status" : ""
              }`}
            >
              Shipped
            </div>
            <div
              className={`progress-label ${
                currentStatus === "Delivered" ? "current-status" : ""
              }`}
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: progressBarWidth }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
