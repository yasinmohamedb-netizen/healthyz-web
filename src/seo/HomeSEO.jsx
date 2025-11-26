import React from "react";
import SEOWrapper from "./SEOWrapper";

export default function HomeSEO() {
  const jsonldData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Zayz Healthcare LLP",
      legalName: "Zayz Healthcare LLP",
      url: "https://healthyz.co",
      logo: "https://healthyz.co/HealthyzLogo.png",
      foundingDate: "2024",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
      brand: {
        "@type": "Brand",
        name: "Healthyz",
        logo: "https://healthyz.co/HealthyzLogo.png",
      },
    },

    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: "https://healthyz.co",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://healthyz.co/search?query={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },

    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Product Categories",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Medicines", url: "https://healthyz.co/medicines" },
        { "@type": "ListItem", position: 2, name: "Surgical Items", url: "https://healthyz.co/surgical" },
        { "@type": "ListItem", position: 3, name: "Beauty & Personal Care", url: "https://healthyz.co/beauty" },
        { "@type": "ListItem", position: 4, name: "Fitness Products", url: "https://healthyz.co/gym" },
        { "@type": "ListItem", position: 5, name: "Baby Care", url: "https://healthyz.co/babycare" },
        { "@type": "ListItem", position: 6, name: "Sexual Wellness", url: "https://healthyz.co/sexual" },
      ],
    },
  ];

  return (
    <SEOWrapper
      title="Healthyz – Health & Wellness Products, Medicines & Consultations"
      description="Shop medicines, wellness items, fitness gear, baby care, sexual wellness products and book online doctor consultations from Healthyz."
      canonical="https://healthyz.co/"
      image="https://healthyz.co/og-image.png"
      keywords="healthyz, online pharmacy, doctor consultation, wellness products"
      jsonld={jsonldData}
    />
  );
}
