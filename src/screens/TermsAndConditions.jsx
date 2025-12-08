import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="terms-wrapper">
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

      <div className="terms-header">Terms & Conditions</div>

      <div className="terms-container">
        <div className="terms-box">

          <SectionTitle title="1. Introduction" />
          <p className="terms-text">
            Welcome to <strong>HealthYz</strong>. By using our website or mobile
            application, you agree to these Terms & Conditions. Please read them
            carefully before using our services or placing any orders.
          </p>

          <SectionTitle title="2. Services Provided" />
          <p className="terms-text">
            HealthYz primarily operates as an online shopping platform offering
            wellness, fitness, baby care, beauty, and personal care products.
            <br /><br />
            We may also provide optional <strong>non-medical home care assistance</strong>
            and <strong>general wellness programs</strong> designed to support lifestyle
            and wellbeing. These offerings are strictly for convenience and
            general wellness support — they do not involve medical treatment,
            clinical procedures, or licensed healthcare services.
          </p>

          <SectionTitle title="3. User Accounts" />
          <p className="terms-text">
            Users must create an account with accurate information. You are
            responsible for maintaining the confidentiality of your login details.
          </p>

          <SectionTitle title="4. Non-Medical Disclaimer" />
          <p className="terms-text">
            HealthYz does not provide medical diagnosis, treatment, or emergency
            care. Any wellness or home assistance services offered are general,
            supportive, and non-clinical in nature. For medical concerns, users
            should consult a qualified healthcare professional independently.
          </p>

          <SectionTitle title="5. Payments & Refunds" />
          <p className="terms-text">
            Payments are processed securely through third-party payment gateways.
            Refunds are governed by our Cancellation & Refund Policy, applicable
            mainly to product orders or select service situations as described.
          </p>

          <SectionTitle title="6. User Conduct" />
          <p className="terms-text">
            You agree not to misuse the platform, engage in fraudulent activity,
            disrupt services, or violate applicable laws. Such actions may result
            in account suspension or termination.
          </p>

          <SectionTitle title="7. Privacy" />
          <p className="terms-text">
            Your personal information is handled in accordance with our Privacy
            Policy. By using HealthYz, you consent to data practices described in
            that policy.
          </p>

          <SectionTitle title="8. Limitation of Liability" />
          <p className="terms-text">
            HealthYz is not liable for indirect, incidental, or consequential
            damages arising from the use of our app, website, or services. Product
            safety and usage instructions must be followed as provided by the
            manufacturers.
          </p>

          <SectionTitle title="9. Modifications to Services" />
          <p className="terms-text">
            We may add, modify, or discontinue any features or services at any
            time without prior notice.
          </p>

          <SectionTitle title="10. Termination" />
          <p className="terms-text">
            Users may delete their accounts at any time. HealthYz may terminate
            accounts that violate these Terms.
          </p>

          <SectionTitle title="11. Changes to Terms" />
          <p className="terms-text">
            These Terms may be updated periodically. Continued use of the platform
            after updates means acceptance of the revised Terms.
          </p>

          <SectionTitle title="12. Contact Us" />
          <p className="terms-text">
            For questions or concerns, contact us at:<br />
            <strong>hello@healthyz.co</strong>
          </p>

          <p className="terms-footer">© 2025 HealthYz. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ title }) {
  return <h2 className="section-title">{title}</h2>;
}
