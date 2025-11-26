// src/screens/auth/Login.jsx
import React, { useState } from "react";
import {
  setUpRecaptcha,
  sendOTP,
  signInWithGooglePopup,
} from "../Services/firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { useNavigate, useLocation } from "react-router-dom";

import "../../styles/auth.css";
import Logo from "../../assets/HealthyzLogo.png";

const db = getFirestore();

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/home";

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  /* -----------------------------------------
     CHECK USER PROFILE
  ----------------------------------------- */
  const checkUserProfile = async (uid, phone = "") => {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        uid,
        email: "",
        mobileNo: phone,
        fullName: "",
        dob: "",
        gender: "",
        createdAt: serverTimestamp(),
      });

      navigate("/profile-setup", { replace: true });
      return;
    }

    navigate(redirectTo, { replace: true });
  };

  /* -----------------------------------------
     SEND OTP
  ----------------------------------------- */
  const sendOtpHandler = async (e) => {
    e.preventDefault();

    if (mobile.length !== 10) {
      alert("Enter a valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);
      setUpRecaptcha();
      const phoneNumber = "+91" + mobile;

      const confirmationResult = await sendOTP(phoneNumber);
      window.confirmationResult = confirmationResult;

      setOtpSent(true);
      alert("OTP sent!");
    } catch (err) {
      console.error("SMS NOT SENT:", err);
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------------------
     VERIFY OTP
  ----------------------------------------- */
  const verifyOtpHandler = async (e) => {
    e.preventDefault();

    if (otp.trim().length !== 6) {
      alert("Enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      const result = await window.confirmationResult.confirm(otp);
      const user = result.user;
      await checkUserProfile(user.uid, user.phoneNumber);
    } catch (err) {
      console.error("INVALID OTP:", err);
      alert("Incorrect OTP");
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------------------
     GOOGLE LOGIN
  ----------------------------------------- */
  const googleLoginHandler = async () => {
    try {
      const result = await signInWithGooglePopup();
      const user = result.user;

      await checkUserProfile(user.uid, user.phoneNumber || "");
    } catch (err) {
      console.error("GOOGLE LOGIN ERROR:", err);
      alert("Google login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        {/* LOGO */}
        <img src={Logo} alt="Healthyz Logo" className="auth-logo" />

        <h2 className="auth-title">Welcome to Healthyz</h2>
        <p className="auth-subtitle">Login to continue</p>

        {/* MOBILE INPUT FORM */}
        {!otpSent && (
          <form onSubmit={sendOtpHandler}>
            <div id="sign-in-button"></div>

            <input
              type="number"
              className="auth-input"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* OTP FORM */}
        {otpSent && (
          <form onSubmit={verifyOtpHandler}>
            <input
              type="number"
              className="auth-input"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        <div className="divider">OR</div>

        {/* GOOGLE LOGIN BUTTON */}
        <button className="google-btn" onClick={googleLoginHandler}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google Icon"
            className="google-icon"
          />
          <span>Continue with Google</span>
        </button>

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
