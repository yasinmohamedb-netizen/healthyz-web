// src/screens/products/CartScreen.jsx
import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./CartScreen.css";

export default function CartScreen() {
  const navigate = useNavigate();
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);

  // ==============================
  // SAFE PRICE CALCULATION
  // ==============================
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = Number(item.finalItemPrice);
      const qty = Number(item.quantity) || 1;

      if (!Number.isFinite(price) || price <= 0) return sum;

      return sum + price * qty;
    }, 0);
  }, [cartItems]);

  const total = subtotal; // server will handle tax, delivery, discount

  // ==============================
  // EMPTY CART
  // ==============================
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-empty-wrapper">
        <div className="cart-empty-card">
          <img
            className="cart-empty-illustration"
            src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
            alt="Empty cart"
          />
          <h2>Your cart is empty</h2>
          <p className="cart-empty-text">
            Looks like you haven&apos;t added anything yet. Discover healthy
            products curated just for you.
          </p>
          <button
            className="cart-empty-btn"
            onClick={() => navigate("/explore")}
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  // ==============================
  // RENDER
  // ==============================
  return (
    <div className="cart-page">
      {/* LEFT – CART ITEMS */}
      <div className="cart-left">
        <h1 className="cart-title">Cart</h1>

        <div className="cart-section-header">
          <span className="circle-number">1</span>
          <p>Review products</p>
        </div>

        {cartItems.map((item) => {
          const price = Number(item.finalItemPrice);
          const quantity = Number(item.quantity) || 1;
          const lineTotal =
            Number.isFinite(price) && price > 0
              ? price * quantity
              : 0;

          return (
            <div
              key={`${item.productId}_${item.variantId || "base"}`}
              className="cart-row"
            >
              <img
                src={item.image}
                alt={item.name}
                className="cart-img"
              />

              <div className="cart-info">
                <p className="cart-name">{item.name}</p>

                {item.variantLabel && (
                  <p className="cart-variant">
                    Option: {item.variantLabel}
                  </p>
                )}

                <div className="cart-qty-box">
                  <button
                    onClick={() =>
                      decreaseQuantity(
                        item.productId,
                        item.variantId
                      )
                    }
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    onClick={() =>
                      increaseQuantity(
                        item.productId,
                        item.variantId
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <p className="cart-price">
                ₹{lineTotal.toFixed(2)}
              </p>

              <button
                className="cart-remove"
                onClick={() =>
                  removeFromCart(
                    item.productId,
                    item.variantId
                  )
                }
              >
                🗑️
              </button>
            </div>
          );
        })}
      </div>

      {/* RIGHT – SUMMARY */}
      <div className="cart-right">
        <div className="summary-box">
          <h3>Order summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Inclusive of all taxes</span>
            <span></span>
          </div>

          <hr />

          <div className="summary-total">
            <span>TOTAL</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
