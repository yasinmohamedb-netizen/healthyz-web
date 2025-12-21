// ===============================================
// GymSEO.jsx — CLEAN & GOOGLE-SAFE VERSION
// ===============================================

import React from "react";
import SEOWrapper from "./SEOWrapper";

export default function GymSEO({ productUrls = [] }) {
  const jsonldData = [
    // ---------------------------------------------------
    // COLLECTION PAGE (CORRECT FOR CATEGORY)
    // ---------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Fitness & Gym Products",
      "url": "https://www.healthyz.co/gym",
      "description":
        "Shop fitness and gym products including protein powders, creatine, dumbbells, resistance bands, yoga mats, gym accessories and home workout equipment.",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Healthyz",
        "url": "https://www.healthyz.co"
      }
    },

    // ---------------------------------------------------
    // ITEM LIST (OPTIONAL BUT GOOD)
    // ---------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Fitness & Gym Product List",
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
      title="Fitness & Gym Products – Protein, Creatine & Workout Essentials | Healthyz"
      description="Buy fitness and gym products online including protein powders, creatine, dumbbells, resistance bands, yoga mats and workout accessories at Healthyz. Fast delivery and trusted quality."
      canonical="https://www.healthyz.co/gym"
      image="https://healthyz.co/og-image.png"
      jsonld={jsonldData}
    />
  );
}
