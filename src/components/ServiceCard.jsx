import React from "react";

export default function ServiceCard({ service = {} }) {
  const normalizeBullets = (b) => {
    if (!b) return [];
    if (Array.isArray(b)) return b;
    if (typeof b === "string") {
      const parts = b.split(",").map((x) => x.trim()).filter(Boolean);
      return parts.length > 0 ? parts : [b];
    }
    if (typeof b === "object") {
      if (Array.isArray(b.items)) return b.items;
      if (Array.isArray(b.values)) return b.values;
      const values = Object.values(b).filter((v) => typeof v === "string");
      if (values.length > 0) return values;
    }
    return [];
  };

  const bulletsArray = normalizeBullets(service.bullets);

  return (
    <>
      <style>
        {`
          .svc-card {
            background: #ffffff;
            padding: 16px 20px;
            max-width: 380px;
            border-radius: 12px;
            border: 1px solid #e6e9ee;
            box-shadow: 0 2px 6px rgba(16,24,40,0.04);
            transition: transform 0.12s ease, box-shadow 0.12s ease;
            box-sizing: border-box;
          }
          .svc-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 6px 18px rgba(16,24,40,0.08);
          }
          .svc-title {
            font-size: 16px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 10px;
            line-height: 1.2;
          }
          .svc-list {
            margin: 0;
            padding: 0;
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .svc-item {
            font-size: 15px;
            color: #4b5563;
            display: flex;
            align-items: flex-start;
            gap: 10px;
          }
          .svc-bullet-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #c7d2fe;
            margin-top: 7px;
            flex-shrink: 0;
          }
          /* tablets */
          @media (max-width: 900px) {
            .svc-card {
              max-width: 100%;
              padding: 14px 16px;
            }
            .svc-title {
              font-size: 15px;
              margin-bottom: 8px;
            }
            .svc-item {
              font-size: 14px;
              gap: 8px;
            }
          }
          /* small screens */
          @media (max-width: 480px) {
            .svc-card {
              padding: 12px 14px;
              border-radius: 10px;
            }
            .svc-title {
              font-size: 14px;
              margin-bottom: 6px;
            }
            .svc-item {
              font-size: 13px;
              gap: 6px;
            }
          }
        `}
      </style>

      <div className="svc-card" role="group" aria-label={service.title || "service card"}>
        <div className="svc-title">{service.title || "Untitled Service"}</div>

        {bulletsArray.length > 0 ? (
          <ul className="svc-list">
            {bulletsArray.map((b, i) => (
              <li className="svc-item" key={i}>
                <span className="svc-bullet-dot" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ color: "#6b7280", fontSize: 14 }}>No details available</div>
        )}
      </div>
    </>
  );
}
