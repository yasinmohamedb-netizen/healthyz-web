import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="success-wrapper">
      {/* INLINE CSS */}
      <style>
        {`
          .success-wrapper {
            min-height: 100vh;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 24px;
            text-align: center;
          }

          .success-icon {
            font-size: 70px;
            margin-bottom: 12px;
            color: #0d9488;
          }

          .success-title {
            font-size: 32px;
            font-weight: 800;
            color: #1f2937;
            margin-bottom: 8px;
          }

          .success-message {
            color: #4b5563;
            max-width: 380px;
            line-height: 1.7;
            margin-bottom: 28px;
            font-size: 15px;
          }

          .success-btn {
            background: #0d9488;
            color: white;
            font-weight: 700;
            font-size: 18px;
            padding: 12px 32px;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: background 0.2s ease;
          }

          .success-btn:hover {
            background: #0f766e;
          }

          /* -------------------- Responsive -------------------- */

          @media (max-width: 480px) {
            .success-icon {
              font-size: 56px;
            }

            .success-title {
              font-size: 26px;
            }

            .success-message {
              font-size: 14px;
              max-width: 320px;
            }

            .success-btn {
              font-size: 16px;
              padding: 10px 26px;
            }
          }

          @media (max-width: 360px) {
            .success-title {
              font-size: 22px;
            }

            .success-btn {
              font-size: 15px;
            }
          }
        `}
      </style>

      {/* Icon */}
      <div className="success-icon">✅</div>

      {/* Title */}
      <h1 className="success-title">Order Confirmed!</h1>

      {/* Message */}
      <p className="success-message">
        Thank you for your purchase! Your order has been successfully placed and
        is now being processed.
      </p>

      {/* Button */}
      <button onClick={goToHome} className="success-btn">
        Go to Home
      </button>
    </div>
  );
}
