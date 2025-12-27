import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { auth } from "../Services/firebase";
import {
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
  getFirestore,
} from "firebase/firestore";

import { apiFetch } from "../../context/config";
import "../../styles/auth.css";

const firestore = getFirestore();

export default function ProfileSetupWeb() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔁 Redirect back to original page after profile completion
  const redirectTo = location.state?.redirectTo || "/home";

  const [user, setUser] = useState(null);

  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [loading, setLoading] = useState(true);

  /* =====================================
     LOAD USER + EXISTING PROFILE DATA
  ===================================== */
  useEffect(() => {
    const loadUserProfile = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        navigate("/login");
        return;
      }

      setUser(currentUser);
      setEmail(currentUser.email || "");
      setMobileNo(currentUser.phoneNumber || "");

      const snap = await getDoc(
        doc(firestore, "users", currentUser.uid)
      );

      if (snap.exists()) {
        const data = snap.data();
        setFullName(data.fullName || "");
        setDob(data.dob || "");
        setGender(data.gender || "");
      }

      setLoading(false);
    };

    loadUserProfile();
  }, [navigate]);

  /* =====================================
     VALIDATION
  ===================================== */
  const validateFields = () => {
    if (!fullName.trim()) return alert("Enter full name");
    if (!dob) return alert("Select date of birth");
    if (!gender) return alert("Select gender");
    if (!mobileNo) return alert("Enter mobile number");
    if (!email) return alert("Enter email");
    if (!agreedToTerms) return alert("Accept Terms & Conditions");
    return true;
  };

  /* =====================================
     SAVE PROFILE
  ===================================== */
  const handleSaveProfile = async () => {
    if (!validateFields()) return;

    setLoading(true);

    try {
      // ✅ Update Firestore user (DO NOT overwrite)
      await updateDoc(doc(firestore, "users", user.uid), {
        fullName: fullName.trim(),
        dob,
        gender,
        mobileNo: mobileNo.trim(),
        email: email.trim(),
        profileCompleted: true,
        updatedAt: serverTimestamp(),
      });

      // 🔁 Optional backend sync (non-blocking)
      try {
        await apiFetch("/users", {
          method: "POST",
          body: JSON.stringify({
            firebaseUid: user.uid,
            fullName: fullName.trim(),
            dob,
            gender,
            mobileNo: mobileNo.trim(),
            email: email.trim(),
          }),
        });
      } catch (apiErr) {
        console.warn("Backend sync failed:", apiErr);
      }

      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error("PROFILE SAVE ERROR:", err);
      alert("Failed to save profile. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="auth-container">
        <div className="auth-card">Loading profile...</div>
      </div>
    );
  }

  /* =====================================
     UI
  ===================================== */
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Complete Your Profile</h2>

        <input
          className="auth-input"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="date"
          className="auth-input"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <select
          className="auth-input"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          className="auth-input"
          placeholder="Mobile Number"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
        />

        <input
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="terms-container">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={() => setAgreedToTerms(!agreedToTerms)}
          />
          <span>
            I agree to{" "}
            <span
              className="link"
              onClick={() => navigate("/terms")}
            >
              Terms & Conditions
            </span>
          </span>
        </div>

        <button
          className="auth-btn"
          disabled={loading}
          onClick={handleSaveProfile}
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );
}
