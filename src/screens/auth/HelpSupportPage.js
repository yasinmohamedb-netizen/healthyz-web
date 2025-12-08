// HelpSupportPage.js
import React from "react";

export default function HelpSupportPage() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Inter, sans-serif",
        color: "#1D1D1B",
        lineHeight: "1.7",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        Help & Support
      </h1>

      <p style={{ fontSize: "14px", color: "#555" }}>Last updated: October 2025</p>

      <p style={{ marginTop: "20px" }}>
        We're here to help with anything related to your orders, account,
        product details, or general assistance. Our team responds quickly and
        ensures a smooth experience with Healthyz.
      </p>

      {/* ------------------------------ */}
      {/* Contact Options */}
      {/* ------------------------------ */}

      <h2 style={{ marginTop: "30px" }}>How can we help you?</h2>

      {/* Phone Support */}
      <div style={{ marginTop: "20px" }}>
        <h3 style={{ fontSize: "18px", marginBottom: "6px" }}>📞 Phone Support</h3>
        <p style={{ margin: 0, fontSize: "14px" }}>
          Call us at: <strong>+91 63692 23136</strong>
        </p>
      </div>

      {/* WhatsApp Support */}
      <div style={{ marginTop: "25px" }}>
        <h3 style={{ fontSize: "18px", marginBottom: "6px" }}>💬 WhatsApp Support</h3>
        <p style={{ margin: 0, fontSize: "14px" }}>
          Chat with our support team on WhatsApp for quick help.
        </p>

        <a
          href="https://wa.me/916369223136?text=Hello%2C%20I%20need%20help%20with%20my%20order."
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",
            marginTop: "8px",
            padding: "10px 18px",
            background: "#25D366",
            color: "#fff",
            borderRadius: "8px",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          Chat on WhatsApp
        </a>
      </div>

      {/* Email Support */}
      <div style={{ marginTop: "25px" }}>
        <h3 style={{ fontSize: "18px", marginBottom: "6px" }}>📧 Email Support</h3>
        <p style={{ margin: 0, fontSize: "14px" }}>
          Email us at:
          <a href="mailto:hello@healthyz.co" style={{ color: "#439BAE", marginLeft: 6 }}>
            hello@healthyz.co
          </a>
        </p>
      </div>

      {/* FAQ Section */}
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ marginBottom: "10px" }}>Frequently Asked Questions</h2>

        <ul style={{ fontSize: "14px", paddingLeft: "20px" }}>
          <li>How do I track my order?</li>
          <li>How long does delivery take?</li>
          <li>What is your refund policy?</li>
          <li>How do I change or update my address?</li>
        </ul>

        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          For more details, visit our{" "}
          <a href="/refund-policy" style={{ color: "#439BAE" }}>
            Refund Policy
          </a>{" "}
          or{" "}
          <a href="/shipping-policy" style={{ color: "#439BAE" }}>
            Shipping Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
