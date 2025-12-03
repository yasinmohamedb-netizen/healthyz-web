import React from "react";
import SEOWrapper from "./SEOWrapper";

export default function SurgicalSEO() {
  const jsonldData = [
    // ----------------------------------------------------
    // ITEM LIST (CATEGORY)
    // ----------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Surgical & Medical Equipment",
      "description":
        "Shop surgical and medical equipment including gloves, masks, bandages, gauze pads, first-aid items, oximeters, BP monitors, thermometers, nebulizers, wound dressings and hospital supplies.",
      "url": "https://healthyz.co/surgical",
      "numberOfItems": 150,
      "itemListOrder": "https://schema.org/ItemListOrderAscending"
    },

    // ----------------------------------------------------
    // PRODUCT GROUP (BOOSTS RANKING)
    // ----------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "ProductGroup",
      "name": "Surgical & Medical Supplies",
      "url": "https://healthyz.co/surgical",
      "description":
        "Buy surgical gloves, N95 masks, wound dressing supplies, gauze, medical tapes, first-aid kits, oximeters, thermometers, BP machines, nebulizers, adult diapers and home medical equipment.",
      "brand": {
        "@type": "Brand",
        "name": "Healthyz"
      }
    },

    // ----------------------------------------------------
    // WEBPAGE SCHEMA
    // ----------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Surgical Products – Healthyz",
      "url": "https://healthyz.co/surgical",
      "description":
        "Buy surgical and medical supplies including gloves, masks, bandages, dressings, first-aid kits, oximeters, thermometers, BP monitors, nebulizers and hospital instruments online at Healthyz."
    }
  ];

  return (
    <SEOWrapper
      title="Surgical Supplies & Medical Equipment – Gloves, Devices & Hospital Items | Healthyz"
      description="Buy surgical supplies and medical equipment including gloves, masks, bandages, gauze pads, oximeters, thermometers, BP monitors, adult diapers, first-aid items and home medical devices at Healthyz. Fast doorstep delivery."
      keywords="surgical products, medical supplies, medical equipment, gloves, masks, bandages, oximeter, BP monitor, thermometer, nebulizer, hospital supplies, first-aid kit, Healthyz surgical"
      canonical="https://healthyz.co/surgical"
      image="https://healthyz.co/og-image.png"
      jsonld={jsonldData}
    />
  );
}
