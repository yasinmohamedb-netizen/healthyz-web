import React from "react";
import SEOWrapper from "./SEOWrapper";

export default function MedicineSEO() {
  const jsonldData = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Medicines – Healthyz",
      description:
        "Buy medicines online including tablets, syrups, injections, antibiotic medicines, pain relief medicines and more.",
      url: "https://healthyz.co/medicines",
      numberOfItems: 500,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Online Medicines – Healthyz",
      url: "https://healthyz.co/medicines",
      description:
        "Order medicines online at Healthyz — genuine, trusted pharmaceuticals including OTC, prescription medicines, health supplements and more.",
    },
  ];

  return (
    <SEOWrapper
      title="Buy Medicines Online – Trusted Pharmacy | Healthyz"
      description="Order genuine medicines, tablets, syrups, health supplements, antibiotics, pain relievers, and more from Healthyz."
      keywords="buy medicines online, online pharmacy India, Healthyz medicines, tablets, syrups, antibiotic"
      canonical="https://healthyz.co/medicines"
      image="https://healthyz.co/og-image.png"
      jsonld={jsonldData}
    />
  );
}
