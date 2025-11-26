import React, { useRef } from "react";

export default function PromoBanner({ banner = {} } = {}) {
  // Only warn once if banner isn't an object
  const warnedRef = useRef(false);
  if (banner && typeof banner !== "object" && !warnedRef.current) {
    // eslint-disable-next-line no-console
    console.warn("PromoBanner expected banner to be an object but received:", banner);
    warnedRef.current = true;
  }

  // Safe fallbacks using optional chaining / nullish coalescing
  const bg = (banner && typeof banner === "object" && banner.bg) ?? "#4B9CD3";
  const title = (banner && typeof banner === "object" && banner.title) ?? "Special Offer";
  const subtitle = (banner && typeof banner === "object" && banner.subtitle) ?? "";
  const icon = (banner && typeof banner === "object" && banner.icon) ?? null;

  return (
    <>
      <style>
        {`
          .promoBox {
            min-width: 260px;
            max-width: 100%;
            height: 130px;
            border-radius: 14px;
            padding: 16px 20px;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            box-sizing: border-box;
          }

          .promoBox:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(0,0,0,0.18);
          }

          .promoLeft {
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex-shrink: 1;
            max-width: 60%;
          }

          .promoTitle {
            font-size: 18px;
            font-weight: 600;
            color: #fff;
            line-height: 1.2;
            margin: 0;
            word-break: break-word;
          }

          .promoSubtitle {
            font-size: 13px;
            opacity: 0.85;
            max-width: 180px;
            line-height: 1.3;
            margin: 0;
            word-break: break-word;
          }

          .promoBtn {
            margin-top: 6px;
            width: fit-content;
            padding: 6px 12px;
            font-size: 12px;
            font-weight: 600;
            background: white;
            color: #2563eb;
            border-radius: 999px;
            border: none;
            cursor: pointer;
            transition: background 0.2s ease;
          }

          .promoBtn:hover {
            background: #e5e7eb;
          }

          .promoImg {
            width: 64px;
            height: 64px;
            object-fit: contain;
            opacity: 0.9;
            flex-shrink: 0;
            margin-left: 10px;
          }

          /* RESPONSIVE */
          @media (max-width: 768px) {
            .promoBox {
              height: 120px;
              padding: 14px 16px;
            }
            .promoLeft {
              max-width: 65%;
              gap: 4px;
            }
            .promoTitle {
              font-size: 16px;
            }
            .promoSubtitle {
              font-size: 12px;
              max-width: 140px;
            }
            .promoBtn {
              font-size: 11px;
              padding: 5px 10px;
            }
            .promoImg {
              width: 56px;
              height: 56px;
              margin-left: 8px;
            }
          }

          @media (max-width: 480px) {
            .promoBox {
              min-width: 220px;
              height: 110px;
              padding: 12px 14px;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
            }
            .promoLeft {
              max-width: 100%;
              gap: 6px;
            }
            .promoTitle {
              font-size: 16px;
              max-width: 100%;
            }
            .promoSubtitle {
              font-size: 12px;
              max-width: 100%;
            }
            .promoBtn {
              margin-top: 8px;
              font-size: 12px;
              padding: 6px 14px;
              width: 100%;
            }
            .promoImg {
              width: 58px;
              height: 58px;
              margin-left: 0;
              margin-top: 8px;
              align-self: center;
              opacity: 1;
            }
          }
        `}
      </style>

      <div
        className="promoBox"
        style={{ backgroundColor: bg }}
        data-testid="promo-box"
      >
        {/* LEFT SIDE CONTENT */}
        <div className="promoLeft">
          <h3 className="promoTitle">{title}</h3>
          <p className="promoSubtitle">{subtitle}</p>
          <button className="promoBtn">Shop Now</button>
        </div>

        {/* RIGHT SIDE ICON */}
        {icon ? (
          <img src={icon} alt="promo" className="promoImg" />
        ) : (
          <div
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.6,
              color: "rgba(255,255,255,0.85)",
            }}
            className="promoImg"
          >
            No Image
          </div>
        )}
      </div>
    </>
  );
}
