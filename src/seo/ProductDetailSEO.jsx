// =======================================================
// ProductDetailSEO.jsx — Final Enhanced Version
// Dynamic SEO for Product Detail Page
// =======================================================

import React from "react";
import SEOWrapper from "./SEOWrapper";

export default function ProductDetailSEO({ product }) {
  if (!product) return null;

  const {
    name,
    description,
    imageUrl,
    price,
    mrp,
    brand,
    category,
    id,
    rating,      // optional
    reviewCount, // optional
    sku,
  } = product;

  const safeCategory = (category || "products")
    .toLowerCase()
    .replace(/\s+/g, "-");

  const canonicalUrl = `https://healthyz.co/product/${id}`;

  const jsonldData = [
    // ------------------------------------------------
    // PRODUCT SCHEMA
    // ------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": name,
      "image": imageUrl,
      "description": description,
      "sku": sku || id,
      "mpn": id, // manufacturer part number fallback
      "brand": {
        "@type": "Brand",
        "name": brand || "Healthyz"
      },
      "category": category || "Health & Wellness",
      "offers": {
        "@type": "Offer",
        "url": canonicalUrl,
        "priceCurrency": "INR",
        "price": price || mrp,
        "priceValidUntil": "2099-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      },
      ...(rating
        ? {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: rating,
              reviewCount: reviewCount || 1
            }
          }
        : {})
    },

    // ------------------------------------------------
    // BREADCRUMB SCHEMA
    // ------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Explore",
          "item": "https://healthyz.co/explore"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": category || "Products",
          "item": `https://healthyz.co/${safeCategory}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": name,
          "item": canonicalUrl
        }
      ]
    }
  ];

  return (
    <SEOWrapper
      title={`${name} | Price, Details & Buy Online | Healthyz`}
      description={
        description
          ? description.substring(0, 160) + "..."
          : "Buy this product online at Healthyz."
      }
      canonical={canonicalUrl}
      image={imageUrl}
      keywords={`${name}, ${brand || ""}, ${category}, buy ${name} online, Healthyz`}
      jsonld={jsonldData}
    />
  );
}
