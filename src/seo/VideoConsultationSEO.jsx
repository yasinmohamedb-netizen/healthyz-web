// ================================================
// VideoConsultationSEO.jsx
// SEO + JSON-LD for Video Consultation Page
// ================================================

import React from "react";
import SEOWrapper from "./SEOWrapper";

export default function VideoConsultationSEO() {
  const jsonldData = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: "Online Video Doctor Consultation",
      url: "https://healthyz.co/video-consultation",
      description:
        "Online doctor consultation via video calls. Connect instantly with certified doctors for dermatology, pediatrics, gynecology, general medicine and more.",
      specialty: [
        "Dermatology",
        "Pediatrics",
        "Gynecology",
        "General Medicine",
        "Cardiology",
      ],
      publisher: {
        "@type": "Organization",
        name: "Zayz Healthcare LLP",
        logo: "https://healthyz.co/HealthyzLogo.png",
      },
    },

    {
      "@context": "https://schema.org",
      "@type": "MedicalService",
      serviceType: "Online Doctor Consultation",
      provider: {
        "@type": "Organization",
        name: "Healthyz",
        url: "https://healthyz.co",
        logo: "https://healthyz.co/HealthyzLogo.png",
      },
      availableChannel: ["Online", "Video", "Audio"],
      areaServed: "IN",
    },

    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Book an Online Video Consultation",
      step: [
        {
          "@type": "HowToStep",
          text: "Select a specialist based on your health requirement.",
        },
        {
          "@type": "HowToStep",
          text: "Choose a convenient time slot.",
        },
        {
          "@type": "HowToStep",
          text: "Make the payment securely.",
        },
        {
          "@type": "HowToStep",
          text: "Join the video consultation using your phone or laptop.",
        },
      ],
    },
  ];

  return (
    <SEOWrapper
      title="Online Video Doctor Consultation | Healthyz"
      description="Book online doctor consultations instantly via video. Dermatologists, gynecologists, pediatricians, general physicians available 24/7. Get e-prescriptions instantly."
      canonical="https://healthyz.co/video-consultation"
      image="https://healthyz.co/og-image.png"
      keywords="online doctor consultation, video doctor consultation, gynecology consultation online, dermatologist video consultation"
      jsonld={jsonldData}
    />
  );
}
