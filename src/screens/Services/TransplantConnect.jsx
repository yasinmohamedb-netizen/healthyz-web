// src/screens/Services/TransplantConnect.jsx
import React, { useState, useEffect } from "react";
import "./TransplantConnect.css";
import { BASE_URL } from "../../context/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";

export default function TransplantConnect() {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [userId, setUserId] = useState(null);

  const [patientName, setPatientName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [age, setAge] = useState("");
  const [organType, setOrganType] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [specificHospitals, setSpecificHospitals] = useState("");
  const [urgency, setUrgency] = useState("Normal");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [errors, setErrors] = useState({});

  const organs = [
    { type: "Kidney", icon: "🫘" },
    { type: "Liver", icon: "🍏" },
    { type: "Heart", icon: "❤️" },
    { type: "Lung", icon: "🌬️" },
    { type: "Bone Marrow", icon: "🧬" },
    { type: "Pancreas", icon: "🍯" }
  ];

  // Track login status (do NOT block page)
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
  }, []);

  // Email + mobile
  const validateEmail = (email) => email.includes("@") && email.includes(".");
  const handleMobileChange = (val) => {
    const cleaned = val.replace(/[^0-9+]/g, "");
    setMobile(cleaned);

    if (cleaned.length < 7 || cleaned.length > 15) {
      setErrors((p) => ({ ...p, mobile: "Enter a valid mobile number (7–15 digits)" }));
    } else {
      setErrors((p) => ({ ...p, mobile: "" }));
    }
  };

  // Form validation
  const validateForm = () => {
    let newErrors = {};
    if (!organType) newErrors.organType = "Please select an organ";
    if (!patientName.trim()) newErrors.patientName = "Please enter patient name";
    if (!userEmail.trim() || !validateEmail(userEmail))
      newErrors.userEmail = "Please enter a valid email";
    if (!age || isNaN(parseInt(age)) || parseInt(age) < 1)
      newErrors.age = "Please enter a valid age";
    if (!mobile) newErrors.mobile = "Please enter mobile number";
    if (!country.trim()) newErrors.country = "Please enter your country";
    if (!urgency) newErrors.urgency = "Please select urgency";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT — with login check
  const handleSubmit = async (e) => {
    e.preventDefault();

    // LOGIN REQUIRED HERE ONLY
    if (!auth.currentUser) {
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!validateForm()) return;
    setSubmitting(true);

    const payload = {
      patientName,
      userEmail,
      userMobile: mobile,
      transplantType: organType,
      preferredLocation: country,
      specificHospitals,
      urgency,
      additionalNotes: message + (age ? `\nAge: ${age}` : "")
    };

    try {
      const response = await fetch(`${BASE_URL}/transplants`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setShowThankYou(true);
        setPatientName("");
        setUserEmail("");
        setAge("");
        setOrganType("");
        setMobile("");
        setCountry("");
        setSpecificHospitals("");
        setUrgency("Normal");
        setMessage("");
        setErrors({});
      } else {
        setErrors((prev) => ({ ...prev, general: "Submission failed. Try again." }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, general: "Submission failed. Try again." }));
    }

    setSubmitting(false);
  };

  // Auto refresh after thank you popup
  useEffect(() => {
    if (showThankYou) {
      const timer = setTimeout(() => window.location.reload(), 4000);
      return () => clearTimeout(timer);
    }
  }, [showThankYou]);

  return (
    <div className="tc-container">
      <div className="tc-wrapper">

        {/* THANK YOU POPUP */}
        {showThankYou && (
          <div className="tc-modal-overlay">
            <div className="tc-modal-content">
              <h1 className="tc-success-heading">Thank You!</h1>
              <p className="tc-success-msg">
                Your transplant request has been submitted successfully. <br />
                <strong>Our medical team will contact you shortly.</strong>
              </p>
            </div>
          </div>
        )}

        {/* MAIN FORM */}
        {!showThankYou && (
          <>
            <div className="tc-top-section">

              {/* LEFT */}
              <div className="tc-left-content">
                <div className="tc-badge">Trusted by Global Patients</div>
                <h1 className="tc-main-title">
                  Organ Transplant <br /> Made Simple
                </h1>
                <p className="tc-subtitle">
                  Connect with India’s top transplant hospitals. Get expert opinions,
                  transparent pricing, visa & travel support — all coordinated for you.
                </p>

                <div className="tc-benefits">
                  <div className="tc-benefit-item">
                    <div className="tc-benefit-icon">🏆</div>
                    <div><h3>Top Hospitals</h3><p>JCI-accredited transplant centers.</p></div>
                  </div>
                  <div className="tc-benefit-item">
                    <div className="tc-benefit-icon">👨‍⚕️</div>
                    <div><h3>Expert Surgeons</h3><p>1000+ successful transplants.</p></div>
                  </div>
                  <div className="tc-benefit-item">
                    <div className="tc-benefit-icon">🛂</div>
                    <div><h3>Travel Support</h3><p>Visa, airport pickup, accommodation.</p></div>
                  </div>
                  <div className="tc-benefit-item">
                    <div className="tc-benefit-icon">💸</div>
                    <div><h3>Transparent Pricing</h3><p>No hidden charges.</p></div>
                  </div>
                </div>

                <div className="tc-hero-image">
                  <img
                    src="https://productimagestesting.s3.ap-south-1.amazonaws.com/Transplant+connect_11zon.jpg"
                    alt="Transplant Surgery"
                    className="tc-hero-img"
                  />
                </div>
              </div>

              {/* RIGHT FORM */}
              <div className="tc-right-form">
                <div className="tc-form-header">
                  <h2>Start Your Journey</h2>
                  <p>Fill details to get a free consultation</p>
                </div>

                <form className="tc-booking-form" onSubmit={handleSubmit}>

                  {/* Organ */}
                  <div className="tc-form-group">
                    <label className="tc-form-label">Select Organ *</label>
                    <div className="tc-service-chips">
                      {organs.map((o) => (
                        <button
                          key={o.type}
                          type="button"
                          className={`tc-service-chip ${organType === o.type ? "active" : ""}`}
                          onClick={() => setOrganType(o.type)}
                        >
                          {o.icon} {o.type}
                        </button>
                      ))}
                    </div>
                    {errors.organType && <p className="tc-error-text">{errors.organType}</p>}
                  </div>

                  {/* Name */}
                  <div className="tc-form-group">
                    <label className="tc-form-label">Patient Name *</label>
                    <input
                      type="text"
                      className={`tc-form-input ${errors.patientName ? "tc-error-border" : ""}`}
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Enter full name"
                    />
                    {errors.patientName && <p className="tc-error-text">{errors.patientName}</p>}
                  </div>

                  {/* Email */}
                  <div className="tc-form-group">
                    <label className="tc-form-label">Email Address *</label>
                    <input
                      type="email"
                      className={`tc-form-input ${errors.userEmail ? "tc-error-border" : ""}`}
                      placeholder="Enter email address"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                    {errors.userEmail && <p className="tc-error-text">{errors.userEmail}</p>}
                  </div>

                  {/* Age */}
                  <div className="tc-form-group">
                    <label className="tc-form-label">Age *</label>
                    <input
                      type="number"
                      className={`tc-form-input ${errors.age ? "tc-error-border" : ""}`}
                      placeholder="e.g. 45"
                      value={age}
                      min="1"
                      max="120"
                      onChange={(e) => setAge(e.target.value)}
                    />
                    {errors.age && <p className="tc-error-text">{errors.age}</p>}
                  </div>

                  {/* Mobile */}
                  <div className="tc-form-group">
                    <label className="tc-form-label">Mobile Number *</label>
                    <input
                      type="tel"
                      className={`tc-form-input ${errors.mobile ? "tc-error-border" : ""}`}
                      placeholder="Enter your mobile number (add country code)"
                      value={mobile}
                      onChange={(e) => handleMobileChange(e.target.value)}
                    />
                    {errors.mobile && <p className="tc-error-text">{errors.mobile}</p>}
                  </div>

                  {/* Country */}
                  <div className="tc-form-group">
                    <label className="tc-form-label">Country *</label>
                    <input
                      type="text"
                      className={`tc-form-input ${errors.country ? "tc-error-border" : ""}`}
                      placeholder="e.g. India, UAE, USA"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                    {errors.country && <p className="tc-error-text">{errors.country}</p>}
                  </div>

                  {/* Specific Hospitals */}
                  <div className="tc-form-group">
                    <label className="tc-form-label">Specific Hospitals (Optional)</label>
                    <input
                      type="text"
                      className="tc-form-input"
                      placeholder="e.g. Apollo, Fortis, Aster"
                      value={specificHospitals}
                      onChange={(e) => setSpecificHospitals(e.target.value)}
                    />
                  </div>

                  {/* Urgency */}
                  <div className="tc-form-group">
                    <label className="tc-form-label">Urgency *</label>
                    <select
                      className={`tc-form-input ${errors.urgency ? "tc-error-border" : ""}`}
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value)}
                    >
                      <option value="Normal">Normal</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                    {errors.urgency && <p className="tc-error-text">{errors.urgency}</p>}
                  </div>

                  {/* Notes */}
                  <div className="tc-form-group">
                    <label className="tc-form-label">Medical Condition / Notes</label>
                    <textarea
                      className="tc-form-textarea"
                      rows="4"
                      placeholder="Describe condition or questions"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  {errors.general && <p className="tc-error-text">{errors.general}</p>}

                  <button
                    type="submit"
                    className="tc-btn tc-btn-primary tc-btn-lg tc-pay-btn"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span className="tc-loading">
                        <span className="tc-loading-spinner"></span>
                        Connecting...
                      </span>
                    ) : (
                      <>
                        <span>Connect Us Now</span>
                        <span className="tc-pay-arrow">→</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* BOTTOM SECTION */}
            <div className="tc-bottom-section">
              <div className="tc-bottom-container">
                <h2 className="tc-bottom-title">Why Choose Our Transplant Program?</h2>
                <p className="tc-bottom-subtitle">
                  We’ve helped patients from 60+ countries receive life-saving transplants with confidence.
                </p>

                <div className="tc-features-grid">
                  <div className="tc-feature-card">
                    <div className="tc-feature-icon">📋</div>
                    <h3>Free Medical Opinion</h3>
                    <p>Get detailed treatment plan & cost estimate within 24 hours.</p>
                  </div>
                  <div className="tc-feature-card">
                    <div className="tc-feature-icon">🏨</div>
                    <h3>Hospital Coordination</h3>
                    <p>We manage appointments, interpreters & documentation.</p>
                  </div>
                  <div className="tc-feature-card">
                    <div className="tc-feature-icon">🛃</div>
                    <h3>Visa & Travel Support</h3>
                    <p>Invitation letters, hotel booking, airport pickup — all covered.</p>
                  </div>
                  <div className="tc-feature-card">
                    <div className="tc-feature-icon">💰</div>
                    <h3>Payment Flexibility</h3>
                    <p>Insurance & EMI options available.</p>
                  </div>
                  <div className="tc-feature-card">
                    <div className="tc-feature-icon">🕒</div>
                    <h3>Fast Track Processing</h3>
                    <p>Transplant coordination in as fast as 2–3 weeks.</p>
                  </div>
                  <div className="tc-feature-card">
                    <div className="tc-feature-icon">🤝</div>
                    <h3>24/7 Care Support</h3>
                    <p>Dedicated case manager throughout your journey.</p>
                  </div>
                </div>

                {/* Testimonials */}
                <div className="tc-testimonials">
                  <h3>Stories That Inspire</h3>
                  <div className="tc-testimonial-cards">
                    <div className="tc-testimonial-card">
                      <div className="tc-rating">★★★★★</div>
                      <p>"After 2 years on dialysis, I finally got a transplant in Chennai within 3 weeks."</p>
                      <div className="tc-testimonial-author">
                        <div className="tc-author-name">James L.</div>

                        <div className="tc-author-role">Canada</div>
                      </div>
                    </div>

                    <div className="tc-testimonial-card">
                      <div className="tc-rating">★★★★★</div>
                      <p>"The surgery, support, and hospital care were world-class. Truly grateful."</p>
                      <div className="tc-testimonial-author">
                        <div className="tc-author-name">Ayesha M.</div>
                        <div className="tc-author-role">UAE</div>
                      </div>
                    </div>

                    <div className="tc-testimonial-card">
                      <div className="tc-rating">★★★★★</div>
                      <p>"Cost was 1/4th of US hospitals. Their team handled everything perfectly."</p>
                      <div className="tc-testimonial-author">
                        <div className="tc-author-name">Robert K.</div>
                        <div className="tc-author-role">USA</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ */}
                <div className="tc-faq-section">
                  <h3>Frequently Asked Questions</h3>

                  <div className="tc-faq-list">
                    <div className="tc-faq-item">
                      <h4>How long does the entire process take?</h4>
                      <p>Usually 2–4 weeks depending on donor availability.</p>
                    </div>

                    <div className="tc-faq-item">
                      <h4>Do I need a donor?</h4>
                      <p>For kidney/liver, a related donor is preferred.</p>
                    </div>

                    <div className="tc-faq-item">
                      <h4>Is it legal for foreigners?</h4>
                      <p>Yes — all approvals followed legally.</p>
                    </div>

                    <div className="tc-faq-item">
                      <h4>What about language?</h4>
                      <p>English-speaking staff + interpreter support.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
