import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { BASE_URL, apiFetch } from "../context/config";
import "./OrdersScreen.css";


export default function OrdersScreen() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [firebaseUid, setFirebaseUid] = useState(null);
  const [mongoUserId, setMongoUserId] = useState(null);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* -------------------------------
     1. GET MONGO USER FROM FIREBASE UID
  -------------------------------- */
  const fetchMongoUser = async (uid) => {
    try {
      const data = await apiFetch(`/users/firebase/${uid}`);
      if (data && data._id) {
        setMongoUserId(data._id);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error("User fetch error:", err);
      setLoading(false);
    }
  };

  /* -------------------------------
     2. AUTH LISTENER (OLD LOGIC)
  -------------------------------- */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirebaseUid(user.uid);
        fetchMongoUser(user.uid);
      } else {
        setFirebaseUid(null);
        setMongoUserId(null);
        setOrders([]);
        setLoading(false);
        navigate("/login");
      }
    });
    return () => unsub();
  }, [navigate]);

  /* -------------------------------
     3. SOCKET.IO (OPTIONAL)
  -------------------------------- */
  useEffect(() => {
    if (!mongoUserId) return;

    const socket = io(BASE_URL.replace("/api", ""));
    socket.on("orderUpdated", ({ orderId, status }) => {
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status } : o
        )
      );
    });

    return () => socket.disconnect();
  }, [mongoUserId]);

  /* -------------------------------
     4. FETCH ORDERS (CORRECT WAY)
  -------------------------------- */
  useEffect(() => {
    if (!mongoUserId) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await apiFetch(`/orders/${mongoUserId}`);
        setOrders(Array.isArray(data.orders) ? data.orders : []);
      } catch (err) {
        console.error("Order fetch error:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [mongoUserId]);

  /* -------------------------------
     5. LOADING
  -------------------------------- */
  if (loading) {
    return (
      <div className="os-wrapper">
        <h1>Order History</h1>
        <p>Loading your orders...</p>
      </div>
    );
  }

  /* -------------------------------
     6. EMPTY STATE
  -------------------------------- */
  if (!orders.length) {
    return (
      <div className="os-wrapper">
        <h1>Order History</h1>
        <p>No orders found</p>
        <button onClick={() => navigate("/")}>
          Browse Products
        </button>
      </div>
    );
  }

  /* -------------------------------
     7. MAIN UI (UNCHANGED)
  -------------------------------- */
  return (
    <div className="os-wrapper">
      <h1>Order History</h1>

      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-head">
            <span>{new Date(order.createdAt).toDateString()}</span>
            <span>{order.paymentMethod !== "Cash on Delivery" ? "PAID" : "COD"}</span>
          </div>

          {order.items.map((item, idx) => (
            <div key={idx} className="order-item">
              <img src={item.image} alt={item.name} />
              <div>
                <strong>{item.name}</strong>
                {item.variantLabel && <p>Option: {item.variantLabel}</p>}
                <p>
                  Qty: {item.quantity} • ₹
                  {(item.price * item.quantity).toFixed(2)}
                </p>
                <p>Status: {order.status}</p>
              </div>
            </div>
          ))}

          <div className="order-total">
            Total Paid: ₹{order.totalAmount.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}

