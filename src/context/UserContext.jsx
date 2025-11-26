// UserContext.jsx (WEB VERSION)
import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BASE_URL } from "./config";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const auth = getAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (firebaseUid) => {
    try {
      if (!firebaseUid) {
        setUserData(null);
        return;
      }

      const res = await fetch(`${BASE_URL}/users/firebase/${firebaseUid}`);
      const data = await res.json();

      setUserData({
        _id: data._id,
        fullName: data.fullName || "",
        email: data.email || "",
        mobileNo: data.mobileNo || "",
        gender: data.gender || "",
        birthday: data.dob || "",
        addresses: data.addresses || [],
        profilePic: data.profilePic || "",
        firebaseUid,
      });
    } catch (err) {
      console.error("User fetch error:", err);
      setUserData(null);
    }
  };

  useEffect(() => {
    // Firebase Web Auth listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        fetchUserData,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
