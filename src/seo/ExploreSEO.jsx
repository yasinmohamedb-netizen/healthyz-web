// ================================================
// ExploreSEO.jsx — FINAL OPTIMIZED SEO + JSON-LD
// ================================================

import React from "react";
import SEOWrapper from "./SEOWrapper";

export default function ExploreSEO() {
  const jsonldData = [
    // --------------------------------------------------
    // MAIN COLLECTION PAGE SCHEMA
    // --------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Explore Products – Healthyz",
      "description":
        "Browse medicines, fitness equipment, sexual wellness items, baby care products, beauty essentials and surgical supplies at Healthyz. Trusted healthcare e-commerce with fast delivery.",
      "url": "https://healthyz.co/explore",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Healthyz",
        "url": "https://healthyz.co"
      }
    },

    // --------------------------------------------------
    // CATEGORY LIST SCHEMA
    // --------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Product Categories",
      "itemListOrder": "https://schema.org/ItemListOrderAscending",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Medicines",
          "url": "https://healthyz.co/medicines"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Fitness Products",
          "url": "https://healthyz.co/gym"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Beauty Products",
          "url": "https://healthyz.co/beauty"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Baby Care",
          "url": "https://healthyz.co/babycare"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Surgical Items",
          "url": "https://healthyz.co/surgical"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "Sexual Wellness",
          "url": "https://healthyz.co/sexual"
        }
      ]
    },

    // --------------------------------------------------
    // PRODUCT GROUP BOOST (E-COMMERCE SIGNAL)
    // --------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "ProductGroup",
      "name": "Health & Wellness Products",
      "description":
        "Shop a wide range of healthcare essentials including medicines, gym accessories, sexual wellness items, baby care essentials, beauty products and surgical supplies.",
      "url": "https://healthyz.co/explore",
      "brand": {
        "@type": "Brand",
        "name": "Healthyz"
      }
    }
  ];

  return (
    <SEOWrapper
      title="Explore Health, Fitness & Wellness Products | Healthyz"
      description="Shop medicines, fitness gear, sexual wellness products, baby care, beauty essentials and surgical equipment from Healthyz. Fast delivery, trusted quality and secure shopping."
      canonical="https://healthyz.co/explore"
      keywords="health products, wellness products, fitness equipment, sexual wellness India, beauty essentials, surgical items, baby care products"
      image="https://healthyz.co/og-image.png"
      jsonld={jsonldData}
    />
  );
}
