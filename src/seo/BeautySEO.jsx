import React from "react";
import SEOWrapper from "./SEOWrapper";

export default function BeautySEO() {
  const jsonldData = [
    // -----------------------------------------
    // MAIN CATEGORY ITEM LIST
    // -----------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Beauty & Personal Care Products",
      "description":
        "Explore skin care, hair care, body care, hygiene essentials, face wash, serums, moisturizers, sunscreens, makeup, beauty tools and wellness products.",
      "url": "https://healthyz.co/beauty",
      "numberOfItems": 200,
      "itemListOrder": "https://schema.org/ItemListOrderAscending"
    },

    // -----------------------------------------
    // PRODUCT GROUP (BOOSTS CATEGORY RANK)
    // -----------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "ProductGroup",
      "name": "Beauty & Personal Care Products",
      "url": "https://healthyz.co/beauty",
      "description":
        "Shop face cleansers, moisturizers, serums, toners, sunscreens, hair oils, shampoos, conditioners, hygiene products, body lotions, makeup essentials and daily beauty care.",
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
      "name": "Beauty & Personal Care – Healthyz",
      "url": "https://healthyz.co/beauty",
      "description":
        "Find premium beauty and personal care essentials including serums, face wash, sunscreen, lotion, hair care, hygiene products, makeup and more at Healthyz."
    }
  ];

  return (
    <SEOWrapper
      title="Beauty & Personal Care – Skin Care, Hair Care, Hygiene & Makeup | Healthyz"
      description="Shop premium beauty products including face wash, serums, moisturizers, sunscreens, hair care, hygiene essentials, makeup and body care items. Trusted brands with fast delivery across India."
      keywords="beauty products, personal care items, skin care online, face wash, serums, moisturizer, sunscreen, hair care products, body lotion, makeup essentials, beauty store india, Healthyz beauty"
      canonical="https://healthyz.co/beauty"
      image="https://healthyz.co/og-image.png"
      jsonld={jsonldData}
    />
  );
}
