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
        <a href="mailto:hello@healthyz.co">
          hello@healthyz.co
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
          Twilio, Razorpay, cloud hosting, and analytics tools.
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
          If any SDKs access Advertising ID, it is used{" "}
          <strong>only for analytics</strong> and not for personalized ads.
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
        <a href="mailto:hello@healthyz.co">
          hello@healthyz.co
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
        <a href="mailto:hello@healthyz.co">
          hello@healthyz.co
        </a>
        .
      </p>

      {/* ------------------------------------------------------ */}
      {/*                REFUND & CANCELLATION POLICY             */}
      {/* ------------------------------------------------------ */}

      <h2 style={{ marginTop: "40px" }}>11. Refund & Cancellation Policy</h2>

      <p>
        At <strong>HealthYz</strong>, we aim to provide a seamless and reliable
        experience across consultations, homecare services, and product orders.
        Our refund policy is designed to be fair, transparent, and aligned with
        industry standards.
      </p>

      <h3 style={{ marginTop: "20px" }}>11.1 Consultation Refunds</h3>
      <ul>
        <li>
          Refunds are provided only if the consultation{" "}
          <strong>did not take place</strong> due to:
          <ul>
            <li>Doctor unavailability</li>
            <li>Technical issues from our side</li>
            <li>Incorrect booking charged by error</li>
          </ul>
        </li>
        <li>No refund is issued once the consultation has been completed.</li>
        <li>
          Refunds (if approved) are typically processed within{" "}
          <strong>5–7 business days</strong>.
        </li>
      </ul>

      <h3 style={{ marginTop: "20px" }}>11.2 Home Care Service Refunds</h3>
      <ul>
        <li>
          The initial visit fee (e.g., ₹500) is refundable only if a caregiver was{" "}
          <strong>not assigned</strong> or did not visit.
        </li>
        <li>
          If the visit is completed, no refund is provided for the service fee.
        </li>
        <li>
          Service cancellations should be requested at least{" "}
          <strong>4 hours before</strong> the scheduled visit wherever possible.
        </li>
      </ul>

      <h3 style={{ marginTop: "20px" }}>11.3 Product Order Refunds</h3>
      <ul>
        <li>
          Refunds are applicable only for:
          <ul>
            <li>Wrong or damaged items received</li>
            <li>Expired or defective products</li>
            <li>Orders that were paid for but not delivered</li>
          </ul>
        </li>
        <li>
          Products must generally be returned{" "}
          <strong>unused, unopened, and in original packaging</strong>, unless
          the issue is related to damage or expiry.
        </li>
        <li>
          Due to hygiene and safety reasons,{" "}
          <strong>certain health, wellness, and intimate products</strong> may
          not be eligible for return once opened.
        </li>
      </ul>

      <h3 style={{ marginTop: "20px" }}>11.4 How to Request a Refund</h3>
      <p>
        To request a refund or raise a concern about a transaction, please
        contact us at{" "}
        <a href="mailto:hello@healthyz.co">
          hello@healthyz.co
        </a>{" "}
        with:
      </p>
      <ul>
        <li>Your registered name and mobile number</li>
        <li>Order ID / Booking ID</li>
        <li>Date of transaction</li>
        <li>Reason for refund request</li>
      </ul>
      <p>
        Our support team will review your request and respond with the next
        steps.
      </p>
    </div>
  );
}
