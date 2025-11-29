// ================================================
// src/screens/HomeCareServicesScreen.jsx (FINAL)
// With Full SEO + Razorpay + Booking + UI + Fixes
// ================================================

import React, { useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "../Services/firebase";
import { BASE_URL } from "../../context/config";
import "./HomeCareServicesScreen.css";
import { useNavigate, useLocation } from "react-router-dom";
import HomecareSEO from "../../seo/HomecareSEO";

export default function HomeCareServicesScreen() {
  // ===============================
  // STATE
  // ===============================
  const [firebaseUid, setFirebaseUid] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [serviceType, setServiceType] = useState("");
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [days, setDays] = useState("");
  const [notes, setNotes] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const services = [
    { type: "Nursing", icon: "🩺" },
    { type: "Physiotherapy", icon: "💆‍♂️" },
    { type: "Elder Care", icon: "👴" },
    { type: "Baby Care", icon: "👶" },
    { type: "Attender", icon: "🤝" },
  ];

  // ===============================
  // LOAD RAZORPAY SCRIPT
  // ===============================
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // ===============================
  // FIREBASE AUTH
  // ===============================
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setFirebaseUid(user ? user.uid : null);
    });
    return () => unsub();
  }, []);

  // ===============================
  // FORM VALIDATION
  // ===============================
  const validate = () => {
    return (
      serviceType &&
      patientName &&
      age &&
      contact &&
      address &&
      days &&
      !phoneError
    );
  };

  const handleContactInput = (value) => {
    let t = value.replace(/\s+/g, "").replace(/-/g, "");
    if (!t.startsWith("+91")) t = "+91" + t.replace("+91", "");
    setContact(t);
    setPhoneError(/^\+91[6-9]\d{9}$/.test(t) ? "" : "Invalid WhatsApp number");
  };

  // ===============================
  // PAYMENT & BOOKING HANDLER
  // ===============================
  const handlePayment = async () => {
    if (!auth.currentUser) {
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!validate()) {
      alert("Please fill all fields correctly.");
      return;
    }

    if (submitting) return;
    setSubmitting(true);

    try {
      const orderRes = await fetch(`${BASE_URL}/payment/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalAmount: 500, type: "homecare" }),
      });

      const orderData = await orderRes.json();

      if (!orderData.success || !orderData.orderId) {
        throw new Error("Unable to create payment order");
      }

      const options = {
        key: orderData.razorpayKey,
        amount: orderData.amount,
        currency: "INR",
        name: "Healthyz",
        description: "Initial Home Visit Fee",
        order_id: orderData.orderId,

        prefill: {
          name: patientName,
          contact: contact.replace("+91", ""),
        },

        theme: { color: "#439BAE" },

        handler: async function (response) {
          const bookingPayload = {
            userId: firebaseUid,
            userName: patientName,
            userMobile: contact,
            age: Number(age),
            address,
            serviceName: serviceType,
            days: days.split(",").map((d) => d.trim()),
            notes,
            paymentId: response.razorpay_payment_id,
            paymentStatus: "Paid",
            amountPaid: 500,
          };

          await fetch(`${BASE_URL}/bookings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingPayload),
          });

          setPaymentSuccess(true);

          // Reset form
          setServiceType("");
          setPatientName("");
          setAge("");
          setContact("");
          setAddress("");
          setDays("");
          setNotes("");
        },

        modal: {
          ondismiss: () => setSubmitting(false),
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      alert("Payment Failed. Try again.");
    }

    setSubmitting(false);
  };

  // ===============================
  // RENDER
  // ===============================
  return (
    <div className="hc-container">
      {/* ===================================== */}
      {/* 🔥 SEO AT VERY TOP */}
      {/* ===================================== */}
      <HomecareSEO />

      {/* SUCCESS MODAL */}
      {paymentSuccess && (
        <div className="hc-success-modal">
          <div className="hc-success-content animate-slide-up">
            <div className="hc-success-icon">
              <svg width="64" height="64">
                <circle cx="12" cy="12" r="10" fill="#4CAF50" />
              </svg>
            </div>
            <h2>Booking Confirmed!</h2>
            <p className="hc-success-message">
              Our team will contact you shortly via WhatsApp.
            </p>
            <button
              className="hc-btn hc-btn-primary hc-btn-lg"
              onClick={() => setPaymentSuccess(false)}
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* MAIN WRAPPER */}
      <div className="hc-wrapper">
        {/* =============================== */}
        {/* TOP SECTION */}
        {/* =============================== */}
        <div className="hc-top-section">

          {/* LEFT SECTION */}
          <div className="hc-left-content">

            {/* REMOVED BADGE HERE */}

            <h1 className="hc-main-title">
              Premium Home Care <br />At Your Doorstep
            </h1>

            <p className="hc-subtitle">
              Professional caregivers, nurses, and attendants available 24/7.
            </p>

            <div className="hc-benefits">
              <div className="hc-benefit-item">
                <div className="hc-benefit-icon">🏡</div>
                <div>
                  <h3>In-Home Service</h3>
                  <p>No hospital visits needed. We come to you.</p>
                </div>
              </div>

              <div className="hc-benefit-item">
                <div className="hc-benefit-icon">🧑‍⚕️</div>
                <div>
                  <h3>Verified Professionals</h3>
                  <p>Background-checked and certified caregivers.</p>
                </div>
              </div>

              <div className="hc-benefit-item">
                <div className="hc-benefit-icon">⏱️</div>
                <div>
                  <h3>Instant Booking</h3>
                  <p>Today / Tomorrow visits available.</p>
                </div>
              </div>
            </div>

            <div className="hc-hero-image">
              <img
                src="https://productimagestesting.s3.ap-south-1.amazonaws.com/HomecareHome.png"
                alt="Home Care Service"
                className="hc-hero-img"
              />
            </div>
          </div>

          {/* =============================== */}
          {/* RIGHT FORM */}
          {/* =============================== */}
          <div className="hc-right-form">
            <div className="hc-form-header">
              <h2>Book Home Care Service</h2>
              <p>Fill in your details to schedule a caregiver visit</p>
            </div>

            <form className="hc-booking-form" onSubmit={(e) => e.preventDefault()}>
              {/* Choose Service */}
              <div className="hc-form-group">
                <label className="hc-form-label">Choose Service</label>
                <div className="hc-service-chips">
                  {services.map((s) => (
                    <button
                      key={s.type}
                      type="button"
                      className={`hc-service-chip ${
                        serviceType === s.type ? "active" : ""
                      }`}
                      onClick={() => setServiceType(s.type)}
                    >
                      {s.icon} {s.type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Patient Name */}
              <div className="hc-form-group">
                <label className="hc-form-label">Patient Name</label>
                <input
                  type="text"
                  className="hc-form-input"
                  placeholder="Enter full name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>

              {/* Age */}
              <div className="hc-form-group">
                <label className="hc-form-label">Age</label>
                <input
                  type="number"
                  className="hc-form-input"
                  placeholder="Enter age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              {/* Phone */}
              <div className="hc-form-group">
                <label className="hc-form-label">WhatsApp Number</label>

                <div className="hc-input-with-prefix">
                  <span className="hc-country-code">+91</span>
                  <input
                    type="tel"
                    className="hc-form-input phone-input"
                    placeholder="Enter 10-digit number"
                    value={contact.replace("+91", "")}
                    onChange={(e) => handleContactInput(e.target.value)}
                  />
                </div>

                {phoneError && <p className="hc-error-text">{phoneError}</p>}
              </div>

              {/* Address */}
              <div className="hc-form-group">
                <label className="hc-form-label">Full Address</label>
                <textarea
                  className="hc-form-textarea"
                  placeholder="House no, street, city..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>

              {/* Days */}
              <div className="hc-form-group">
                <label className="hc-form-label">Days Needed</label>
                <input
                  type="text"
                  className="hc-form-input"
                  placeholder="Mon, Tue, Wed..."
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
              </div>

              {/* Notes */}
              <div className="hc-form-group">
                <label className="hc-form-label">Additional Notes</label>
                <textarea
                  className="hc-form-textarea"
                  placeholder="Any medical conditions?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>

              {/* Total Price */}
              <div className="hc-price-summary">
                <div className="hc-price-row">
                  <span>Visit Fee</span>
                  <span>₹500</span>
                </div>

                <div className="hc-price-divider"></div>

                <div className="hc-price-row total">
                  <span className="total-label">Total Amount</span>
                  <span className="total-amount">₹500</span>
                </div>
              </div>

              {/* PAY BUTTON */}
              <button
                type="submit"
                className="hc-btn hc-btn-primary hc-btn-lg hc-pay-btn"
                onClick={handlePayment}
                disabled={!validate() || submitting}
              >
                {submitting ? (
                  <span className="hc-loading">
                    <span className="hc-loading-spinner"></span>
                    Processing...
                  </span>
                ) : (
                  <>
                    Pay ₹500 & Book Visit <span className="hc-pay-arrow">→</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* =============================== */}
        {/* BOTTOM SECTION */}
        {/* =============================== */}
        <div className="hc-bottom-section">
          <div className="hc-bottom-container">
            <h2 className="hc-bottom-title">Why Families Choose Healthyz Home Care</h2>
            <p className="hc-bottom-subtitle">
              We bring professional, compassionate care to your doorstep
            </p>

            <div className="hc-features-grid">
              <div className="hc-feature-card">
                <div className="hc-feature-icon">🧑‍⚕️</div>
                <h3>Trained Caregivers</h3>
                <p>Certified caregivers for elderly, post-op, and newborns.</p>
              </div>

              <div className="hc-feature-card">
                <div className="hc-feature-icon">📅</div>
                <h3>Flexible Scheduling</h3>
                <p>Hourly, daily, or weekly plans available.</p>
              </div>

              <div className="hc-feature-card">
                <div className="hc-feature-icon">🛡️</div>
                <h3>Insurance & Safety</h3>
                <p>All caregivers are insured and background-verified.</p>
              </div>

              <div className="hc-feature-card">
                <div className="hc-feature-icon">💬</div>
                <h3>Dedicated Coordinator</h3>
                <p>One point of contact for all your service needs.</p>
              </div>
            </div>

            {/* Testimonials */}
            <div className="hc-testimonials">
              <h3>What Our Families Say</h3>

              <div className="hc-testimonial-cards">
                <div className="hc-testimonial-card">
                  <div className="hc-rating">★★★★★</div>
                  <p>"The nurse was gentle and professional."</p>
                  <div className="hc-testimonial-author">
                    <div className="hc-author-name">Meena R.</div>
                    <div className="hc-author-role">Bangalore</div>
                  </div>
                </div>

                <div className="hc-testimonial-card">
                  <div className="hc-rating">★★★★★</div>
                  <p>"Amazing baby care support at night."</p>
                  <div className="hc-testimonial-author">
                    <div className="hc-author-name">Arjun P.</div>
                    <div className="hc-author-role">Hyderabad</div>
                  </div>
                </div>

                <div className="hc-testimonial-card">
                  <div className="hc-rating">★★★★★</div>
                  <p>"Physiotherapy made recovery fast and safe."</p>
                  <div className="hc-testimonial-author">
                    <div className="hc-author-name">Sunita K.</div>
                    <div className="hc-author-role">Chennai</div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="hc-faq-section">
              <h3>Frequently Asked Questions</h3>

              <div className="hc-faq-list">
                <div className="hc-faq-item">
                  <h4>How fast can I get a caregiver?</h4>
                  <p>Same-day service available if booked before 2 PM.</p>
                </div>

                <div className="hc-faq-item">
                  <h4>Can I get the same caregiver again?</h4>
                  <p>Yes! We prioritize continuity.</p>
                </div>

                <div className="hc-faq-item">
                  <h4>What if I’m unhappy with the caregiver?</h4>
                  <p>Instant free replacement available.</p>
                </div>

                <div className="hc-faq-item">
                  <h4>Do you provide medical equipment?</h4>
                  <p>Yes — wheelchairs, oxygen, beds, etc.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
