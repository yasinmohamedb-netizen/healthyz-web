import React, { useState } from "react";
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
          paddingBottom: "4px",
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
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      {/* RESPONSIVE RULES */}
      <style>
        {`
          @media (max-width: 768px) {
            .header-inner {
              height: 60px !important;
              padding: 6px 14px !important;
            }
            .header-inner img {
              width: 110px !important;
            }

            /* ⭐ ALWAYS SHOW NAV ON MOBILE */
            .nav-desktop {
              display: flex !important;
              gap: 20px !important;
              font-size: 14px !important;
            }

            /* Hide login button only, keep nav */
            .login-desktop {
              display: none !important;
            }

            /* Hide hamburger always */
            .menu-btn {
              display: none !important;
            }

            /* Hide dropdown */
            .mobile-menu {
              display: none !important;
            }
          }

          @media (min-width: 769px) {
            .header-inner {
              height: 70px !important;
              padding: 0 20px !important;
            }
            .header-inner img {
              width: 150px !important;
            }

            .menu-btn,
            .mobile-menu {
              display: none !important;
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
          height: "70px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LOGO */}
        <Link to="/home">
          <img
            src={Logo}
            alt="Healthyz"
            style={{
              width: "150px",
              height: "auto",
              objectFit: "contain",
              transition: "0.3s",
            }}
          />
        </Link>

        {/* ⭐ ALWAYS VISIBLE HOME / EXPLORE / PROFILE */}
        <nav
          className="nav-desktop"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            fontSize: "15px",
            fontWeight: 500,
          }}
        >
          <Link to="/home" style={isActive("/home")}>
            Home
          </Link>

          <Link to="/explore" style={isActive("/explore")}>
          HealthYz Store
          </Link>

          {/* <Link to="/profile" style={isActive("/profile")}>
            Profile
          </Link> */}
        </nav>

        {/* Desktop Login/Profile Button */}
        <Link
          to={user ? "/profile" : "/login"}
          className="login-desktop"
          style={{
            padding: "8px 18px",
            borderRadius: "6px",
            fontSize: "14px",
            background: "#F29100",
            textDecoration: "none",
            color: "#fff",
            fontWeight: 600,
            border: "1px solid #F29100",
            transition: "0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#1D1D1B";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#F29100";
          }}
        >
          {user ? "My Profile" : "Login / Signup"}
        </Link>
      </div>
    </header>
  );
}
