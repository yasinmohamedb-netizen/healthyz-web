import React from "react";
import SEOWrapper from "./SEOWrapper";

export default function BabycareSEO() {
  const jsonldData = [
    // -----------------------------------------
    // ITEM LIST (CATEGORY)
    // -----------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Baby Care Products",
      "description":
        "Explore baby essentials including diapers, lotions, baby oil, powders, wipes, bathing products, baby wash, newborn kits, feeding bottles, and daily care items.",
      "url": "https://healthyz.co/babycare",
      "numberOfItems": 120,
      "itemListOrder": "https://schema.org/ItemListOrderAscending"
    },

    // -----------------------------------------
    // PRODUCT GROUP (BOOSTS RANKING)
    // -----------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "ProductGroup",
      "name": "Baby Care Essentials",
      "url": "https://healthyz.co/babycare",
      "description":
        "Shop baby lotions, diapers, rash creams, feeding bottles, baby wipes, baby wash, shampoo, baby oils, soaps, powders, baby hygiene items and newborn essentials.",
      "brand": {
        "@type": "Brand",
        "name": "Healthyz"
      }
    },

    // -----------------------------------------
    // WEBPAGE SCHEMA
    // -----------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Baby Care Products – Healthyz",
      "url": "https://healthyz.co/babycare",
      "description":
        "Buy trusted Baby Care products including lotions, diapers, rash creams, powders, wipes, baby wash, oils, hygiene items and newborn essentials at Healthyz."
    }
  ];

  return (
    <SEOWrapper
      title="Baby Care Products – Diapers, Lotions, Oils, Wipes & Newborn Essentials | Healthyz"
      description="Shop high-quality baby care essentials including diapers, lotions, oils, powders, wipes, baby wash, feeding bottles, shampoos and newborn must-haves. Trusted brands and fast delivery across India."
      keywords="baby care products, newborn essentials, diapers online, baby lotion, baby oil, feeding bottles, rash cream, baby wipes, baby wash, baby shampoo, baby hygiene products, Healthyz baby"
      canonical="https://healthyz.co/babycare"
      image="https://healthyz.co/og-image.png"
      jsonld={jsonldData}
    />
  );
}
