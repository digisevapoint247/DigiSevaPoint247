"use client";

import { useMemo, useState } from "react";
import { CalendarCheck, CreditCard, Loader2, Video } from "lucide-react";
import { contact, serviceNames } from "@/lib/site";

type BookingResponse = {
  appointmentId: string;
  jitsiUrl: string;
  payment?: {
    enabled: boolean;
    orderId?: string;
    amount?: number;
    currency?: string;
    message?: string;
  };
};

const modes = ["Video call", "Phone call", "WhatsApp"] as const;

export function BookingForm() {
  const isStaticHosting = process.env.NEXT_PUBLIC_STATIC_HOSTING === "true";
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: serviceNames[0],
    date: "",
    time: "",
    mode: "Video call",
    notes: "",
    consent: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [booking, setBooking] = useState<BookingResponse | null>(null);

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  async function submitBooking(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    setBooking(null);

    if (isStaticHosting) {
      const text = [
        "Hello DigiSeva Point, I want to book an appointment.",
        `Name: ${form.name}`,
        `Phone: ${form.phone}`,
        `Service: ${form.service}`,
        `Date: ${form.date}`,
        `Time: ${form.time}`,
        `Mode: ${form.mode}`,
        form.notes ? `Notes: ${form.notes}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      window.location.href = `https://wa.me/91${contact.whatsapp}?text=${encodeURIComponent(text)}`;
      setStatus("success");
      setMessage("Opening WhatsApp for appointment confirmation.");
      return;
    }

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Unable to create appointment.");
      }

      setBooking(data);
      setStatus("success");
      setMessage("Appointment request created. We will confirm the schedule shortly.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <form
      onSubmit={submitBooking}
      className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="grid gap-1">
        <label className="text-sm font-semibold text-slate-700" htmlFor="name">
          Full name
        </label>
        <input
          id="name"
          required
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          placeholder="Customer name"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1">
          <label className="text-sm font-semibold text-slate-700" htmlFor="phone">
            Mobile number
          </label>
          <input
            id="phone"
            required
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
            placeholder="10 digit mobile"
          />
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-semibold text-slate-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
            placeholder="optional"
          />
        </div>
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-semibold text-slate-700" htmlFor="service">
          Service
        </label>
        <select
          id="service"
          value={form.service}
          onChange={(event) => setForm({ ...form, service: event.target.value })}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        >
          {serviceNames.map((service) => (
            <option key={service}>{service}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="grid gap-1">
          <label className="text-sm font-semibold text-slate-700" htmlFor="date">
            Date
          </label>
          <input
            id="date"
            type="date"
            min={minDate}
            required
            value={form.date}
            onChange={(event) => setForm({ ...form, date: event.target.value })}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-semibold text-slate-700" htmlFor="time">
            Time
          </label>
          <input
            id="time"
            type="time"
            required
            value={form.time}
            onChange={(event) => setForm({ ...form, time: event.target.value })}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-semibold text-slate-700" htmlFor="mode">
            Mode
          </label>
          <select
            id="mode"
            value={form.mode}
            onChange={(event) => setForm({ ...form, mode: event.target.value })}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            {modes.map((mode) => (
              <option key={mode}>{mode}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-semibold text-slate-700" htmlFor="notes">
          Notes
        </label>
        <textarea
          id="notes"
          rows={3}
          value={form.notes}
          onChange={(event) => setForm({ ...form, notes: event.target.value })}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          placeholder="Tell us the form name, deadline, or issue."
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-slate-600">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(event) => setForm({ ...form, consent: event.target.checked })}
          className="mt-1 h-4 w-4"
        />
        I understand DigiSeva Point provides assistance only and is not an official
        government portal. I will share documents only through the agreed support channel.
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0a3d91] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#082f70] disabled:opacity-60"
      >
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarCheck className="h-4 w-4" />}
        Book appointment
      </button>

      {message ? (
        <div
          className={`rounded-md border p-3 text-sm ${
            status === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-green-200 bg-green-50 text-green-800"
          }`}
        >
          {message}
        </div>
      ) : null}

      {booking ? (
        <div className="grid gap-3 rounded-md border border-blue-100 bg-blue-50 p-3 text-sm text-slate-700">
          <p className="font-semibold text-[#0a3d91]">Booking ID: {booking.appointmentId}</p>
          <a className="inline-flex items-center gap-2 font-semibold text-[#0a3d91]" href={booking.jitsiUrl} target="_blank">
            <Video className="h-4 w-4" />
            Open Jitsi room
          </a>
          <p className="inline-flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-[#119622]" />
            {booking.payment?.enabled
              ? `Razorpay order created: ${booking.payment.orderId}`
              : booking.payment?.message ?? "Payment setup pending."}
          </p>
        </div>
      ) : null}

      {isStaticHosting ? (
        <p className="text-xs leading-5 text-slate-500">
          GitHub Pages hosting uses WhatsApp handoff for bookings. Backend payment,
          AI, and admin APIs need server hosting.
        </p>
      ) : null}
    </form>
  );
}
