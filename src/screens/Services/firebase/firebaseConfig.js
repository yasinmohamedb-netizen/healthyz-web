import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA1Svnyy5s3OpmD-oU-DbGZ3xKohvumcAE",
  authDomain: "healthmate-21117.firebaseapp.com",
  projectId: "healthmate-21117",
  storageBucket: "healthmate-21117.firebasestorage.app",
  messagingSenderId: "932947283420",
  appId: "1:932947283420:web:4d36cb4b3ee2b172429319",
  measurementId: "G-T36GSDVGMD"
};

export const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
