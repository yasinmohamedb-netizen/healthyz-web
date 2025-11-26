import React from "react";

export default function LargeCard({ title, image }) {
  return (
    <>
      <style>
        {`
        .large-card {
          min-width: 260px;
          width: 100%;
          max-width: 420px;
          height: 180px;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          cursor: pointer;
          transition: transform 0.14s;
        }
        .large-card:hover {
          transform: translateY(-3px) scale(1.025);
        }
        .large-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .large-overlay {
          position: absolute;
          bottom: 0;
          width: 100%;
          padding: 12px 18px;
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
          color: white;
          font-size: 1.12rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          box-sizing: border-box;
        }
        @media (max-width: 900px) {
          .large-card {
            max-width: 100%;
            height: 150px;
          }
          .large-overlay {
            font-size: 1rem;
            padding: 10px 14px;
          }
        }
        @media (max-width: 600px) {
          .large-card {
            min-width: 0;
            width: 100%;
            max-width: 100%;
            height: 120px;
            border-radius: 10px;
          }
          .large-overlay {
            font-size: 0.95rem;
            padding: 8px 10px;
          }
        }
        `}
      </style>

      <div className="large-card">
        <img src={image} alt={title} className="large-img" />
        <div className="large-overlay">{title}</div>
      </div>
    </>
  );
}
