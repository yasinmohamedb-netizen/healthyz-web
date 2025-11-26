// src/screens/ActionPolicy.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../context/config";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function ActionPolicy() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [searchParams] = useSearchParams();
  const [mongoUserId, setMongoUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  // URL parameters
  const orderId = searchParams.get("orderId");
  const productId = searchParams.get("productId");
  const name = searchParams.get("name");
  const qty = searchParams.get("qty");
  const price = searchParams.get("price");
  const image = searchParams.get("image");

  /* Fetch MongoDB userId using Firebase UID */
  const fetchMongoUser = async (firebaseUid) => {
    try {
      const res = await fetch(`${BASE_URL}/users/firebase/${firebaseUid}`);
      const data = await res.json();

      if (data && data._id) {
        setMongoUserId(data._id);
      }
    } catch (err) {
      console.error("User fetch error:", err);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) fetchMongoUser(user.uid);
    });
    return () => unsub();
  }, []);

  const reasons = [
    "Ordered by Mistake",
    "Found Cheaper Elsewhere",
    "Changed Mind",
    "Other",
  ];

  const cancelPolicy = `
1. Orders can be cancelled within 2 hours of placement.
2. Once the order is shipped, cancellation is not possible.
3. Refunds for cancelled orders will be processed within 3 business days.
  `;

  /* Submit cancellation request */
  const handleCancel = async (reason) => {
    if (!mongoUserId) return alert("User not found!");

    if (!window.confirm(`Cancel this order?\nReason: ${reason}`)) return;

    setLoading(true);
    try {
      const payload = {
        userId: mongoUserId,
        orderId,
        productId,
        productName: name,
        productPrice: price,
        quantity: qty,
        image,
        reason,
        type: "Cancel",
      };

      await axios.post(`${BASE_URL}/cancel-requests`, payload);

      alert("Cancellation request submitted!");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Failed to submit cancellation request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="policy-wrapper">
      <style>{policyStyles}</style>

      <h1 className="policy-title">Cancellation Policy</h1>

      {/* Policy box */}
      <div className="policy-box">
        <p className="policy-text">{cancelPolicy}</p>
      </div>

      {/* Product display */}
      <div className="product-box">
        <img src={image} className="product-img" alt="" />
        <div>
          <p className="product-name">{name}</p>
          <p className="product-sub">Qty: {qty} • ₹{price}</p>
        </div>
      </div>

      {/* Reasons */}
      <h2 className="reasons-title">Select cancellation reason</h2>

      <div className="reasons-list">
        {reasons.map((reason) => (
          <button
            key={reason}
            onClick={() => handleCancel(reason)}
            disabled={loading}
            className="reason-btn"
          >
            {reason}
          </button>
        ))}
      </div>

      {loading && <p className="loading-text">Processing...</p>}
    </div>
  );
}

/* ----------------- CSS (Responsive + Clean) ----------------- */
const policyStyles = `
.policy-wrapper {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 24px;
  background: #f9fafb;
  min-height: 100vh;
}

.policy-title {
  font-size: 26px;
  font-weight: 700;
  color: #439BAE;
  margin-bottom: 16px;
}

.policy-box {
  background: white;
  border: 1px solid #e5e7eb;
  padding: 18px;
  border-radius: 12px;
  margin-bottom: 24px;
  white-space: pre-line;
}

.policy-text {
  color: #444;
  line-height: 1.6;
  font-size: 15px;
}

/* Product */
.product-box {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
}

.product-img {
  width: 70px;
  height: 70px;
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid #ddd;
}

.product-name {
  font-weight: 600;
  color: #1f2937;
}

.product-sub {
  font-size: 14px;
  color: #6b7280;
}

/* Reasons */
.reasons-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #374151;
}

.reasons-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.reason-btn {
  width: 100%;
  padding: 12px;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 15px;
  color: #333;
  cursor: pointer;
  transition: 0.2s;
}

.reason-btn:hover {
  background: #f3f4f6;
}

.reason-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Loading */
.loading-text {
  text-align: center;
  color: #439BAE;
  font-weight: 600;
  margin-top: 18px;
}

/* ------------------ Responsive ------------------ */

@media (max-width: 480px) {
  .policy-title {
    font-size: 22px;
  }

  .policy-box {
    padding: 14px;
  }

  .reason-btn {
    font-size: 14px;
    padding: 10px;
  }

  .product-img {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 360px) {
  .policy-title {
    font-size: 20px;
  }

  .policy-box {
    padding: 12px;
  }

  .reason-btn {
    font-size: 13px;
  }
}
`;
