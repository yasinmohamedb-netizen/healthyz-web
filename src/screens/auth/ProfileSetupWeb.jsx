import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Services/firebase";
import { doc, setDoc, serverTimestamp, getFirestore } from "firebase/firestore";
import axios from "axios";
import "../../styles/auth.css";

const firestore = getFirestore();

export default function ProfileSetupWeb({ onProfileComplete }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const BASE_URL = "https://your-backend-api.com"; // replace with your backend

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);
    setEmail(currentUser.email || "");
    setMobileNo(currentUser.phoneNumber || "");
  }, [navigate]);

  const validateFields = () => {
    if (!fullName.trim()) return alert("Please enter your full name.");
    if (!dob.trim()) return alert("Please select your date of birth.");
    if (!gender.trim()) return alert("Please select your gender.");
    if (!mobileNo.trim()) return alert("Please enter your mobile number.");
    if (!email.trim()) return alert("Please enter your email.");
    if (!agreedToTerms) return alert("You must agree to the Terms & Conditions.");
    return true;
  };

  const handleSaveProfile = async () => {
    if (!validateFields()) return;

    setLoading(true);
    try {
      // Save to Firestore
      const userDocRef = doc(firestore, "users", user.uid);
      await setDoc(userDocRef, {
        fullName: fullName.trim(),
        dob: dob.trim(),
        gender,
        mobileNo: mobileNo.trim(),
        email: email.trim(),
        createdAt: serverTimestamp(),
        firebaseUid: user.uid,
      });

      // Optional backend API
      try {
        await axios.post(`${BASE_URL}/users`, {
          firebaseUid: user.uid,
          fullName: fullName.trim(),
          dob: dob.trim(),
          gender,
          mobileNo: mobileNo.trim(),
          email: email.trim(),
        });
      } catch (apiErr) {
        console.warn("⚠️ Backend API error:", apiErr.message);
      }

      // Update App.js state to mark profile complete
      if (onProfileComplete) onProfileComplete();

      // Navigate to home
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Failed to save profile. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Complete Your Profile</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="auth-input"
        />

        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="auth-input"
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="auth-input"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
          className="auth-input"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />

        <div className="terms-container">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={() => setAgreedToTerms(!agreedToTerms)}
          />
          <span>
            I agree to the{" "}
            <span
              style={{ color: "#439BAE", textDecoration: "underline", cursor: "pointer" }}
              onClick={() => navigate("/terms")}
            >
              Terms & Conditions
            </span>
          </span>
        </div>

        <button
          onClick={handleSaveProfile}
          disabled={loading}
          className="auth-btn"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}
