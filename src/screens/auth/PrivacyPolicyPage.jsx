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
        Contact: <a href="mailto:hello@healthyz.co">hello@healthyz.co</a>
      </p>

      {/* LINKS */}
      <p style={{ marginTop: "20px" }}>
        <strong>Related Policies:</strong>
        <br />
        <a href="/refund-policy" style={{ color: "#439BAE" }}>
          Cancellation & Refund Policy
        </a>
        <br />
        <a href="/shipping-policy" style={{ color: "#439BAE" }}>
          Shipping & Delivery Policy
        </a>
      </p>

      {/* INTRO */}
      <p style={{ marginTop: "20px" }}>
        Your privacy is important to us. This Privacy Policy explains how
        HealthYz (“we”, “our”, or “us”) collects, uses, stores, and protects
        your information when you use our website, mobile app, and online
        shopping services. By using HealthYz, you agree to the practices outlined
        below.
      </p>

      {/* SECTION 1 */}
      <h2 style={{ marginTop: "30px" }}>1. Information We Collect</h2>
      <ul>
        <li>
          <strong>Personal Information:</strong> Name, email address, phone
          number, delivery address, and profile details.
        </li>
        <li>
          <strong>Order Information:</strong> Product orders, cart history, and
          transaction details (payments handled securely by third-party gateways).
        </li>
        <li>
          <strong>Device & Usage Data:</strong> Device model, OS version, app
          version, analytics, and crash logs.
        </li>
        <li>
          <strong>Location Data (Optional):</strong> Approximate location to
          improve product availability and delivery experience.
        </li>
        <li>
          <strong>Additional Information:</strong> Details you voluntarily
          provide through forms or customer support.
        </li>
      </ul>

      {/* SECTION 2 */}
      <h2 style={{ marginTop: "30px" }}>2. How We Use Your Information</h2>
      <ul>
        <li>To process and deliver product orders</li>
        <li>To personalize your shopping experience</li>
        <li>To send order updates and notifications</li>
        <li>To analyze performance and improve user experience</li>
        <li>To ensure account security and prevent fraud</li>
      </ul>

      {/* SECTION 3 */}
      <h2 style={{ marginTop: "30px" }}>3. Sharing of Information</h2>
      <p>
        We do <strong>not</strong> sell your personal information. We may share
        data only with:
      </p>
      <ul>
        <li>
          <strong>Trusted third-party partners:</strong> analytics tools, cloud
          hosting providers, logistics and delivery partners, and payment
          gateway services.
        </li>
        <li>
          <strong>Legal authorities</strong> when required for compliance or
          safety.
        </li>
      </ul>

      {/* SECTION — PAYMENT */}
      <h2 style={{ marginTop: "30px" }}>4. Payments & Billing</h2>
      <p>
        We use secure third-party payment gateways to process transactions. We
        do <strong>not</strong> store or have access to your card, UPI, or bank
        account details. All sensitive financial data is handled directly by the
        payment provider using encrypted and industry-standard security
        protocols.
      </p>

      {/* SECTION 4 (Analytics) */}
      <h2 style={{ marginTop: "30px" }}>5. Advertising & Analytics</h2>
      <ul>
        <li>We use analytics tools for anonymized usage tracking.</li>
        <li>
          Advertising ID, if collected, is used only for analytics and not for
          personalized advertising.
        </li>
      </ul>

      {/* SECTION 5 */}
      <h2 style={{ marginTop: "30px" }}>6. Data Security</h2>
      <p>
        We use industry-standard security practices including encryption, secure
        servers, authentication controls, and restricted data access.
      </p>

      {/* SECTION 6 */}
      <h2 style={{ marginTop: "30px" }}>7. User Rights</h2>
      <ul>
        <li>Access your data</li>
        <li>Update or correct your information</li>
        <li>Request account deletion</li>
        <li>Opt-out of analytics tracking (if supported)</li>
      </ul>
      <p>
        To submit a request, email{" "}
        <a href="mailto:hello@healthyz.co">hello@healthyz.co</a>.
      </p>

      {/* SECTION 7 */}
      <h2 style={{ marginTop: "30px" }}>8. Data Retention</h2>
      <p>
        We retain user and order-related data while your account is active. Some
        data may be retained longer for legal, fraud-prevention, or accounting
        purposes.
      </p>

      {/* SECTION 8 */}
      <h2 style={{ marginTop: "30px" }}>9. Children’s Privacy</h2>
      <p>
        HealthYz is intended for users <strong>18+</strong>. We do not knowingly
        collect information from children.
      </p>

      {/* SECTION 9 */}
      <h2 style={{ marginTop: "30px" }}>10. Changes to This Policy</h2>
      <p>
        Updates may occur periodically. The “Last updated” date reflects the most
        recent revision.
      </p>

      {/* SECTION 10 */}
      <h2 style={{ marginTop: "30px" }}>11. Contact Us</h2>
      <p>
        For questions or privacy concerns, contact{" "}
        <a href="mailto:hello@healthyz.co">hello@healthyz.co</a>.
      </p>

      {/* REFUND POLICY */}
      <h2 style={{ marginTop: "40px" }}>12. Refund & Cancellation Policy</h2>

      <p>
        At <strong>HealthYz</strong>, we aim to deliver a smooth shopping
        experience for wellness, fitness, baby care, beauty, and personal care
        products. Our refund policy ensures clarity and fairness.
      </p>

      <h3 style={{ marginTop: "20px" }}>12.1 Product Order Refunds</h3>
      <ul>
        <li>Refunds are applicable only for:</li>
        <ul>
          <li>Wrong or incorrect items</li>
          <li>Damaged or defective products</li>
          <li>Expired items</li>
          <li>Paid orders not delivered</li>
        </ul>
        <li>
          Products must be returned unused, unopened, and in original packaging,
          unless defective.
        </li>
        <li>
          Due to hygiene reasons, intimate and sexual wellness products cannot be
          returned once opened.
        </li>
      </ul>

      <h3 style={{ marginTop: "20px" }}>12.2 How to Request a Refund</h3>
      <p>Email the following details to hello@healthyz.co:</p>
      <ul>
        <li>Name and registered mobile number</li>
        <li>Order ID</li>
        <li>Date of purchase</li>
        <li>Reason for refund request</li>
      </ul>
      <p>Our support team will review and respond promptly.</p>
    </div>
  );
}
