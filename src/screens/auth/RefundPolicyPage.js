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
        At <strong>HealthYz</strong>, we strive to offer a seamless experience
        across consultations, homecare services, and product orders. This
        Cancellation & Refund Policy explains how refunds and cancellations are
        processed.
      </p>

      {/* --------------------------- */}
      {/*      CONSULTATION REFUNDS    */}
      {/* --------------------------- */}

      <h2 style={{ marginTop: "30px" }}>1. Consultation Refunds</h2>
      <ul>
        <li>
          Refunds are provided only if the consultation{" "}
          <strong>did not take place</strong> due to:
          <ul>
            <li>Doctor not joining the session</li>
            <li>Technical issues from our side</li>
            <li>Incorrect booking charged by error</li>
          </ul>
        </li>
        <li>No refund is provided once the consultation is completed.</li>
        <li>
          Refunds are typically processed within{" "}
          <strong>5–7 business days</strong>.
        </li>
      </ul>

      {/* --------------------------- */}
      {/*   HOME CARE SERVICE REFUNDS  */}
      {/* --------------------------- */}

      <h2 style={{ marginTop: "30px" }}>2. Home Care Service Refunds</h2>
      <ul>
        <li>
          The initial visit fee (e.g., ₹500) is refundable only if a caregiver
          was <strong>not assigned</strong> or did not visit.
        </li>
        <li>No refund once the home care service is completed.</li>
        <li>
          Cancellations should be requested at least{" "}
          <strong>4 hours before</strong> the scheduled visit.
        </li>
      </ul>

      {/* --------------------------- */}
      {/*     PRODUCT ORDER REFUNDS    */}
      {/* --------------------------- */}

      <h2 style={{ marginTop: "30px" }}>3. Product Order Refunds</h2>
      <ul>
        <li>Refunds are applicable only for the following cases:</li>
        <ul>
          <li>Wrong item delivered</li>
          <li>Damaged or defective product</li>
          <li>Expired product received</li>
          <li>Order paid but not delivered</li>
        </ul>

        <li style={{ marginTop: "10px" }}>
          Products must generally be returned{" "}
          <strong>unused, unopened, and in original packaging</strong>, unless
          the issue is related to damage or expiry.
        </li>

        <li style={{ marginTop: "10px" }}>
          Due to hygiene and safety concerns,{" "}
          <strong>sexual wellness and intimate products</strong> cannot be
          returned once opened.
        </li>
      </ul>

      {/* --------------------------- */}
      {/*     REFUND REQUEST PROCESS   */}
      {/* --------------------------- */}

      <h2 style={{ marginTop: "30px" }}>4. How to Request a Refund</h2>
      <p>
        To request a refund, contact us at{" "}
        <a href="mailto:hello@healthyz.co">hello@healthyz.co</a> with:
      </p>

      <ul>
        <li>Your name and registered mobile number</li>
        <li>Order ID or Booking ID</li>
        <li>Transaction date</li>
        <li>Reason for refund request</li>
      </ul>

      <p>
        Our support team will review your request and update you on the next
        steps.
      </p>
    </div>
  );
}
