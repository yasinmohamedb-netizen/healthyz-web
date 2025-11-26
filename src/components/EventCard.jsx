import React from "react";

export default function EventCard({ event }) {
  return (
    <>
      {/* INLINE CSS FOR THIS COMPONENT */}
      <style>
        {`
          .event-card {
            background: #ffffff;
            padding: 16px;
            border-radius: 14px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.07);
            border: 1px solid #e5e7eb;
            transition: 0.2s ease;
            width: 100%;
          }

          .event-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          }

          .event-title {
            font-size: 16px;
            font-weight: 600;
            color: #111827;
            margin-bottom: 4px;
          }

          .event-date {
            font-size: 13px;
            color: #2563eb;
            font-weight: 500;
            margin-bottom: 8px;
          }

          .event-description {
            font-size: 14px;
            color: #4b5563;
            line-height: 1.4;
            margin-bottom: 8px;
          }

          .event-location {
            font-size: 13px;
            color: #6b7280;
            font-weight: 500;
          }

          /* MOBILE RESPONSIVE */
          @media(max-width: 480px) {
            .event-card {
              padding: 14px;
              border-radius: 12px;
            }

            .event-title {
              font-size: 15px;
            }

            .event-description {
              font-size: 13px;
            }
          }
        `}
      </style>

      {/* CARD UI */}
      <div className="event-card">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-date">{event.date}</p>

        {event.description && (
          <p className="event-description">{event.description}</p>
        )}

        {event.location && (
          <div className="event-location">📍 {event.location}</div>
        )}
      </div>
    </>
  );
}
