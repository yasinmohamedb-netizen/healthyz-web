// ===============================================
// SexualSEO.jsx
// SEO for Sexual Wellness Category Page (Corrected)
// ===============================================

import React from "react";
import SEOWrapper from "./SEOWrapper";

export default function SexualSEO({ productUrls = [] }) {
  return (
    <SEOWrapper
      title="Sexual Wellness Products | Condoms, Lubricants, Intimate Care – Healthyz"
      description="Shop condoms, lubricants, intimate wash, pregnancy test kits, fertility aids, and sexual wellness products online at Healthyz. 100% privacy & discreet delivery."
      canonical="https://healthyz.co/sexual"
      keywords="sexual wellness, condoms, lubricants, intimate wash, pregnancy test, fertility kits, sexual health products"
      jsonld={[
        // Main category schema
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Sexual Wellness Products",
          url: "https://healthyz.co/sexual",
          description:
            "Explore condoms, lubricants, intimate hygiene products, pregnancy tests and more at Healthyz.",
        },

        // Optional ItemList for better SEO
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Sexual Wellness Products List",
          itemListElement: productUrls.map((url, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url,
          })),
        },
      ]}
    />
  );
}
