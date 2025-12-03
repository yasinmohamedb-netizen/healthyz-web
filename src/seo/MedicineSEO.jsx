import React from "react";
import SEOWrapper from "./SEOWrapper";

export default function MedicineSEO() {
  const jsonldData = [
    // -----------------------------------------
    // ITEM LIST – CATEGORY
    // -----------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Medicines – Healthyz",
      "description":
        "Buy medicines online including tablets, capsules, syrups, antibiotics, pain relievers, fever medicines, digestive care, vitamins, supplements, and chronic care medicines.",
      "url": "https://healthyz.co/medicines",
      "numberOfItems": 800,
      "itemListOrder": "https://schema.org/ItemListOrderAscending"
    },

    // -----------------------------------------
    // PRODUCT GROUP – BOOSTS RANKING
    // -----------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "ProductGroup",
      "name": "Medicines & Pharmaceuticals",
      "url": "https://healthyz.co/medicines",
      "description":
        "Shop genuine medicines including antibiotics, pain relief tablets, fever medicines, cough syrups, digestive medicines, health supplements, chronic care medicines, OTC products and wellness essentials.",
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
      "name": "Online Medicines – Healthyz",
      "url": "https://healthyz.co/medicines",
      "description":
        "Order genuine medicines online at Healthyz — tablets, antibiotics, syrups, chronic care, OTC essentials, vitamins, supplements and more with fast and trusted delivery."
    }
  ];

  return (
    <SEOWrapper
      title="Buy Medicines Online – Genuine Tablets, Syrups & OTC Products | Healthyz"
      description="Order genuine medicines, tablets, antibiotics, syrups, pain relievers, supplements, chronic care medicines and OTC products online at Healthyz. Fast delivery and trusted quality."
      keywords="buy medicines online, online pharmacy India, tablets, antibiotics, cough syrups, pain relief medicine, chronic care medicines, OTC products, Healthyz pharmacy"
      canonical="https://healthyz.co/medicines"
      image="https://healthyz.co/og-image.png"
      jsonld={jsonldData}
    />
  );
}
