import React, { useEffect, useState, useContext } from "react";
import {
  FiPhone,
  FiUser,
  FiCalendar,
  FiEdit,
} from "react-icons/fi";
import { getAuth, signOut, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { BASE_URL } from "../../context/config";
import "./ProfileScreen.css";

// ===============================
// HELPER COMPONENTS
// ===============================
function Section({ title, children, rightButtonText, rightButtonLink }) {
  return (
    <div className="profile-section">
      <div className="section-header">
        <h3>{title}</h3>
        {rightButtonText && (
          <a className="edit-btn" href={rightButtonLink}>
            <FiEdit /> {rightButtonText}
          </a>
        )}
      </div>
      <div className="section-box">{children}</div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="info-row">
      <div className="info-left">
        {icon} {label}
      </div>
      <div className="info-right">{value || "--"}</div>
    </div>
  );
}

// ===============================
// MAIN COMPONENT
// ===============================
export default function ProfileScreen() {
  const auth = getAuth();
  const navigate = useNavigate();

  const { userData, setUserData } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  // ===============================
  // LOAD USER FROM BACKEND
  // ===============================
  const fetchUser = async (firebaseUid) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}/users/firebase/${firebaseUid}`
      );

      const data = res.data;

      if (data) {
        // 🔐 Firebase Auth is source of truth for email & phone
        setUserData({
          ...data,
          email: auth.currentUser?.email || data.email,
          mobileNo: auth.currentUser?.phoneNumber || data.mobileNo,
        });

        const addr =
          data?.addresses?.find((a) => a.isDefault) ||
          (data?.addresses?.length > 0
            ? { ...data.addresses[0], isDefault: true }
            : null);

        setDefaultAddress(addr);
      }
    } catch (e) {
      console.log("ERROR loading profile:", e);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // FETCH ON UID AVAILABLE
  // ===============================
  useEffect(() => {
    if (userData?.firebaseUid) {
      fetchUser(userData.firebaseUid);
    } else {
      setLoading(false);
    }
  }, [userData?.firebaseUid]);

  // ===============================
  // UPDATE DEFAULT ADDRESS ON CHANGE
  // ===============================
  useEffect(() => {
    if (!userData) {
      setDefaultAddress(null);
      return;
    }

    const addr =
      userData.addresses?.find((a) => a.isDefault) ||
      (userData.addresses?.length > 0
        ? { ...userData.addresses[0], isDefault: true }
        : null);

    setDefaultAddress(addr);
  }, [userData]);

  // ===============================
  // LOGOUT
  // ===============================
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  // ===============================
  // DELETE ACCOUNT
  // ===============================
  const handleDelete = async () => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;

    try {
      await axios.post(`${BASE_URL}/delete-account`, {
        firebaseUid: userData?.firebaseUid,
        fullName: userData?.fullName,
        email: auth.currentUser?.email || userData?.email,
        mobileNo: auth.currentUser?.phoneNumber || userData?.mobileNo,
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
      navigate("/login", { replace: true });
    } catch (e) {
      alert("Error deleting account. Login again to continue.");
      console.log(e);
    }
  };

  // ===============================
  // WHATSAPP PRESCRIPTION
  // ===============================
  const sendWhatsApp = () => {
    const num = "916369223136";
    const name = userData?.fullName || "Guest";

    const location = defaultAddress
      ? `${defaultAddress.line1}, ${defaultAddress.city}`
      : "No address";

    const msg = `Hello, my name is ${name}. I want to send my prescription. Location: ${location}`;

    window.open(
      `https://wa.me/${num}?text=${encodeURIComponent(msg)}`
    );
  };

  // ===============================
  // STATES
  // ===============================
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

  const formatDate = (dateValue) => {
    if (!dateValue) return "--";
  
    try {
      const date = new Date(dateValue);
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateValue;
    }
  };
  
  // ===============================
  // UI
  // ===============================
  return (
    <div className="profile-container">

      {/* LEFT SECTION */}
      <div className="left-section">
        <img
          src="https://productimagestesting.s3.ap-south-1.amazonaws.com/HomecareHome.png"
          alt="Healthcare"
          className="left-image"
        />

        <h2 className="left-quote">
          “Caring for you, every step of the way.”
        </h2>

        <div className="profile-section">
          <div className="section-header">
            <h3>Send Your Prescription</h3>
          </div>
          <button className="whatsapp-btn" onClick={sendWhatsApp}>
            WhatsApp
          </button>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="right-section">
        <div className="profile-header">
          <div className="profile-avatar">
            {userData.fullName?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h1 className="profile-name">{userData.fullName}</h1>
            <p className="profile-email">
              {auth.currentUser?.email ||
                userData.email ||
                userData.mobileNo}
            </p>
          </div>
        </div>

        <Section title="About Me">
          <InfoRow
            icon={<FiPhone />}
            label="Mobile"
            value={userData.mobileNo}
          />
          <InfoRow
            icon={<FiUser />}
            label="Gender"
            value={userData.gender}
          />
       <InfoRow
  icon={<FiCalendar />}
  label="Birthday"
  value={formatDate(userData.dob)}
/>

        </Section>

        <Section
          title="Shipping Address"
          rightButtonText="Add / Edit"
          rightButtonLink="/address"
        >
          {defaultAddress ? (
            <div className="address-box">
              <p>{defaultAddress.line1}</p>
              <p>
                {defaultAddress.city},{" "}
                {defaultAddress.state}{" "}
                {defaultAddress.zipcode}
              </p>
              <p>{defaultAddress.country}</p>
            </div>
          ) : (
            <p className="no-address">No address added</p>
          )}
        </Section>

        <Section title="Your Activity">
          <div className="activity-list">
            <a href="/orders" className="activity-item">
              Your Orders
            </a>
            <a href="/bookings" className="activity-item">
              Your Bookings
            </a>
          </div>
        </Section>

        <button
          className="toggle-btn"
          onClick={() => setShowOptions(!showOptions)}
        >
          {showOptions ? "Hide Account Options" : "Show Account Options"}
        </button>

        {showOptions && (
          <div className="options-box">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              Delete Account
            </button>
          </div>
        )}

        <div className="partner-box">
          <h3>Partner With Us</h3>
          <p>Grow with Healthyz</p>
          <a href="/contact" className="partner-btn">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
