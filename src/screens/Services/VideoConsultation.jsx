// ================================================
// src/screens/video/VideoConsultation.jsx (FINAL)
// With SEO + Promo + Razorpay + Fixed Return
// ================================================

import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BASE_URL } from "../../context/config";
import "./VideoConsultation.css";
import { useNavigate, useLocation } from "react-router-dom";
import VideoConsultationSEO from "../../seo/VideoConsultationSEO";

export default function VideoConsultation() {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // STATES
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  const [patientName, setPatientName] = useState("");
  const [patientMobile, setPatientMobile] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [description, setDescription] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [callType, setCallType] = useState("video");
  const [specialization, setSpecialization] = useState("General Physician");

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState("");

  const [phoneError, setPhoneError] = useState("");
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // PROMO RULES
  const PROMO_RULES = {
    FIRST: { type: "flat", value: 100, description: "₹100 OFF – First Consultation" },
    HEALTHYZ: { type: "percent", value: 10, description: "10% OFF" },
  };

  // SPECIALIZATIONS
  const specializations = [
    "General Physician",
    "Dietician",
    "Psychiatrist",
    "Dermatologist",
    "Pediatrician",
    "Gynecologist",
    "Cardiologist",
  ];

  const getBaseAmount = (spec) => {
    if (spec === "Psychiatrist") return 700;
    if (spec === "Dietician") return 500;
    return 500;
  };

  // LOAD RAZORPAY SCRIPT
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  // CHECK FIRST TIME USER
  const checkFirstTimeEligibility = async (uid) => {
    try {
      const res = await fetch(`${BASE_URL}/consultations?userId=${uid}`);
      const data = await res.json();
      return data.length === 0;
    } catch {
      return true;
    }
  };

  // FIREBASE LISTENER
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        setUserEmail(user.email || "");
        const eligible = await checkFirstTimeEligibility(user.uid);
        setIsFirstTimeUser(eligible);
      } else {
        setUserId(null);
        setUserEmail("");
      }
    });
    return () => unsub();
  }, []);

  // MOBILE VALIDATION
  const handleMobile = (text) => {
    let cleaned = text.replace(/[^0-9]/g, "");
    if (!cleaned.startsWith("91")) cleaned = "91" + cleaned;
    cleaned = "+" + cleaned.slice(0, 12);

    setPatientMobile(cleaned);
    const valid = /^\+91[6-9]\d{9}$/;
    setPhoneError(valid.test(cleaned) ? "" : "Enter a valid WhatsApp number");
  };

  const sanitizeText = (txt) =>
    txt?.replace(/\n/g, " ").replace(/\t/g, " ").replace(/ {2,}/g, " ").trim();

  // APPLY PROMO CODE
  const applyPromo = () => {
    const code = promoCode.toUpperCase().trim();
    if (!PROMO_RULES[code]) return alert("Invalid Promo Code");

    if (code === "FIRST" && !isFirstTimeUser)
      return alert("FIRST is only for new users");

    const base = getBaseAmount(specialization);
    const rule = PROMO_RULES[code];

    const calc =
      rule.type === "flat"
        ? rule.value
        : Math.floor((base * rule.value) / 100);

    setDiscount(calc);
    setAppliedPromo(code);
  };

  const clearPromo = () => {
    setPromoCode("");
    setAppliedPromo("");
    setDiscount(0);
  };

  // PAYMENT HANDLER
  const handlePayment = async () => {
    if (!auth.currentUser) {
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!patientName) return alert("Enter patient name");
    if (!age || age < 1) return alert("Enter valid age");
    if (phoneError) return alert("Enter valid WhatsApp number");
    if (!description) return alert("Enter description");
    if (!symptoms) return alert("Enter symptoms");

    setIsSubmitting(true);
    setLoadingPayment(true);

    try {
      const finalAmount = Math.max(getBaseAmount(specialization) - discount, 0);

      const resp = await fetch(`${BASE_URL}/payment/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalAmount: finalAmount, type: "consultation" }),
      });

      const data = await resp.json();

      if (!data.orderId) {
        alert("Order creation failed");
        setIsSubmitting(false);
        return;
      }

      const options = {
        key: data.razorpayKey,
        amount: data.amount,
        currency: data.currency,
        name: "Healthyz",
        description: "Consultation Payment",
        order_id: data.orderId,
        prefill: {
          name: patientName,
          email: userEmail,
          contact: patientMobile,
        },
        theme: { color: "#439BAE" },

        handler: async function (response) {
          const verify = await fetch(`${BASE_URL}/payment/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              totalAmount: finalAmount,
              type: "consultation",
              orderData: {
                firebaseUid: userId,
                patientName,
                age,
                gender,
                contact: patientMobile,
                specialization,
                description: sanitizeText(description),
                symptoms: sanitizeText(symptoms),
                email: userEmail,
                callType,
              },
            }),
          });

          const verifyJson = await verify.json();

          if (verifyJson.success) {
            setPaymentSuccess(true);
            setPatientName("");
            setPatientMobile("");
            setAge("");
            setGender("Male");
            setDescription("");
            setSymptoms("");
            clearPromo();
          } else {
            alert("Payment verification failed");
          }

          setIsSubmitting(false);
        },

        modal: {
          ondismiss: () => {
            setLoadingPayment(false);
            setIsSubmitting(false);
          },
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      alert("Payment Error");
      setIsSubmitting(false);
    }

    setLoadingPayment(false);
  };

  // =============================
  // RETURN UI (FINAL)
  // =============================
  return (
    <div className="vc-container">

      {/* 🔥 SEO at TOP */}
      <VideoConsultationSEO />

      {/* SUCCESS MODAL */}
      {paymentSuccess && (
        <div className="vc-success-modal">
          <div className="vc-success-content animate-slide-up">
            <div className="vc-success-icon">
              <svg width="64" height="64">
                <circle cx="12" cy="12" r="10" fill="#4CAF50" />
              </svg>
            </div>
            <h2>Payment Successful!</h2>
            <p className="vc-success-message">
              Our team will contact you shortly via WhatsApp.
            </p>
            <button
              className="vc-btn vc-btn-primary vc-btn-lg"
              onClick={() => setPaymentSuccess(false)}
            >
              Got It
            </button>
          </div>
        </div>
      )}

      <div className="vc-wrapper">
        {/* ============================= */}
        {/* LEFT PANEL */}
        {/* ============================= */}
        <div className="vc-top-section">

          <div className="vc-left-content">

            {/* BADGE REMOVED HERE */}

            <h1 className="vc-main-title">Expert Medical Care<br />From Home</h1>
            <p className="vc-subtitle">
              Connect instantly with certified doctors via secure video or audio consultation.
            </p>

            <div className="vc-benefits">
              <div className="vc-benefit-item">
                <div className="vc-benefit-icon">⚡</div>
                <div><h3>Quick Connection</h3><p>Instant consultation with top doctors</p></div>
              </div>
              <div className="vc-benefit-item">
                <div className="vc-benefit-icon">🔒</div>
                <div><h3>Secure</h3><p>HIPAA-compliant video calls</p></div>
              </div>
              <div className="vc-benefit-item">
                <div className="vc-benefit-icon">💊</div>
                <div><h3>E-Prescriptions</h3><p>Instant digital prescription</p></div>
              </div>
            </div>

            <div className="vc-doctor-image">
              <img
                src="https://productimagestesting.s3.ap-south-1.amazonaws.com/onlineconss.jpg"
                alt="Doctor consultation"
                className="vc-hero-img"
              />
            </div>
          </div>

          {/* ============================= */}
          {/* RIGHT PANEL (FORM) */}
          {/* ============================= */}
          <div className="vc-right-form">
            <div className="vc-form-header">
              <h2>Book Your Consultation</h2>
              <p>Fill in your details to schedule your appointment</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>

              {/* Patient Name */}
              <div className="vc-form-group">
                <label className="vc-form-label">Patient Name</label>
                <input
                  className="vc-form-input"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>

              {/* Age + Gender */}
              <div className="vc-form-row">
                <div className="vc-form-group">
                  <label className="vc-form-label">Age</label>
                  <input
                    type="number"
                    className="vc-form-input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                <div className="vc-form-group">
                  <label className="vc-form-label">Gender</label>
                  <div className="vc-gender-toggle">
                    {["Male", "Female", "Other"].map((g) => (
                      <button
                        key={g}
                        type="button"
                        className={`vc-gender-btn ${gender === g ? "active" : ""}`}
                        onClick={() => setGender(g)}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile */}
              <div className="vc-form-group">
                <label className="vc-form-label">WhatsApp Number</label>
                <div className="vc-input-with-prefix">
                  <span className="vc-country-code">+91</span>
                  <input
                    className="vc-form-input"
                    value={patientMobile.replace("+91", "")}
                    onChange={(e) => handleMobile(e.target.value)}
                  />
                </div>
                {phoneError && <p className="vc-error-text">{phoneError}</p>}
              </div>

              {/* Call Type */}
              <div className="vc-form-group">
                <label className="vc-form-label">Call Type</label>
                <div className="vc-call-type-toggle">
                  <button
                    type="button"
                    className={`vc-call-type-btn ${callType === "video" ? "active" : ""}`}
                    onClick={() => setCallType("video")}
                  >
                    Video Call
                  </button>
                  <button
                    type="button"
                    className={`vc-call-type-btn ${callType === "audio" ? "active" : ""}`}
                    onClick={() => setCallType("audio")}
                  >
                    Audio Call
                  </button>
                </div>
              </div>

              {/* Specialization */}
              <div className="vc-form-group">
                <label className="vc-form-label">Specialization</label>
                <div className="vc-specialization-scroll">
                  {specializations.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`vc-specialization-chip ${
                        specialization === s ? "active" : ""
                      }`}
                      onClick={() => setSpecialization(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="vc-form-group">
                <label className="vc-form-label">Brief Description</label>
                <textarea
                  className="vc-form-textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              {/* Symptoms */}
              <div className="vc-form-group">
                <label className="vc-form-label">Symptoms</label>
                <textarea
                  className="vc-form-textarea"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                ></textarea>
              </div>

              {/* Promo */}
              <div className="vc-form-group">
                <label className="vc-form-label">Promo Code (Optional)</label>
                <div className="vc-promo-container">
                  <input
                    className="vc-form-input"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button
                    type="button"
                    className="vc-btn vc-btn-outline"
                    onClick={applyPromo}
                  >
                    Apply
                  </button>
                </div>

                {appliedPromo && (
                  <div className="vc-applied-promo">
                    <span>✓ Applied: {appliedPromo}</span>
                    <button className="vc-promo-clear" onClick={clearPromo}>
                      ×
                    </button>
                  </div>
                )}
              </div>

              {/* PRICE SUMMARY */}
              <div className="vc-price-summary">
                <div className="vc-price-row">
                  <span>Consultation Fee</span>
                  <span>₹{getBaseAmount(specialization)}</span>
                </div>

                {discount > 0 && (
                  <div className="vc-price-row discount">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                <div className="vc-price-divider"></div>

                <div className="vc-price-row total">
                  <span>Total</span>
                  <span>₹{Math.max(getBaseAmount(specialization) - discount, 0)}</span>
                </div>
              </div>

              {/* PAY BUTTON */}
              <button
                className="vc-btn vc-btn-primary vc-btn-lg vc-pay-btn"
                onClick={handlePayment}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Pay & Book Consultation →"}
              </button>
            </form>
          </div>
        </div>

        {/* ============================= */}
        {/* BOTTOM SECTION */}
        {/* ============================= */}
        <div className="vc-bottom-section">
          <div className="vc-bottom-container">
            <h2 className="vc-bottom-title">
              Why Choose Healthyz for Online Consultations?
            </h2>

            <div className="vc-features-grid">
              <div className="vc-feature-card">
                <div className="vc-feature-icon">👨‍⚕️</div>
                <h3>Certified Specialists</h3>
                <p>Experienced, verified doctors across specialities.</p>
              </div>

              <div className="vc-feature-card">
                <div className="vc-feature-icon">⏱️</div>
                <h3>Quick Appointments</h3>
                <p>Connect within 15 minutes.</p>
              </div>

              <div className="vc-feature-card">
                <div className="vc-feature-icon">📱</div>
                <h3>Follow-up Support</h3>
                <p>48 hours chat support included.</p>
              </div>
            </div>

            <div className="vc-testimonials">
              <h3>What Our Patients Say</h3>

              <div className="vc-testimonial-cards">
                <div className="vc-testimonial-card">
                  <p>“Amazing service! Quick and reliable.”</p>
                  <span>— Priya</span>
                </div>

                <div className="vc-testimonial-card">
                  <p>“Doctor was very kind and helpful.”</p>
                  <span>— Rahul</span>
                </div>
              </div>
            </div>

            <div className="vc-faq-section">
              <h3>FAQ</h3>

              <div className="vc-faq-item">
                <h4>Is the consultation private?</h4>
                <p>Yes, everything is encrypted.</p>
              </div>

              <div className="vc-faq-item">
                <h4>How long is a call?</h4>
                <p>Typically 10–15 minutes.</p>
              </div>

              <div className="vc-faq-item">
                <h4>Do I get prescription?</h4>
                <p>Yes, instantly after the call.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
