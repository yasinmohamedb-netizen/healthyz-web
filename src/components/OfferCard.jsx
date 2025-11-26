import React from "react";

export default function OfferCard({ offer }) {
  return (
    <>
      <style>
        {`
        .offer-card {
          background: ${offer.bgColor || "#1d4ed8"};
          padding: 16px;
          border-radius: 14px;
          color: white;
          min-width: 240px;
          max-width: 320px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          transition: transform 0.15s ease-in-out;
          cursor: pointer;
        }
        .offer-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .offer-title {
          font-size: 16px;
          font-weight: 600;
          line-height: 1.3;
        }
        .offer-desc {
          font-size: 14px;
          margin-top: 6px;
          opacity: 0.9;
          line-height: 1.4;
        }
      
        /* Tablet */
        @media (max-width: 900px) {
          .offer-card {
            max-width: 100%;
            padding: 14px;
            min-width: 100%;
          }
          .offer-title {
            font-size: 15px;
          }
          .offer-desc {
            font-size: 13px;
            margin-top: 5px;
          }
        }
        
        /* Mobile */
        @media (max-width: 600px) {
          .offer-card {
            min-width: auto;
            padding: 12px;
            border-radius: 12px;
          }
          .offer-title {
            font-size: 14px;
          }
          .offer-desc {
            font-size: 12px;
            margin-top: 4px;
          }
        }
        `}
      </style>

      <div className="offer-card">
        <h3 className="offer-title">{offer.title}</h3>
        <p className="offer-desc">{offer.description}</p>
      </div>
    </>
  );
}
