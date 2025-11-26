import React from "react";
import SEOWrapper from "./SEOWrapper";

export default function GymSEO() {
  const jsonldData = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Fitness & Gym Equipment",
      description:
        "Buy fitness essentials including dumbbells, resistance bands, yoga mats, gym accessories, workout gear and more.",
      url: "https://healthyz.co/gym",
      numberOfItems: 100,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Fitness & Gym Products – Healthyz",
      url: "https://healthyz.co/gym",
      description:
        "Shop gym accessories, workout equipment, fitness bands, dumbbells, resistance gear, yoga mats, activewear and more.",
    },
  ];

  return (
    <SEOWrapper
      title="Fitness & Gym Products – Dumbbells, Mats, Resistance Bands | Healthyz"
      description="Buy gym and fitness products like dumbbells, resistance bands, yoga mats, fitness gear, activewear, workout accessories and more at Healthyz."
      keywords="fitness products, gym accessories, dumbbells, resistance bands, yoga mats, workout gear, Healthyz fitness"
      canonical="https://healthyz.co/gym"
      image="https://healthyz.co/og-image.png"
      jsonld={jsonldData}
    />
  );
}
