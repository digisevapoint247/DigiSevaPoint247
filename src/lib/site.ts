import {
  BadgeCheck,
  ClipboardCheck,
  CreditCard,
  FileCheck2,
  FileSearch,
  Landmark,
  ReceiptText,
  RefreshCcw,
  ShieldCheck,
  Video,
} from "lucide-react";

export const contact = {
  phone: "8269805682",
  whatsapp: "8269805682",
  email: "digiseva247@gmail.com",
  address: "Address to be updated",
  hours: "Mon-Sat, 9:00 AM - 8:00 PM",
};

export const whatsappUrl = `https://wa.me/91${contact.whatsapp}?text=${encodeURIComponent(
  "Hello DigiSeva Point, I need help with an online form.",
)}`;

export const services = [
  {
    icon: Landmark,
    title: "PAN Card Assistance",
    description:
      "New PAN, correction, reprint, status guidance, and document checklist support.",
    documents: "Aadhaar, photo, signature, mobile number, and email as required.",
  },
  {
    icon: ClipboardCheck,
    title: "Online Form Filling",
    description:
      "Careful form filling support for government, education, job, and portal-based forms.",
    documents: "Form link, eligibility details, identity proof, and supporting papers.",
  },
  {
    icon: RefreshCcw,
    title: "Document Update Help",
    description:
      "Guidance for profile updates, corrections, uploads, and resubmission steps.",
    documents: "Existing application details and updated proof documents.",
  },
  {
    icon: FileSearch,
    title: "Application Tracking",
    description:
      "Status checking, next-step explanation, and reminder support for pending applications.",
    documents: "Application number, registered mobile/email, and portal details.",
  },
  {
    icon: FileCheck2,
    title: "Certificate Forms",
    description:
      "Help with certificate, registration, and verification forms where online support is needed.",
    documents: "Identity proof, address proof, and service-specific documents.",
  },
  {
    icon: ReceiptText,
    title: "Bill & Payment Guidance",
    description:
      "Assistance with online payment pages, challans, receipts, and transaction confirmation.",
    documents: "Bill/reference number, account details, and registered contact.",
  },
];

export const processSteps = [
  {
    title: "Choose your service",
    description: "Select the form or online service where you need guided assistance.",
  },
  {
    title: "Book an appointment",
    description: "Pick a time for phone, WhatsApp, or video support with DigiSeva Point.",
  },
  {
    title: "Pay securely",
    description: "Complete the service booking payment through Razorpay when enabled.",
  },
  {
    title: "Join and complete",
    description: "Connect through Jitsi video call or WhatsApp and finish the form carefully.",
  },
];

export const trustItems = [
  {
    icon: ShieldCheck,
    title: "Privacy-first support",
    description: "No document uploads in V1. We share checklists and handle details during the appointment.",
  },
  {
    icon: Video,
    title: "Video appointment ready",
    description: "Confirmed bookings receive a private Jitsi room link for live support.",
  },
  {
    icon: CreditCard,
    title: "Online payment flow",
    description: "Razorpay integration is prepared for UPI, cards, and netbanking after keys are added.",
  },
  {
    icon: BadgeCheck,
    title: "Clear assistance model",
    description: "We help users fill forms correctly. DigiSeva Point is not an official government portal.",
  },
];

export const serviceNames = services.map((service) => service.title);
