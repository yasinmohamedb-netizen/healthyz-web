// src/screens/OrdersScreen.jsx
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BASE_URL } from "../context/config";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

export default function OrdersScreen() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [firebaseUid, setFirebaseUid] = useState(null);
  const [mongoUserId, setMongoUserId] = useState(null);

  const [orders, setOrders] = useState([]);
  const [returnRequests, setReturnRequests] = useState([]);
  const [cancelRequests, setCancelRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ----------------------------------------------------
    1. GET MONGO USER ID FROM FIREBASE UID
  ---------------------------------------------------- */
  const fetchMongoUser = async (uid) => {
    try {
      const res = await fetch(`${BASE_URL}/users/firebase/${uid}`);
      const data = await res.json();

      if (data && data._id) {
        setMongoUserId(data._id);
      } else {
        console.log("❌ User not found in DB");
      }
    } catch (err) {
      console.error("User fetch error:", err);
    }
  };

  /* ----------------------------------------------------
    2. AUTH LISTENER
  ---------------------------------------------------- */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setFirebaseUid(user.uid);
        fetchMongoUser(user.uid);
      } else {
        setFirebaseUid(null);
        setMongoUserId(null);
        setOrders([]);
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  /* ----------------------------------------------------
    3. SOCKET.IO LIVE UPDATES
  ---------------------------------------------------- */
  useEffect(() => {
    const socket = io(BASE_URL);

    socket.on("orderUpdated", (data) => {
      setOrders((prev) =>
        prev.map((o) =>
          o._id === data.orderId ? { ...o, status: data.status } : o
        )
      );
    });

    return () => socket.disconnect();
  }, []);

  /* ----------------------------------------------------
    4. FETCH USER ORDERS
  ---------------------------------------------------- */
  const fetchOrders = async (uid) => {
    try {
      const res = await fetch(`${BASE_URL}/orders/${uid}`);
      const data = await res.json();

      setOrders(Array.isArray(data.orders) ? data.orders : []);
    } catch (err) {
      console.error("Order fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mongoUserId) fetchOrders(mongoUserId);
  }, [mongoUserId]);

  /* ----------------------------------------------------
    5. PRODUCT STATUS
  ---------------------------------------------------- */
  const getProductStatus = (order, productId) => {
    const cancel = cancelRequests.find(
      (r) => r.orderId === order._id && r.productId === productId
    );
    if (cancel) return { type: "Cancelled", color: "#EF4444", bg: "#FEE2E2" };

    const ret = returnRequests.find(
      (r) => r.orderId === order._id && r.productId === productId
    );
    if (ret) return { type: "Return Requested", color: "#F59E0B", bg: "#FEF3C7" };

    if (order.status) {
      let color = "#6B7280";
      let bg = "#F3F4F6";

      switch (order.status) {
        case "Completed":
          color = "#047857";
          bg = "#ECFDF5";
          break;
        case "Returned":
          color = "#EF4444";
          bg = "#FEE2E2";
          break;
        case "Replaced":
          color = "#2563EB";
          bg = "#EFF6FF";
          break;
        case "Packed":
          color = "#0EA5E9";
          bg = "#ECFEFF";
          break;
        case "Shipped":
          color = "#FBBF24";
          bg = "#FEFCE8";
          break;
      }

      return { type: order.status, color, bg };
    }

    return null;
  };

  /* ----------------------------------------------------
    LOADING + EMPTY UI
  ---------------------------------------------------- */
  if (loading) {
    return (
      <div className="os-wrapper">
        <div className="os-header">
          <h1>Order History</h1>
        </div>
        <div className="os-loader-section">
          <div className="os-spinner"></div>
          <p className="os-loader-text">Loading your orders...</p>
        </div>
        <style jsx>{orderStyles}</style>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="os-wrapper">
        <div className="os-header">
          <h1>Order History</h1>
        </div>
        <div className="os-empty-state">
          <h2>No Orders Yet</h2>
          <p>Your purchase history will appear here.</p>
          <button onClick={() => navigate("/")} className="os-browse-btn">
            Browse Products
          </button>
        </div>
        <style jsx>{orderStyles}</style>
      </div>
    );
  }

  /* ----------------------------------------------------
    MAIN UI
  ---------------------------------------------------- */
  return (
    <div className="os-wrapper">
      <div className="os-header">
        <h1>Order History</h1>
      </div>

      <div className="os-orders-grid">
        {orders.map((order) => {
          const isPaid = order.paymentMethod !== "Cash on Delivery";
          const items = order.items || [];
          const totalPaid = order.totalAmount;

          return (
            <div key={order._id} className="os-order-card">
              {/* Order Header */}
              <div className="os-order-header">
                <span className="os-date">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>

                <span
                  className={`os-badge ${
                    isPaid ? "os-badge-paid" : "os-badge-cod"
                  }`}
                >
                  {isPaid ? "PAID" : "COD"}
                </span>
              </div>

              {/* Order Items */}
              <div className="os-items-list">
                {items.map((prod) => {
                  const status = getProductStatus(order, prod.productId);
                  const canCancel =
                    !status ||
                    !["Completed", "Returned", "Replaced"].includes(
                      status.type
                    );

                  return (
                    <div key={prod.productId} className="os-item-row">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="os-item-image"
                        onError={(e) => {
                          e.target.src = "/placeholder-image.png"; // fallback
                        }}
                      />

                      <div className="os-item-details">
                        <h4 className="os-item-name">{prod.name}</h4>
                        <p className="os-item-meta">
                          Qty: {prod.quantity} • ₹{(prod.price * prod.quantity).toFixed(2)}
                        </p>

                        {status && (
                          <span className="os-status-badge" style={{ background: status.bg, color: status.color }}>
                            {status.type}
                          </span>
                        )}

                        {canCancel && (
                          <button
                            className="os-action-btn"
                            onClick={() =>
                              navigate(
                                `/cancel-order?orderId=${order._id}&productId=${prod.productId}&name=${encodeURIComponent(
                                  prod.name
                                )}&qty=${prod.quantity}&price=${prod.price}&image=${encodeURIComponent(
                                  prod.image
                                )}`
                              )
                            }
                          >
                            Adjust Order
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Footer */}
              <div className="os-order-footer">
                <div>
                  <strong className="os-total-label">
                    {isPaid ? "Total Paid" : "Total (COD)"}
                  </strong>
                  <p className="os-fee-note">Includes tax & delivery</p>
                </div>
                <strong className="os-total-amount">₹{totalPaid.toFixed(2)}</strong>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{orderStyles}</style>
    </div>
  );
}

/* ------------------- CSS (Modern, Compact, Responsive) ------------------- */
const orderStyles = `
.os-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
  min-height: 100vh;
  background-color: #f8fafc;
}

.os-header {
  text-align: center;
  margin-bottom: 32px;
}

.os-header h1 {
  font-size: 1.75rem;
  font-weight: 800;
  color: #1e293b;
  letter-spacing: -0.5px;
  margin: 0;
}

/* ------------ LOADER ------------ */
.os-loader-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.os-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid #cbd5e1;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.os-loader-text {
  margin-top: 16px;
  font-size: 1rem;
  color: #64748b;
  font-weight: 500;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ------------ EMPTY STATE ------------ */
.os-empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  margin: 0 auto;
  max-width: 500px;
}

.os-empty-state h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px;
}

.os-empty-state p {
  font-size: 1rem;
  color: #64748b;
  margin: 0 0 24px;
  line-height: 1.5;
}

.os-browse-btn {
  padding: 10px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.os-browse-btn:hover {
  background: #2563eb;
}

/* ------------ ORDER GRID ------------ */
.os-orders-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
}

/* ------------ ORDER CARD ------------ */
.os-order-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.os-order-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
}

/* Order Header */
.os-order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.os-date {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.os-badge {
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.os-badge-paid {
  background: #ecfdf5;
  color: #047857;
}

.os-badge-cod {
  background: #fef3c7;
  color: #92400e;
}

/* Items List */
.os-items-list {
  margin-bottom: 16px;
}

.os-item-row {
  display: flex;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
}

.os-item-row:last-child {
  border-bottom: none;
}

.os-item-image {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.os-item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.os-item-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 4px;
}

.os-item-meta {
  font-size: 0.8125rem;
  color: #64748b;
  margin: 0 0 6px;
}

.os-status-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.os-action-btn {
  padding: 6px 14px;
  background: #eff6ff;
  color: #2563eb;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: fit-content;
}

.os-action-btn:hover {
  background: #dbeafe;
  border-color: #93c5fd;
}

/* Order Footer */
.os-order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.os-total-label {
  font-size: 0.875rem;
  color: #374151;
}

.os-fee-note {
  font-size: 0.75rem;
  color: #94a3b8;
  margin: 4px 0 0;
}

.os-total-amount {
  font-size: 1.125rem;
  color: #0f766e;
  font-weight: 700;
}

/* ------------ RESPONSIVE ------------ */
@media (max-width: 768px) {
  .os-wrapper {
    padding: 16px 12px;
  }

  .os-header h1 {
    font-size: 1.5rem;
  }

  .os-orders-grid {
    grid-template-columns: 1fr;
  }

  .os-item-row {
    flex-direction: column;
    gap: 12px;
  }

  .os-item-image {
    width: 100%;
    height: 120px;
  }

  .os-order-footer {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }

  .os-total-amount {
    align-self: flex-end;
  }
}

@media (max-width: 480px) {
  .os-order-card {
    padding: 16px;
  }

  .os-item-name {
    font-size: 0.9rem;
  }

  .os-action-btn {
    font-size: 0.75rem;
    padding: 5px 12px;
  }

  .os-browse-btn {
    padding: 8px 20px;
    font-size: 0.9rem;
  }
}

@media (min-width: 1200px) {
  .os-orders-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1600px) {
  .os-orders-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
`;