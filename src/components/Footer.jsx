// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import StoreImage from "../assets/playstoreandappstor.png";

export default function Footer() {
  return (
    <>
      <style>
        {`
   .footer-wrapper {
    width: 100%;
    background: #439BAE;
    color: #1D1D1B;
    padding: 24px 0 12px;
    margin-top: 30px;
  }

  .footer-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 24px;
    padding: 0 20px;
  }

  .footer-title {
    font-weight: 700;
    margin-bottom: 8px;
    font-size: 16px;
    color: #F29100;
  }

  .footer-item {
    color: #1D1D1B;
    text-decoration: none;
    display: block;
    margin-bottom: 6px;
    font-size: 13px;
    transition: color 0.2s ease;
  }

  .footer-item:hover {
    color: #ffffff;
  }

  .footer-logo-area {
    text-align: center;
    margin-top: 20px;
    padding: 0 16px;
  }

  .footer-copy {
    text-align: center;
    color: #1D1D1B;
    font-size: 12px;
    margin-top: 4px;
  }

  .download-apps {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .download-apps img {
    width: 160px;
    max-width: 100%;
    height: auto;
  }

  .social-icons {
    display: flex;
    flex-direction: column;
  }

  .social-icons a {
    margin-bottom: 4px;
    font-size: 13px;
    color: #1D1D1B;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .social-icons a:hover {
    color: #F29100;
  }

  @media (max-width: 768px) {
    .footer-grid {
      gap: 16px;
    }
  }

  @media (max-width: 480px) {
    .footer-grid {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .download-apps {
      justify-content: center;
    }

    .social-icons {
      align-items: center;
    }

    .footer-item {
      font-size: 14px;
      margin-bottom: 8px;
    }

    .download-apps img {
      width: 140px;
    }
  }
  `}
      </style>

      <footer className="footer-wrapper">
        <div className="footer-grid">
          
          {/* Column 1 */}
          <div>
            <h4 className="footer-title">Healthyz</h4>

            {/* Keeping About empty since no About page exists */}
            <Link to="#" className="footer-item"></Link>

            {/* <Link to="/contact" className="footer-item">Contact</Link> */}
            <Link to="/careers" className="footer-item">Careers</Link>
            <Link to="/contact" className="footer-item">Contact us for partnership</Link>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="footer-title">Services</h4>
            <Link to="/video-consultation" className="footer-item">Online Consultation</Link>
            <Link to="/home-care-services" className="footer-item">Home Care Services</Link>
            <Link to="/wellness-trainers" className="footer-item">Personal Trainers</Link>
            <Link to="/TransplantConnect" className="footer-item">International Patients</Link>
            <Link to="/transplant-connect" className="footer-item">Transplant Connect</Link>
            <Link to="/medicines" className="footer-item">Order Medicines</Link>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="footer-title">Legal</h4>

            {/* Corrected routes */}
            <Link to="/terms" className="footer-item">Terms & Conditions</Link>
            <Link to="/privacy-policy" className="footer-item">Privacy Policy</Link>

            {/* Help & Support → Contact page */}
            <Link to="/contact" className="footer-item">Help & Support</Link>

            <h4 className="footer-title" style={{ marginTop: "12px" }}>Social</h4>
            <div className="social-icons">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
            </div>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="footer-title">Get the App</h4>

            <div className="download-apps">
              <img
                src={StoreImage}
                alt="Download on Play Store and App Store"
              />
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-logo-area">
          <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#1D1D1B", margin: "0" }}>
            HealthYz
          </h2>
          <p className="footer-copy" style={{ marginTop: "4px" }}>
            © 2025 Healthyz by Zayz Healthcare LLP. All rights reserved.
          </p>
        </div>

      </footer>
    </>
  );
}
