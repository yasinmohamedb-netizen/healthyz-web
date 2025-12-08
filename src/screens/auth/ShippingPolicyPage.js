// ShippingPolicyPage.js
import React from "react";

export default function ShippingPolicyPage() {
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
        Shipping & Delivery Policy
      </h1>

      <p style={{ fontSize: "14px", color: "#555" }}>
        Last updated: October 2025
      </p>

      <p style={{ marginTop: "20px" }}>
        At <strong>HealthYz</strong>, we aim to provide fast, reliable, and
        secure delivery for all wellness, fitness, beauty, baby care, and
        personal care products. This Shipping Policy explains how your orders
        are processed and delivered.
      </p>

      <h2 style={{ marginTop: "30px" }}>1. Shipping Time</h2>
      <ul>
        <li>
          Orders are usually shipped within <strong>24–48 hours</strong> of
          successful payment.
        </li>
        <li>
          Delivery time varies by location:
          <ul>
            <li>Metro cities: 2–4 days</li>
            <li>Other urban areas: 3–6 days</li>
            <li>Rural / remote areas: 5–10 days</li>
          </ul>
        </li>
        <li>
          Delivery timelines may be affected by weather conditions, operational
          delays, or courier restrictions.
        </li>
      </ul>

      <h2 style={{ marginTop: "30px" }}>2. Shipping Charges</h2>
      <ul>
        <li>
          Shipping charges (if applicable) will be shown at checkout before
          payment.
        </li>
        <li>
          Free delivery may be available on selected products or minimum order
          value.
        </li>
      </ul>

      <h2 style={{ marginTop: "30px" }}>3. Order Tracking</h2>
      <p>Once your order is shipped, you will receive an SMS/email with:</p>
      <ul>
        <li>Tracking ID</li>
        <li>Courier partner name</li>
        <li>Tracking link</li>
      </ul>

      <h2 style={{ marginTop: "30px" }}>4. Packaging</h2>
      <ul>
        <li>
          All orders are packed in <strong>discreet, plain packaging</strong>.
        </li>
        <li>No sensitive product details are printed on the package.</li>
      </ul>

      <h2 style={{ marginTop: "30px" }}>5. Delivery Attempts</h2>
      <ul>
        <li>Our courier partners make <strong>two or three attempts</strong>.</li>
        <li>
          If the customer is unavailable, the order may be returned to our
          warehouse.
        </li>
        <li>Re-delivery may incur additional charges.</li>
      </ul>

      <h2 style={{ marginTop: "30px" }}>6. Wrong or Incomplete Address</h2>
      <ul>
        <li>
          HealthYz is not responsible for delays caused by inaccurate or
          incomplete shipping addresses.
        </li>
        <li>
          If the order is returned due to address issues, re-shipping charges
          may apply.
        </li>
      </ul>

      <h2 style={{ marginTop: "30px" }}>7. International Shipping</h2>
      <p>
        We currently <strong>do not ship internationally</strong>. Orders are
        delivered only within India.
      </p>

      <h2 style={{ marginTop: "30px" }}>8. Undelivered or Lost Packages</h2>
      <ul>
        <li>
          If your package is lost in transit, we will initiate an investigation
          with the courier partner.
        </li>
        <li>
          Once confirmed lost, we will provide a{" "}
          <strong>full refund or replacement</strong>.
        </li>
      </ul>

      <h2 style={{ marginTop: "30px" }}>9. Contact Us</h2>
      <p>
        For shipping or delivery-related concerns, contact us at{" "}
        <a href="mailto:hello@healthyz.co">hello@healthyz.co</a>.
      </p>
    </div>
  );
}
