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

  // 🔁 Where user should go after login
  const redirectTo = location.state?.from?.pathname || "/home";

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  /* =========================================
     CHECK USER PROFILE (NEW / EXISTING)
  ========================================= */
  const checkUserProfile = async (uid, phone = null) => {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);

    // 🆕 NEW USER
    if (!snap.exists()) {
      await setDoc(ref, {
        uid,
        email: "",
        mobileNo: phone, // can be null (Google login)
        fullName: "",
        dob: "",
        gender: "",
        profileCompleted: false,
        createdAt: serverTimestamp(),
      });

      navigate("/profile-setup", {
        replace: true,
        state: { redirectTo },
      });
      return;
    }

    // 👤 EXISTING USER BUT PROFILE INCOMPLETE
    if (snap.data()?.profileCompleted === false) {
      navigate("/profile-setup", {
        replace: true,
        state: { redirectTo },
      });
      return;
    }

    // ✅ PROFILE COMPLETE
    navigate(redirectTo, { replace: true });
  };

  /* =========================================
     SEND OTP
  ========================================= */
  const sendOtpHandler = async (e) => {
    e.preventDefault();

    if (mobile.length !== 10) {
      alert("Enter a valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);

      // 🔐 Setup invisible reCAPTCHA
      setUpRecaptcha();

      const phoneNumber = "+91" + mobile;
      const confirmationResult = await sendOTP(phoneNumber);

      // ⚠️ REQUIRED for OTP verification
      window.confirmationResult = confirmationResult;

      setOtpSent(true);
      alert("OTP sent successfully");
    } catch (err) {
      console.error("SMS NOT SENT:", err);
      alert("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     VERIFY OTP
  ========================================= */
  const verifyOtpHandler = async (e) => {
    e.preventDefault();

    if (otp.trim().length !== 6) {
      alert("Enter a valid 6-digit OTP");
      return;
    }

    // ❗ Handles refresh / expired OTP case
    if (!window.confirmationResult) {
      alert("OTP session expired. Please resend OTP.");
      setOtpSent(false);
      return;
    }

    try {
      setLoading(true);

      const result = await window.confirmationResult.confirm(otp);
      const user = result.user;

      await checkUserProfile(
        user.uid,
        user.phoneNumber ? user.phoneNumber.replace("+91", "") : null
      );
    } catch (err) {
      console.error("INVALID OTP:", err);
      alert("Incorrect OTP");
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     GOOGLE LOGIN
  ========================================= */
  const googleLoginHandler = async () => {
    try {
      const result = await signInWithGooglePopup();
      const user = result.user;

      await checkUserProfile(
        user.uid,
        user.phoneNumber
          ? user.phoneNumber.replace("+91", "")
          : null
      );
    } catch (err) {
      console.error("GOOGLE LOGIN ERROR:", err);
      alert("Google login failed");
    }
  };

  /* =========================================
     UI
  ========================================= */
  return (
    <div className="auth-container">
      <div className="auth-card">

        {/* LOGO */}
        <img src={Logo} alt="Healthyz Logo" className="auth-logo" />

        <h2 className="auth-title">Welcome to Healthyz</h2>
        <p className="auth-subtitle">Login to continue</p>

        {/* MOBILE INPUT */}
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

            <button
              className="auth-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* OTP INPUT */}
        {otpSent && (
          <form onSubmit={verifyOtpHandler}>
            <input
              type="number"
              className="auth-input"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              className="auth-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        <div className="divider">OR</div>

        {/* GOOGLE LOGIN */}
        <button className="google-btn" onClick={googleLoginHandler}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google Icon"
            className="google-icon"
          />
          <span>Continue with Google</span>
        </button>

        {/* REQUIRED FOR FIREBASE OTP */}
        <div id="recaptcha-container"></div>

      </div>
    </div>
  );
}
