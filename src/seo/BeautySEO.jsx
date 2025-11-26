import React from "react";
import SEOWrapper from "./SEOWrapper";

export default function BeautySEO() {
  const jsonldData = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Beauty & Personal Care Products",
      description:
        "Explore skin care, hair care, personal hygiene, beauty essentials, creams, lotions, serums, face wash, makeup and more.",
      url: "https://healthyz.co/beauty",
      numberOfItems: 100,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
    },

    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Beauty & Personal Care – Healthyz",
      url: "https://healthyz.co/beauty",
      description:
        "Shop Beauty & Personal Care products including lotions, face wash, serums, oils, creams, shampoo, conditioner, wellness items and more.",
    },
  ];

  return (
    <SEOWrapper
      title="Beauty & Personal Care – Skin Care, Hair Care, Wellness | Healthyz"
      description="Buy beauty and personal care products like face wash, serums, creams, lotions, hair care, makeup essentials and hygiene products online. Fast delivery."
      keywords="beauty products, personal care, face wash, hair care, lotion, creams, serum, Healthyz beauty"
      canonical="https://healthyz.co/beauty"
      image="https://healthyz.co/og-image.png"
      jsonld={jsonldData}
    />
  );
}
