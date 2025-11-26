import React, { useEffect, useState, useContext } from "react";
import {
  FiPhone,
  FiUser,
  FiCalendar,
  FiChevronRight,
  FiEdit,
} from "react-icons/fi";

import { getAuth, signOut, deleteUser } from "firebase/auth";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { BASE_URL } from "../../context/config";
import "./ProfileScreen.css";

export default function ProfileScreen() {
  const auth = getAuth();
  const { userData, setUserData } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  // FETCH USER
  const fetchUser = async () => {
    try {
      if (!userData?.firebaseUid) {
        setLoading(false);
        return;
      }

      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}/users/firebase/${userData.firebaseUid}`
      );
      const data = res.data;

      if (data) setUserData(data);

      const addr =
        data?.addresses?.find((a) => a.isDefault) ||
        (data?.addresses?.length > 0 ? { ...data.addresses[0], isDefault: true } : null);

      setDefaultAddress(addr);
    } catch (e) {
      console.log("ERROR loading profile:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!userData) return setDefaultAddress(null);

    const addr =
      userData.addresses?.find((a) => a.isDefault) ||
      (userData.addresses?.length > 0 ? { ...userData.addresses[0], isDefault: true } : null);

    setDefaultAddress(addr);
  }, [userData]);

  // LOGOUT
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  // DELETE ACCOUNT
  const handleDelete = async () => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;

    try {
      await axios.post(`${BASE_URL}/delete-account`, {
        firebaseUid: userData?.firebaseUid,
        fullName: userData?.fullName,
        email: userData?.email,
        mobileNo: userData?.mobileNo,
        reason: "Not specified",
      });

      if (auth.currentUser) {
        try {
          await deleteUser(auth.currentUser);
        } catch (err) {
          console.warn("Could not delete Firebase Auth user:", err.message);
        }
      }

      alert("Account deleted.");
      window.location.href = "/login";
    } catch (e) {
      alert("Error deleting account. Login again to continue.");
      console.log(e);
    }
  };

  // WHATSAPP
  const sendWhatsApp = () => {
    const num = "916369223136";
    const name = userData?.fullName || "Guest";

    const location = defaultAddress
      ? `${defaultAddress.line1}, ${defaultAddress.city}`
      : "No address";

    const msg = `Hello, my name is ${name}. I want to send my prescription. Location: ${location}`;
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`);
  };

  if (loading) {
    return (
      <div className="profile-loader-wrapper">
        <div className="profile-loader"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="profile-empty">
        <p>No user data found</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* ---------- LEFT SIDE ---------- */}
      <div className="left-section">

        <img
          src="https://productimagestesting.s3.ap-south-1.amazonaws.com/HomecareHome.png"
          alt="Healthcare"
          className="left-image"
        />

        <h2 className="left-quote">“Caring for you, every step of the way.”</h2>

        {/* PRESCRIPTION - NOW ON LEFT SIDE */}
        <div className="profile-section">
          <div className="section-header">
            <h3>Send Your Prescription</h3>
          </div>
          <button className="whatsapp-btn" onClick={sendWhatsApp}>
            WhatsApp
          </button>
        </div>

        {/* PARTNER - NOW ON LEFT SIDE */}
        <div className="partner-box">
          <h3>Partner With Us</h3>
          <p>Grow with Healthyz</p>
          <a href="/contact" className="partner-btn">Contact Us</a>
        </div>
      </div>

      {/* ---------- RIGHT SIDE ---------- */}
      <div className="right-section">

        <div className="profile-header">
          <div className="profile-avatar">
            {userData.fullName?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h1 className="profile-name">{userData.fullName}</h1>
            <p className="profile-email">{userData.email || userData.mobileNo}</p>
          </div>
        </div>

        <Section title="About Me">
          <InfoRow icon={<FiPhone />} label="Mobile" value={userData.mobileNo} />
          <InfoRow icon={<FiUser />} label="Gender" value={userData.gender} />
          <InfoRow icon={<FiCalendar />} label="Birthday" value={userData.dob} />
        </Section>

        <Section title="Shipping Address" rightButtonText="Add / Edit" rightButtonLink="/address">
          {defaultAddress ? (
            <div className="address-box">
              <p>{defaultAddress.line1}</p>
              <p>{defaultAddress.city}, {defaultAddress.state} {defaultAddress.zipcode}</p>
              <p>{defaultAddress.country}</p>
            </div>
          ) : (
            <p className="no-address">No address added</p>
          )}
        </Section>

        <Section title="Your Activity">
  <div className="activity-list">
    <a href="/orders" className="activity-item"> Your Orders</a>
    <a href="/bookings" className="activity-item"> Your Bookings</a>
    <a href="/consultations" className="activity-item"> Your Consultations</a>
  </div>
</Section>


        <button className="toggle-btn" onClick={() => setShowOptions(!showOptions)}>
          {showOptions ? "Hide Account Options" : "Show Account Options"}
        </button>

        {showOptions && (
          <div className="options-box">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            <button className="delete-btn" onClick={handleDelete}>Delete Account</button>
            <a className="privacy-btn" href="/privacy-policy">Privacy Policy</a>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children, rightButtonText, rightButtonLink }) {
  return (
    <div className="profile-section">
      <div className="section-header">
        <h3>{title}</h3>
        {rightButtonText && (
          <a className="edit-btn" href={rightButtonLink}><FiEdit /> {rightButtonText}</a>
        )}
      </div>
      <div className="section-box">{children}</div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="info-row">
      <div className="info-left">{icon} {label}</div>
      <div className="info-right">{value || "--"}</div>
    </div>
  );
}

function LinkRow({ label, link }) {
  return (
    <a href={link} className="link-row">
      {label}
      <FiChevronRight />
    </a>
  );
}
