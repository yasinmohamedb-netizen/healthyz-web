// ================================================
// HomecareSEO.jsx — Final Optimized Version
// Homecare | Nursing | Physiotherapy | Elder Care
// ================================================

import React from "react";
import SEOWrapper from "./SEOWrapper";

export default function HomecareSEO() {
  const jsonldData = [
    // ----------------------------------------------------
    // MEDICAL WEBPAGE (Primary Category)
    // ----------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": "Homecare Services",
      "url": "https://healthyz.co/home-care-services",
      "description":
        "Home nursing, elder care, physiotherapy, injections, IV administration, wound care, medical attendants and home medical support.",
      "publisher": {
        "@type": "Organization",
        "name": "Zayz Healthcare LLP",
        "logo": "https://healthyz.co/HealthyzLogo.png"
      }
    },

    // ----------------------------------------------------
    // MEDICAL ORGANIZATION (Correct Schema)
    // ----------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      "name": "Healthyz – Homecare Services",
      "url": "https://healthyz.co/home-care-services",
      "logo": "https://healthyz.co/HealthyzLogo.png",
      "image": "https://healthyz.co/og-image.png",
      "description":
        "Professional home nursing, physiotherapy sessions, wound dressings, injections and elder care services delivered by certified medical staff.",
      "areaServed": "IN",
      "medicalSpecialty": [
        "Nursing",
        "Physiotherapy",
        "Home Medical Care",
        "Geriatric Care"
      ]
    },

    // ----------------------------------------------------
    // HOME NURSING SERVICE
    // ----------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "MedicalService",
      "name": "Home Nursing",
      "description":
        "Certified nurses available for injections, IV, wound care, vitals monitoring, post-surgery care and complete home medical support.",
      "provider": {
        "@type": "Organization",
        "name": "Healthyz"
      },
      "areaServed": "IN",
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceLocation": {
          "@type": "Place",
          "name": "Home Nursing Service"
        }
      }
    },

    // ----------------------------------------------------
    // PHYSIOTHERAPY SERVICE
    // ----------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "MedicalService",
      "name": "Physiotherapy at Home",
      "description":
        "Qualified physiotherapists provide rehabilitation, pain relief therapy, mobility improvement and post-injury therapy at home.",
      "provider": {
        "@type": "Organization",
        "name": "Healthyz"
      },
      "areaServed": "IN",
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceLocation": {
          "@type": "Place",
          "name": "Home Physiotherapy Service"
        }
      }
    },

    // ----------------------------------------------------
    // ELDER CARE SERVICE
    // ----------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "MedicalService",
      "name": "Elder Care (Geriatric Support)",
      "description":
        "Trained caregivers provide elderly support, daily assistance, mobility help and companionship at home.",
      "provider": {
        "@type": "Organization",
        "name": "Healthyz"
      },
      "areaServed": "IN"
    },

    // ----------------------------------------------------
    // BREADCRUMB
    // ----------------------------------------------------
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://healthyz.co/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Homecare Services",
          "item": "https://healthyz.co/home-care-services"
        }
      ]
    }
  ];

  return (
    <SEOWrapper
      title="Homecare Services | Home Nursing, Elder Care & Physiotherapy at Home"
      description="Book professional home nursing, elder care, physiotherapy, injections, IV administration, wound care and medical attendants. Certified experts available 24/7 for home medical support."
      canonical="https://healthyz.co/home-care-services"
      image="https://healthyz.co/og-image.png"
      keywords="home nursing, elder care, physiotherapy at home, injection at home, medical attendant, home medical care, wound care at home, Healthyz homecare"
      jsonld={jsonldData}
    />
  );
}
