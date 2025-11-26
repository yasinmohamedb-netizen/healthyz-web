// ================================================
// ExploreSEO.jsx — FINAL SEO + JSON-LD
// ================================================

import React from "react";
import SEOWrapper from "./SEOWrapper";

export default function ExploreSEO() {
  const jsonldData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Explore Products – Healthyz",
      description:
        "Browse medicines, wellness essentials, fitness gear, baby care items, beauty products and surgical supplies from Healthyz.",
      url: "https://healthyz.co/explore",
      isPartOf: {
        "@type": "WebSite",
        name: "Healthyz",
        url: "https://healthyz.co",
      },
    },

    // Category List JSON-LD
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Product Categories",
      itemListOrder: "Ascending",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Medicines",
          url: "https://healthyz.co/medicines",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Fitness Products",
          url: "https://healthyz.co/gym",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Beauty Products",
          url: "https://healthyz.co/beauty",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Baby Care",
          url: "https://healthyz.co/babycare",
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Surgical Items",
          url: "https://healthyz.co/surgical",
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "Sexual Wellness",
          url: "https://healthyz.co/sexual",
        },
      ],
    },
  ];

  return (
    <SEOWrapper
      title="Explore Health & Wellness Products | Healthyz"
      description="Shop medicines, fitness gear, beauty care, baby essentials, personal care items and surgical equipment. Fast & safe delivery across India."
      canonical="https://healthyz.co/explore"
      keywords="online pharmacy, wellness products, baby care, fitness equipment, surgical items"
      image="https://healthyz.co/og-image.png"
      jsonld={jsonldData}
    />
  );
}
