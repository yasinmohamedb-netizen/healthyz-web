// ================================================
// SEOWrapper.jsx
// Auto SEO + JSON-LD Generator
// ================================================

import React from "react";
import { Helmet } from "react-helmet";

export default function SEOWrapper({
  title = "Healthyz – Health & Wellness Services",
  description = "Order medicines, wellness essentials, fitness gear, baby care items, and book online doctor consultations.",
  keywords = "healthyz, medicines, wellness, doctor consultation, fitness, baby care",
  canonical = "https://healthyz.co/",
  image = "https://healthyz.co/og-image.png",
  jsonld = [],
}) {
  return (
    <Helmet>
      {/* BASIC SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* OG TAGS */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />

      {/* TWITTER TAGS */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD AUTO INJECTION */}
      {jsonld.length > 0 &&
        jsonld.map((block, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
          />
        ))}
    </Helmet>
  );
}
