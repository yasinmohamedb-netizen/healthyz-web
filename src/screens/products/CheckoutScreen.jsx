// src/screens/products/CheckoutScreen.jsx

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { BASE_URL } from "../../context/config";
import { setAddressCallback } from "../../utils/AddressCallback";
import "./CheckoutScreen.css";

export default function CheckoutScreen() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const { userData } = useContext(UserContext) || {};

  const [address, setAddress] = useState(null);
  const [mobile, setMobile] = useState("");
  const [instructions, setInstructions] = useState("");

  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");

  // start as null so UI can show "Calculating..."
  const [subtotal, setSubtotal] = useState(null);
  const [tax, setTax] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(null);
  const [extraCharges, setExtraCharges] = useState({});
  const [grandTotal, setGrandTotal] = useState(null);

  const [loading, setLoading] = useState(false);

  // load Razorpay script
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  // load user default address + mobile
  useEffect(() => {
    if (userData) {
      const savedDefault =
        userData.addresses?.find((a) => a.isDefault) ||
        userData.addresses?.[0];

      if (savedDefault) setAddress(savedDefault);
      setMobile(userData.mobileNo || "");
    }
  }, [userData]);

  // listen for address update callback
  useEffect(() => {
    setAddressCallback((newAddress) => setAddress(newAddress));
  }, []);

  // ================================
  // PRICE CALCULATION — BACKEND
  // ================================
  const updatePriceFromBackend = async (promoInput = promoCode) => {
    try {
      if (!cartItems || cartItems.length === 0) return;
  
      const resp = await axios.post(
        `${BASE_URL}/checkout-price/calculate`,
        {
          items: cartItems.map((i) => ({
            productId: i.productId || i._id || i.id,
            quantity: i.quantity || 1,
            price: i.price, // send final price
          })),
          promoCode: promoInput || "",
          userId: userData?._id,
        }
      );
  
      const data = resp.data;
      setSubtotal(data.subtotal);
      setTax(data.tax);
      setDeliveryCharge(data.deliveryCharge);
      setDiscount(data.discount);
      setGrandTotal(data.grandTotal);
      setPromoMessage(data.promoMessage || "");
      setExtraCharges(data.extraCharges || {});
    } catch (err) {
      console.log("PRICE CALCULATION ERROR:", err.response?.data || err);
    }
  };
  
  
  

  // load price on first render
  useEffect(() => {
    if (cartItems.length > 0) updatePriceFromBackend();
  }, [cartItems]); // eslint-disable-line react-hooks/exhaustive-deps

  // ================================
  // PROMO CODE HANDLING
  // ================================
  const handlePromoChange = (value) => {
    setPromoCode(value);
    // reset promo instantly
    setDiscount(0);
    setPromoMessage("");
    // refresh totals without promo
    updatePriceFromBackend("");
  };

  const applyPromo = () => {
    if (!promoCode.trim()) return;
    updatePriceFromBackend(promoCode);
  };

  // ================================
  // PAYMENT
  // ================================
  const handleOnlinePayment = async () => {
    if (!address) return alert("Select an address");
    if (!mobile) return alert("Enter mobile number");
    if (!grandTotal) return alert("Price calculation pending");

    setLoading(true);

    try {
      const resp = await axios.post(`${BASE_URL}/payment/order`, {
        totalAmount: grandTotal,
        type: "order",
      });

      const { orderId, amount, razorpayKey, currency } = resp.data;

      const options = {
        key: razorpayKey,
        amount,
        currency,
        name: "Healthyz",
        description: "Order Payment",
        order_id: orderId,
        prefill: {
          name: userData?.fullName,
          email: userData?.email,
          contact: mobile,
        },
        theme: { color: "#3B82F6" },
        handler: async function (response) {
          try {
            const verify = await axios.post(`${BASE_URL}/payment/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderData: {
                firebaseUid: userData?.firebaseUid,
                items: cartItems.map((i) => ({
                  productId: i.id || i._id || i.productId,
                  name: i.name,
                  quantity: i.quantity,
                  price: i.price,
                  image: i.image,
                })),
                totalAmount: grandTotal,
                deliveryAddress: address,
                mobile,
                instructions,
                paymentMethod: "Online Payment",
                paymentId: response.razorpay_payment_id,
                promoCode,
              },
              totalAmount: grandTotal,
              type: "order",
            });

            if (verify.data.success) {
              clearCart();
              navigate("/order-success", { state: verify.data.order });
            }
          } catch (err) {
            console.log("VERIFY ERROR:", err.response?.data || err);
            alert("Order verification failed");
          }
        },
        modal: {
          ondismiss: () => alert("Payment cancelled"),
        },
      };

      // open Razorpay widget
      new window.Razorpay(options).open();
    } catch (err) {
      console.log("PAYMENT ERROR:", err.response?.data || err);
      alert("Payment Error");
    }

    setLoading(false);
  };

  // ================================
  // EMPTY CART
  // ================================
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <p>Your cart is empty</p>
        <button onClick={() => navigate("/explore")}>Shop Now</button>
      </div>
    );
  }

  // ================================
  // UI
  // ================================
  return (
    <div className="checkout-container">
      {/* LEFT */}
      <div className="checkout-left">
        <h1 className="checkout-title">Checkout</h1>

        {/* SHIPPING */}
        <div className="checkout-card">
          <h3>Shipping Information</h3>

          <label>Full Name *</label>
          <input type="text" value={address?.name || ""} readOnly />

          <label>Mobile Number *</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile number"
          />

          <label>Delivery Address *</label>
          {address ? (
            <>
              <textarea
                className="checkout-textarea"
                readOnly
                value={[
                  address.line1,
                  address.line2,
                  address.city,
                  address.state,
                  address.zipcode,
                  address.country,
                ]
                  .filter(Boolean)
                  .join(", ")}
              />
              <button
                className="address-edit-btn"
                onClick={() => navigate("/address")}
              >
                Edit Address
              </button>
            </>
          ) : (
            <button
              className="address-edit-btn"
              onClick={() => navigate("/address-edit")}
            >
              Add Address
            </button>
          )}

          <label>Order Instructions (Optional)</label>
          <textarea
            className="checkout-textarea"
            placeholder="Any instructions for delivery?"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>

        {/* PROMO CODE */}
        <div className="checkout-card">
          <h3>Discount Code</h3>

          <div className="promo-row">
            <input
              type="text"
              placeholder="Enter discount code"
              value={promoCode}
              onChange={(e) => handlePromoChange(e.target.value)}
            />
            <button onClick={applyPromo}>Apply</button>
          </div>

          {promoMessage && <p className="promo-success">✓ {promoMessage}</p>}
        </div>
      </div>

      {/* RIGHT */}
      <div className="checkout-right">
        <div className="checkout-summary">
          <h3>Review your cart</h3>

          {cartItems.map((item) => (
            <div key={item.id || item._id} className="summary-item">
              <img src={item.image} alt={item.name} />
              <div>
                <p className="summary-name">{item.name}</p>
                <p className="summary-qty">{item.quantity}×</p>
              </div>
              <span className="summary-price">₹{item.price}</span>
            </div>
          ))}

          <div className="summary-line">
            <span>Subtotal</span>
            <span>
              {subtotal === null ? "Calculating..." : `₹${subtotal.toFixed(2)}`}
            </span>
          </div>

          <div className="summary-line">
            <span>Shipping</span>
            <span>
              {deliveryCharge === null
                ? "Calculating..."
                : deliveryCharge === 0
                ? "Free"
                : `₹${deliveryCharge}`}
            </span>
          </div>

          {extraCharges?.nightCharge > 0 && (
            <div className="summary-line">
              <span>Night Charge</span>
              <span>₹{extraCharges.nightCharge}</span>
            </div>
          )}

          {extraCharges?.packingCharge > 0 && (
            <div className="summary-line">
              <span>Packing Charge</span>
              <span>₹{extraCharges.packingCharge}</span>
            </div>
          )}

          {extraCharges?.festivalFee > 0 && (
            <div className="summary-line">
              <span>Festival Fee</span>
              <span>₹{extraCharges.festivalFee}</span>
            </div>
          )}

          <div className="summary-line tax-inclusive">
            <span>Inclusive of all taxes</span>
          </div>

          {discount > 0 && (
            <div className="summary-line discount-line">
              <span>Discount</span>
              <span>- ₹{discount.toFixed(2)}</span>
            </div>
          )}

          <div className="summary-total">
            <span>Total</span>
            <span>
              {grandTotal === null
                ? "Calculating..."
                : `₹${grandTotal.toFixed(2)}`}
            </span>
          </div>

          <button
            className="pay-btn"
            disabled={loading || grandTotal === null}
            onClick={handleOnlinePayment}
          >
            {loading ? "Processing…" : "Pay Now"}
          </button>

          <p className="secure-text">
            🔒 Secure Checkout – Your payment details are safe
          </p>
        </div>
      </div>
    </div>
  );
}
