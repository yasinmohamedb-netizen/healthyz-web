// ===============================================
// SexualSEO.jsx — CLEAN & GOOGLE-SAFE VERSION
// ===============================================

import React from "react";
import SEOWrapper from "./SEOWrapper";

export default function SexualSEO({ productUrls = [] }) {
  const jsonldData = [
    // ---------------------------------------------------
    // COLLECTION PAGE SCHEMA (CORRECT FOR CATEGORIES)
    // ---------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Sexual Wellness Products",
      "url": "https://healthyz.co/sexual",
      "description":
        "Shop sexual wellness essentials including condoms, lubricants, delay sprays, intimate wash, pregnancy kits, fertility aids and hygiene products with private and discreet delivery.",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Healthyz",
        "url": "https://healthyz.co"
      }
    },

    // ---------------------------------------------------
    // ITEM LIST (OPTIONAL BUT GOOD)
    // ---------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Sexual Wellness Products",
      "itemListOrder": "https://schema.org/ItemListOrderAscending",
      "itemListElement": productUrls.map((url, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": url
      }))
    }
  ];

  return (
    <SEOWrapper
      title="Sexual Wellness Products – Condoms, Lubes & Intimate Care | Healthyz"
      description="Shop condoms, lubricants, intimate wash, pregnancy test kits, fertility aids and sexual wellness products at Healthyz. 100% private browsing and discreet delivery across India."
      canonical="https://healthyz.co/sexual"
      image="https://healthyz.co/og-image.png"
      jsonld={jsonldData}
    />
  );
}
