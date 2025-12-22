import React, { useContext, useState, useEffect, useMemo } from "react";
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

  const [subtotal, setSubtotal] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(null);
  const [extraCharges, setExtraCharges] = useState({});
  const [grandTotal, setGrandTotal] = useState(null);

  const [loading, setLoading] = useState(false);

  // ==================================
  // FRONTEND FALLBACK SUBTOTAL
  // ==================================
  const frontendSubtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = Number(item.finalItemPrice);
      const qty = Number(item.quantity) || 1;
      if (!Number.isFinite(price) || price <= 0) return sum;
      return sum + price * qty;
    }, 0);
  }, [cartItems]);

  // ==================================
  // SAFE TOTAL (CRITICAL FIX)
  // ==================================
  const safeTotal = useMemo(() => {
    if (Number.isFinite(grandTotal) && grandTotal > 0) {
      return grandTotal;
    }

    return (
      frontendSubtotal +
      (deliveryCharge || 0) -
      (discount || 0)
    );
  }, [grandTotal, frontendSubtotal, deliveryCharge, discount]);

  // ==================================
  // LOAD RAZORPAY SCRIPT
  // ==================================
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  // ==================================
  // DEFAULT ADDRESS
  // ==================================
  useEffect(() => {
    if (userData) {
      const savedDefault =
        userData.addresses?.find((a) => a.isDefault) ||
        userData.addresses?.[0];

      if (savedDefault) setAddress(savedDefault);
      setMobile(userData.mobileNo || "");
    }
  }, [userData]);

  // ==================================
  // ADDRESS CALLBACK
  // ==================================
  useEffect(() => {
    setAddressCallback((newAddress) => setAddress(newAddress));
  }, []);

  // ==================================
  // BACKEND PRICE CALCULATION
  // ==================================
  const updatePriceFromBackend = async (promoInput = promoCode) => {
    try {
      if (!cartItems || cartItems.length === 0) return;

      const resp = await axios.post(
        `${BASE_URL}/checkout-price/calculate`,
        {
          items: cartItems.map((i) => ({
            productId: i.productId || i.id,
            variantId: i.variantId || null,
            quantity: Number(i.quantity) || 1,
            finalItemPrice: Number(i.finalItemPrice),
          })),
          promoCode: promoInput || "",
          userId: userData?._id,
        }
      );

      const data = resp.data;

      setSubtotal(data.subtotal);
      setDeliveryCharge(data.deliveryCharge);
      setDiscount(data.discount);
      setGrandTotal(data.grandTotal);
      setPromoMessage(data.promoMessage || "");
      setExtraCharges(data.extraCharges || {});
    } catch (err) {
      console.error(
        "PRICE CALCULATION ERROR:",
        err.response?.data || err
      );
    }
  };

  // ==================================
  // INITIAL CALCULATION
  // ==================================
  useEffect(() => {
    if (cartItems.length > 0) {
      updatePriceFromBackend();
    }
  }, [cartItems]); // eslint-disable-line

  // ==================================
  // PROMO HANDLERS
  // ==================================
  const handlePromoChange = (value) => {
    setPromoCode(value);
    setDiscount(0);
    setPromoMessage("");
    updatePriceFromBackend("");
  };

  const applyPromo = () => {
    if (!promoCode.trim()) return;
    updatePriceFromBackend(promoCode);
  };

  // ==================================
  // PAYMENT
  // ==================================
  const handleOnlinePayment = async () => {
    if (!address) return alert("Select an address");
    if (!mobile) return alert("Enter mobile number");

    setLoading(true);

    try {
      const resp = await axios.post(`${BASE_URL}/payment/order`, {
        totalAmount: safeTotal,
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
        handler: async (response) => {
          try {
            const verify = await axios.post(
              `${BASE_URL}/payment/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData: {
                  firebaseUid: userData?.firebaseUid,
                  items: cartItems,
                  totalAmount: safeTotal,
                  deliveryAddress: address,
                  mobile,
                  instructions,
                  paymentMethod: "Online Payment",
                  paymentId: response.razorpay_payment_id,
                  promoCode,
                },
                totalAmount: safeTotal,
                type: "order",
              }
            );

            if (verify.data.success) {
              clearCart();
              navigate("/order-success", {
                state: verify.data.order,
              });
            }
          } catch (err) {
            console.error("VERIFY ERROR:", err);
            alert("Order verification failed");
          }
        },
        modal: {
          ondismiss: () => alert("Payment cancelled"),
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error("PAYMENT ERROR:", err);
      alert("Payment Error");
    }

    setLoading(false);
  };

  // ==================================
  // EMPTY CART
  // ==================================
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <p>Your cart is empty</p>
        <button onClick={() => navigate("/explore")}>Shop Now</button>
      </div>
    );
  }

  // ==================================
  // RENDER
  // ==================================
  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-card">
          <h3>Shipping Information</h3>

          <label>Full Name *</label>
          <input type="text" value={address?.name || ""} readOnly />

          <label>Mobile Number *</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <label>Delivery Address *</label>
          {address ? (
            <>
              <textarea
                readOnly
                className="checkout-textarea"
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

          <label>Order Instructions</label>
          <textarea
            className="checkout-textarea"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>

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
          {promoMessage && (
            <p className="promo-success">✓ {promoMessage}</p>
          )}
        </div>
      </div>

      <div className="checkout-right">
        <div className="checkout-summary">
          <h3>Review your cart</h3>

          {cartItems.map((item) => (
            <div
              key={`${item.productId || item.id}_${item.variantId || "base"}`}
              className="summary-item"
            >
              <img src={item.image} alt={item.name} />
              <div>
                <p className="summary-name">{item.name}</p>
                {item.variantLabel && (
                  <p className="summary-variant">
                    Option: {item.variantLabel}
                  </p>
                )}
                <p className="summary-qty">{item.quantity}×</p>
              </div>
              <span className="summary-price">
                ₹{(item.finalItemPrice * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="summary-line">
            <span>Subtotal</span>
            <span>
              ₹
              {(subtotal !== null && subtotal > 0
                ? subtotal
                : frontendSubtotal
              ).toFixed(2)}
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

          {discount > 0 && (
            <div className="summary-line discount-line">
              <span>Discount</span>
              <span>- ₹{discount.toFixed(2)}</span>
            </div>
          )}

          <div className="summary-total">
            <span>Total</span>
            <span>₹{safeTotal.toFixed(2)}</span>
          </div>

          <button
            className="pay-btn"
            disabled={loading}
            onClick={handleOnlinePayment}
          >
            {loading ? "Processing…" : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
