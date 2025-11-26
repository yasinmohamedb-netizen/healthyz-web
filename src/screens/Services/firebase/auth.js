// src/screens/Services/firebase/auth.js

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  deleteUser,
} from "firebase/auth";

import { firebaseApp } from "./firebaseConfig";

// Initialize Firebase Auth
export const auth = getAuth(firebaseApp);

/* ----------------------------------------------------
   ⭐ SETUP reCAPTCHA v2 (Invisible)
   Works exactly like Firebase Official Docs
---------------------------------------------------- */
export const setUpRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    // IMPORTANT — correct signature:
    // new RecaptchaVerifier(auth, buttonId, params)
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "sign-in-button",    // Must match the button/div in Login.jsx
      {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA solved:", response);
        },
        "expired-callback": () => {
          console.warn("reCAPTCHA expired. Resetting...");
        },
      }
    );
  }

  return window.recaptchaVerifier;
};

/* ----------------------------------------------------
   ⭐ SEND OTP USING signInWithPhoneNumber
---------------------------------------------------- */
export const sendOTP = async (phoneNumber) => {
  const appVerifier = window.recaptchaVerifier;

  return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
};

/* ----------------------------------------------------
   ⭐ GOOGLE LOGIN
---------------------------------------------------- */
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

/* ----------------------------------------------------
   ⭐ EXPORT FUNCTIONS
---------------------------------------------------- */
export {
  onAuthStateChanged,   // Firebase auth state listener
  signOut,
  deleteUser,
};
