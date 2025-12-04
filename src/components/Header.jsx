import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/HealthyzLogo.png";
import { getAuth } from "firebase/auth";

export default function Header() {
  const location = useLocation();
  const auth = getAuth();
  const user = auth.currentUser;

  const isActive = (path) =>
    location.pathname === path
      ? {
          color: "#F29100",
          fontWeight: 600,
          borderBottom: "2px solid #F29100",
          paddingBottom: "3px",
        }
      : { color: "#1D1D1B" };

  return (
    <header
      style={{
        width: "100%",
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* RESPONSIVE CSS */}
      <style>
        {`
          @media (max-width: 768px) {
            .header-inner {
              height: 58px !important;
              padding: 6px 12px !important;
              gap: 10px !important;
            }

            .header-logo {
              width: 105px !important;
            }

            .nav-desktop {
              gap: 14px !important;
              font-size: 13px !important;
            }

            .login-btn {
              padding: 6px 10px !important;
              font-size: 12px !important;
            }
          }
        `}
      </style>

      <div
        className="header-inner"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "70px",
          padding: "0 20px",
          gap: "20px",
        }}
      >
        {/* LOGO */}
        <Link to="/home">
          <img
            src={Logo}
            alt="Healthyz"
            className="header-logo"
            style={{
              width: "150px",
              objectFit: "contain",
              transition: "0.2s",
            }}
          />
        </Link>

        {/* NAVIGATION */}
        <nav
          className="nav-desktop"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "26px",
            fontSize: "15px",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          <Link to="/home" style={isActive("/home")}>
            Home
          </Link>

          <Link to="/explore" style={isActive("/explore")}>
            HealthYz Store
          </Link>
        </nav>

        {/* LOGIN / PROFILE BUTTON */}
        <Link
  to={user ? "/profile" : "/login"}
  className="login-btn"
  style={{
    padding: "7px 16px",
    borderRadius: "10px",
    fontSize: "13px",
    background: "#F29100",
    textDecoration: "none",
    color: "#ffffff",
    fontWeight: 500,
  
    
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
  onMouseEnter={(e) => (e.target.style.background = "#F29100")}
  onMouseLeave={(e) => (e.target.style.background = "#F29100")}
>
  {user ? "Profile" : "Login / Signup"}
</Link>


      </div>
    </header>
  );
}
