// src/screens/products/CartScreen.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./CartScreen.css";

export default function CartScreen() {
  const navigate = useNavigate();
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(CartContext);

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.price ?? item.originalPrice ?? 0;
    return sum + price * (item.quantity ?? 1);
  }, 0);

  const totalTax = cartItems.reduce((sum, item) => {
    const price = item.price ?? item.originalPrice ?? 0;
    const taxPercentage = item.tax ?? 0;
    return sum + ((price * taxPercentage) / 100) * (item.quantity ?? 1);
  }, 0);

  const total = subtotal + totalTax;

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <p>Your cart is empty</p>
        <button onClick={() => navigate("/explore")}>Shop Now</button>
      </div>
    );
  }

  return (
    <div className="cart-page">

      {/* Left Side – Items */}
      <div className="cart-left">
        <h1 className="cart-title">Cart</h1>

        <div className="cart-section-header">
          <span className="circle-number">1</span>
          <p>Review products’ set</p>
        </div>

        {cartItems.map((item) => {
          const price = item.price ?? item.originalPrice ?? 0;
          const quantity = item.quantity ?? 1;
          const taxPercent = item.tax ?? 0;

          return (
            <div key={item.id} className="cart-row">
              <img src={item.image} alt={item.name} className="cart-img" />

              <div className="cart-info">
                <p className="cart-name">{item.name}</p>

                <div className="cart-qty-box">
                  <button onClick={() => decreaseQuantity(item.id)}>−</button>
                  <span>{quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
              </div>

              <p className="cart-price">₹{price}</p>

              <button
                className="cart-remove"
                onClick={() => removeFromCart(item.id)}
              >
                🗑️
              </button>
            </div>
          );
        })}
      </div>

      {/* Right Side – Summary */}
      <div className="cart-right">
        <div className="summary-box">
          <h3>Selected offer summary</h3>

          <div className="summary-row">
            <span>Proposed total</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Tax</span>
            <span>₹{totalTax.toFixed(2)}</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>TOTAL</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() =>
              navigate("/checkout", {
                state: { cartItems, subtotal, totalTax, total },
              })
            }
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
