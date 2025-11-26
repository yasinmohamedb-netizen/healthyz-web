// =======================================================
// ProductDetailSEO.jsx
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
  } = product;

  const canonicalUrl = `https://healthyz.co/product/${id}`;

  const jsonldData = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: name,
      image: imageUrl,
      description: description,
      sku: id,
      brand: {
        "@type": "Brand",
        name: brand || "Healthyz",
      },
      category: category || "Health & Wellness",
      offers: {
        "@type": "Offer",
        url: canonicalUrl,
        priceCurrency: "INR",
        price: price || mrp,
        availability: "https://schema.org/InStock",
      },
    },

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
          item: `https://healthyz.co/${category?.toLowerCase()}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: name,
          item: canonicalUrl,
        },
      ],
    },
  ];

  return (
    <SEOWrapper
      title={`${name} | Price, Uses & Details | Healthyz`}
      description={description?.slice(0, 150) || "Product details on Healthyz"}
      canonical={canonicalUrl}
      image={imageUrl}
      keywords={`${name}, ${category}, wellness products, buy online`}
      jsonld={jsonldData}
    />
  );
}
