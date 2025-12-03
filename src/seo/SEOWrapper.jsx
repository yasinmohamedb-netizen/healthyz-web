// ================================================
// SEOWrapper.jsx — Final Optimized SEO Wrapper
// ================================================

import React from "react";
import { Helmet } from "react-helmet";

export default function SEOWrapper({
  title = "Healthyz – Sexual Wellness, Fitness, Medicines & Health Essentials",
  description = "Shop sexual wellness products, fitness gear, medicines, baby care items, wellness essentials and more at Healthyz. Fast delivery & trusted quality.",
  keywords = "healthyz, sexual wellness, fitness products, medicines online, baby care, wellness store",
  canonical = "https://healthyz.co/",
  image = "https://healthyz.co/og-image.png",
  robots = "index,follow",
  jsonld = [],
}) {
  return (
    <Helmet>
      {/* BASIC SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      {/* OG TAGS */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="Healthyz Product Preview" />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />

      {/* TWITTER TAGS */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD AUTO INJECTION */}
      {jsonld.length > 0 &&
        jsonld.map((block, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(block),
            }}
          />
        ))}
    </Helmet>
  );
}
