import React from "react";

export default function TipCard({ tip }) {
  return (
    <>
      <style>
        {`
        .tip-card {
          background: white;
          padding: 16px 20px;
          min-width: 240px;
          max-width: 320px;
          border-radius: 14px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          box-sizing: border-box;
          transition: transform 0.15s ease-in-out;
          cursor: pointer;
        }
        .tip-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.1);
        }
        .tip-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          line-height: 1.3;
        }
        .tip-text {
          font-size: 14px;
          color: #4b5563;
          margin-top: 6px;
          line-height: 1.4;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .tip-card {
            max-width: 100%;
            padding: 14px 16px;
          }
          .tip-title {
            font-size: 15px;
          }
          .tip-text {
            font-size: 13px;
            margin-top: 5px;
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .tip-card {
            min-width: auto;
            padding: 12px 14px;
            border-radius: 12px;
          }
          .tip-title {
            font-size: 14px;
          }
          .tip-text {
            font-size: 12px;
            margin-top: 4px;
          }
        }
        `}
      </style>

      <div className="tip-card">
        <h3 className="tip-title">{tip.title}</h3>
        <p className="tip-text">{tip.tip}</p>
      </div>
    </>
  );
}
