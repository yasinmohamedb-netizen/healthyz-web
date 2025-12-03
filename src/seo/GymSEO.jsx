import React from "react";
import SEOWrapper from "./SEOWrapper";

export default function GymSEO() {
  const jsonldData = [
    // ------------------------------------------
    // CATEGORY ITEM LIST (Used by Google for ranking)
    // ------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Fitness & Gym Equipment",
      "url": "https://healthyz.co/gym",
      "description":
        "Buy premium fitness products including dumbbells, resistance bands, yoga mats, protein supplements, gym accessories, workout gear and home exercise equipment.",
      "numberOfItems": 100,
      "itemListOrder": "https://schema.org/ItemListOrderAscending"
    },

    // ------------------------------------------
    // PRODUCT GROUP SCHEMA (Boosts category ranking)
    // ------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "ProductGroup",
      "name": "Fitness & Gym Products",
      "url": "https://healthyz.co/gym",
      "description":
        "Shop dumbbells, kettlebells, resistance bands, yoga mats, foam rollers, skipping ropes, protein powders, pre-workout, gym gloves and full workout accessories.",
      "brand": {
        "@type": "Brand",
        "name": "Healthyz"
      }
    },

    // ------------------------------------------
    // WEBPAGE SCHEMA
    // ------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Fitness & Gym Products – Healthyz",
      "url": "https://healthyz.co/gym",
      "description":
        "Browse a wide range of gym essentials, fitness gear, resistance equipment, yoga accessories, and home workout kits at Healthyz.",
    }
  ];

  return (
    <SEOWrapper
      title="Fitness & Gym Products – Dumbbells, Resistance Bands, Mats & Supplements | Healthyz"
      description="Shop premium fitness and gym essentials including dumbbells, resistance bands, yoga mats, protein supplements, workout gear, kettlebells, home exercise equipment and more at Healthyz. Fast delivery and trusted quality."
      keywords="fitness products, gym equipment, dumbbells india, resistance bands, yoga mats, workout accessories, fitness supplements, home gym equipment, Healthyz gym"
      canonical="https://healthyz.co/gym"
      image="https://healthyz.co/og-image.png"
      jsonld={jsonldData}
    />
  );
}
