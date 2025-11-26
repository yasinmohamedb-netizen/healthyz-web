// PrivacyPolicyPage.js
import React from "react";

export default function PrivacyPolicyPage() {
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
        HealthYz Privacy Policy
      </h1>

      <p style={{ fontSize: "14px", color: "#555" }}>
        Last updated: October 2025
      </p>

      <p style={{ marginTop: "10px" }}>
        Contact:{" "}
        <a href="mailto:zayzhealthcare@gmail.com">
          zayzhealthcare@gmail.com
        </a>
      </p>

      <p style={{ marginTop: "20px" }}>
        Your privacy is important to us. This Privacy Policy explains how
        HealthYz (“we”, “our”, or “us”) collects, uses, stores, and protects
        your information when you use our mobile app and services. By using
        HealthYz, you agree to the practices outlined below.
      </p>

      <h2 style={{ marginTop: "30px" }}>1. Information We Collect</h2>
      <ul>
        <li>
          <strong>Personal Information:</strong> Name, email address, phone
          number, profile details, and payment details (securely handled by
          third-party gateways).
        </li>
        <li>
          <strong>Health & Service Data:</strong> Consultation history,
          homecare bookings, wellness sessions, trainer appointments, and product
          orders.
        </li>
        <li>
          <strong>Device & Usage Data:</strong> Device model, OS version, app
          version, usage analytics, crash data, and Advertising ID (if used for
          analytics only).
        </li>
        <li>
          <strong>Location Data (Optional):</strong> Approximate or permitted
          location for nearby doctors, clinics, and services.
        </li>
        <li>
          <strong>Additional Information:</strong> Details you voluntarily
          provide via surveys, forms, or customer support.
        </li>
      </ul>

      <h2 style={{ marginTop: "30px" }}>2. How We Use Your Information</h2>
      <ul>
        <li>To provide, personalize, and improve our services</li>
        <li>To process bookings, consultations, and product orders</li>
        <li>To send service updates, alerts, and notifications</li>
        <li>To analyze app performance and improve user experience</li>
        <li>To ensure account security and prevent fraudulent activity</li>
      </ul>

      <h2 style={{ marginTop: "30px" }}>3. Sharing of Information</h2>
      <p>
        We do <strong>not</strong> sell your personal information. We may share
        data only with:
      </p>
      <ul>
        <li>
          <strong>Trusted third-party providers</strong> such as Firebase,
          Twilio, Razorpay/Stripe, cloud hosting, and analytics tools.
        </li>
        <li>
          <strong>Legal authorities</strong> if required for compliance or
          security.
        </li>
      </ul>

      <h2 style={{ marginTop: "30px" }}>4. Advertising & Analytics</h2>
      <ul>
        <li>
          We use Firebase Analytics for anonymized usage tracking and app
          performance measurement.
        </li>
        <li>
          If any SDKs access Advertising ID, it is used **only for analytics**
          — not for personalized ads.
        </li>
      </ul>

      <h2 style={{ marginTop: "30px" }}>5. Data Security</h2>
      <p>
        We use industry-standard security practices including encryption,
        secure servers, authentication controls, and restricted access to
        safeguard your information.
      </p>

      <h2 style={{ marginTop: "30px" }}>6. User Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Request access to your personal data</li>
        <li>Update or correct your data</li>
        <li>Request data deletion</li>
        <li>Opt-out of analytics tracking (if supported)</li>
      </ul>
      <p>
        To request any of the above, email us at{" "}
        <a href="mailto:zayzhealthcare@gmail.com">
          zayzhealthcare@gmail.com
        </a>
      </p>

      <h2 style={{ marginTop: "30px" }}>7. Data Retention</h2>
      <p>
        We retain personal and service-related data as long as your account is
        active. Upon account deletion, your data will be securely removed within
        a reasonable time unless required by law for longer retention.
      </p>

      <h2 style={{ marginTop: "30px" }}>8. Children’s Privacy</h2>
      <p>
        HealthYz is intended for users <strong>18 years and older</strong>. We
        do not knowingly collect personal information from individuals under 18.
      </p>

      <h2 style={{ marginTop: "30px" }}>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy occasionally. The “Last Updated” date
        will reflect the new version. Please review periodically for changes.
      </p>

      <h2 style={{ marginTop: "30px" }}>10. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy or your data, please
        reach out to us at{" "}
        <a href="mailto:zayzhealthcare@gmail.com">
          zayzhealthcare@gmail.com
        </a>
        .
      </p>
    </div>
  );
}
