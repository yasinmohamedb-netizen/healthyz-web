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
        <a href="mailto:hello@healthyz.co">hello@healthyz.co</a>
      </p>

      {/* --------------------------- */}
      {/*   LINKS TO OTHER POLICIES  */}
      {/* --------------------------- */}

      <p style={{ marginTop: "20px" }}>
        <strong>Related Policies:</strong><br />
        <a href="/refund-policy" style={{ color: "#439BAE" }}>
          Cancellation & Refund Policy
        </a>
        <br />
        <a href="/shipping-policy" style={{ color: "#439BAE" }}>
          Shipping & Delivery Policy
        </a>
      </p>

      {/* --------------------------- */}
      {/*      PRIVACY POLICY TEXT    */}
      {/* --------------------------- */}

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
          <strong>Health & Service Data:</strong> Consultation history, homecare
          bookings, wellness sessions, trainer appointments, and product orders.
        </li>
        <li>
          <strong>Device & Usage Data:</strong> Device model, OS version, app
          version, usage analytics, crash data, and Advertising ID (analytics
          only).
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
        <li>To ensure account security and prevent fraud</li>
      </ul>

      <h2 style={{ marginTop: "30px" }}>3. Sharing of Information</h2>
      <p>
        We do <strong>not</strong> sell your personal information. We may share
        data only with:
      </p>
      <ul>
        <li>
          <strong>Trusted third-party providers:</strong> Firebase, Twilio,
          Razorpay, cloud hosting, analytics tools.
        </li>
        <li>
          <strong>Legal authorities</strong> for compliance or security.
        </li>
      </ul>

      <h2 style={{ marginTop: "30px" }}>4. Advertising & Analytics</h2>
      <ul>
        <li>
          We use Firebase Analytics for anonymized usage tracking and app
          performance measurement.
        </li>
        <li>
          Any Advertising ID (if accessed) is used only for analytics and not
          personalized ads.
        </li>
      </ul>

      <h2 style={{ marginTop: "30px" }}>5. Data Security</h2>
      <p>
        We use industry-standard practices including encryption, secure servers,
        authentication controls, and restricted access.
      </p>

      <h2 style={{ marginTop: "30px" }}>6. User Rights</h2>
      <ul>
        <li>Request access to your data</li>
        <li>Edit or correct your data</li>
        <li>Request deletion</li>
        <li>Opt-out of analytics tracking (if supported)</li>
      </ul>
      <p>
        To request any of the above, email{" "}
        <a href="mailto:hello@healthyz.co">hello@healthyz.co</a>.
      </p>

      <h2 style={{ marginTop: "30px" }}>7. Data Retention</h2>
      <p>
        We retain personal and service-related data while your account is
        active. After account deletion, data is removed unless required by law.
      </p>

      <h2 style={{ marginTop: "30px" }}>8. Children’s Privacy</h2>
      <p>
        HealthYz is for users <strong>18+</strong>. We do not knowingly collect
        data from minors.
      </p>

      <h2 style={{ marginTop: "30px" }}>9. Changes to This Policy</h2>
      <p>
        Updates may be made periodically. The updated date at the top reflects
        new versions.
      </p>

      <h2 style={{ marginTop: "30px" }}>10. Contact Us</h2>
      <p>
        For any questions, contact{" "}
        <a href="mailto:hello@healthyz.co">hello@healthyz.co</a>.
      </p>

      {/* ------------------------------------------------------ */}
      {/*                REFUND & CANCELLATION POLICY             */}
      {/* ------------------------------------------------------ */}

      <h2 style={{ marginTop: "40px" }}>11. Refund & Cancellation Policy</h2>

      <p>
        At <strong>HealthYz</strong>, we aim to provide a seamless and reliable
        experience across consultations, homecare services, and product orders.
        Our refund policy is designed to be fair and transparent.
      </p>

      <h3 style={{ marginTop: "20px" }}>11.1 Consultation Refunds</h3>
      <ul>
        <li>
          Refunds only if consultation <strong>did not take place</strong> due
          to:
          <ul>
            <li>Doctor unavailability</li>
            <li>Technical issues from our side</li>
            <li>Incorrect booking charged by error</li>
          </ul>
        </li>
        <li>No refund after consultation is completed.</li>
        <li>Refunds processed within 5–7 business days.</li>
      </ul>

      <h3 style={{ marginTop: "20px" }}>11.2 Home Care Service Refunds</h3>
      <ul>
        <li>
          Initial visit fee refundable only if caregiver was{" "}
          <strong>not assigned</strong> or did not visit.
        </li>
        <li>No refund after service completion.</li>
        <li>Cancellation at least 4 hours before scheduled time.</li>
      </ul>

      <h3 style={{ marginTop: "20px" }}>11.3 Product Order Refunds</h3>
      <ul>
        <li>Applicable only for:</li>
        <ul>
          <li>Wrong or damaged items</li>
          <li>Expired or defective products</li>
          <li>Paid orders not delivered</li>
        </ul>
        <li>
          Products must be returned unused, unopened, and in original packaging
          unless defective.
        </li>
        <li>
          Due to hygiene reasons, intimate/sexual wellness products cannot be
          returned once opened.
        </li>
      </ul>

      <h3 style={{ marginTop: "20px" }}>11.4 How to Request a Refund</h3>
      <p>
        Email{" "}
        <a href="mailto:hello@healthyz.co">hello@healthyz.co</a> with:
      </p>
      <ul>
        <li>Name & registered mobile number</li>
        <li>Order ID / Booking ID</li>
        <li>Date of transaction</li>
        <li>Reason for refund request</li>
      </ul>
      <p>Our support team will review and respond promptly.</p>
    </div>
  );
}
