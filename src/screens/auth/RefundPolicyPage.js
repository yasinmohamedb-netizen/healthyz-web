// RefundPolicyPage.js
import React from "react";

export default function RefundPolicyPage() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        lineHeight: "1.75",
        color: "#1D1D1B",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        Cancellation & Refund Policy
      </h1>

      <p style={{ fontSize: "14px", color: "#555" }}>
        Last updated: October 2025
      </p>

      <p style={{ marginTop: "20px" }}>
        At <strong>HealthYz</strong>, we work to ensure a smooth and reliable
        shopping experience for wellness, fitness, beauty, baby care, and
        personal care products. This policy outlines when refunds and
        cancellations can be requested.
      </p>

      {/* PRODUCT REFUNDS ONLY — SAFE FOR CASHFREE */}
      <h2 style={{ marginTop: "30px" }}>1. Product Order Refunds</h2>
      <ul>
        <li>Refunds are applicable only in the following cases:</li>
        <ul>
          <li>Wrong item delivered</li>
          <li>Damaged or defective product</li>
          <li>Expired product delivered</li>
          <li>Order paid but not delivered</li>
        </ul>

        <li style={{ marginTop: "10px" }}>
          Products must be returned <strong>unused, unopened, and in their
          original packaging</strong> unless the issue relates to damage or expiry.
        </li>

        <li style={{ marginTop: "10px" }}>
          Due to hygiene and safety reasons,{" "}
          <strong>sexual wellness and intimate products cannot be returned or
          refunded once opened</strong>.
        </li>
      </ul>

      {/* CANCELLATION */}
      <h2 style={{ marginTop: "30px" }}>2. Order Cancellations</h2>
      <ul>
        <li>
          Orders may be cancelled before they are packed or shipped. Once shipped,
          cancellation may not be possible.
        </li>
        <li>
          If the order is cancelled before dispatch, a full refund will be issued.
        </li>
      </ul>

      {/* REFUND PROCESS */}
      <h2 style={{ marginTop: "30px" }}>3. How to Request a Refund</h2>
      <p>
        To request a refund, email us at{" "}
        <a href="mailto:hello@healthyz.co">hello@healthyz.co</a> with:
      </p>

      <ul>
        <li>Your name and registered mobile number</li>
        <li>Order ID</li>
        <li>Date of purchase</li>
        <li>Reason for refund request</li>
      </ul>

      <p>
        Refunds are typically processed within{" "}
        <strong>5–7 business days</strong> after approval.
      </p>

      <p>
        Our support team will review your request and update you with the next steps.
      </p>
    </div>
  );
}
