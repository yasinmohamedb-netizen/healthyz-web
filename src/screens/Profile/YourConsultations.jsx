// src/screens/Profile/YourConsultations.jsx
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BASE_URL } from "../../context/config";

export default function YourConsultations() {
  const [userId, setUserId] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  /* ------------------ AUTH LISTENER ------------------ */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        setConsultations([]);
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  /* ------------------ FETCH CONSULTATIONS ------------------ */
  const fetchConsultations = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/consultations/user/${userId}`);
      const data = await res.json();
      setConsultations(Array.isArray(data) ? data : []);
    } catch {
      setConsultations([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userId !== null) {
      fetchConsultations();
    }
  }, [userId]);

  /* ------------------ LOADING UI ------------------ */
  if (loading) {
    return (
      <div className="cs-wrapper">
        <div className="cs-header">
          <h1 className="cs-title">Your Consultations</h1>
        </div>
        <div className="cs-loader-section">
          <div className="cs-spinner"></div>
          <p className="cs-loader-text">Loading your consultations...</p>
        </div>
        <style jsx>{consultStyles}</style>
      </div>
    );
  }

  /* ------------------ USER NOT LOGGED IN ------------------ */
  if (!userId) {
    return (
      <div className="cs-wrapper">
        <div className="cs-header">
          <h1 className="cs-title">Your Consultations</h1>
        </div>
        <div className="cs-empty-state">
          <p className="cs-empty-text">Please log in to view consultations.</p>
        </div>
        <style jsx>{consultStyles}</style>
      </div>
    );
  }

  return (
    <div className="cs-wrapper">
      <div className="cs-header">
        <h1 className="cs-title">Your Consultations</h1>
      </div>

      {/* EMPTY STATE */}
      {consultations.length === 0 ? (
        <div className="cs-empty-state">
          <h2 className="cs-empty-title">No consultations yet</h2>
          <p className="cs-empty-desc">
            Your past video or audio consultations will appear here.
          </p>
        </div>
      ) : (
        <div className="cs-grid">
          {consultations.map((item) => (
            <div key={item._id} className="cs-card">
              <div className="cs-card-top">
                <h3 className="cs-patient-name">
                  {item.patientName || "Unnamed Patient"}
                </h3>
              </div>

              <div className="cs-card-divider"></div>

              <div className="cs-details-grid">
                {renderRow("Mobile", item.patientMobile)}
                {renderRow("Age", item.age)}
                {renderRow("Gender", item.gender)}
                {renderRow("Issue", item.diseaseDescription)}
                {renderRow("Call Type", item.callType)}
                {renderRow("Specialization", item.specialization)}

                {item.prescription?.doctorName &&
                  renderRow("Doctor", item.prescription.doctorName)}

                {item.createdAt &&
                  renderRow(
                    "Date",
                    new Date(item.createdAt).toLocaleString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  )}
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{consultStyles}</style>
    </div>
  );
}

/* ------------------ RENDER ROW HELPER ------------------ */
function renderRow(label, value) {
  if (!value) return null;
  return (
    <div className="cs-detail-item">
      <span className="cs-label">{label}</span>
      <span className="cs-value">{value}</span>
    </div>
  );
}

/* ------------------ CSS (Modern, Compact, Responsive) ------------------ */
const consultStyles = `
.cs-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
  min-height: 100vh;
  background-color: #f8fafc;
}

.cs-header {
  text-align: center;
  margin-bottom: 32px;
}

.cs-title {
  font-size: 1.75rem; /* 28px */
  font-weight: 800;
  color: #1e293b;
  letter-spacing: -0.5px;
  margin: 0;
}

/* ------------ LOADER ------------ */
.cs-loader-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.cs-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid #cbd5e1;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.cs-loader-text {
  margin-top: 16px;
  font-size: 1rem;
  color: #64748b;
  font-weight: 500;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ------------ EMPTY STATES ------------ */
.cs-empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  margin: 0 auto;
  max-width: 500px;
}

.cs-empty-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px;
}

.cs-empty-desc,
.cs-empty-text {
  font-size: 1rem;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

/* ------------ GRID & CARDS ------------ */
.cs-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

.cs-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cs-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
}

.cs-card-top {
  margin-bottom: 16px;
}

.cs-patient-name {
  font-size: 1.125rem; /* 18px */
  font-weight: 700;
  color: #ea580c;
  margin: 0;
}

.cs-card-divider {
  height: 1px;
  background: #e2e8f0;
  margin: 16px 0;
}

/* ------------ DETAILS GRID ------------ */
.cs-details-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

.cs-detail-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.cs-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cs-value {
  font-size: 0.875rem;
  color: #1e293b;
  word-break: break-word;
  font-weight: 500;
}

/* ------------ RESPONSIVE ------------ */
@media (max-width: 768px) {
  .cs-title {
    font-size: 1.5rem;
  }

  .cs-grid {
    grid-template-columns: 1fr;
  }

  .cs-details-grid {
    grid-template-columns: 1fr;
  }

  .cs-empty-state {
    padding: 40px 16px;
  }
}

@media (max-width: 480px) {
  .cs-wrapper {
    padding: 16px 12px;
  }

  .cs-title {
    font-size: 1.25rem;
  }

  .cs-card {
    padding: 16px;
  }

  .cs-patient-name {
    font-size: 1rem;
  }
}

@media (min-width: 1200px) {
  .cs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1600px) {
  .cs-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
`;