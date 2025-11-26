import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="terms-wrapper">
      {/* Inline CSS */}
      <style>
        {`
          .terms-wrapper {
            min-height: 100vh;
            background: #439BAE;
          }

          .terms-header {
            background: #439BAE;
            padding: 24px 0;
            text-align: center;
            color: white;
            font-size: 24px;
            font-weight: 700;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }

          .terms-container {
            max-width: 850px;
            margin: 0 auto;
            padding: 20px;
          }

          .terms-box {
            background: #ffffff;
            border-radius: 20px;
            padding: 24px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          }

          .section-title {
            font-size: 18px;
            font-weight: 600;
            color: #1F2937;
            margin-top: 22px;
            margin-bottom: 6px;
          }

          .terms-text {
            font-size: 14px;
            line-height: 1.7;
            color: #545454;
          }

          .terms-footer {
            text-align: center;
            color: #6b7280;
            font-size: 12px;
            margin-top: 24px;
          }

          /* -------------------- Responsive -------------------- */

          @media (max-width: 640px) {
            .terms-header {
              font-size: 20px;
              padding: 18px 0;
            }

            .terms-box {
              padding: 18px;
            }

            .section-title {
              font-size: 16px;
              margin-top: 18px;
            }

            .terms-text {
              font-size: 13px;
            }
          }
        `}
      </style>

      {/* Header */}
      <div className="terms-header">Terms & Conditions</div>

      {/* Content */}
      <div className="terms-container">
        <div className="terms-box">
          <SectionTitle title="1. Introduction" />
          <p className="terms-text">
            Welcome to <strong>HealthYz</strong>. By downloading or using our
            app, you agree to comply with these Terms and Conditions. Please
            read them carefully before using our services.
          </p>

          <SectionTitle title="2. Services Provided" />
          <p className="terms-text">
            HealthYz offers services including online consultations, home care,
            wellness programs, and product ordering. These services are intended
            for users aged 18 and above.
          </p>

          <SectionTitle title="3. User Accounts" />
          <p className="terms-text">
            You must create an account with accurate details. You are
            responsible for maintaining the confidentiality of your account.
          </p>

          <SectionTitle title="4. Medical Disclaimer" />
          <p className="terms-text">
            HealthYz connects users with certified professionals but does not
            provide medical advice directly. Always consult a qualified doctor
            for emergencies.
          </p>

          <SectionTitle title="5. Payments & Refunds" />
          <p className="terms-text">
            Payments are processed securely via third-party gateways. Refund
            eligibility depends on the service type.
          </p>

          <SectionTitle title="6. User Conduct" />
          <p className="terms-text">
            Misuse, fraud, or illegal activity may lead to account suspension or
            termination.
          </p>

          <SectionTitle title="7. Privacy" />
          <p className="terms-text">
            Your data is handled according to our Privacy Policy.
          </p>

          <SectionTitle title="8. Limitation of Liability" />
          <p className="terms-text">
            HealthYz is not responsible for indirect or consequential damages
            arising from app usage.
          </p>

          <SectionTitle title="9. Modifications to Services" />
          <p className="terms-text">
            We may update, modify, or discontinue any service without prior
            notice.
          </p>

          <SectionTitle title="10. Termination" />
          <p className="terms-text">
            Accounts may be terminated if terms are violated. Users may delete
            their accounts anytime.
          </p>

          <SectionTitle title="11. Changes to Terms" />
          <p className="terms-text">
            Updated terms will apply once posted. Continued use means acceptance.
          </p>

          <SectionTitle title="12. Contact Us" />
          <p className="terms-text">
            For any queries, contact: <br />
            <strong>zayzhealthcare@gmail.com</strong>
          </p>

          <p className="terms-footer">
            © 2025 HealthYz. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

/* --- Section Title Component --- */
function SectionTitle({ title }) {
  return <h2 className="section-title">{title}</h2>;
}
