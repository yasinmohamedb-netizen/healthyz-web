// src/screens/Profile/Bookings.jsx
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BASE_URL } from "../../context/config";

export default function Bookings() {
  const auth = getAuth();
  const [userId, setUserId] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ------------------- AUTH -------------------
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else setUserId(null);
    });
    return () => unsub();
  }, []);

  // ------------------- FETCH BOOKINGS -------------------
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch(`${BASE_URL}/bookings/user/${userId}`);
        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch {
        setBookings([]);
      }
      setLoading(false);
    };

    fetchBookings();
  }, [userId]);

  // ------------------- LOADING -------------------
  if (loading) {
    return (
      <div className="bk-wrapper">
        <div className="bk-header">
          <h1 className="bk-title">Your Bookings</h1>
        </div>
        <div className="bk-loader-section">
          <div className="bk-spinner"></div>
          <p className="bk-loader-text">Loading your bookings...</p>
        </div>
        <style jsx>{bookingStyles}</style>
      </div>
    );
  }

  return (
    <div className="bk-wrapper">
      <div className="bk-header">
        <h1 className="bk-title">Your Bookings</h1>
      </div>

      {/* EMPTY STATE */}
      {bookings.length === 0 ? (
        <div className="bk-empty-state">
          <div className="bk-icon">📅</div>
          <h2 className="bk-empty-title">No bookings yet</h2>
          <p className="bk-empty-desc">Your scheduled services will appear here.</p>
        </div>
      ) : (
        <div className="bk-grid">
          {bookings.map((item, index) => (
            <div key={index} className="bk-card">
              <div className="bk-card-top">
                <h3 className="bk-service">{item.serviceName || "Service"}</h3>
                {item.bookingTime && (
                  <span className="bk-date-tag">
                    {new Date(item.bookingTime).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>

              <div className="bk-card-divider"></div>

              <div className="bk-details-grid">
                {renderDetail("Booked By", item.userName)}
                {renderDetail("Contact", item.userMobile)}
                {renderDetail("Days", item.days)}
                {renderDetail("Age", item.age)}
                {renderDetail("Gender", item.gender)}
                {renderDetail("Address", item.address)}
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{bookingStyles}</style>
    </div>
  );
}

// ------------------- DETAIL HELPER -------------------
const renderDetail = (label, value) => {
  if (!value) return null;
  return (
    <div className="bk-detail-item">
      <span className="bk-label">{label}</span>
      <span className="bk-value">{value}</span>
    </div>
  );
};

// ------------------- CSS (Modern, Compact, Responsive) -------------------
const bookingStyles = `
.bk-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
  min-height: 100vh;
  background-color: #f8fafc;
}

.bk-header {
  text-align: center;
  margin-bottom: 32px;
}

.bk-title {
  font-size: 1.75rem; /* 28px */
  font-weight: 800;
  color: #1e293b;
  letter-spacing: -0.5px;
  margin: 0;
}

/* ------------ LOADER ------------ */
.bk-loader-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.bk-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid #cbd5e1;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.bk-loader-text {
  margin-top: 16px;
  font-size: 1rem;
  color: #64748b;
  font-weight: 500;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ------------ EMPTY STATE ------------ */
.bk-empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  margin: 0 auto;
  max-width: 500px;
}

.bk-icon {
  font-size: 4rem;
  margin-bottom: 16px;
  color: #94a3b8;
}

.bk-empty-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px;
}

.bk-empty-desc {
  font-size: 1rem;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

/* ------------ GRID & CARDS ------------ */
.bk-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

.bk-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.bk-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
}

.bk-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;
}

.bk-service {
  font-size: 1.125rem; /* 18px */
  font-weight: 700;
  color: #ea580c;
  margin: 0;
  flex: 1;
  min-width: 0;
}

.bk-date-tag {
  background: #f0fdf4;
  color: #16a34a;
  padding: 4px 10px;
  font-size: 0.75rem;
  border-radius: 9999px;
  font-weight: 600;
  white-space: nowrap;
}

.bk-card-divider {
  height: 1px;
  background: #e2e8f0;
  margin: 16px 0;
}

/* ------------ DETAILS GRID ------------ */
.bk-details-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

.bk-detail-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.bk-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.bk-value {
  font-size: 0.875rem;
  color: #1e293b;
  word-break: break-word;
  font-weight: 500;
}

/* ------------ RESPONSIVE ------------ */
@media (max-width: 768px) {
  .bk-title {
    font-size: 1.5rem;
  }

  .bk-grid {
    grid-template-columns: 1fr;
  }

  .bk-card-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .bk-service {
    font-size: 1.25rem;
  }

  .bk-details-grid {
    grid-template-columns: 1fr;
  }

  .bk-empty-state {
    padding: 40px 16px;
  }

  .bk-icon {
    font-size: 3rem;
  }
}

@media (max-width: 480px) {
  .bk-wrapper {
    padding: 16px 12px;
  }

  .bk-title {
    font-size: 1.25rem;
  }

  .bk-card {
    padding: 16px;
  }

  .bk-service {
    font-size: 1.125rem;
  }

  .bk-date-tag {
    font-size: 0.7rem;
    padding: 3px 8px;
  }
}

@media (min-width: 1200px) {
  .bk-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1600px) {
  .bk-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
`;