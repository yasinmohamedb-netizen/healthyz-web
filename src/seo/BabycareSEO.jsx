import React from "react";
import SEOWrapper from "./SEOWrapper";

export default function BabycareSEO() {
  const jsonldData = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Baby Care Products",
      description:
        "Explore baby care products including diapers, lotions, oils, powders, wipes, shampoos, soaps, baby essentials and more.",
      url: "https://healthyz.co/babycare",
      numberOfItems: 50,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
    },

    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Baby Care Products – Healthyz",
      url: "https://healthyz.co/babycare",
      description:
        "Shop Baby Care products including baby lotions, baby diapers, creams, powders, soaps, oils, wipes and wellness essentials online.",
    },
  ];

  return (
    <SEOWrapper
      title="Baby Care Products – Diapers, Lotions, Oils, Wipes | Healthyz"
      description="Shop baby care products including baby lotions, diapers, oils, powders, soaps, wipes, and essential newborn items. Fast delivery across India."
      keywords="baby care, baby lotions, baby diapers, baby wipes, baby oils, baby shampoo, newborn products, Healthyz baby"
      canonical="https://healthyz.co/babycare"
      image="https://healthyz.co/og-image.png"
      jsonld={jsonldData}
    />
  );
}
