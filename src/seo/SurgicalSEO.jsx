import React from "react";
import SEOWrapper from "./SEOWrapper";

export default function SurgicalSEO() {
  const jsonldData = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Surgical & Medical Equipment",
      description:
        "Buy surgical gloves, masks, bandages, first-aid items, medical devices, cotton rolls, gauze pads and hospital supplies online at Healthyz.",
      url: "https://healthyz.co/surgical",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Surgical Products – Healthyz",
      url: "https://healthyz.co/surgical",
      description:
        "Order surgical supplies including gloves, masks, bandages, medical devices, cotton rolls, gauze pads and hospital instruments online.",
    },
  ];

  return (
    <SEOWrapper
      title="Surgical Supplies & Medical Equipment – Buy Online | Healthyz"
      description="Buy surgical gloves, medical masks, bandages, gauze pads, first-aid kits, medical devices and hospital supplies at the best prices."
      canonical="https://healthyz.co/surgical"
      keywords="surgical products, medical equipment, bandages, gloves, hospital supplies, medical devices"
      image="https://healthyz.co/og-image.png"
      jsonld={jsonldData}
    />
  );
}
