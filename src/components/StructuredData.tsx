import { contact, services } from "@/lib/site";

export function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "DigiSeva Point",
    alternateName: "Aapka Digital Sahayak",
    url: siteUrl,
    image: `${siteUrl}/digiseva-logo.png`,
    email: contact.email,
    telephone: `+91${contact.phone}`,
    description:
      "Online form filling assistance for PAN card, online applications, certificates, document updates, application tracking, and digital services.",
    areaServed: "India",
    openingHours: "Mo-Sa 09:00-20:00",
    sameAs: [`https://wa.me/91${contact.whatsapp}`],
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
