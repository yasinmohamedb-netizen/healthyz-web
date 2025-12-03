import React from "react";
import SEOWrapper from "./SEOWrapper";

export default function HomeSEO() {
  const jsonldData = [
    // ---------------------------------------------------
    // ORGANIZATION SCHEMA
    // ---------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Zayz Healthcare LLP",
      "legalName": "Zayz Healthcare LLP",
      "url": "https://healthyz.co",
      "logo": "https://healthyz.co/HealthyzLogo.png",
      "foundingDate": "2024",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      },
      "brand": {
        "@type": "Brand",
        "name": "Healthyz",
        "logo": "https://healthyz.co/HealthyzLogo.png"
      },
      "description":
        "Healthyz offers premium sexual wellness products, fitness gear, protein supplements, medicines, OTC essentials, baby care items and surgical products with fast delivery across India."
    },

    // ---------------------------------------------------
    // WEBSITE SCHEMA
    // ---------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://healthyz.co",
      "name": "Healthyz – Health, Wellness & E-Commerce Store",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://healthyz.co/search?query={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },

    // ---------------------------------------------------
    // CATEGORY LIST SCHEMA
    // ---------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Product Categories",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Sexual Wellness",
          "url": "https://healthyz.co/sexual"
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
          "name": "Medicines & OTC",
          "url": "https://healthyz.co/medicines"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Beauty & Personal Care",
          "url": "https://healthyz.co/beauty"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Baby Care",
          "url": "https://healthyz.co/babycare"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "Surgical Items",
          "url": "https://healthyz.co/surgical"
        }
      ]
    },

    // ---------------------------------------------------
    // SEXUAL WELLNESS PRODUCT GROUP
    // ---------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "ProductGroup",
      "name": "Sexual Wellness Products",
      "description":
        "Shop condoms, lubricants, delay sprays, performance enhancers, fertility kits, menstrual hygiene and intimate care products with discreet packaging.",
      "brand": { "@type": "Brand", "name": "Healthyz" },
      "url": "https://healthyz.co/sexual"
    },

    // ---------------------------------------------------
    // FITNESS PRODUCT GROUP  (URL FIXED)
    // ---------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "ProductGroup",
      "name": "Fitness Products",
      "description":
        "Buy protein powders, gym accessories, resistance bands, pre-workout, equipment and wellness supplements for fitness and performance.",
      "brand": { "@type": "Brand", "name": "Healthyz" },
      "url": "https://healthyz.co/gym"
    }
  ];

  return (
    <SEOWrapper
      title="Healthyz – Sexual Wellness, Fitness Products, Medicines & Healthcare Essentials"
      description="Buy sexual wellness products, condoms, lubricants, fitness gear, protein supplements, medicines, baby care and wellness essentials from Healthyz. Fast delivery, discreet packaging and trusted quality."
      canonical="https://healthyz.co/"
      image="https://healthyz.co/og-image.png"
      keywords="sexual wellness products, condoms online, lubricants India, delay spray, performance enhancer, protein supplements, gym accessories, medicines online, baby care products, wellness store, Healthyz"
      jsonld={jsonldData}
    />
  );
}
