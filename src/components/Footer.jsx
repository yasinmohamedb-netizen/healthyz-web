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

  .footer-item:hover { color: white; }

  .social-icons {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .social-icons li a {
    font-size: 13px;
    color: #1D1D1B;
    text-decoration: none;
  }

  .social-icons li a:hover { color: #F29100; }

  .download-apps img {
    width: 160px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    .footer-grid {
      grid-template-columns: 1fr;
      text-align: center;
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
            <Link to="/careers" className="footer-item">Careers</Link>
            <Link to="/contact" className="footer-item">Partner With Us</Link>
            <Link to="/support" className="footer-item">Help & Support</Link>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="footer-title">Services</h4>
            <Link to="/wellness-trainers" className="footer-item">Personal Trainers</Link>
            <Link to="/wellness-programs" className="footer-item">Wellness Programs</Link>
            <Link to="/store" className="footer-item">HealthYz Store</Link>
          </div>

          {/* Column 3 - Legal */}
          <div>
            <h4 className="footer-title">Legal</h4>
            <Link to="/terms" className="footer-item">Terms & Conditions</Link>
            <Link to="/privacy-policy" className="footer-item">Privacy Policy</Link>
            <Link to="/refund-policy" className="footer-item">Refund Policy</Link>
            <Link to="/shipping-policy" className="footer-item">Shipping Policy</Link>
          </div>

          {/* Column 4 - Social */}
          <div>
            <h4 className="footer-title">Social</h4>
            <ul className="social-icons">
              <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank">Facebook</a></li>
              <li><a href="https://linkedin.com" target="_blank">LinkedIn</a></li>
              <li><a href="https://youtube.com" target="_blank">YouTube</a></li>
            </ul>
          </div>

          {/* Column 5 */}
          <div>
            <h4 className="footer-title">Get the App</h4>
            <div className="download-apps">
              <img src={StoreImage} alt="Get the App" />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#1D1D1B",
              margin: 0,
            }}
          >
            HealthYz
          </h2>

          {/* Required by Cashfree */}
          <p
            style={{
              marginTop: "4px",
              fontSize: "12px",
              color: "#1D1D1B",
            }}
          >
            Owned & Operated by BASHEER AHAMED MOHAMED YASIN
          </p>
        </div>
      </footer>
    </>
  );
}
