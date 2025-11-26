import React from "react";

export default function QuickCard({ title, image }) {
  return (
    <>
      <style>
        {`
        .quick-card {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          cursor: pointer;
          transition: transform 0.2s ease;
          width: 100%;
          max-width: 280px;
        }
        .quick-card:hover {
          transform: translateY(-3px);
        }
        .quick-card-img {
          width: 100%;
          height: 140px;
          object-fit: cover;
          transition: height 0.3s ease;
        }
        .quick-card-title {
          position: absolute;
          bottom: 0;
          width: 100%;
          padding: 12px 14px;
          background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
          color: white;
          font-weight: 600;
          font-size: 16px;
          box-sizing: border-box;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .quick-card {
            max-width: 100%;
          }
          .quick-card-img {
            height: 120px;
          }
          .quick-card-title {
            font-size: 15px;
            padding: 10px 12px;
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .quick-card {
            max-width: 100%;
            border-radius: 12px;
          }
          .quick-card-img {
            height: 100px;
          }
          .quick-card-title {
            font-size: 14px;
            padding: 8px 10px;
          }
        }
        `}
      </style>

      <div className="quick-card">
        <img src={image} alt={title} className="quick-card-img" />
        <div className="quick-card-title">{title}</div>
      </div>
    </>
  );
}
