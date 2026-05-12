import { serviceNames } from "./site";

export type AppointmentInput = {
  name: string;
  phone: string;
  email?: string;
  service: string;
  date: string;
  time: string;
  mode: "Video call" | "Phone call" | "WhatsApp";
  notes?: string;
  consent: boolean;
};

export function validateAppointment(input: Partial<AppointmentInput>) {
  const errors: Record<string, string> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (!input.phone || !/^[6-9]\d{9}$/.test(input.phone.replace(/\D/g, ""))) {
    errors.phone = "Please enter a valid 10 digit Indian mobile number.";
  }

  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!input.service || !serviceNames.includes(input.service)) {
    errors.service = "Please choose a service.";
  }

  if (!input.date) {
    errors.date = "Please choose a date.";
  }

  if (!input.time) {
    errors.time = "Please choose a time.";
  }

  if (!input.mode || !["Video call", "Phone call", "WhatsApp"].includes(input.mode)) {
    errors.mode = "Please choose an appointment mode.";
  }

  if (!input.consent) {
    errors.consent = "Consent is required before booking.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function createJitsiRoom(name: string) {
  const cleanName = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 28);
  const token = crypto.randomUUID().slice(0, 8);

  return `digiseva-${cleanName || "customer"}-${token}`;
}
