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

      {/* --------------------------- */}
      {/*   LINKS TO OTHER POLICIES  */}
      {/* --------------------------- */}

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

      {/* --------------------------- */}
      {/*      PRIVACY POLICY TEXT    */}
      {/* --------------------------- */}

      <p style={{ marginTop: "20px" }}>
        Your privacy is important to us. This Privacy Policy explains how
        HealthYz (“we”, “our”, or “us”) collects, uses, stores, and protects
        your information when you use our mobile app and online shopping
        services. By using HealthYz, you agree to the practices outlined below.
      </p>

      <h2 style={{ marginTop: "30px" }}>1. Information We Collect</h2>
      <ul>
        <li>
          <strong>Personal Information:</strong> Name, email address, phone
          number, delivery address, and profile details.
        </li>
        <li>
          <strong>Order Information:</strong> Product orders, cart history, and
          transaction details (payments handled securely by third-party
          gateways).
        </li>
        <li>
          <strong>Device & Usage Data:</strong> Device model, OS version, app
          version, usage analytics, crash reports, and Advertising ID (for
          analytics only).
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

      <h2 style={{ marginTop: "30px" }}>2. How We Use Your Information</h2>
      <ul>
        <li>To process and deliver product orders</li>
        <li>To personalize your shopping experience</li>
        <li>To send order updates, notifications, and alerts</li>
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
          <strong>Trusted third-party partners:</strong> Firebase, Razorpay,
          cloud hosting, logistics partners, analytics tools.
        </li>
        <li>
          <strong>Legal authorities</strong> when required for compliance or
          safety.
        </li>
      </ul>

      <h2 style={{ marginTop: "30px" }}>4. Advertising & Analytics</h2>
      <ul>
        <li>We use Firebase Analytics for anonymized usage tracking.</li>
        <li>
          Any Advertising ID is used strictly for analytics, not personalized
          ads.
        </li>
      </ul>

      <h2 style={{ marginTop: "30px" }}>5. Data Security</h2>
      <p>
        We use industry-standard security practices including encryption,
        secure servers, authentication controls, and restricted access.
      </p>

      <h2 style={{ marginTop: "30px" }}>6. User Rights</h2>
      <ul>
        <li>Access your data</li>
        <li>Update or correct your information</li>
        <li>Request deletion of your account</li>
        <li>Opt-out of analytics tracking (if supported)</li>
      </ul>
      <p>
        To make a request, email{" "}
        <a href="mailto:hello@healthyz.co">hello@healthyz.co</a>.
      </p>

      <h2 style={{ marginTop: "30px" }}>7. Data Retention</h2>
      <p>
        We retain user and order-related data while your account is active. Data
        may be retained longer if required for legal or accounting purposes.
      </p>

      <h2 style={{ marginTop: "30px" }}>8. Children’s Privacy</h2>
      <p>
        HealthYz is intended for users <strong>18+</strong>. We do not knowingly
        collect information from children.
      </p>

      <h2 style={{ marginTop: "30px" }}>9. Changes to This Policy</h2>
      <p>
        Updates may occur periodically. The “Last updated” date reflects the
        latest version.
      </p>

      <h2 style={{ marginTop: "30px" }}>10. Contact Us</h2>
      <p>
        For questions or privacy concerns, contact{" "}
        <a href="mailto:hello@healthyz.co">hello@healthyz.co</a>.
      </p>

      {/* ------------------------------------------------------ */}
      {/*                REFUND & CANCELLATION POLICY             */}
      {/* ------------------------------------------------------ */}

      <h2 style={{ marginTop: "40px" }}>11. Refund & Cancellation Policy</h2>

      <p>
        At <strong>HealthYz</strong>, we focus on delivering a smooth shopping
        experience for wellness, fitness, baby care, beauty, and personal care
        products. Our refund policy ensures fairness and clarity.
      </p>

      <h3 style={{ marginTop: "20px" }}>11.1 Product Order Refunds</h3>
      <ul>
        <li>Refunds are applicable only for:</li>
        <ul>
          <li>Wrong or incorrect items</li>
          <li>Damaged products</li>
          <li>Expired or defective items</li>
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

      <h3 style={{ marginTop: "20px" }}>11.2 How to Request a Refund</h3>
      <p>Email the following details to hello@healthyz.co:</p>
      <ul>
        <li>Name & registered mobile number</li>
        <li>Order ID</li>
        <li>Date of purchase</li>
        <li>Reason for refund request</li>
      </ul>
      <p>Our support team will review and respond promptly.</p>
    </div>
  );
}
