import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../context/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";

const PROFESSIONS = [
  "Patient / Customer",
  "Doctor",
  "Home Care Service Provider",
  "Personal Trainer",
  "Supplier / Vendor",
];

export default function ContactUs() {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [userId, setUserId] = useState(null);

  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [organization, setOrganization] = useState("");
  const [locationTxt, setLocationTxt] = useState("");
  const [message, setMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const isValid = name && mobileNo && profession && message;

  // Track login status, DO NOT block page
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
  }, []);

  const handleSubmit = async () => {
    // ✔ LOGIN REQUIRED ONLY HERE
    if (!auth.currentUser) {
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!isValid) return;

    try {
      await axios.post(`${BASE_URL}/contact-us`, {
        name,
        mobileNo,
        email,
        profession,
        organization,
        location: locationTxt,
        message,
      });

      alert("✅ Message Sent Successfully!");

      setName("");
      setMobileNo("");
      setEmail("");
      setProfession("");
      setOrganization("");
      setLocationTxt("");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-card">
        <h1 className="contact-title">Get in Touch</h1>
        <p className="contact-subtitle">
          We’re here to help. Tell us about yourself and how we can support you.
        </p>

        <div className="contact-form">

          <InputField
            label="Full Name *"
            value={name}
            onChange={setName}
            placeholder="Enter your full name"
          />

          <InputField
            label="Mobile Number *"
            value={mobileNo}
            onChange={setMobileNo}
            placeholder="Enter mobile number"
          />

          <InputField
            label="Email Address"
            value={email}
            onChange={setEmail}
            placeholder="Enter email"
          />

          {/* Profession Dropdown */}
          <div className="dropdown-wrapper">
            <label className="contact-label">Profession / Role *</label>

            <div
              className="dropdown-box"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className={profession ? "dropdown-text" : "dropdown-placeholder"}>
                {profession || "Select your role"}
              </span>
              <span className="dropdown-arrow">⌄</span>
            </div>

            {showDropdown && (
              <div className="dropdown-menu">
                {PROFESSIONS.map((p, i) => (
                  <div
                    key={i}
                    className="dropdown-item"
                    onClick={() => {
                      setProfession(p);
                      setShowDropdown(false);
                    }}
                  >
                    {p}
                  </div>
                ))}
              </div>
            )}
          </div>

          <InputField
            label="Organization / Hospital"
            value={organization}
            onChange={setOrganization}
            placeholder="Enter organization name"
          />

          <InputField
            label="City / Location"
            value={locationTxt}
            onChange={setLocationTxt}
            placeholder="Enter your city"
          />

          {/* Message */}
          <div>
            <label className="contact-label">Message *</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message"
              maxLength={500}
              className="contact-textarea"
            ></textarea>
            <p className="char-count">{message.length}/500</p>
          </div>

          {/* Submit Button */}
          <button
            disabled={!isValid}
            onClick={handleSubmit}
            className={`contact-submit-btn ${!isValid ? "disabled" : ""}`}
          >
            Send Message
          </button>
        </div>
      </div>

      <style>{responsiveContactStyles}</style>
    </div>
  );
}

/* ---------------- REUSABLE INPUT ---------------- */
function InputField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="contact-label">{label}</label>
      <input
        className="contact-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

/* ---------------- CSS (UNCHANGED) ---------------- */

/* ---------------- UPDATED RESPONSIVE CSS ---------------- */
const responsiveContactStyles = `
.contact-wrapper {
  min-height: 100vh;
  background: #f3f4f6;
  display: flex;
  justify-content: center;
  padding: 30px 20px;
}

.contact-card {
  width: 100%;
  max-width: 650px;
  background: white;
  padding: 32px;
  border-radius: 18px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}

.contact-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: #4f46e5;
}

.contact-subtitle {
  text-align: center;
  color: #555;
  margin-top: 8px;
  font-size: 15px;
}

.contact-form {
  margin-top: 25px;
  display: grid;
  gap: 20px;
}

.contact-label {
  font-size: 14px;
  font-weight: 600;
}

.contact-input {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  margin-top: 5px;
  font-size: 15px;
  outline: none;
}

.contact-input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 4px rgba(79, 70, 229, 0.4);
}

/* Dropdown */
.dropdown-wrapper { position: relative; }

.dropdown-box {
  border: 1px solid #d1d5db;
  background: white;
  padding: 12px;
  border-radius: 12px;
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.dropdown-placeholder { color: #999; }
.dropdown-text { color: #222; }
.dropdown-arrow { font-size: 18px; }

.dropdown-menu {
  position: absolute;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  margin-top: 6px;
  border-radius: 12px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 20;
}

.dropdown-item {
  padding: 12px;
  font-size: 15px;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #f3f4f6;
}

.contact-textarea {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  min-height: 130px;
  margin-top: 6px;
  font-size: 15px;
}

.char-count {
  text-align: right;
  font-size: 12px;
  color: #777;
}

/* Button */
.contact-submit-btn {
  width: 100%;
  padding: 16px;
  background: #4f46e5;
  color: white;
  font-size: 17px;
  font-weight: 600;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
}

.contact-submit-btn:hover {
  background: #4338ca;
}

.contact-submit-btn.disabled {
  background: #c4c4c4;
  cursor: not-allowed;
}

/* ---------------------------------------------
   📱 RESPONSIVENESS
----------------------------------------------*/
@media (max-width: 600px) {
  .contact-card {
    padding: 22px;
    border-radius: 14px;
  }

  .contact-title {
    font-size: 26px;
  }

  .contact-input,
  . dropdown-box,
  .contact-textarea {
    padding: 10px;
    font-size: 14px;
  }

  .contact-submit-btn {
    padding: 14px;
    font-size: 16px;
  }
}

@media (max-width: 400px) {
  .contact-title {
    font-size: 22px;
  }

  .contact-subtitle {
    font-size: 13px;
  }

  .contact-card {
    padding: 18px;
  }

  .contact-input {
    font-size: 13px;
  }
}
`;
