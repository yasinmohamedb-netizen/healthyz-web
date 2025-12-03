// =======================================================
// ProductSEO.jsx (WITH AUTO KEYWORD GENERATOR)
// =======================================================

import React from "react";
import SEOWrapper from "./SEOWrapper";

export default function ProductSEO({ product }) {
  if (!product) return null;

  const {
    _id,
    name,
    description,
    imageUrl,
    price,
    mrp,
    brand,
    category,
  } = product;

  const categorySlug = (category || "products")
    .toLowerCase()
    .replace(/\s+/g, "-");

  const canonicalUrl = `https://healthyz.co/product/${_id}`;

  // ------------------------------------------------------
  // AUTO KEYWORD GENERATOR
  // ------------------------------------------------------
  const generateKeywords = () => {
    const baseWords = [
      name,
      brand,
      category,
      `${name} price`,
      `buy ${name} online`,
      `${name} uses`,
      `${name} benefits`,
      `${category} products`,
      `${brand} ${category}`,
      `${name} Healthyz`,
      `${name} best price`,
      `${name} India`,
    ];

    // Add category-based suggestions
    const categoryKeywords = {
      sexual: [
        "condoms",
        "sexual wellness",
        "lubricants",
        "intimate care",
        "discreet delivery",
      ],
      gym: [
        "fitness gear",
        "workout products",
        "gym accessories",
        "resistance bands",
        "dumbbells",
      ],
      beauty: [
        "skin care",
        "hair care",
        "beauty essentials",
        "face wash",
        "serums",
      ],
      babycare: [
        "baby lotions",
        "diapers",
        "baby wipes",
        "newborn products",
        "baby soap",
      ],
      medicines: [
        "tablets",
        "health supplements",
        "syrups",
        "pharmacy products",
      ],
      surgical: [
        "medical equipment",
        "surgical items",
        "first aid",
        "medical supplies",
      ],
    };

    const extra =
      categoryKeywords[categorySlug] !== undefined
        ? categoryKeywords[categorySlug]
        : [];

    const keywords = [...baseWords, ...extra];

    return keywords
      .filter(Boolean)
      .map((k) => k.toLowerCase())
      .join(", ");
  };

  const autoKeywords = generateKeywords();

  // ------------------------------------------------------
  // JSON-LD SCHEMA
  // ------------------------------------------------------
  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name,
      image: imageUrl,
      description,
      sku: _id,
      mpn: _id,
      brand: {
        "@type": "Brand",
        name: brand || "Healthyz",
      },
      category: category || "General Health",
      offers: {
        "@type": "Offer",
        url: canonicalUrl,
        priceCurrency: "INR",
        price: price || mrp,
        priceValidUntil: "2099-12-31",
        availability: "https://schema.org/InStock",
      },
    },

    // Breadcrumbs
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Explore",
          item: "https://healthyz.co/explore",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: category || "Products",
          item: `https://healthyz.co/${categorySlug}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name,
          item: canonicalUrl,
        },
      ],
    },
  ];

  // ------------------------------------------------------
  // FINAL SEO WRAPPER
  // ------------------------------------------------------
  return (
    <SEOWrapper
      title={`${name} | Price, Uses, Benefits & Buy Online | Healthyz`}
      description={
        description
          ? description.substring(0, 160) + "..."
          : `Buy ${name} online at Healthyz. Trusted quality and fast delivery.`
      }
      canonical={canonicalUrl}
      image={imageUrl}
      keywords={autoKeywords}
      jsonld={jsonld}
    />
  );
}
