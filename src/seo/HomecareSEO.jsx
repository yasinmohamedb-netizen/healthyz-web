// ================================================
// HomecareSEO.jsx
// SEO + JSON-LD for Homecare Services Page
// ================================================

import React from "react";
import SEOWrapper from "./SEOWrapper";

export default function HomecareSEO() {
  const jsonldData = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: "Homecare Services",
      url: "https://healthyz.co/home-care-services",
      description:
        "Nursing care, elder care, injections, IV, wound care, physiotherapy, and medical home support services delivered at your doorstep.",
      publisher: {
        "@type": "Organization",
        name: "Zayz Healthcare LLP",
        logo: "https://healthyz.co/HealthyzLogo.png",
      },
    },

    {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://healthyz.co/home-care-services",
      name: "Healthyz – Homecare Services",
      url: "https://healthyz.co/home-care-services",
      image: "https://healthyz.co/og-image.png",
      description:
        "Professional home nursing, physiotherapy, medical attendants, wound care and injections at home.",
      areaServed: "IN",
      serviceType: "Home Nursing, Elder Care, Medical Attendant, Physiotherapy, Wound Care",
      provider: {
        "@type": "Organization",
        name: "Healthyz",
        logo: "https://healthyz.co/HealthyzLogo.png",
      },
    },

    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Home Nursing",
      description: "Experienced nurses available for home visits.",
      provider: {
        "@type": "Organization",
        name: "Healthyz",
      },
      areaServed: "IN",
    },

    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Physiotherapy at Home",
      description:
        "Certified physiotherapists provide therapy sessions at your home.",
      provider: {
        "@type": "Organization",
        name: "Healthyz",
      },
      areaServed: "IN",
    },
  ];

  return (
    <SEOWrapper
      title="Homecare Services at Home | Nursing • Elder Care • Physiotherapy"
      description="Book home nursing, physiotherapy, injections, IV, wound care and elder care services delivered to your home. Certified medical professionals available 24/7."
      canonical="https://healthyz.co/home-care-services"
      image="https://healthyz.co/og-image.png"
      keywords="home nursing, elder care, medical attendant, physiotherapy at home, injection at home, wound care at home"
      jsonld={jsonldData}
    />
  );
}
